/*
 * Filename: https://github.com/ccagml/leetcode-extension/src/service/EventService.ts
 * Path: https://github.com/ccagml/leetcode-extension
 * Created Date: Thursday, November 10th 2022, 3:14:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { EventEmitter } from "events";

import { UserStatus } from "../model/Model";
import { ISubmitEvent } from "../model/Model";
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
      BABA.sendNotification(BabaStr.TreeData_cleanUserScore);
      BABA.sendNotification(BabaStr.TreeData_refresh);
      BABA.sendNotification(BabaStr.BricksData_refresh);
    });
    this.on("submit", (e: ISubmitEvent) => {
      BABA.sendNotification(BabaStr.TreeData_checkSubmit, e);
      BABA.getProxy(BabaStr.BricksDataProxy).checkSubmit(e);
      BABA.sendNotification(BabaStr.submit, e);
    });

    this.on("searchUserContest", (tt) => {
      BABA.sendNotification(BabaStr.statusBar_update_UserContestInfo, tt);
      BABA.sendNotification(BabaStr.statusBar_update);
      BABA.sendNotification(BabaStr.TreeData_refresh);
      BABA.sendNotification(BabaStr.BricksData_refresh);
    });
  }
}

export const eventService: EventService = new EventService();
