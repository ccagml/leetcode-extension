/*
 * Filename: https://github.com/ccagml/leetcode-extension/src/BABA.ts
 * Path: https://github.com/ccagml/leetcode-extension
 * Created Date: Saturday, September 23rd 2023, 8:17:16 pm
 * Author: ccagml
 *
 * Copyright (c) 2023 ccagml . All rights reserved
 */

import { BaseCC } from "./utils/BaseCC";
export * as BaseCC from "./utils/BaseCC";
export enum BabaStr {
  every_second = "every_second",
  StatusBarTimeMediator = "StatusBarTimeMediator",
  StatusBarTimeProxy = "StatusBarTimeProxy",
  RemarkMediator = "RemarkMediator",
  RemarkProxy = "RemarkProxy",
  submit = "submit",
  showProblemFinish = "showProblemFinish",
  showProblemFinishOpen = "showProblemFinishOpen",
  showProblemFinishError = "showProblemFinishError",
  VSCODE_DISPOST = "VSCODE_DISPOST",
  statusBarTime_start = "statusBarTime_start",
  statusBarTime_stop = "statusBarTime_stop",
  statusBarTime_reset = "statusBarTime_reset",
  StatusBarProxy = "StatusBarProxy",
  StatusBarMediator = "StatusBarMediator",
  statusBar_update_status = "statusBar_update_status",
  statusBar_update_statusFinish = "statusBar_update_statusFinish",
  statusBar_update = "statusBar_update",
  statusBar_update_UserContestInfo = "statusBar_update_UserContestInfo",
  InitAll = "InitAll",
  LogOutputProxy = "LogOutputProxy",
  LogOutputMediator = "LogOutputMediator",
  Remark_remarkCreateNote = "Remark_remarkCreateNote",
  Remark_remarkClose = "Remark_remarkClose",
  Remark_remarkReplyNote = "Remark_remarkReplyNote",
  Remark_remarkDeleteNoteComment = "Remark_remarkDeleteNoteComment",
  Remark_remarkCancelsaveNote = "Remark_remarkCancelsaveNote",
  Remark_remarkSaveNote = "Remark_remarkSaveNote",
  Remark_remarkEditNote = "Remark_remarkEditNote",
  Remark_startRemark = "Remark_startRemark",
  Remark_includeTemplates = "Remark_includeTemplates",
  FileButtonProxy = "FileButtonProxy",
  FileButtonMediator = "FileButtonMediator",
  FileButton_refresh = "FileButton_refresh",
  QuestionDataProxy = "QuestionDataProxy",
  QuestionDataMediator = "QuestionDataMediator",
  TreeDataProxy = "TreeDataProxy",
  TreeDataMediator = "TreeDataMediator",
  TreeData_refresh = "TreeData_refresh",
  TreeData_cleanUserScore = "TreeData_cleanUserScore",
  TreeData_checkSubmit = "TreeData_checkSubmit",
  QuestionData_clearCache = "QuestionData_clearCache",
  QuestionData_refreshCache = "QuestionData_refreshCache",
  TreeData_switchEndpoint = "TreeData_switchEndpoint",
  TreeData_previewProblem = "TreeData_previewProblem",
  TreeData_showProblem = "TreeData_showProblem",
  TreeData_pickOne = "TreeData_pickOne",
  TreeData_searchScoreRange = "TreeData_searchScoreRange",
  TreeData_searchProblem = "TreeData_searchProblem",
  TreeData_getHelp = "TreeData_getHelp",
  TreeData_testSolution = "TreeData_testSolution",
  TreeData_reTestSolution = "TreeData_reTestSolution",
  TreeData_testCaseDef = "TreeData_testCaseDef",
  TreeData_tesCaseArea = "TreeData_tesCaseArea",
  TreeData_submitSolution = "TreeData_submitSolution",
  TreeData_setDefaultLanguage = "TreeData_setDefaultLanguage",
  TreeData_addFavorite = "TreeData_addFavorite",
  TreeData_removeFavorite = "TreeData_removeFavorite",
  TreeData_problems_sort = "TreeData_problems_sort",
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
  QuestionData_refreshCacheFinish = "QuestionData_refreshCacheFinish",
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
}

export class BABA {
  public static fa;
  public static init() {
    this.fa = BaseCC.Facade.getInstance("lcpr");
  }
  public static regClazz(clazz_list) {
    let len = clazz_list.length;
    for (let j = 0; j < len; j++) {
      this[clazz_list[j].NAME] = new clazz_list[j]();
    }
  }

  public static dispose(): any {
    this.sendNotification(BabaStr.VSCODE_DISPOST);
  }
  public static sendNotification(name: string, body?: any, type?: string) {
    this.fa.sendNotification(name, body, type);
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
