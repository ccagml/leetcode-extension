/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/service/EventService.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
 * Created Date: Thursday, November 10th 2022, 3:14:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */



import { EventEmitter } from "events";


import { UserStatus } from "../model/Model";
import { ISubmitEvent } from "../model/Model";
import { statusBarService } from "../service/StatusBarService";
import { treeDataService } from "../service/TreeDataService";

class EventService extends EventEmitter {

    constructor() {
        super();
    }

    /**
     * 监听事件
     */
    public add_event() {
        this.on("statusChanged", (userStatus: UserStatus, userName?: string) => {
            statusBarService.update_status(userStatus, userName);
            statusBarService.update();
            treeDataService.cleanUserScore();
            treeDataService.refresh();
        });
        this.on("submit", (e: ISubmitEvent) => {
            treeDataService.checkSubmit(e);
        });

        this.on("searchUserContest", (tt) => {
            statusBarService.update_UserContestInfo(tt)
            statusBarService.update();
            treeDataService.refresh()
        });
    }
}

export const eventService: EventService = new EventService();

