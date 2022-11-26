/*
 * Filename: https://github.com/ccagml/vscode-leetcode-problem-rating/src/service/StatusBarService.ts
 * Path: https://github.com/ccagml/vscode-leetcode-problem-rating
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { ConfigurationChangeEvent, Disposable, workspace, StatusBarItem, window } from "vscode";
import { UserStatus, userContestRanKingBase } from "../model/Model";
import { enableStatusBar } from "../utils/ConfigUtils";
import { eventService } from "./EventService";
import { executeService } from "./ExecuteService";

// 状态栏工具
class StatusBarService implements Disposable {
  private instance: StatusBarItem;
  private configurationChangeListener: Disposable;
  private userStatus: UserStatus;
  private currentUser: string | undefined;
  private currentUserContestInfo: userContestRanKingBase | undefined;

  // 获取竞赛分
  public getUserContestScore(): number {
    if (this.currentUserContestInfo && this.currentUserContestInfo.rating > 0) {
      return this.currentUserContestInfo.rating;
    }
    return 0;
  }

  public getUserContestInfo(): userContestRanKingBase | undefined {
    return this.currentUserContestInfo;
  }

  // 获取用户名
  public getUser(): string | undefined {
    return this.currentUser;
  }

  // 获取登录状态
  public getStatus(): UserStatus {
    return this.userStatus;
  }

  public async getLoginStatus(): Promise<void> {
    try {
      const result: string = await executeService.getUserInfo();
      this.currentUser = this.tryParseUserName(result);
      this.userStatus = UserStatus.SignedIn;
      if (this.currentUser == undefined) {
        this.userStatus = UserStatus.SignedOut;
      }
    } catch (error) {
      this.currentUser = undefined;
      this.userStatus = UserStatus.SignedOut;
    } finally {
      eventService.emit("statusChanged", this.userStatus, this.currentUser);
    }
  }
  private tryParseUserName(output: string): string | undefined {
    let successMatch;
    try {
      successMatch = JSON.parse(output);
    } catch (e) {
      successMatch = {};
    }
    if (successMatch.code == 100) {
      return successMatch.user_name;
    }
    return undefined;
  }

  constructor() {
    this.instance = window.createStatusBarItem(undefined, 999);
    this.setStatusBarVisibility();
    this.currentUser = undefined;
    this.userStatus = UserStatus.SignedOut;

    this.configurationChangeListener = workspace.onDidChangeConfiguration((event: ConfigurationChangeEvent) => {
      if (event.affectsConfiguration("leetcode-problem-rating.enableStatusBar")) {
        this.setStatusBarVisibility();
      }
    }, this);
  }

  // 更新状态栏的数据
  public update_instance(
    status: UserStatus,
    user?: string,
    UserContestInfo?: userContestRanKingBase | undefined
  ): void {
    switch (status) {
      case UserStatus.SignedIn:
        if (UserContestInfo && UserContestInfo.attendedContestsCount > 0) {
          this.instance.text = `用户: ${user}, 积分: ${Math.floor(UserContestInfo.rating)}, 名次: ${
            UserContestInfo.localRanking
          } / ${UserContestInfo.localTotalParticipants} (${UserContestInfo.topPercentage}%), 全部名次: ${
            UserContestInfo.globalRanking
          } / ${UserContestInfo.globalTotalParticipants}`;
        } else {
          this.instance.text = `user: ${user}`;
        }
        break;
      case UserStatus.SignedOut:
        this.currentUserContestInfo = undefined;
        this.instance.text = "";
        break;
      default:
        break;
    }
  }

  public update_status(status: UserStatus, user?: string) {
    this.userStatus = status;

    // 如果用户名不一样,清掉this.currentUserContestInfo = undefined;
    if (user != this.currentUser) {
      this.update_UserContestInfo(undefined);
    }
    this.currentUser = user;
  }
  public update_UserContestInfo(UserContestInfo?: userContestRanKingBase | undefined) {
    this.currentUserContestInfo = UserContestInfo;
  }

  // 更新数据
  public update(): void {
    this.update_instance(this.userStatus, this.currentUser, this.currentUserContestInfo);
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

export const statusBarService: StatusBarService = new StatusBarService();
