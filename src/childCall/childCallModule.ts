/*
 * Filename: /home/cc/leetcode-extension/src/childCall/ExecuteService.ts
 * Path: /home/cc/leetcode-extension
 * Created Date: Thursday, October 19th 2023, 1:24:54 am
 * Author: ccagml
 *
 * Copyright (c) 2023 ccagml . All rights reserved
 */

import * as cp from "child_process";
import * as fse from "fs-extra";
import * as os from "os";
import * as path from "path";
import { ExtensionContext, ProgressLocation, Progress } from "vscode";
import { ConfigurationChangeEvent, Disposable, MessageItem, window, workspace } from "vscode";
import { DialogOptions, OutPutType, Endpoint, IProblem, leetcodeHasInited } from "../model/Model";
import { getLeetCodeEndpoint, getNodePath } from "../utils/ConfigUtils";
import { openUrl, ShowMessage } from "../utils/OutputUtils";
import * as systemUtils from "../utils/SystemUtils";
import { toWslPath, useWsl } from "../utils/SystemUtils";
import { getOpenClearProblemCacheTime, isOpenClearProblemCache } from "../utils/ConfigUtils";
import { BABA, BABAMediator, BABAProxy, BabaStr, BaseCC } from "../BABA";
import { sysCall } from "../utils/SystemUtils";

class ExecuteService implements Disposable {
  private leetCodeCliResourcesRootPath: string;
  private leetCodeCliRootPath: string;
  private nodeExecutable: string;
  private configurationChangeListener: Disposable;

  constructor() {
    // this.leetCodeCliResourcesRootPath = path.join(__dirname, "..", "..", "node_modules", "rpc");
    if (!systemUtils.useVscodeNode()) {
      this.leetCodeCliResourcesRootPath = path.join(__dirname, "..", "..", "..", "resources");
    }
    this.leetCodeCliRootPath = path.join(__dirname, "..", "..", "..", "out", "src", "rpc");
    this.nodeExecutable = this.initNodePath();
    this.configurationChangeListener = workspace.onDidChangeConfiguration((event: ConfigurationChangeEvent) => {
      if (event.affectsConfiguration("leetcode-problem-rating.nodePath")) {
        this.nodeExecutable = this.initNodePath();
      }
    }, this);
  }

  public async getLeetCodeBinaryPath(): Promise<string> {
    if (systemUtils.useVscodeNode()) {
      return `${path.join(this.leetCodeCliRootPath, "childMain.js")}`;
    } else {
      if (systemUtils.useWsl()) {
        return `${await systemUtils.toWslPath(`"${path.join(this.leetCodeCliResourcesRootPath, "bin", "leetcode")}"`)}`;
      }
      return `"${path.join(this.leetCodeCliResourcesRootPath, "bin", "leetcode")}"`;
    }
  }

  public async checkNodeEnv(context: ExtensionContext): Promise<boolean> {
    const hasInited: boolean | undefined = context.globalState.get(leetcodeHasInited);
    if (!hasInited) {
      await this.removeOldCache();
    }
    if (this.nodeExecutable !== "node") {
      if (!(await fse.pathExists(this.nodeExecutable))) {
        throw new Error(`The Node.js executable does not exist on path ${this.nodeExecutable}`);
      }
      // Wrap the executable with "" to avoid space issue in the path.
      this.nodeExecutable = `"${this.nodeExecutable}"`;
      if (useWsl()) {
        this.nodeExecutable = await toWslPath(this.nodeExecutable);
      }
    }
    try {
      await this.callWithMsg("正在检查Node环境~", this.nodeExecutable, ["-v"]);
    } catch (error) {
      const choice: MessageItem | undefined = await window.showErrorMessage(
        "LeetCode extension needs Node.js installed in environment path",
        DialogOptions.open
      );
      if (choice === DialogOptions.open) {
        openUrl("https://nodejs.org");
      }
      return false;
    }
    context.globalState.update(leetcodeHasInited, true);
    return true;
  }

  // 多机同步,可能题目缓存会导致不一致
  public async deleteProblemCache() {
    if (isOpenClearProblemCache()) {
      try {
        await this.callWithMsg("正在清除缓存~", this.nodeExecutable, [
          await this.getLeetCodeBinaryPath(),
          "cache",
          "-d",
          "problems",
          "-t",
          getOpenClearProblemCacheTime().toString(),
        ]);
      } catch (error) {
        await ShowMessage("Failed to delete cache. 请查看控制台信息~", OutPutType.error);
      }
    }
  }

  public async deleteCache() {
    try {
      await this.callWithMsg("正在清除缓存~", this.nodeExecutable, [await this.getLeetCodeBinaryPath(), "cache", "-d"]);
    } catch (error) {
      await ShowMessage("Failed to delete cache. 请查看控制台信息~", OutPutType.error);
    }
  }

  public async getUserInfo(): Promise<string> {
    return await this.callWithMsg("正在获取角色信息~", this.nodeExecutable, [
      await this.getLeetCodeBinaryPath(),
      "user",
    ]);
  }

  public async signOut(): Promise<string> {
    return await this.callWithMsg("正在登出~", this.nodeExecutable, [await this.getLeetCodeBinaryPath(), "user", "-L"]);
  }

  public async getAllProblems(showLocked: boolean, needTranslation: boolean): Promise<string> {
    const cmd: string[] = [await this.getLeetCodeBinaryPath(), "query", "-d"];
    if (!needTranslation) {
      cmd.push("-T"); // use -T to prevent translation
    }
    if (!showLocked) {
      cmd.push("-q");
      cmd.push("L");
    }
    return await this.callWithMsg("正在获取题目数据~", this.nodeExecutable, cmd);
  }

  public async showProblem(
    problemNode: IProblem,
    language: string,
    filePath: string,
    showDescriptionInComment: boolean = false,
    needTranslation: boolean
  ): Promise<number> {
    const templateType: string = showDescriptionInComment ? "-cx" : "-c";
    const cmd: string[] = [await this.getLeetCodeBinaryPath(), "show", problemNode.qid, templateType, "-l", language];

    if (!needTranslation) {
      cmd.push("-T"); // use -T to force English version
    }

    if (!(await fse.pathExists(filePath))) {
      const codeTemplate: string = await this.callWithMsg("正在获取题目数据~", this.nodeExecutable, cmd);

      let successResult;
      try {
        successResult = JSON.parse(codeTemplate);
      } catch (e) {
        successResult = { code: -1 };
      }
      if (successResult.code == 100) {
        await fse.createFile(filePath);
        await fse.writeFile(filePath, successResult.msg);
        return successResult.code;
      } else {
        await ShowMessage(`${codeTemplate} 请查看控制台信息~`, OutPutType.error);
      }
      return successResult.code;
    }
    return 100;
  }

  public async getHelp(input: string, language: string, needTranslation: boolean, cn_help?: boolean): Promise<string> {
    // solution don't support translation
    const cmd: string[] = [await this.getLeetCodeBinaryPath(), "query", input, "-e", "-g", language];
    if (!needTranslation) {
      cmd.push("-T");
    }
    if (cn_help) {
      cmd.push("-f");
    }
    const solution: string = await this.callWithMsg("正在获取题解~~~", this.nodeExecutable, cmd);
    return solution;
  }

  public async getUserContest(needTranslation: boolean, username: string): Promise<string> {
    // solution don't support translation
    const cmd: string[] = [await this.getLeetCodeBinaryPath(), "query", "-b", username];
    if (!needTranslation) {
      cmd.push("-T");
    }
    const solution: string = await this.callWithMsg("正在获取竞赛分信息~", this.nodeExecutable, cmd);
    return solution;
  }

  public async getScoreDataOnline(): Promise<string> {
    // solution don't support translation
    const cmd: string[] = [await this.getLeetCodeBinaryPath(), "query", "-c"];
    const solution: string = await this.callWithMsg("正在获取分数数据~", this.nodeExecutable, cmd);
    return solution;
  }

  public async getTestApi(username: string): Promise<string> {
    // solution don't support translation
    const cmd: string[] = [await this.getLeetCodeBinaryPath(), "query", "-z", username];
    const solution: string = await this.callWithMsg("Fetching testapi...", this.nodeExecutable, cmd);
    return solution;
  }

  public async getTodayQuestion(needTranslation: boolean): Promise<string> {
    // solution don't support translation
    const cmd: string[] = [await this.getLeetCodeBinaryPath(), "query", "-a"];
    if (!needTranslation) {
      cmd.push("-T");
    }
    const solution: string = await this.callWithMsg("正在获取每日一题~", this.nodeExecutable, cmd);
    return solution;
  }

  public async getDescription(problemNodeId: string, needTranslation: boolean): Promise<string> {
    const cmd: string[] = [await this.getLeetCodeBinaryPath(), "show", problemNodeId, "-x"];
    if (!needTranslation) {
      cmd.push("-T");
    }
    return await this.callWithMsg("正在获取题目详情~", this.nodeExecutable, cmd);
  }

  public async submitSolution(filePath: string): Promise<string> {
    try {
      if (systemUtils.useVscodeNode()) {
        return await this.callWithMsg("正在提交代码~", this.nodeExecutable, [
          await this.getLeetCodeBinaryPath(),
          "submit",
          `${filePath}`,
        ]);
      }
      return await this.callWithMsg("正在提交代码~", this.nodeExecutable, [
        await this.getLeetCodeBinaryPath(),
        "submit",
        `"${filePath}"`,
      ]);
    } catch (error) {
      if (error.result) {
        return error.result;
      }
      throw error;
    }
  }

  public async testSolution(filePath: string, testString?: string, allCase?: boolean): Promise<string> {
    if (testString) {
      if (systemUtils.useVscodeNode()) {
        return await this.callWithMsg("正在提交代码~", this.nodeExecutable, [
          await this.getLeetCodeBinaryPath(),
          "test",
          `${filePath}`,
          "-t",
          `${testString}`,
        ]);
      }
      return await this.callWithMsg("正在提交代码~", this.nodeExecutable, [
        await this.getLeetCodeBinaryPath(),
        "test",
        `"${filePath}"`,
        "-t",
        `${testString}`,
      ]);
    }
    if (allCase) {
      if (systemUtils.useVscodeNode()) {
        return await this.callWithMsg("正在提交代码~", this.nodeExecutable, [
          await this.getLeetCodeBinaryPath(),
          "test",
          `${filePath}`,
          "-a",
        ]);
      }
      return await this.callWithMsg("正在提交代码~", this.nodeExecutable, [
        await this.getLeetCodeBinaryPath(),
        "test",
        `"${filePath}"`,
        "-a",
      ]);
    }
    if (systemUtils.useVscodeNode()) {
      return await this.callWithMsg("正在提交代码~", this.nodeExecutable, [
        await this.getLeetCodeBinaryPath(),
        "test",
        `${filePath}`,
      ]);
    }
    return await this.callWithMsg("正在提交代码~", this.nodeExecutable, [
      await this.getLeetCodeBinaryPath(),
      "test",
      `"${filePath}"`,
    ]);
  }

  public async switchEndpoint(endpoint: string): Promise<string> {
    switch (endpoint) {
      case Endpoint.LeetCodeCN:
        return await this.callWithMsg("正在切换登录点~", this.nodeExecutable, [
          await this.getLeetCodeBinaryPath(),
          "plugin",
          "-e",
          "leetcode.cn",
        ]);
      case Endpoint.LeetCode:
      default:
        return await this.callWithMsg("正在切换登录点~", this.nodeExecutable, [
          await this.getLeetCodeBinaryPath(),
          "plugin",
          "-d",
          "leetcode.cn",
        ]);
    }
  }

  public async toggleFavorite(node: IProblem, addToFavorite: boolean): Promise<void> {
    const commandParams: string[] = [await this.getLeetCodeBinaryPath(), "star", node.id];
    if (!addToFavorite) {
      commandParams.push("-d");
    }
    await this.callWithMsg("正在更新收藏列表~", this.nodeExecutable, commandParams);
  }

  public async trySignIn(loginMethod: string) {
    const loginArgsMapping: Map<string, string> = new Map([
      ["LeetCode", "-l"],
      ["Cookie", "-c"],
      ["GitHub", "-g"],
      ["LinkedIn", "-i"],
    ]);

    let commandArg = loginArgsMapping.get(loginMethod);
    if (!commandArg) {
      throw new Error(`不支持 "${loginMethod}" 方式登录`);
    }

    const cmd: string[] = [await this.getLeetCodeBinaryPath(), "user", commandArg];

    return await this.callWithMsg("正在登录中~~~~", this.nodeExecutable, cmd, undefined, this.trySignInProcInit, {
      loginMethod: loginMethod,
    });
  }

  public async trySignInProcInit(arg, child_process, resolve, reject) {
    child_process.stdout?.on("data", async (data: string | Buffer) => {
      data = data.toString();
      // vscode.window.showInformationMessage(`cc login msg ${data}.`);
      BABA.getProxy(BabaStr.LogOutputProxy).get_log().append(data);

      if (data.includes("twoFactorCode")) {
        const twoFactor: string | undefined = await window.showInputBox({
          prompt: "Enter two-factor code.",
          ignoreFocusOut: true,
          validateInput: (s: string): string | undefined => (s && s.trim() ? undefined : "The input must not be empty"),
        });
        if (!twoFactor) {
          child_process.kill();
          return resolve(undefined);
        }
        child_process.stdin?.write(`${twoFactor}\n`);
      }

      let successMatch: any;
      try {
        successMatch = JSON.parse(data);
      } catch (e) {
        successMatch = {};
      }
      if (successMatch.code == 100) {
        child_process.stdin?.end();
        let result = successMatch.user_name || name || "没有取到用户名"; //successMatch.user_name;
        return resolve(result);
      } else if (successMatch.code < 0) {
        child_process.stdin?.end();
        return reject(new Error(successMatch.msg));
      }
    });
    child_process.stderr?.on("data", (data: string | Buffer) => {
      BABA.getProxy(BabaStr.LogOutputProxy).get_log().append(data.toString());
    });
    child_process.on("error", reject);

    const name: string | undefined = await window.showInputBox({
      prompt: "Enter username or E-mail.",
      ignoreFocusOut: true,
      validateInput: (s: string): string | undefined => (s && s.trim() ? undefined : "The input must not be empty"),
    });
    if (!name) {
      child_process.kill();
      return resolve(undefined);
    }
    child_process.stdin?.write(`${name}\n`);
    const isByCookie: boolean = arg.loginMethod === "Cookie";
    const pwd: string | undefined = await window.showInputBox({
      prompt: isByCookie ? "Enter cookie" : "Enter password.",
      password: true,
      ignoreFocusOut: true,
      validateInput: (s: string): string | undefined =>
        s ? undefined : isByCookie ? "Cookie must not be empty" : "Password must not be empty",
    });
    if (!pwd) {
      child_process.kill();
      return resolve(undefined);
    }
    child_process.stdin?.write(`${pwd}\n`);
  }

  public get node(): string {
    return this.nodeExecutable;
  }

  public dispose(): void {
    this.configurationChangeListener.dispose();
  }

  private initNodePath(): string {
    if (systemUtils.useVscodeNode()) {
      return "node";
    }
    return getNodePath();
  }

  private async callWithMsg(
    message: string,
    command: string,
    args: string[],
    options: cp.SpawnOptions = { shell: true },
    procInitCallback?,
    procInitCallbackArg?
  ): Promise<string> {
    if (systemUtils.useWsl()) {
      return await this.cCall(message, "wsl", [command].concat(args), options, procInitCallback, procInitCallbackArg);
    }
    return await this.cCall(message, command, args, options, procInitCallback, procInitCallbackArg);
  }

  public async cCall(
    message: string,
    command: string,
    args: string[],
    options: cp.SpawnOptions = { shell: true },
    procInitCallback?,
    procInitCallbackArg?
  ): Promise<string> {
    let result: string = "";
    await window.withProgress({ location: ProgressLocation.Notification }, async (p: Progress<{}>) => {
      return new Promise<void>(async (resolve: () => void, reject: (e: Error) => void): Promise<void> => {
        p.report({ message });
        try {
          result = await sysCall(command, args, options, procInitCallback, procInitCallbackArg);
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    });
    return result;
  }

  public async removeOldCache(): Promise<void> {
    const oldPath: string = path.join(os.homedir(), ".lcpr");
    if (await fse.pathExists(oldPath)) {
      await fse.remove(oldPath);
    }
  }
}

export const executeService: ExecuteService = new ExecuteService();

export class ChildCallProxy extends BABAProxy {
  static NAME = BabaStr.ChildCallProxy;
  constructor() {
    super(ChildCallProxy.NAME);
  }

  public get_instance() {
    return executeService;
  }
}

export class ChildCallMediator extends BABAMediator {
  static NAME = BabaStr.ChildCallMediator;
  constructor() {
    super(ChildCallMediator.NAME);
  }

  listNotificationInterests(): string[] {
    return [BabaStr.VSCODE_DISPOST, BabaStr.AfterInitAll, BabaStr.DeleteCache];
  }
  handleNotification(_notification: BaseCC.BaseCC.INotification) {
    switch (_notification.getName()) {
      case BabaStr.VSCODE_DISPOST:
        executeService.dispose();
        break;
      case BabaStr.AfterInitAll:
        if (!systemUtils.useVscodeNode()) {
          executeService.checkNodeEnv(_notification.getBody());
        }
        executeService.deleteProblemCache();
        executeService.switchEndpoint(getLeetCodeEndpoint());
        break;
      case BabaStr.DeleteCache:
        executeService.deleteCache();
        break;
      default:
        break;
    }
  }
}
