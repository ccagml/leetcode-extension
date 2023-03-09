/*
 * Filename: https://github.com/ccagml/leetcode-extension/src/controller/LoginController.ts
 * Path: https://github.com/ccagml/leetcode-extension
 * Created Date: Thursday, November 10th 2022, 3:06:12 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import * as cp from "child_process";
import * as systemUtils from "../utils/SystemUtils";
import { executeService } from "../service/ExecuteService";
import { OutPutType, Endpoint, IQuickItemEx, UserStatus } from "../model/Model";
import { createEnvOption } from "../utils/CliUtils";
import { logOutput, promptForOpenOutputChannel } from "../utils/OutputUtils";
import { eventService } from "../service/EventService";
import { window, QuickPickOptions, ProgressLocation, Progress } from "vscode";
import { statusBarService } from "../service/StatusBarService";
import { treeDataService } from "../service/TreeDataService";
import { getLeetCodeEndpoint } from "../utils/ConfigUtils";
import { bricksDataService } from "../service/BricksDataService";

// 登录控制器
class LoginContorller {
  constructor() {}

  loginMethod: string;

  public async getUserName(login_info: any): Promise<string | undefined> {
    let result: string = "";

    await window.withProgress({ location: ProgressLocation.Notification }, async (p: Progress<{}>) => {
      return new Promise(
        async (resolve: (res: string | undefined) => void, reject: (e: Error) => void): Promise<void> => {
          const leetCodeBinaryPath: string = await executeService.getLeetCodeBinaryPath();
          let childProc: cp.ChildProcess;
          if (systemUtils.useVscodeNode()) {
            let newargs: string[] = ["user", login_info.cmd];
            childProc = cp.fork(leetCodeBinaryPath, newargs, {
              silent: true,
              env: createEnvOption(JSON.stringify(login_info)),
            });
          } else {
            if (systemUtils.useWsl()) {
              let newargs: string[] = [executeService.node, leetCodeBinaryPath, "user", login_info.cmd];
              childProc = cp.spawn("wsl", newargs, { shell: true, env: createEnvOption(JSON.stringify(login_info)) });
            } else {
              let newargs: string[] = [leetCodeBinaryPath, "user", login_info.cmd];
              childProc = cp.spawn(executeService.node, newargs, {
                shell: true,
                env: createEnvOption(JSON.stringify(login_info)),
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

            let successMatch: any;
            try {
              successMatch = JSON.parse(data);
            } catch (e) {
              successMatch = {};
            }
            if (successMatch.code == 100) {
              childProc.stdin?.end();
              result = successMatch.user_name || name || "没有取到用户名"; //successMatch.user_name;
              return resolve(result);
            } else if (successMatch.code < 0) {
              childProc.stdin?.end();
              return reject(new Error(successMatch.msg));
            }
          });

          childProc.stderr?.on("data", (data: string | Buffer) => logOutput.append(data.toString()));
          childProc.on("error", reject);
          p.report({ message: "正在登录中~~~~" });
        }
      );
    });

    return result;
  }

  /* A login function. */
  // 登录操作
  public async NewLogin(): Promise<void> {
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
        cmd: "-l",
      });
      qpOpiton.title = "正在登录中文版leetcode.cn";
      qpOpiton.placeHolder = "请选择登录方式 正在登录中文版leetcode.cn";
    }
    picks.push(
      {
        label: "Third-Party: GitHub",
        detail: "Use GitHub account to login",
        value: "GitHub",
        cmd: "-g",
      },
      {
        label: "Third-Party: LinkedIn",
        detail: "Use LinkedIn account to login",
        value: "LinkedIn",
        cmd: "-i",
      },
      {
        label: "LeetCode Cookie",
        detail: "Use LeetCode cookie copied from browser to login",
        value: "Cookie",
        cmd: "-c",
      }
    );
    const choice: IQuickItemEx<string> | undefined = await window.showQuickPick(picks, qpOpiton);
    if (!choice) {
      return;
    }
    this.loginMethod = choice.value;

    if (!choice.cmd) {
      throw new Error(`不支持 "${this.loginMethod}" 方式登录`);
      return;
    }

    let login_info: any = {};
    login_info.cmd = choice.cmd;

    const name: string | undefined = await window.showInputBox({
      prompt: "Enter username or E-mail.",
      ignoreFocusOut: true,
      validateInput: (s: string): string | undefined => (s && s.trim() ? undefined : "The input must not be empty"),
    });
    if (!name) {
      return;
    }
    login_info.name = name;

    const isByCookie: boolean = this.loginMethod === "Cookie";
    const passWord: string | undefined = await window.showInputBox({
      prompt: isByCookie ? "Enter cookie" : "Enter password.",
      password: true,
      ignoreFocusOut: true,
      validateInput: (s: string): string | undefined =>
        s ? undefined : isByCookie ? "Cookie must not be empty" : "Password must not be empty",
    });
    if (!passWord) {
      return;
    }
    login_info.pass = passWord;

    try {
      const userName: string | undefined = await this.getUserName(login_info);
      if (userName) {
        eventService.emit("statusChanged", UserStatus.SignedIn, userName);
        window.showInformationMessage(`登录成功`);
      }
    } catch (error) {
      promptForOpenOutputChannel(`登录失败. 请看看控制台输出信息`, OutPutType.error);
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
    await bricksDataService.refresh();
  }
}

export const loginContorller: LoginContorller = new LoginContorller();
