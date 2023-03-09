/*
 * Filename: https://github.com/ccagml/leetcode-extension/src/utils/OutputUtils.ts
 * Path: https://github.com/ccagml/leetcode-extension
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import * as vscode from "vscode";
import { DialogOptions, OutPutType } from "../model/Model";
import { getLeetCodeEndpoint, getVsCodeConfig } from "./ConfigUtils";

export async function openUrl(url: string): Promise<void> {
  vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(url));
}

export async function promptHintMessage(
  config: string,
  message: string,
  choiceConfirm: string,
  onConfirm: () => Promise<any>
): Promise<void> {
  if (getVsCodeConfig().get<boolean>(config)) {
    const choiceNoShowAgain: string = "Don't show again";
    const choice: string | undefined = await vscode.window.showInformationMessage(
      message,
      choiceConfirm,
      choiceNoShowAgain
    );
    if (choice === choiceConfirm) {
      await onConfirm();
    } else if (choice === choiceNoShowAgain) {
      await getVsCodeConfig().update(config, false, true /* UserSetting */);
    }
  }
}

export async function promptForSignIn(): Promise<void> {
  const choice: vscode.MessageItem | undefined = await vscode.window.showInformationMessage(
    "Please sign in to LeetCode.",
    DialogOptions.yes,
    DialogOptions.no,
    DialogOptions.singUp
  );
  switch (choice) {
    case DialogOptions.yes:
      await vscode.commands.executeCommand("lcpr.newlogin");
      break;
    case DialogOptions.singUp:
      if (getLeetCodeEndpoint()) {
        openUrl("https://leetcode.cn");
      } else {
        openUrl("https://leetcode.com");
      }
      break;
    default:
      break;
  }
}

export async function promptForOpenOutputChannel(message: string, type: OutPutType): Promise<void> {
  let result: vscode.MessageItem | undefined;
  switch (type) {
    case OutPutType.info:
      result = await vscode.window.showInformationMessage(message, DialogOptions.open, DialogOptions.no);
      break;
    case OutPutType.warning:
      result = await vscode.window.showWarningMessage(message, DialogOptions.open, DialogOptions.no);
      break;
    case OutPutType.error:
      result = await vscode.window.showErrorMessage(message, DialogOptions.open, DialogOptions.no);
      break;
    default:
      break;
  }

  if (result === DialogOptions.open) {
    logOutput.show();
  }
}

class LogOutput implements vscode.Disposable {
  private readonly channel: vscode.OutputChannel = vscode.window.createOutputChannel("LeetCodeProblemRating");

  private LCPRCTX = {};
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

  public setLCPRCTX(k, v) {
    this.LCPRCTX[k] = v;
  }

  public getLCPRCTX(k) {
    return this.LCPRCTX[k];
  }

  public getLCPRCTXAll() {
    return this.LCPRCTX;
  }
}

export const logOutput: LogOutput = new LogOutput();
