/*
 * Filename: https://github.com/ccagml/leetcode-extension/src/extension.ts
 * Path: https://github.com/ccagml/leetcode-extension
 * Created Date: Monday, October 31st 2022, 10:16:47 am
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { ExtensionContext, window, commands, Uri, CommentReply, TextDocument } from "vscode";
import { TreeNodeModel } from "./model/TreeNodeModel";
import { treeColor } from "./treeColor/TreeColorModule";
import { ShowMessage } from "./utils/OutputUtils";
import { ChildCallMediator, ChildCallProxy } from "./childCall/childCallModule";
import { markdownService } from "./service/MarkdownService";
import { BricksType, OutPutType, RemarkComment } from "./model/ConstDefind";
import { BricksDataMediator, BricksDataProxy, bricksDataService } from "./bricksData/BricksDataService";
import { BABA, BabaStr } from "./BABA";
import { StatusBarTimeMediator, StatusBarTimeProxy } from "./statusBarTime/StatusBarTimeModule";
import { StatusBarMediator, StatusBarProxy } from "./statusBar/StatusBarModule";
import { LogOutputMediator, LogOutputProxy } from "./logOutput/logOutputModule";
import { RemarkMediator, RemarkProxy } from "./remark/RemarkServiceModule";
import { FileButtonMediator, FileButtonProxy } from "./fileButton/FileButtonModule";
import { QuestionDataMediator, QuestionDataProxy } from "./questionData/QuestionDataModule";
import { TreeDataMediator, TreeDataProxy, treeDataService } from "./treeData/TreeDataService";
import { CommitResultMediator, CommitResultProxy } from "./commitResult/CommitResultModule";
import { SolutionProxy, SolutionMediator } from "./solution/SolutionModule";
import { PreviewMediator, PreviewProxy } from "./preView/PreviewModule";
import { DebugMediator, DebugProxy } from "./debug/DebugModule";
import { RankScoreDataMediator, RankScoreDataProxy } from "./rankScore/RankScoreDataModule";
import { TodayDataMediator, TodayDataProxy } from "./todayData/TodayDataModule";

//==================================BABA========================================

// 激活插件
/**
 * The main function of the extension. It is called when the extension is activated.
 * @param {ExtensionContext} context - ExtensionContext
 */

let lcpr_timer_sec;
let lcpr_timer_min;
export async function activate(context: ExtensionContext): Promise<void> {
  try {
    BABA.init([
      StatusBarTimeMediator,
      StatusBarTimeProxy,
      StatusBarProxy,
      StatusBarMediator,
      RemarkProxy,
      RemarkMediator,
      LogOutputProxy,
      LogOutputMediator,
      FileButtonProxy,
      FileButtonMediator,
      QuestionDataProxy,
      QuestionDataMediator,
      TreeDataProxy,
      TreeDataMediator,
      BricksDataProxy,
      BricksDataMediator,
      CommitResultProxy,
      CommitResultMediator,
      SolutionProxy,
      SolutionMediator,
      PreviewProxy,
      PreviewMediator,
      DebugProxy,
      DebugMediator,
      ChildCallProxy,
      ChildCallMediator,
      RankScoreDataProxy,
      RankScoreDataMediator,
      TodayDataProxy,
      TodayDataMediator,
    ]);

    // 资源管理
    context.subscriptions.push(
      markdownService,
      BABA,
      window.registerFileDecorationProvider(treeColor),
      window.createTreeView("QuestionExplorer", { treeDataProvider: treeDataService, showCollapseAll: true }),
      window.createTreeView("BricksExplorer", { treeDataProvider: bricksDataService, showCollapseAll: true }),
      commands.registerCommand("lcpr.deleteCache", () => BABA.sendNotification(BabaStr.DeleteCache)),
      commands.registerCommand("lcpr.toggleLeetCodeCn", () => {
        BABA.sendNotification(BabaStr.TreeData_switchEndpoint);
      }),
      commands.registerCommand("lcpr.signin", () => BABA.sendNotification(BabaStr.BABACMD_Login)),
      commands.registerCommand("lcpr.signout", () => BABA.sendNotification(BabaStr.BABACMD_LoginOut)),
      commands.registerCommand("lcpr.previewProblem", (node: TreeNodeModel) => {
        BABA.sendNotification(BabaStr.BABACMD_previewProblem, { input: node, isSideMode: false });
      }),
      commands.registerCommand("lcpr.showProblem", (node: TreeNodeModel) => {
        BABA.sendNotification(BabaStr.BABACMD_showProblem, node);
      }),
      commands.registerCommand("lcpr.pickOne", () => {
        BABA.sendNotification(BabaStr.BABACMD_pickOne);
      }),
      commands.registerCommand("lcpr.deleteAllCache", () => BABA.sendNotification(BabaStr.BABACMD_deleteAllCache)),
      commands.registerCommand("leetcode.searchScoreRange", () => {
        BABA.sendNotification(BabaStr.BABACMD_searchScoreRange);
      }),
      commands.registerCommand("lcpr.searchProblem", () => BABA.sendNotification(BabaStr.BABACMD_searchProblem)),
      commands.registerCommand("lcpr.getHelp", (input: TreeNodeModel | Uri) =>
        BABA.sendNotification(BabaStr.BABACMD_getHelp, input)
      ),
      commands.registerCommand("lcpr.refresh", () => {
        BABA.sendNotification(BabaStr.BABACMD_refresh);
      }),
      commands.registerCommand("lcpr.testSolution", (uri?: Uri) => {
        BABA.sendNotification(BabaStr.BABACMD_testSolution, { uri: uri });
      }),

      commands.registerCommand("lcpr.reTestSolution", (uri?: Uri) => {
        BABA.sendNotification(BabaStr.BABACMD_reTestSolution, { uri: uri });
      }),
      commands.registerCommand("lcpr.testCaseDef", (uri?, allCase?) => {
        BABA.sendNotification(BabaStr.BABACMD_testCaseDef, { uri: uri, allCase: allCase });
      }),
      commands.registerCommand("lcpr.tesCaseArea", (uri, testCase?) => {
        BABA.sendNotification(BabaStr.BABACMD_tesCaseArea, { uri: uri, testCase: testCase });
      }),

      commands.registerCommand("lcpr.submitSolution", (uri?: Uri) => {
        BABA.sendNotification(BabaStr.BABACMD_submitSolution, { uri: uri });
      }),
      commands.registerCommand("lcpr.setDefaultLanguage", () => {
        BABA.sendNotification(BabaStr.BABACMD_setDefaultLanguage);
      }),
      commands.registerCommand("lcpr.addFavorite", (node: TreeNodeModel) => {
        BABA.sendNotification(BabaStr.BABACMD_addFavorite, { node: node });
      }),

      commands.registerCommand("lcpr.removeFavorite", (node: TreeNodeModel) => {
        BABA.sendNotification(BabaStr.BABACMD_removeFavorite, { node: node });
      }),
      commands.registerCommand("lcpr.problems.sort", () => {
        BABA.sendNotification(BabaStr.BABACMD_problems_sort);
      }),
      commands.registerCommand("lcpr.statusBarTime.start", () => {
        BABA.sendNotification(BabaStr.BABACMD_statusBarTime_start);
      }),
      commands.registerCommand("lcpr.statusBarTime.stop", () => {
        BABA.sendNotification(BabaStr.BABACMD_statusBarTime_stop);
      }),
      commands.registerCommand("lcpr.statusBarTime.reset", () => {
        BABA.sendNotification(BabaStr.BABACMD_statusBarTime_reset);
      }),
      commands.registerCommand("lcpr.setBricksType0", (node: TreeNodeModel) =>
        BABA.sendNotification(BabaStr.BABACMD_setBricksType, { node: node, type: BricksType.TYPE_0 })
      ),
      commands.registerCommand("lcpr.setBricksType1", (node: TreeNodeModel) =>
        BABA.sendNotification(BabaStr.BABACMD_setBricksType, { node: node, type: BricksType.TYPE_1 })
      ),
      commands.registerCommand("lcpr.setBricksType2", (node: TreeNodeModel) =>
        BABA.sendNotification(BabaStr.BABACMD_setBricksType, { node: node, type: BricksType.TYPE_2 })
      ),
      commands.registerCommand("lcpr.setBricksType3", (node: TreeNodeModel) =>
        BABA.sendNotification(BabaStr.BABACMD_setBricksType, { node: node, type: BricksType.TYPE_3 })
      ),
      commands.registerCommand("lcpr.setBricksType4", (node: TreeNodeModel) =>
        BABA.sendNotification(BabaStr.BABACMD_setBricksType, { node: node, type: BricksType.TYPE_4 })
      ),
      commands.registerCommand("lcpr.setBricksType5", (node: TreeNodeModel) =>
        BABA.sendNotification(BabaStr.BABACMD_setBricksType, { node: node, type: BricksType.TYPE_5 })
      ),
      commands.registerCommand("lcpr.setBricksType6", (node: TreeNodeModel) =>
        BABA.sendNotification(BabaStr.BABACMD_setBricksType, { node: node, type: BricksType.TYPE_6 })
      ),
      commands.registerCommand("lcpr.newBrickGroup", () => BABA.sendNotification(BabaStr.BABACMD_newBrickGroup)),
      commands.registerCommand("lcpr.addQidToGroup", (a) => BABA.sendNotification(BabaStr.BABACMD_addQidToGroup, a)),
      commands.registerCommand("lcpr.removeBrickGroup", (a) =>
        BABA.sendNotification(BabaStr.BABACMD_removeBrickGroup, a)
      ),
      commands.registerCommand("lcpr.removeBricksHave", (a) =>
        BABA.sendNotification(BabaStr.BABACMD_removeBricksHave, a)
      ),
      commands.registerCommand("lcpr.removeQidFromGroup", (node) =>
        BABA.sendNotification(BabaStr.BABACMD_removeQidFromGroup, node)
      ),

      commands.registerCommand("lcpr.remarkCreateNote", (reply: CommentReply) => {
        BABA.sendNotification(BabaStr.BABACMD_remarkCreateNote, reply);
      }),
      commands.registerCommand("lcpr.remarkClose", (a) => {
        BABA.sendNotification(BabaStr.BABACMD_remarkClose, a);
      }),
      commands.registerCommand("lcpr.remarkReplyNote", (reply: CommentReply) => {
        BABA.sendNotification(BabaStr.BABACMD_remarkReplyNote, reply);
      }),
      commands.registerCommand("lcpr.remarkDeleteNoteComment", (comment: RemarkComment) => {
        BABA.sendNotification(BabaStr.BABACMD_remarkDeleteNoteComment, comment);
      }),
      commands.registerCommand("lcpr.remarkCancelsaveNote", (comment: RemarkComment) => {
        BABA.sendNotification(BabaStr.BABACMD_remarkCancelsaveNote, comment);
      }),
      commands.registerCommand("lcpr.remarkSaveNote", (comment: RemarkComment) => {
        BABA.sendNotification(BabaStr.BABACMD_remarkSaveNote, comment);
      }),
      commands.registerCommand("lcpr.remarkEditNote", (comment: RemarkComment) => {
        BABA.sendNotification(BabaStr.BABACMD_remarkEditNote, comment);
      }),
      commands.registerCommand("lcpr.startRemark", (document: TextDocument) => {
        BABA.sendNotification(BabaStr.BABACMD_startRemark, document);
      }),
      commands.registerCommand("lcpr.includeTemplates", (document: TextDocument) => {
        BABA.sendNotification(BabaStr.BABACMD_includeTemplates, document);
      }),
      commands.registerCommand("lcpr.simpleDebug", (document: TextDocument, testCase?) =>
        BABA.sendNotification(BabaStr.BABACMD_simpleDebug, { document: document, testCase: testCase })
      ),
      commands.registerCommand("lcpr.addDebugType", (document: TextDocument, addType) =>
        BABA.sendNotification(BabaStr.BABACMD_addDebugType, { document: document, addType: addType })
      ),
      commands.registerCommand("lcpr.resetDebugType", (document: TextDocument, addType) =>
        BABA.sendNotification(BabaStr.BABACMD_resetDebugType, { document: document, addType: addType })
      )
    );

    await BABA.sendNotificationAsync(BabaStr.InitFile, context);
    await BABA.sendNotificationAsync(BabaStr.InitEnv, context);
    await BABA.sendNotificationAsync(BabaStr.InitLoginStatus);
    await BABA.sendNotificationAsync(BabaStr.StartReadData);
  } catch (error) {
    BABA.getProxy(BabaStr.LogOutputProxy).get_log().appendLine(error.toString());
    ShowMessage("Extension initialization failed. Please open output channel for details.", OutPutType.error);
  } finally {
    lcpr_timer_sec = setInterval(() => {
      new Promise(async (resolve, _) => {
        await BABA.sendNotificationAsync(BabaStr.every_second);
        resolve(1);
      });
    }, 1000);
    lcpr_timer_min = setInterval(() => {
      new Promise(async (resolve, _) => {
        await BABA.sendNotificationAsync(BabaStr.every_minute);
        resolve(1);
      });
    }, 60000);
  }
}

export function deactivate(): void {
  // Do nothing.
  if (lcpr_timer_sec != undefined) {
    clearInterval(lcpr_timer_sec);
    lcpr_timer_sec = undefined;
  }
  if (lcpr_timer_min != undefined) {
    clearInterval(lcpr_timer_min);
    lcpr_timer_min = undefined;
  }
}
