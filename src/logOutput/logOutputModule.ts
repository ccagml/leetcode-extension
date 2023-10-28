/*
 * Filename: https://github.com/ccagml/leetcode-extension/src/logOutput/logOutputModule.ts
 * Path: https://github.com/ccagml/leetcode-extension
 * Created Date: Saturday, October 14th 2023, 1:57:10 pm
 * Author: ccagml
 *
 * Copyright (c) 2023 ccagml . All rights reserved
 */

import * as vscode from "vscode";
import { BABAMediator, BABAProxy, BabaStr, BaseCC } from "../BABA";

class LogOutput implements vscode.Disposable {
  private readonly channel: vscode.OutputChannel = vscode.window.createOutputChannel("LeetCodeProblemRating");

  private LCPTCTX = {};
  public appendLine(message: string): void {
    this.channel.appendLine(message);
  }

  public append(message: string): void {
    this.channel.append(message);
  }

  public show(): void {
    this.channel.show();
  }

  public dispose(): void {
    this.channel.dispose();
  }

  public setLCPTCTX(k, v) {
    this.LCPTCTX[k] = v;
  }

  public getLCPTCTX(k) {
    return this.LCPTCTX[k];
  }

  public getLCPTCTXAll() {
    return this.LCPTCTX;
  }
}

export const logOutput: LogOutput = new LogOutput();

export class LogOutputProxy extends BABAProxy {
  static NAME = BabaStr.LogOutputProxy;
  constructor() {
    super(LogOutputProxy.NAME);
  }

  /**
   * get_log
   */
  public get_log() {
    return logOutput;
  }
}

export class LogOutputMediator extends BABAMediator {
  static NAME = BabaStr.LogOutputMediator;
  constructor() {
    super(LogOutputMediator.NAME);
  }

  listNotificationInterests(): string[] {
    return [BabaStr.VSCODE_DISPOST, BabaStr.InitFile];
  }
  async handleNotification(_notification: BaseCC.BaseCC.INotification) {
    switch (_notification.getName()) {
      case BabaStr.VSCODE_DISPOST:
        logOutput.dispose();
        break;
      case BabaStr.InitFile:
        let context = _notification.getBody();
        let cur_version: string = context.extension.packageJSON.version || "1.0.0";
        let cur_version_arr: Array<string> = cur_version.split(".");
        let cur_version_num = 0;
        cur_version_arr.forEach((e) => {
          cur_version_num *= 100;
          cur_version_num += Number(e);
        });
        logOutput.setLCPTCTX("version", cur_version_num);
        break;
      default:
        break;
    }
  }
}
