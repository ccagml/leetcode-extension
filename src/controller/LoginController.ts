/*
 * Filename: https://github.com/ccagml/leetcode-extension/src/controller/LoginController.ts
 * Path: https://github.com/ccagml/leetcode-extension
 * Created Date: Thursday, November 10th 2022, 3:06:12 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { OutPutType, Endpoint, IQuickItemEx } from "../model/Model";
import { ShowMessage } from "../utils/OutputUtils";

import { window, QuickPickOptions } from "vscode";
import { getLeetCodeEndpoint } from "../utils/ConfigUtils";
import { BABA, BabaStr } from "../BABA";

// 登录控制器
class LoginContorller {
  constructor() {}
  commandArg: string | undefined;
  loginMethod: string;

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

    const isByCookie: boolean = this.loginMethod === "Cookie";
    const inMessage: string = isByCookie ? " 通过cookie登录" : "登录";
    try {
      const userName: string | undefined = await BABA.getProxy(BabaStr.ChildCallProxy)
        .get_instance()
        .trySignIn(this.loginMethod);
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
      await BABA.getProxy(BabaStr.ChildCallProxy).get_instance().signOut();
      window.showInformationMessage("成功登出");

      BABA.sendNotification(BabaStr.USER_LOGIN_OUT, {});
    } catch (error) {
      // ShowMessage(`Failed to signOut. Please open the output channel for details`, OutPutType.error);
    }
  }

  // 删除所有缓存
  /**
   * It signs out, removes old cache, switches to the default endpoint, and refreshes the tree data
   */
  public async deleteAllCache(): Promise<void> {
    await this.signOut();
    await BABA.getProxy(BabaStr.ChildCallProxy).get_instance().removeOldCache();
    await BABA.getProxy(BabaStr.ChildCallProxy).get_instance().switchEndpoint(getLeetCodeEndpoint());
    BABA.sendNotification(BabaStr.TreeData_refresh);
    BABA.sendNotification(BabaStr.BricksData_refresh);
  }
}

export const loginContorller: LoginContorller = new LoginContorller();
