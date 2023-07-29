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
import { statusBarService } from "../service/StatusBarService";
import { treeDataService } from "../service/TreeDataService";
import { bricksDataService } from "./BricksDataService";
import { statusBarTimeService } from "./StatusBarTimeService";
import { submissionService } from "./SubmissionService";

class EventService extends EventEmitter {
  constructor() {
    super();
  }

  /**
   * 监听事件
   */
  public addEvent() {
    this.on("statusChanged", (userStatus: UserStatus, userName?: string) => {
      statusBarService.update_status(userStatus, userName);
      statusBarService.update();
      treeDataService.cleanUserScore();
      treeDataService.refresh();
      bricksDataService.refresh();
    });
    this.on("submit", (e: ISubmitEvent) => {
      treeDataService.checkSubmit(e);
      bricksDataService.checkSubmit(e);
      statusBarTimeService.checkSubmit(e);
    });

    this.on("searchUserContest", (tt) => {
      statusBarService.update_UserContestInfo(tt);
      statusBarService.update();
      treeDataService.refresh();
      bricksDataService.refresh();
    });

    this.on("explorerNodeMapSet", () => {
      bricksDataService.refresh();
    });

    this.on("showProblemFinish", (node: IProblem) => {
      statusBarTimeService.showProblemFinish(node);
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
