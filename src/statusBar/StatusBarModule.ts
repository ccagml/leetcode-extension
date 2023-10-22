/*
 * Filename: https://github.com/ccagml/leetcode-extension/src/statusBar/StatusBarModule.ts
 * Path: https://github.com/ccagml/leetcode-extension
 * Created Date: Wednesday, September 27th 2023, 8:27:08 pm
 * Author: ccagml
 *
 * Copyright (c) 2023 ccagml . All rights reserved
 */

import { ConfigurationChangeEvent, Disposable, workspace, StatusBarItem, window } from "vscode";
import { UserStatus, userContestRanKingBase } from "../model/Model";
import { enableStatusBar } from "../utils/ConfigUtils";

import { BabaStr, BABAMediator, BABAProxy, BaseCC, BABA } from "../BABA";

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
      const result: string = await BABA.getProxy(BabaStr.ChildCallProxy).get_instance().getUserInfo();
      this.currentUser = this.tryParseUserName(result);
      this.userStatus = UserStatus.SignedIn;
      if (this.currentUser == undefined) {
        this.userStatus = UserStatus.SignedOut;
      }
    } catch (error) {
      this.currentUser = undefined;
      this.userStatus = UserStatus.SignedOut;
    } finally {
      if (this.userStatus == UserStatus.SignedOut) {
        BABA.sendNotification(BabaStr.USER_LOGIN_OUT, { userStatus: this.userStatus, userName: this.currentUser });
      } else {
        BABA.sendNotification(BabaStr.USER_LOGIN_SUC, { userStatus: this.userStatus, userName: this.currentUser });
      }
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
    BABA.sendNotification(BabaStr.statusBar_update_statusFinish);
  }
  public update_UserContestInfo(UserContestInfo?: userContestRanKingBase | undefined) {
    this.currentUserContestInfo = UserContestInfo;
    BABA.sendNotification(BabaStr.TreeData_searchUserContestFinish);
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

export class StatusBarProxy extends BABAProxy {
  static NAME = BabaStr.StatusBarProxy;
  constructor() {
    super(StatusBarProxy.NAME);
  }

  public getUser() {
    return statusBarService.getUser();
  }

  public getStatus() {
    return statusBarService.getStatus();
  }

  public getUserContestScore(): number {
    return statusBarService.getUserContestScore();
  }

  public async getLoginStatus(): Promise<void> {
    return await statusBarService.getLoginStatus();
  }
}

export class StatusBarMediator extends BABAMediator {
  static NAME = BabaStr.StatusBarMediator;
  constructor() {
    super(StatusBarMediator.NAME);
  }

  listNotificationInterests(): string[] {
    return [
      BabaStr.VSCODE_DISPOST,
      BabaStr.statusBar_update_status,
      BabaStr.statusBar_update_statusFinish,
      BabaStr.statusBar_update,
      BabaStr.statusBar_update_UserContestInfo,
      BabaStr.TreeData_searchUserContest,
      BabaStr.TreeData_searchUserContestFinish,
      BabaStr.USER_statusChanged,
      BabaStr.USER_LOGIN_SUC,
      BabaStr.USER_LOGIN_OUT,
      BabaStr.BeforeExtension_InitFinish,
    ];
  }
  async handleNotification(_notification: BaseCC.BaseCC.INotification) {
    let body = _notification.getBody();
    switch (_notification.getName()) {
      case BabaStr.VSCODE_DISPOST:
        statusBarService.dispose();
        break;
      case BabaStr.statusBar_update_status:

      case BabaStr.USER_LOGIN_SUC:
        statusBarService.update_status(UserStatus.SignedIn, body.userName);
        break;
      case BabaStr.USER_LOGIN_OUT:
        statusBarService.update_status(UserStatus.SignedOut, undefined);
        break;
      case BabaStr.statusBar_update:
      case BabaStr.statusBar_update_statusFinish:
        statusBarService.update();
        break;
      case BabaStr.TreeData_searchUserContest:
        statusBarService.update_UserContestInfo(_notification.getBody());
        break;
      case BabaStr.statusBar_update_UserContestInfo:
      case BabaStr.TreeData_searchUserContestFinish:
        statusBarService.update();
        break;
      case BabaStr.BeforeExtension_InitFinish:
        statusBarService.getLoginStatus();
      default:
        break;
    }
  }
}

export const statusBarService: StatusBarService = new StatusBarService();
