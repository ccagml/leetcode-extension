/*
 * Filename: https://github.com/ccagml/leetcode_vsc/src/service/EventService.ts
 * Path: https://github.com/ccagml/leetcode_vsc
 * Created Date: Thursday, November 10th 2022, 3:14:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { EventEmitter } from "events";

import { IProblem, UserStatus } from "../model/Model";
import { ISubmitEvent } from "../model/Model";
import { statusBarService } from "../service/StatusBarService";
import { treeDataService } from "../service/TreeDataService";
import { bricksDataService } from "./BricksDataService";
import { statusBarTimeService } from "./StatusBarTimeService";

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
  }
}

export const eventService: EventService = new EventService();
