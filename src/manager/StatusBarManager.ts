/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/statusbar/StatusBar.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { ConfigurationChangeEvent, Disposable, workspace, StatusBarItem, window } from "vscode";
import { UserStatus, userContestRanKingBase } from "../shared";
import { enableStatusBar } from "../utils/configUtils";

// 状态栏工具
class StatusBarManager implements Disposable {
    private instance: StatusBarItem;
    private configurationChangeListener: Disposable;

    constructor() {
        this.instance = window.createStatusBarItem();
        this.setStatusBarVisibility();

        this.configurationChangeListener = workspace.onDidChangeConfiguration((event: ConfigurationChangeEvent) => {
            if (event.affectsConfiguration("leetcode-problem-rating.enableStatusBar")) {
                this.setStatusBarVisibility();
            }
        }, this);
    }

    // 更新状态栏的数据
    public update_instance(status: UserStatus, user?: string, UserContestInfo?: userContestRanKingBase | undefined): void {
        switch (status) {
            case UserStatus.SignedIn:
                if (UserContestInfo && UserContestInfo.attendedContestsCount > 0) {
                    this.instance.text = `用户: ${user}, 积分: ${Math.floor(UserContestInfo.rating)}, 名次: ${UserContestInfo.localRanking} / ${UserContestInfo.localTotalParticipants} (${UserContestInfo.topPercentage}%), 全部名次: ${UserContestInfo.globalRanking} / ${UserContestInfo.globalTotalParticipants}`;
                } else {
                    this.instance.text = `user: ${user}`;
                }
                break;
            case UserStatus.SignedOut:
            default:
                this.instance.text = "";
                break;
        }
    }


    // 更新数据
    public update(status: UserStatus, user?: string, UserContestInfo?: userContestRanKingBase | undefined): void {
        this.update_instance(status, user, UserContestInfo);
    }

    //销毁数据
    public dispose(): void {
        this.instance.dispose();
        this.configurationChangeListener.dispose();
    }

    // 设置可见性
    private setStatusBarVisibility(): void {
        if (enableStatusBar()) {
            this.instance.show();
        } else {
            this.instance.hide();
        }
    }

}

export const statusBarManager: StatusBarManager = new StatusBarManager();
