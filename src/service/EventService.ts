/*
 * Filename: https://github.com/ccagml/leetcode-extension/src/service/EventService.ts
 * Path: https://github.com/ccagml/leetcode-extension
 * Created Date: Thursday, November 10th 2022, 3:14:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { EventEmitter } from "events";

import { IProblem, ITestSolutionData, UserStatus } from "../model/Model";
import { ISubmitEvent } from "../model/Model";
import { treeDataService } from "../service/TreeDataService";
import { bricksDataService } from "./BricksDataService";
import { submissionService } from "./SubmissionService";
import { BABA, BabaStr } from "./../BABA";

class EventService extends EventEmitter {
  constructor() {
    super();
  }

  /**
   * 监听事件
   */
  public addEvent() {
    this.on("statusChanged", (userStatus: UserStatus, userName?: string) => {
      BABA.sendNotification(BabaStr.statusBar_update_status, { userStatus: userStatus, userName: userName });
      BABA.sendNotification(BabaStr.statusBar_update);
      treeDataService.cleanUserScore();
      treeDataService.refresh();
      bricksDataService.refresh();
    });
    this.on("submit", (e: ISubmitEvent) => {
      treeDataService.checkSubmit(e);
      bricksDataService.checkSubmit(e);
      BABA.sendNotification(BabaStr.submit, e);
    });

    this.on("searchUserContest", (tt) => {
      BABA.sendNotification(BabaStr.statusBar_update_UserContestInfo, tt);
      BABA.sendNotification(BabaStr.statusBar_update);
      treeDataService.refresh();
      bricksDataService.refresh();
    });

    this.on("explorerNodeMapSet", () => {
      bricksDataService.refresh();
    });

    this.on("showProblemFinish", (node: IProblem) => {
      BABA.sendNotification(BabaStr.showProblemFinish, node);
    });

    this.on("groupUpdate", () => {
      bricksDataService.refresh();
    });

    this.on("testSolutionResult", (resultString: string, tsd: ITestSolutionData) => {
      submissionService.show(resultString, tsd);
    });
    this.on("submitSolutionResult", (resultString: string) => {
      submissionService.show(resultString);
    });
  }
}

export const eventService: EventService = new EventService();
