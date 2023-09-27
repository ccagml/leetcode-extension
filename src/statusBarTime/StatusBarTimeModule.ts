/*
 * Filename: /home/cc/leetcode-extension/src/statusBarTime/StatusBarTimeModule.ts
 * Path: /home/cc/leetcode-extension
 * Created Date: Wednesday, September 27th 2023, 8:26:28 pm
 * Author: ccagml
 *
 * Copyright (c) 2023 ccagml . All rights reserved
 */

import { Disposable, StatusBarItem, window, workspace, ConfigurationChangeEvent } from "vscode";
import { IProblem, ISubmitEvent, OutPutType } from "../model/Model";
import { promptForOpenOutputChannel } from "../utils/OutputUtils";
import { getDayNow } from "../utils/SystemUtils";
import { enableTimerBar } from "../utils/ConfigUtils";
import { BABAMediator, BABAProxy, BaseCC, BabaStr } from "../BABA";

// 状态栏工具
class StatusBarTimeService implements Disposable {
  private configurationChangeListener: Disposable;
  private showBar: StatusBarItem;
  private startBar: StatusBarItem;
  private stopBar: StatusBarItem;
  private resetBar: StatusBarItem;
  private startTime: number;
  private saveTime: number;
  private questionNode: IProblem;

  constructor() {
    this.showBar = window.createStatusBarItem(undefined, 1004);
    this.showBar.show();

    this.startBar = window.createStatusBarItem(undefined, 1003);
    this.startBar.name = "start";
    this.startBar.text = "start";
    this.startBar.tooltip = "开始计时";
    this.startBar.show();
    this.startBar.command = "lcpr.statusBarTime.start";

    this.stopBar = window.createStatusBarItem(undefined, 1002);
    this.stopBar.name = "stop";
    this.stopBar.text = "stop";
    this.stopBar.tooltip = "暂停计时";
    this.stopBar.show();
    this.stopBar.command = "lcpr.statusBarTime.stop";

    this.resetBar = window.createStatusBarItem(undefined, 1001);
    this.resetBar.name = "reset";
    this.resetBar.text = "reset";
    this.resetBar.tooltip = "重置计时";
    this.resetBar.show();
    this.resetBar.command = "lcpr.statusBarTime.reset";

    this.startTime = 0;
    this.saveTime = 0;

    this.configurationChangeListener = workspace.onDidChangeConfiguration((event: ConfigurationChangeEvent) => {
      if (event.affectsConfiguration("leetcode-problem-rating.enableTimerBar")) {
        this.setStatusBarVisibility();
      }
    }, this);
    this.setStatusBarVisibility();
  }

  public showProblemFinish(node) {
    if (enableTimerBar()) {
      this.questionNode = node;
      this.reset();
      this.start();
    }
  }

  private getDiffStr(diff: number) {
    if (diff < 1) {
      return "0:0:0";
    } else {
      let second = diff % 60;
      diff = Math.floor(diff / 60);
      let minute = diff % 60;
      diff = Math.floor(diff / 60);
      let hour = diff;
      return `${hour}:${minute}:${second}`;
    }
  }

  public getCostTimeStr() {
    if (enableTimerBar()) {
      if (this.startTime && this.startTime > 0) {
        let diff = getDayNow() - this.startTime + this.saveTime;
        return this.getDiffStr(diff);
      }
    }
    return;
  }

  public async checkSubmit(e: ISubmitEvent) {
    if (e.sub_type == "submit" && e.accepted) {
      let msg = this.getCostTimeStr();
      if (msg) {
        promptForOpenOutputChannel(`${e.fid}耗时${msg}`, OutPutType.info);
      }
      this.stop();
    }
  }

  public start() {
    this.startTime = getDayNow();
  }
  public stop() {
    if (this.startTime > 0) {
      this.saveTime += getDayNow() - this.startTime;
      this.startTime = 0;
    }
  }

  public reset() {
    this.startTime = 0;
    this.saveTime = 0;
  }

  // 更新状态栏的数据
  public update_instance(): void {
    if (this.startTime && this.startTime > 0) {
      let diff = getDayNow() - this.startTime + this.saveTime;
      let diffstr = this.getDiffStr(diff);
      let pre = "做题";
      if (this.questionNode?.id) {
        pre = `${this.questionNode?.id}题`;
      }
      this.showBar.text = `${pre}计时: ${diffstr}`;
    } else if (this.saveTime > 0) {
      let diff = this.saveTime;
      let diffstr = this.getDiffStr(diff);
      let pre = "做题";
      if (this.questionNode?.id) {
        pre = `${this.questionNode?.id}题`;
      }
      this.showBar.text = `${pre}计时: ${diffstr}`;
    } else {
      this.showBar.text = `做题计时: ${this.getDiffStr(0)}`;
    }
  }

  // 更新数据
  public updateSecond(): void {
    this.update_instance();
  }

  //销毁数据
  public dispose(): void {
    this.showBar.dispose();
    this.startBar.dispose();
    this.stopBar.dispose();
    this.resetBar.dispose();
    this.configurationChangeListener.dispose();
  }
  // 设置可见性
  private setStatusBarVisibility(): void {
    if (enableTimerBar()) {
      this.showBar.show();
      this.startBar.show();
      this.stopBar.show();
      this.resetBar.show();
    } else {
      this.showBar.hide();
      this.startBar.hide();
      this.stopBar.hide();
      this.resetBar.hide();
      this.reset();
    }
  }
}

export class StatusBarTimeProxy extends BABAProxy {
  static NAME = BabaStr.StatusBarTimeProxy;
  constructor() {
    super(StatusBarTimeProxy.NAME);
  }

  public getCostTimeStr() {
    return statusBarTimeService.getCostTimeStr();
  }
}

export class StatusBarTimeMediator extends BABAMediator {
  static NAME = BabaStr.StatusBarTimeMediator;
  constructor() {
    super(StatusBarTimeMediator.NAME);
  }

  listNotificationInterests(): string[] {
    return [
      BabaStr.every_second,
      BabaStr.submit,
      BabaStr.showProblemFinish,
      BabaStr.VSCODE_DISPOST,
      BabaStr.statusBarTime_start,
      BabaStr.statusBarTime_stop,
      BabaStr.statusBarTime_reset,
    ];
  }
  handleNotification(_notification: BaseCC.BaseCC.INotification) {
    switch (_notification.getName()) {
      case BabaStr.every_second:
        statusBarTimeService.updateSecond();
        break;
      case BabaStr.submit:
        statusBarTimeService.checkSubmit(_notification.getBody());
        break;
      case BabaStr.showProblemFinish:
        statusBarTimeService.showProblemFinish(_notification.getBody());
        break;
      case BabaStr.VSCODE_DISPOST:
        statusBarTimeService.dispose();
        break;
      case BabaStr.statusBarTime_start:
        statusBarTimeService.start();
        break;
      case BabaStr.statusBarTime_stop:
        statusBarTimeService.stop();
        break;
      case BabaStr.statusBarTime_reset:
        statusBarTimeService.reset();
        break;
      default:
        break;
    }
  }
}

export const statusBarTimeService: StatusBarTimeService = new StatusBarTimeService();
