import {
  CommentMode,
  CommentThread,
  CommentReply,
  CommentThreadCollapsibleState,
  TextDocument,
  CancellationToken,
  comments,
  Range,
  Disposable,
  window,
  Position,
} from "vscode";
import { treeViewController } from "../controller/TreeViewController";
import { remarkDao } from "../dao/remarkDao";
import { RemarkComment } from "../model/Model";
import { getIncludeTemplate } from "../utils/ConfigUtils";

class RemarkService implements Disposable {
  private _remarkComment;
  private _qid_map_thread: Map<string, CommentThread>;

  getQidByDocument(document: TextDocument) {
    const content: string = document.getText();
    const matchResult: RegExpMatchArray | null = content.match(/@lc app=.* id=(.*) lang=.*/);
    let result: Map<string, string> = new Map<string, string>();
    if (!matchResult) {
      return result;
    }
    const fid: string | undefined = matchResult[1];
    let qid: string | undefined = treeViewController.getQidByFid(fid);
    result["fid"] = fid;
    if (qid != undefined) {
      result["qid"] = qid.toString();
    }
    return result;
  }

  constructor() {
    this._qid_map_thread = new Map<string, CommentThread>();
    this._remarkComment = comments.createCommentController("comment-sample", "Comment API Sample");
    this._remarkComment.options = { prompt: "新的记录", placeHolder: "开始记录内容" };
    this._remarkComment.commentingRangeProvider = {
      provideCommentingRanges: (_: TextDocument, __: CancellationToken) => {
        return undefined;
      },
    };
  }

  public async includeTemplates(document: TextDocument) {
    const content: string = document.getText();
    const matchResult: RegExpMatchArray | null = content.match(/@lc app=.* id=(.*) lang=(.*)/);
    if (!matchResult || !matchResult[2]) {
      return undefined;
    }
    for (let i: number = 0; i < document.lineCount; i++) {
      const lineContent: string = document.lineAt(i).text;

      if (lineContent.indexOf("@lc code=start") >= 0) {
        const editor = window.activeTextEditor;
        editor?.edit((edit) => {
          edit.insert(new Position(i - 1, i - 1), getIncludeTemplate(matchResult[2]));
        });
      }
    }
    return undefined;
  }

  public async startRemark(document: TextDocument) {
    let docInfo = this.getQidByDocument(document);
    if (docInfo["qid"] == undefined) {
      return;
    }
    if (this._qid_map_thread.get(docInfo["qid"]) != undefined) {
      // 已经有了
      this._qid_map_thread.get(docInfo["qid"])?.dispose();
      this._qid_map_thread.delete(docInfo["qid"]);
    }
    let oldRemark = await this.getOldThreadRemarkByQid(docInfo["qid"]);
    for (let i: number = 0; i < document.lineCount; i++) {
      const lineContent: string = document.lineAt(i).text;
      if (lineContent.indexOf("@lc code=start") >= 0) {
        let newRemark = this._remarkComment.createCommentThread(document.uri, new Range(i - 1, 0, i - 1, 0), oldRemark);
        newRemark.comments.forEach((element) => {
          element.parent = newRemark;
        });

        newRemark.contextValue = `qid=${docInfo["qid"]}`;
        newRemark.label = `${docInfo["fid"]}`;
        newRemark.collapsibleState = CommentThreadCollapsibleState.Expanded;
        this._qid_map_thread.set(docInfo["qid"], newRemark);
        break;
      }
    }
  }

  public remarkCreateNote(reply: CommentReply) {
    this.replyNote(reply);
  }

  public remarkReplyNote(reply: CommentReply) {
    this.replyNote(reply);
  }

  public remarkDeleteNoteComment(comment: RemarkComment) {
    if (!comment.parent) {
      return;
    }

    comment.parent.comments = comment.parent.comments.filter((cmt) => (cmt as RemarkComment).id !== comment.id);
    this.saveThreadRemark(comment.parent);
  }

  public remarkCancelsaveNote(comment: RemarkComment) {
    if (!comment.parent) {
      return;
    }

    comment.parent.comments = comment.parent.comments.map((cmt) => {
      if ((cmt as RemarkComment).id === comment.id) {
        cmt.mode = CommentMode.Preview;
      }

      return cmt;
    });
    this.saveThreadRemark(comment.parent);
  }
  public remarkSaveNote(comment: RemarkComment) {
    this.remarkCancelsaveNote(comment);
  }
  public remarkEditNote(comment: RemarkComment) {
    if (!comment.parent) {
      return;
    }

    comment.parent.comments = comment.parent.comments.map((cmt) => {
      if ((cmt as RemarkComment).id === comment.id) {
        cmt.mode = CommentMode.Editing;
      }

      return cmt;
    });

    this.saveThreadRemark(comment.parent);
  }

  public replyNote(reply: CommentReply) {
    let thread = reply.thread;
    let newComment = new RemarkComment(reply.text, thread);
    thread.comments = [...thread.comments, newComment];
    this.saveThreadRemark(thread);
  }

  public saveThreadRemark(thread) {
    const params: URLSearchParams = new URLSearchParams(thread.contextValue);
    let qid = params.get("qid");
    if (!qid) {
      return;
    }
    let data: Array<any> = [];
    thread.comments.forEach((element) => {
      data.push(element.getDbData());
    });
    let remarkData = {};
    remarkData["data"] = data;
    remarkDao.setInfoByQid(qid, remarkData);
  }
  public async getOldThreadRemarkByQid(qid: string, thread?) {
    let remarkData = await remarkDao.getInfoByQid(qid);
    let remarkDataBody = remarkData["data"] || [];
    let OldRemark: Array<any> = [];
    remarkDataBody.forEach((element) => {
      OldRemark.push(RemarkComment.getObjByDbData(element, thread));
    });
    return OldRemark;
  }

  public remarkClose(thread) {
    const params: URLSearchParams = new URLSearchParams(thread.contextValue);
    let qid = params.get("qid");
    if (!qid) {
      return;
    }

    this._qid_map_thread.get(qid)?.dispose();
  }

  public dispose(): void {}
}

export const remarkService: RemarkService = new RemarkService();
