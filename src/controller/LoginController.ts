/*
 * Filename: https://github.com/ccagml/vscode-leetcode-problem-rating/src/controller/LoginController.ts
 * Path: https://github.com/ccagml/vscode-leetcode-problem-rating
 * Created Date: Thursday, November 10th 2022, 3:06:12 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import * as cp from "child_process";
import * as systemUtils from "../utils/SystemUtils";
import { executeService } from "../service/ExecuteService";
import { OutPutType, Endpoint, IQuickItemEx, loginArgsMapping, UserStatus } from "../model/Model";
import { createEnvOption } from "../utils/CliUtils";
import { logOutput, promptForOpenOutputChannel } from "../utils/OutputUtils";
import { eventService } from "../service/EventService";
import { window, QuickPickOptions } from "vscode";
import { statusBarService } from "../service/StatusBarService";
import { treeDataService } from "../service/TreeDataService";
import { getLeetCodeEndpoint } from "../utils/ConfigUtils";

// 登录控制器
class LoginContorller {
  constructor() {}

  /* A login function. */
  // 登录操作
  public async signIn(): Promise<void> {
    const picks: Array<IQuickItemEx<string>> = [];
    let qpOpiton: QuickPickOptions = {
      title: "正在登录leetcode.com",
      matchOnDescription: false,
      matchOnDetail: false,
      placeHolder: "请选择登录方式 正在登录leetcode.com",
    };
    if (getLeetCodeEndpoint() == Endpoint.LeetCodeCN) {
      picks.push({
        label: "LeetCode Account",
        detail: "只能登录leetcode.cn",
        value: "LeetCode",
      });
      qpOpiton.title = "正在登录中文版leetcode.cn";
      qpOpiton.placeHolder = "请选择登录方式 正在登录中文版leetcode.cn";
    }
    picks.push(
      {
        label: "Third-Party: GitHub",
        detail: "Use GitHub account to login",
        value: "GitHub",
      },
      {
        label: "Third-Party: LinkedIn",
        detail: "Use LinkedIn account to login",
        value: "LinkedIn",
      },
      {
        label: "LeetCode Cookie",
        detail: "Use LeetCode cookie copied from browser to login",
        value: "Cookie",
      }
    );
    const choice: IQuickItemEx<string> | undefined = await window.showQuickPick(picks, qpOpiton);
    if (!choice) {
      return;
    }
    const loginMethod: string = choice.value;
    const commandArg: string | undefined = loginArgsMapping.get(loginMethod);
    if (!commandArg) {
      throw new Error(`不支持 "${loginMethod}" 方式登录`);
    }
    const isByCookie: boolean = loginMethod === "Cookie";
    const inMessage: string = isByCookie ? " 通过cookie登录" : "登录";
    try {
      const userName: string | undefined = await new Promise(
        async (resolve: (res: string | undefined) => void, reject: (e: Error) => void): Promise<void> => {
          const leetCodeBinaryPath: string = await executeService.getLeetCodeBinaryPath();

          let childProc: cp.ChildProcess;

          if (systemUtils.useVscodeNode()) {
            childProc = cp.fork(await executeService.getLeetCodeBinaryPath(), ["user", commandArg], {
              silent: true,
              env: createEnvOption(),
            });
          } else {
            if (systemUtils.useWsl()) {
              childProc = cp.spawn("wsl", [executeService.node, leetCodeBinaryPath, "user", commandArg], {
                shell: true,
              });
            } else {
              childProc = cp.spawn(executeService.node, [leetCodeBinaryPath, "user", commandArg], {
                shell: true,
                env: createEnvOption(),
              });
            }
          }

          childProc.stdout?.on("data", async (data: string | Buffer) => {
            data = data.toString();
            // vscode.window.showInformationMessage(`cc login msg ${data}.`);
            logOutput.append(data);
            if (data.includes("twoFactorCode")) {
              const twoFactor: string | undefined = await window.showInputBox({
                prompt: "Enter two-factor code.",
                ignoreFocusOut: true,
                validateInput: (s: string): string | undefined =>
                  s && s.trim() ? undefined : "The input must not be empty",
              });
              if (!twoFactor) {
                childProc.kill();
                return resolve(undefined);
              }
              childProc.stdin?.write(`${twoFactor}\n`);
            }

            let successMatch;
            try {
              successMatch = JSON.parse(data);
            } catch (e) {
              successMatch = {};
            }
            if (successMatch.code == 100) {
              childProc.stdin?.end();
              return resolve(successMatch.user_name);
            } else if (successMatch.code < 0) {
              childProc.stdin?.end();
              return reject(new Error(successMatch.msg));
            }
          });

          childProc.stderr?.on("data", (data: string | Buffer) => logOutput.append(data.toString()));

          childProc.on("error", reject);
          const name: string | undefined = await window.showInputBox({
            prompt: "Enter username or E-mail.",
            ignoreFocusOut: true,
            validateInput: (s: string): string | undefined =>
              s && s.trim() ? undefined : "The input must not be empty",
          });
          if (!name) {
            childProc.kill();
            return resolve(undefined);
          }
          childProc.stdin?.write(`${name}\n`);
          const pwd: string | undefined = await window.showInputBox({
            prompt: isByCookie ? "Enter cookie" : "Enter password.",
            password: true,
            ignoreFocusOut: true,
            validateInput: (s: string): string | undefined =>
              s ? undefined : isByCookie ? "Cookie must not be empty" : "Password must not be empty",
          });
          if (!pwd) {
            childProc.kill();
            return resolve(undefined);
          }
          childProc.stdin?.write(`${pwd}\n`);
        }
      );
      if (userName) {
        eventService.emit("statusChanged", UserStatus.SignedIn, userName);
        window.showInformationMessage(`${inMessage} 成功`);
      }
    } catch (error) {
      promptForOpenOutputChannel(`${inMessage}失败. 请看看控制台输出信息`, OutPutType.error);
    }
  }

  // 登出
  /**
   * It signs out the user
   */
  public async signOut(): Promise<void> {
    try {
      await executeService.signOut();
      window.showInformationMessage("成功登出");
      eventService.emit("statusChanged", UserStatus.SignedOut, undefined);
    } catch (error) {
      // promptForOpenOutputChannel(`Failed to signOut. Please open the output channel for details`, OutPutType.error);
    }
  }

  // 获取登录状态
  /**
   * It returns the login status of the user.
   * @returns The login status of the user.
   */
  public async getLoginStatus() {
    return await statusBarService.getLoginStatus();
  }

  // 删除所有缓存
  /**
   * It signs out, removes old cache, switches to the default endpoint, and refreshes the tree data
   */
  public async deleteAllCache(): Promise<void> {
    await this.signOut();
    await executeService.removeOldCache();
    await executeService.switchEndpoint(getLeetCodeEndpoint());
    await treeDataService.refresh();
  }
}

export const loginContorller: LoginContorller = new LoginContorller();
