/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/statusbar/StatusBar.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { ConfigurationChangeEvent, Disposable, workspace, WorkspaceConfiguration } from "vscode";
import { UserStatus, userContestRanKingBase } from "../shared";
import { StatusBarItem } from "./StatusBarItem";
import { isStatusBar } from "../utils/configUtils";

// 状态栏工具
class StatusBar implements Disposable {
    private instance: StatusBarItem;
    private configurationChangeListener: Disposable;

    constructor() {
        this.instance = new StatusBarItem();
        this.setStatusBarVisibility();

        this.configurationChangeListener = workspace.onDidChangeConfiguration((event: ConfigurationChangeEvent) => {
            if (event.affectsConfiguration("leetcode-problem-rating.enableStatusBar")) {
                this.setStatusBarVisibility();
            }
        }, this);
    }

    // 更新数据
    public update(status: UserStatus, user?: string, UserContestInfo?: userContestRanKingBase | undefined): void {
        this.instance.update(status, user, UserContestInfo);
    }

    //销毁数据
    public dispose(): void {
        this.instance.dispose();
        this.configurationChangeListener.dispose();
    }

    // 设置可见性
    private setStatusBarVisibility(): void {
        if (isStatusBar()) {
            this.instance.show();
        } else {
            this.instance.hide();
        }
    }

}

export const statusBar: StatusBar = new StatusBar();
