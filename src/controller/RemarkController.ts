/*
 * https://github.com/ccagml/leetcode_ext/src/controller/RemarkController.ts
 * Path: https://github.com/ccagml/leetcode_ext
 * Created Date: Monday, November 28th 2022, 3:29:37 pm
 * Author: ccagml
 *
 * Copyright (c) 2022  ccagml . All rights reserved.
 */

import { CommentReply, Disposable, TextDocument } from "vscode";
import { RemarkComment } from "../model/Model";
import { remarkService } from "../service/RemarkService";

// 视图控制器
class RemarkController implements Disposable {
  public dispose(): void {}

  public remarkClose(a) {
    remarkService.remarkClose(a);
  }

  public remarkCreateNote(reply: CommentReply) {
    remarkService.remarkCreateNote(reply);
  }

  public remarkReplyNote(reply: CommentReply) {
    remarkService.remarkReplyNote(reply);
  }

  public remarkDeleteNoteComment(comment: RemarkComment) {
    remarkService.remarkDeleteNoteComment(comment);
  }
  public async startRemark(document: TextDocument) {
    await remarkService.startRemark(document);
  }
  public async includeTemplates(document: TextDocument) {
    await remarkService.includeTemplates(document);
  }

  public remarkCancelsaveNote(comment: RemarkComment) {
    remarkService.remarkCancelsaveNote(comment);
  }
  public remarkSaveNote(comment: RemarkComment) {
    remarkService.remarkSaveNote(comment);
  }
  public remarkEditNote(comment: RemarkComment) {
    remarkService.remarkEditNote(comment);
  }
}

export const remarkController: RemarkController = new RemarkController();
