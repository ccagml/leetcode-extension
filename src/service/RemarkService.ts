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
} from "vscode";
import { treeViewController } from "../controller/TreeViewController";
import { RemarkComment } from "../model/Model";
import { getRemakeName } from "../utils/SystemUtils";

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

  public startRemark(document: TextDocument) {
    let docInfo = this.getQidByDocument(document);
    if (docInfo["qid"] == undefined) {
      return;
    }
    if (this._qid_map_thread.get(docInfo["qid"]) != undefined) {
      // 已经有了
      this._qid_map_thread.get(docInfo["qid"])?.dispose();
      this._qid_map_thread.delete(docInfo["qid"]);
    }
    for (let i: number = 0; i < document.lineCount; i++) {
      const lineContent: string = document.lineAt(i).text;
      if (lineContent.indexOf("@lc code=start") >= 0) {
        let newRemark = this._remarkComment.createCommentThread(document.uri, new Range(i - 1, 0, i - 1, 0), []);
        newRemark.contextValue = `qid:${docInfo["qid"]}`;
        newRemark.label = `${docInfo["fid"]}题`;
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
    let thread = comment.parent;
    if (!thread) {
      return;
    }

    thread.comments = thread.comments.filter((cmt) => (cmt as RemarkComment).id !== comment.id);

    // if (thread.comments.length === 0) {
    //   thread.dispose();
    // }
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
  }
  public remarkSaveNote(comment: RemarkComment) {
    if (!comment.parent) {
      return;
    }

    comment.parent.comments = comment.parent.comments.map((cmt) => {
      if ((cmt as RemarkComment).id === comment.id) {
        cmt.mode = CommentMode.Preview;
      }

      return cmt;
    });
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
  }

  public replyNote(reply: CommentReply) {
    let thread = reply.thread;
    let newComment = new RemarkComment(reply.text, CommentMode.Preview, { name: getRemakeName() }, thread, "canDelete");
    thread.comments = [...thread.comments, newComment];
  }

  public dispose(): void {}
}

export const remarkService: RemarkService = new RemarkService();
