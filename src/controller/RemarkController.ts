/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/controller/RemarkController.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
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

  public remarkAdd(a, b, c, d) {
    console.log(a);
    console.log(b);
    console.log(c);
    console.log(d);
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
  public startRemark(document: TextDocument) {
    remarkService.startRemark(document);
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
