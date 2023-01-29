/*
 * Filename: https://github.com/ccagml/leetcode_extension/src/extension.ts
 * Path: https://github.com/ccagml/leetcode_extension
 * Created Date: Monday, October 31st 2022, 10:16:47 am
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { ExtensionContext, window, commands, Uri, CommentReply, TextDocument } from "vscode";
import { fileButtonController } from "./controller/FileButtonController";
import { treeViewController } from "./controller/TreeViewController";
import { NodeModel } from "./model/NodeModel";
import { treeDataService } from "./service/TreeDataService";
import { treeItemDecorationService } from "./service/TreeItemDecorationService";
import { logOutput, promptForOpenOutputChannel } from "./utils/OutputUtils";
import { executeService } from "./service/ExecuteService";
import { eventController } from "./controller/EventController";
import { statusBarService } from "./service/StatusBarService";
import { previewService } from "./service/PreviewService";
import { solutionService } from "./service/SolutionService";
import { submissionService } from "./service/SubmissionService";
import { markdownService } from "./service/MarkdownService";
import { mainContorller } from "./controller/MainController";
import { loginContorller } from "./controller/LoginController";
import { getLeetCodeEndpoint } from "./utils/ConfigUtils";
import { BricksType, OutPutType, RemarkComment } from "./model/Model";
import { bricksDataService } from "./service/BricksDataService";
import { bricksViewController } from "./controller/BricksViewController";
import { statusBarTimeService } from "./service/StatusBarTimeService";
import { remarkController } from "./controller/RemarkController";

// 激活插件
/**
 * The main function of the extension. It is called when the extension is activated.
 * @param {ExtensionContext} context - ExtensionContext
 */

let lcpr_timer;
export async function activate(context: ExtensionContext): Promise<void> {
  try {
    // 初始化控制器
    mainContorller.initialize(context);
    // 检查node环境
    await mainContorller.checkNodeEnv(context);
    await mainContorller.deleteProblemCache();
    // 事件监听
    eventController.addEvent();

    // 资源管理
    context.subscriptions.push(
      statusBarService,
      logOutput,
      previewService,
      submissionService,
      solutionService,
      executeService,
      markdownService,
      statusBarTimeService,
      fileButtonController,
      treeViewController,
      window.registerFileDecorationProvider(treeItemDecorationService),
      window.createTreeView("QuestionExplorer", { treeDataProvider: treeDataService, showCollapseAll: true }),
      window.createTreeView("BricksExplorer", { treeDataProvider: bricksDataService, showCollapseAll: true }),
      commands.registerCommand("lcpr.deleteCache", () => mainContorller.deleteCache()),
      commands.registerCommand("lcpr.toggleLeetCodeCn", () => treeViewController.switchEndpoint()),
      commands.registerCommand("lcpr.signin", () => loginContorller.signIn()),
      commands.registerCommand("lcpr.signout", () => loginContorller.signOut()),
      commands.registerCommand("lcpr.previewProblem", (node: NodeModel) => treeViewController.previewProblem(node)),
      commands.registerCommand("lcpr.showProblem", (node: NodeModel) => treeViewController.showProblem(node)),
      commands.registerCommand("lcpr.pickOne", () => treeViewController.pickOne()),
      commands.registerCommand("lcpr.deleteAllCache", () => loginContorller.deleteAllCache()),
      commands.registerCommand("leetcode.searchScoreRange", () => treeViewController.searchScoreRange()),
      commands.registerCommand("lcpr.searchProblem", () => treeViewController.searchProblem()),
      commands.registerCommand("lcpr.getHelp", (input: NodeModel | Uri) => treeViewController.getHelp(input)),
      commands.registerCommand("lcpr.refreshExplorer", () => treeDataService.refresh()),
      commands.registerCommand("lcpr.testSolution", (uri?: Uri) => treeViewController.testSolution(uri)),
      commands.registerCommand("lcpr.testCaseDef", (uri?, allCase?) => treeViewController.testCaseDef(uri, allCase)),
      commands.registerCommand("lcpr.tesCaseArea", (uri, testCase?) => treeViewController.tesCaseArea(uri, testCase)),
      commands.registerCommand("lcpr.submitSolution", (uri?: Uri) => treeViewController.submitSolution(uri)),
      commands.registerCommand("lcpr.setDefaultLanguage", () => treeViewController.setDefaultLanguage()),
      commands.registerCommand("lcpr.addFavorite", (node: NodeModel) => treeViewController.addFavorite(node)),
      commands.registerCommand("lcpr.removeFavorite", (node: NodeModel) => treeViewController.removeFavorite(node)),
      commands.registerCommand("lcpr.problems.sort", () => treeViewController.switchSortingStrategy()),
      commands.registerCommand("lcpr.statusBarTime.start", () => statusBarTimeService.start()),
      commands.registerCommand("lcpr.statusBarTime.stop", () => statusBarTimeService.stop()),
      commands.registerCommand("lcpr.statusBarTime.reset", () => statusBarTimeService.reset()),
      commands.registerCommand("lcpr.setBricksType0", (node: NodeModel) =>
        bricksViewController.setBricksType(node, BricksType.TYPE_0)
      ),
      commands.registerCommand("lcpr.setBricksType1", (node: NodeModel) =>
        bricksViewController.setBricksType(node, BricksType.TYPE_1)
      ),
      commands.registerCommand("lcpr.setBricksType2", (node: NodeModel) =>
        bricksViewController.setBricksType(node, BricksType.TYPE_2)
      ),
      commands.registerCommand("lcpr.setBricksType3", (node: NodeModel) =>
        bricksViewController.setBricksType(node, BricksType.TYPE_3)
      ),
      commands.registerCommand("lcpr.setBricksType4", (node: NodeModel) =>
        bricksViewController.setBricksType(node, BricksType.TYPE_4)
      ),
      commands.registerCommand("lcpr.setBricksType5", (node: NodeModel) =>
        bricksViewController.setBricksType(node, BricksType.TYPE_5)
      ),
      commands.registerCommand("lcpr.setBricksType6", (node: NodeModel) =>
        bricksViewController.setBricksType(node, BricksType.TYPE_6)
      ),
      commands.registerCommand("lcpr.newBrickGroup", () => bricksViewController.newBrickGroup()),
      commands.registerCommand("lcpr.addQidToGroup", (a) => bricksViewController.addQidToGroup(a)),
      commands.registerCommand("lcpr.removeBrickGroup", (a) => bricksViewController.removeBrickGroup(a)),
      commands.registerCommand("lcpr.removeQidFromGroup", (node) => bricksViewController.removeQidFromGroup(node)),

      commands.registerCommand("lcpr.remarkCreateNote", (reply: CommentReply) => {
        remarkController.remarkCreateNote(reply);
      }),
      commands.registerCommand("lcpr.remarkClose", (a) => {
        remarkController.remarkClose(a);
      }),
      commands.registerCommand("lcpr.remarkReplyNote", (reply: CommentReply) => {
        remarkController.remarkReplyNote(reply);
      }),
      commands.registerCommand("lcpr.remarkDeleteNoteComment", (comment: RemarkComment) => {
        remarkController.remarkDeleteNoteComment(comment);
      }),
      commands.registerCommand("lcpr.remarkCancelsaveNote", (comment: RemarkComment) => {
        remarkController.remarkCancelsaveNote(comment);
      }),
      commands.registerCommand("lcpr.remarkSaveNote", (comment: RemarkComment) => {
        remarkController.remarkSaveNote(comment);
      }),
      commands.registerCommand("lcpr.remarkEditNote", (comment: RemarkComment) => {
        remarkController.remarkEditNote(comment);
      }),
      commands.registerCommand("lcpr.startRemark", (document: TextDocument) => {
        remarkController.startRemark(document);
      }),
      commands.registerCommand("lcpr.includeTemplates", (document: TextDocument) => {
        remarkController.includeTemplates(document);
      })
    );

    // 设置站点
    await executeService.switchEndpoint(getLeetCodeEndpoint());
    // 获取登录状态
    await loginContorller.getLoginStatus();
    await bricksViewController.initialize();
  } catch (error) {
    logOutput.appendLine(error.toString());
    promptForOpenOutputChannel(
      "Extension initialization failed. Please open output channel for details.",
      OutPutType.error
    );
  } finally {
    lcpr_timer = setInterval(eventController.every_second, 1000);
  }
}

export function deactivate(): void {
  // Do nothing.
  if (0) {
    let a = 0;
    console.log(a);
  }
  if (lcpr_timer != undefined) {
    clearInterval(lcpr_timer);
    lcpr_timer = undefined;
  }
}
