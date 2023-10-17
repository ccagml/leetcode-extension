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
import { OutPutType, Endpoint, IQuickItemEx, loginArgsMapping, UserStatus } from "../model/Model";
import { createEnvOption } from "../utils/CliUtils";
import { ShowMessage } from "../utils/OutputUtils";

import { window, QuickPickOptions, ProgressLocation, Progress } from "vscode";
import { getLeetCodeEndpoint } from "../utils/ConfigUtils";
import { BABA, BabaStr } from "../BABA";

// 登录控制器
class LoginContorller {
  constructor() {}
  commandArg: string | undefined;
  loginMethod: string;

  public async getUserName(): Promise<string | undefined> {
    let result: string = "";

    await window.withProgress({ location: ProgressLocation.Notification }, async (p: Progress<{}>) => {
      return new Promise(
        async (resolve: (res: string | undefined) => void, reject: (e: Error) => void): Promise<void> => {
          if (this.commandArg == undefined) {
            reject(new Error("not commandArg"));
            return;
          }
          const leetCodeBinaryPath: string = await executeService.getLeetCodeBinaryPath();
          let childProc: cp.ChildProcess;
          if (systemUtils.useVscodeNode()) {
            childProc = cp.fork(await executeService.getLeetCodeBinaryPath(), ["user", this.commandArg], {
              silent: true,
              env: createEnvOption(),
            });
          } else {
            if (systemUtils.useWsl()) {
              childProc = cp.spawn("wsl", [executeService.node, leetCodeBinaryPath, "user", this.commandArg], {
                shell: true,
              });
            } else {
              childProc = cp.spawn(executeService.node, [leetCodeBinaryPath, "user", this.commandArg], {
                shell: true,
                env: createEnvOption(),
              });
            }
          }

          childProc.stdout?.on("data", async (data: string | Buffer) => {
            data = data.toString();
            // vscode.window.showInformationMessage(`cc login msg ${data}.`);
            BABA.getProxy(BabaStr.LogOutputProxy).get_log().append(data);

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

          childProc.stderr?.on("data", (data: string | Buffer) => {
            BABA.getProxy(BabaStr.LogOutputProxy).get_log().append(data.toString());
          });
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
          const isByCookie: boolean = this.loginMethod === "Cookie";
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
          p.report({ message: "正在登录中~~~~" });
        }
      );
    });

    return result;
  }

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
    this.loginMethod = choice.value;
    this.commandArg = loginArgsMapping.get(this.loginMethod);
    if (!this.commandArg) {
      throw new Error(`不支持 "${this.loginMethod}" 方式登录`);
    }
    const isByCookie: boolean = this.loginMethod === "Cookie";
    const inMessage: string = isByCookie ? " 通过cookie登录" : "登录";
    try {
      const userName: string | undefined = await this.getUserName();
      if (userName) {
        BABA.sendNotification(BabaStr.USER_LOGIN_SUC, { userName: userName });

        window.showInformationMessage(`${inMessage} 成功`);
      }
    } catch (error) {
      ShowMessage(`${inMessage}失败. 请看看控制台输出信息`, OutPutType.error);
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

      BABA.sendNotification(BabaStr.USER_LOGIN_OUT, {});
    } catch (error) {
      // ShowMessage(`Failed to signOut. Please open the output channel for details`, OutPutType.error);
    }
  }

  // 获取登录状态
  /**
   * It returns the login status of the user.
   * @returns The login status of the user.
   */
  public async getLoginStatus() {
    return await BABA.getProxy(BabaStr.StatusBarProxy).getLoginStatus();
  }

  // 删除所有缓存
  /**
   * It signs out, removes old cache, switches to the default endpoint, and refreshes the tree data
   */
  public async deleteAllCache(): Promise<void> {
    await this.signOut();
    await executeService.removeOldCache();
    await executeService.switchEndpoint(getLeetCodeEndpoint());
    BABA.sendNotification(BabaStr.TreeData_refresh);
    BABA.sendNotification(BabaStr.BricksData_refresh);
  }
}

export const loginContorller: LoginContorller = new LoginContorller();
