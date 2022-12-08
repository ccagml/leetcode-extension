/*
 * Filename: https://github.com/ccagml/vscode-leetcode-problem-rating/src/service/executeService.ts
 * Path: https://github.com/ccagml/vscode-leetcode-problem-rating
 * Created Date: Monday, October 31st 2022, 10:16:47 am
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import * as cp from "child_process";
import * as fse from "fs-extra";
import * as os from "os";
import * as path from "path";
import { ExtensionContext } from "vscode";
import { ConfigurationChangeEvent, Disposable, MessageItem, window, workspace } from "vscode";
import { DialogOptions, OutPutType, Endpoint, IProblem, leetcodeHasInited } from "../model/Model";
import { executeCommandWithProgress } from "../utils/CliUtils";
import { getNodePath } from "../utils/ConfigUtils";
import { openUrl, promptForOpenOutputChannel } from "../utils/OutputUtils";
import * as systemUtils from "../utils/SystemUtils";
import { toWslPath, useWsl } from "../utils/SystemUtils";

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
      await this.executeCommandWithProgressEx("正在检查Node环境~", this.nodeExecutable, ["-v"]);
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

  public async deleteCache() {
    try {
      await this.executeCommandWithProgressEx("正在清除缓存~", this.nodeExecutable, [
        await this.getLeetCodeBinaryPath(),
        "cache",
        "-d",
      ]);
    } catch (error) {
      await promptForOpenOutputChannel("Failed to delete cache. 请查看控制台信息~", OutPutType.error);
    }
  }

  public async getUserInfo(): Promise<string> {
    return await this.executeCommandWithProgressEx("正在获取角色信息~", this.nodeExecutable, [
      await this.getLeetCodeBinaryPath(),
      "user",
    ]);
  }

  public async signOut(): Promise<string> {
    return await this.executeCommandWithProgressEx("正在登出~", this.nodeExecutable, [
      await this.getLeetCodeBinaryPath(),
      "user",
      "-L",
    ]);
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
    return await this.executeCommandWithProgressEx("正在获取题目数据~", this.nodeExecutable, cmd);
  }

  public async showProblem(
    problemNode: IProblem,
    language: string,
    filePath: string,
    showDescriptionInComment: boolean = false,
    needTranslation: boolean
  ): Promise<void> {
    const templateType: string = showDescriptionInComment ? "-cx" : "-c";
    const cmd: string[] = [await this.getLeetCodeBinaryPath(), "show", problemNode.qid, templateType, "-l", language];

    if (!needTranslation) {
      cmd.push("-T"); // use -T to force English version
    }

    if (!(await fse.pathExists(filePath))) {
      await fse.createFile(filePath);
      const codeTemplate: string = await this.executeCommandWithProgressEx(
        "正在获取题目数据~",
        this.nodeExecutable,
        cmd
      );
      await fse.writeFile(filePath, codeTemplate);
    }
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
    const solution: string = await this.executeCommandWithProgressEx("正在获取题解~~~", this.nodeExecutable, cmd);
    return solution;
  }

  public async getUserContest(needTranslation: boolean, username: string): Promise<string> {
    // solution don't support translation
    const cmd: string[] = [await this.getLeetCodeBinaryPath(), "query", "-b", username];
    if (!needTranslation) {
      cmd.push("-T");
    }
    const solution: string = await this.executeCommandWithProgressEx("正在获取竞赛分信息~", this.nodeExecutable, cmd);
    return solution;
  }

  public async getScoreDataOnline(): Promise<string> {
    // solution don't support translation
    const cmd: string[] = [await this.getLeetCodeBinaryPath(), "query", "-c"];
    const solution: string = await this.executeCommandWithProgressEx("正在获取分数数据~", this.nodeExecutable, cmd);
    return solution;
  }

  public async getTestApi(username: string): Promise<string> {
    // solution don't support translation
    const cmd: string[] = [await this.getLeetCodeBinaryPath(), "query", "-z", username];
    const solution: string = await this.executeCommandWithProgressEx("Fetching testapi...", this.nodeExecutable, cmd);
    return solution;
  }

  public async getTodayQuestion(needTranslation: boolean): Promise<string> {
    // solution don't support translation
    const cmd: string[] = [await this.getLeetCodeBinaryPath(), "query", "-a"];
    if (!needTranslation) {
      cmd.push("-T");
    }
    const solution: string = await this.executeCommandWithProgressEx("正在获取每日一题~", this.nodeExecutable, cmd);
    return solution;
  }

  public async getDescription(problemNodeId: string, needTranslation: boolean): Promise<string> {
    const cmd: string[] = [await this.getLeetCodeBinaryPath(), "show", problemNodeId, "-x"];
    if (!needTranslation) {
      cmd.push("-T");
    }
    return await this.executeCommandWithProgressEx("正在获取题目详情~", this.nodeExecutable, cmd);
  }

  public async submitSolution(filePath: string): Promise<string> {
    try {
      if (systemUtils.useVscodeNode()) {
        return await this.executeCommandWithProgressEx("正在提交代码~", this.nodeExecutable, [
          await this.getLeetCodeBinaryPath(),
          "submit",
          `${filePath}`,
        ]);
      }
      return await this.executeCommandWithProgressEx("正在提交代码~", this.nodeExecutable, [
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
        return await this.executeCommandWithProgressEx("正在提交代码~", this.nodeExecutable, [
          await this.getLeetCodeBinaryPath(),
          "test",
          `${filePath}`,
          "-t",
          `${testString}`,
        ]);
      }
      return await this.executeCommandWithProgressEx("正在提交代码~", this.nodeExecutable, [
        await this.getLeetCodeBinaryPath(),
        "test",
        `"${filePath}"`,
        "-t",
        `${testString}`,
      ]);
    }
    if (allCase) {
      if (systemUtils.useVscodeNode()) {
        return await this.executeCommandWithProgressEx("正在提交代码~", this.nodeExecutable, [
          await this.getLeetCodeBinaryPath(),
          "test",
          `${filePath}`,
          "-a",
        ]);
      }
      return await this.executeCommandWithProgressEx("正在提交代码~", this.nodeExecutable, [
        await this.getLeetCodeBinaryPath(),
        "test",
        `"${filePath}"`,
        "-a",
      ]);
    }
    if (systemUtils.useVscodeNode()) {
      return await this.executeCommandWithProgressEx("正在提交代码~", this.nodeExecutable, [
        await this.getLeetCodeBinaryPath(),
        "test",
        `${filePath}`,
      ]);
    }
    return await this.executeCommandWithProgressEx("正在提交代码~", this.nodeExecutable, [
      await this.getLeetCodeBinaryPath(),
      "test",
      `"${filePath}"`,
    ]);
  }

  public async switchEndpoint(endpoint: string): Promise<string> {
    switch (endpoint) {
      case Endpoint.LeetCodeCN:
        return await this.executeCommandWithProgressEx("正在切换登录点~", this.nodeExecutable, [
          await this.getLeetCodeBinaryPath(),
          "plugin",
          "-e",
          "leetcode.cn",
        ]);
      case Endpoint.LeetCode:
      default:
        return await this.executeCommandWithProgressEx("正在切换登录点~", this.nodeExecutable, [
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
    await this.executeCommandWithProgressEx("正在更新收藏列表~", "node", commandParams);
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

  // private async executeCommandEx(
  //   command: string,
  //   args: string[],
  //   options: cp.SpawnOptions = { shell: true }
  // ): Promise<string> {
  //   if (systemUtils.useWsl()) {
  //     return await executeCommand("wsl", [command].concat(args), options);
  //   }
  //   return await executeCommand(command, args, options);
  // }

  private async executeCommandWithProgressEx(
    message: string,
    command: string,
    args: string[],
    options: cp.SpawnOptions = { shell: true }
  ): Promise<string> {
    if (systemUtils.useWsl()) {
      return await executeCommandWithProgress(message, "wsl", [command].concat(args), options);
    }
    return await executeCommandWithProgress(message, command, args, options);
  }

  public async removeOldCache(): Promise<void> {
    const oldPath: string = path.join(os.homedir(), ".lcpr");
    if (await fse.pathExists(oldPath)) {
      await fse.remove(oldPath);
    }
  }
}

export const executeService: ExecuteService = new ExecuteService();
