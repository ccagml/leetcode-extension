/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/statusbar/StatusBarItem.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import * as vscode from "vscode";
import { UserStatus, userContestRanKingBase } from "../shared";

export class StatusBarItem implements vscode.Disposable {
    private readonly statusBarItem: vscode.StatusBarItem;

    constructor() {
        this.statusBarItem = vscode.window.createStatusBarItem();
    }

    public update(status: UserStatus, user?: string, UserContestInfo?: userContestRanKingBase | undefined): void {
        switch (status) {
            case UserStatus.SignedIn:
                if (UserContestInfo && UserContestInfo.attendedContestsCount > 0) {
                    this.statusBarItem.text = `用户: ${user}, 积分: ${Math.floor(UserContestInfo.rating)}, 名次: ${UserContestInfo.localRanking} / ${UserContestInfo.localTotalParticipants} (${UserContestInfo.topPercentage}%), 全部名次: ${UserContestInfo.globalRanking} / ${UserContestInfo.globalTotalParticipants}`;
                } else {
                    this.statusBarItem.text = `user: ${user}`;
                }
                break;
            case UserStatus.SignedOut:
            default:
                this.statusBarItem.text = "";
                break;
        }
    }

    public show(): void {
        this.statusBarItem.show();
    }

    public hide(): void {
        this.statusBarItem.hide();
    }

    public dispose(): void {
        this.statusBarItem.dispose();
    }
}
