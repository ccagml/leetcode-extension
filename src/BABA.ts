/*
 * Filename: https://github.com/ccagml/leetcode-extension/src/BABA.ts
 * Path: https://github.com/ccagml/leetcode-extension
 * Created Date: Saturday, September 23rd 2023, 8:17:16 pm
 * Author: ccagml
 *
 * Copyright (c) 2023 ccagml . All rights reserved
 */

import * as vscode from "vscode";

import { BaseCC } from "./utils/BaseCC";
export * as BaseCC from "./utils/BaseCC";
export enum BabaStr {
  every_second = "every_second",
  every_minute = "every_minute",
  StatusBarTimeMediator = "StatusBarTimeMediator",
  StatusBarTimeProxy = "StatusBarTimeProxy",
  RemarkMediator = "RemarkMediator",
  RemarkProxy = "RemarkProxy",
  submit = "submit",
  showProblemFinish = "showProblemFinish",
  showProblemFinishOpen = "showProblemFinishOpen",
  showProblemFinishError = "showProblemFinishError",
  VSCODE_DISPOST = "VSCODE_DISPOST",
  BABACMD_statusBarTime_start = "BABACMD_statusBarTime_start",
  BABACMD_statusBarTime_stop = "BABACMD_statusBarTime_stop",
  BABACMD_statusBarTime_reset = "BABACMD_statusBarTime_reset",
  StatusBarProxy = "StatusBarProxy",
  StatusBarMediator = "StatusBarMediator",
  statusBar_update_status = "statusBar_update_status",
  statusBar_update_statusFinish = "statusBar_update_statusFinish",
  statusBar_update = "statusBar_update",
  statusBar_update_UserContestInfo = "statusBar_update_UserContestInfo",
  InitFile = "InitFile",
  InitWorkspaceFolder = "InitWorkspaceFolder",
  LogOutputProxy = "LogOutputProxy",
  LogOutputMediator = "LogOutputMediator",
  BABACMD_remarkCreateNote = "BABACMD_remarkCreateNote",
  BABACMD_remarkClose = "BABACMD_remarkClose",
  BABACMD_remarkReplyNote = "BABACMD_remarkReplyNote",
  BABACMD_remarkDeleteNoteComment = "BABACMD_remarkDeleteNoteComment",
  BABACMD_remarkCancelsaveNote = "BABACMD_remarkCancelsaveNote",
  BABACMD_remarkSaveNote = "BABACMD_remarkSaveNote",
  BABACMD_remarkEditNote = "BABACMD_remarkEditNote",
  BABACMD_startRemark = "BABACMD_startRemark",
  BABACMD_includeTemplates = "BABACMD_includeTemplates",
  FileButtonProxy = "FileButtonProxy",
  FileButtonMediator = "FileButtonMediator",
  FileButton_ConfigChange = "FileButton_ConfigChange",
  QuestionDataProxy = "QuestionDataProxy",
  QuestionDataMediator = "QuestionDataMediator",
  TreeDataProxy = "TreeDataProxy",
  TreeDataMediator = "TreeDataMediator",
  BABACMD_refresh = "BABACMD_refresh",
  TreeData_cleanUserScore = "TreeData_cleanUserScore",
  TreeData_checkSubmit = "TreeData_checkSubmit",
  QuestionData_clearCache = "QuestionData_clearCache",
  QuestionData_ReBuildQuestionData = "QuestionData_ReBuildQuestionData",
  TreeData_switchEndpoint = "TreeData_switchEndpoint",
  BABACMD_previewProblem = "BABACMD_previewProblem",
  BABACMD_showProblem = "BABACMD_showProblem",
  BABACMD_pickOne = "BABACMD_pickOne",
  BABACMD_searchScoreRange = "BABACMD_searchScoreRange",
  BABACMD_searchProblem = "BABACMD_searchProblem",
  BABACMD_getHelp = "BABACMD_getHelp",
  BABACMD_testSolution = "BABACMD_testSolution",
  BABACMD_reTestSolution = "BABACMD_reTestSolution",
  BABACMD_testCaseDef = "BABACMD_testCaseDef",
  BABACMD_tesCaseArea = "BABACMD_tesCaseArea",
  BABACMD_submitSolution = "BABACMD_submitSolution",
  BABACMD_setDefaultLanguage = "BABACMD_setDefaultLanguage",
  BABACMD_addFavorite = "BABACMD_addFavorite",
  BABACMD_removeFavorite = "BABACMD_removeFavorite",
  BABACMD_problems_sort = "BABACMD_problems_sort",
  CommitResultProxy = "CommitResultProxy",
  CommitResultMediator = "CommitResultMediator",
  CommitResult_testSolutionResult = "CommitResult_testSolutionResult",
  CommitResult_submitSolutionResult = "CommitResult_submitSolutionResult",
  BricksDataProxy = "BricksDataProxy",
  BricksDataMediator = "BricksDataMediator",
  BricksData_refresh = "BricksData_refresh",
  SolutionProxy = "SolutionProxy",
  SolutionMediator = "SolutionMediator",
  PreviewProxy = "PreviewProxy",
  PreviewMediator = "PreviewMediator",
  Preview_show = "Preview_show",
  TreeData_rebuildTreeData = "TreeData_rebuildTreeData",
  QuestionData_ReBuildQuestionDataFinish = "QuestionData_ReBuildQuestionDataFinish",
  TreeData_searchTodayFinish = "TreeData_searchTodayFinish",
  TreeData_searchUserContest = "TreeData_searchUserContest",
  TreeData_searchUserContestFinish = "TreeData_searchUserContestFinish",
  TreeData_searchScoreRangeFinish = "TreeData_searchScoreRangeFinish",
  TreeData_searchContest = "TreeData_searchContest",
  CommitResult_showFinish = "CommitResult_showFinish",
  USER_statusChanged = "USER_statusChanged",
  ConfigChange_hideScore = "ConfigChange_hideScore",
  ConfigChange_SortStrategy = "ConfigChange_SortStrategy",
  TreeData_favoriteChange = "TreeData_favoriteChange",
  USER_LOGIN_SUC = "USER_LOGIN_SUC",
  USER_LOGIN_OUT = "USER_LOGIN_OUT",
  BABACMD_setBricksType = "BABACMD_setBricksType",
  BABACMD_newBrickGroup = "BABACMD_newBrickGroup",
  BABACMD_addQidToGroup = "BABACMD_addQidToGroup",
  BABACMD_removeBrickGroup = "BABACMD_removeBrickGroup",
  BABACMD_removeBricksHave = "BABACMD_removeBricksHave",
  BricksData_removeBricksHaveFinish = "BricksData_removeBricksHaveFinish",
  BABACMD_removeQidFromGroup = "BABACMD_removeQidFromGroup",
  DebugProxy = "DebugProxy",
  DebugMediator = "DebugMediator",
  BABACMD_simpleDebug = "BABACMD_simpleDebug",
  BABACMD_addDebugType = "BABACMD_addDebugType",
  BABACMD_resetDebugType = "BABACMD_resetDebugType",
  StartReadData = "StartReadData",
  Debug_checkCanDebugSuc = "Debug_checkCanDebugSuc",
  ChildCallProxy = "ChildCallProxy",
  ChildCallMediator = "ChildCallMediator",
  InitEnv = "InitEnv",
  DeleteCache = "DeleteCache",
  InitLoginStatus = "InitLoginStatus",
  BABACMD_Login = "BABACMD_Login",
  BABACMD_LoginOut = "BABACMD_LoginOut",
  BABACMD_deleteAllCache = "BABACMD_deleteAllCache",
  QuestionData_submitNewAccept = "QuestionData_submitNewAccept",
  RankScoreDataProxy = "RankScoreDataProxy",
  RankScoreDataMediator = "RankScoreDataMediator",
  BricksData_submitAndAccepted = "BricksData_submitAndAccepted",
  BricksData_setBricksTypeFinish = "BricksData_setBricksTypeFinish",
  BricksData_newBrickGroupFinish = "BricksData_newBrickGroupFinish",
  BricksData_removeBrickGroupFinish = "BricksData_removeBrickGroupFinish",
  BricksData_addQidToGroupFinish = "BricksData_addQidToGroupFinish",
  BricksData_removeQidFromGroupFinish = "BricksData_removeQidFromGroupFinish",
  TodayDataProxy = "TodayDataProxy",
  TodayDataMediator = "TodayDataMediator",
}

export class BABA {
  public static fa: BaseCC.Facade;
  public static init(clazz_list) {
    this.fa = BaseCC.Facade.getInstance("lcpr");
    let len = clazz_list.length;
    for (let j = 0; j < len; j++) {
      this[clazz_list[j].NAME] = new clazz_list[j]();
    }
  }

  public static dispose(): any {
    this.sendNotification(BabaStr.VSCODE_DISPOST);
  }
  public static sendNotification(name: string, body?: any, type?: string) {
    try {
      this.fa.sendNotification(name, body, type);
    } catch (error) {
      console.log(error);
      vscode.window.createOutputChannel("LeetCodeProblemRatingERR").append(`${error?.message}, ${error?.stack}`);
    }
  }

  public static async sendNotificationAsync(name: string, body?: any, type?: string) {
    try {
      await this.fa.sendNotificationAsync(name, body, type);
    } catch (error) {
      console.log(error);
      vscode.window.createOutputChannel("LeetCodeProblemRatingERR").append(`${error?.message}, ${error?.stack}`);
    }
  }

  public static getProxy(name: string) {
    return this.fa.retrieveProxy(name);
  }
}

export class BABAProxy extends BaseCC.Proxy {
  constructor(name: string) {
    super(name);
    BABA.fa.registerProxy(this);
  }
}
export class BABAMediator extends BaseCC.Mediator {
  constructor(name: string) {
    super(name);
    BABA.fa.registerMediator(this);
  }
}
