/*
 * Filename: /home/cc/leetcode-vscode/src/controller/DebugController.ts
 * Path: /home/cc/leetcode-vscode
 * Created Date: Wednesday, February 1st 2023, 11:11:23 am
 * Author: ccagml
 *
 * Copyright (c) 2023 ccagml . All rights reserved
 */

import { TextDocument, window, Range } from "vscode";
import { getTextEditorFilePathByUri } from "../utils/SystemUtils";
import * as fs from "fs";
import { fileMeta, ProblemMeta, supportDebugLanguages } from "../utils/problemUtils";

import { debugService } from "../service/DebugService";
import { debugArgDao } from "../dao/debugArgDao";

import { IQuickItemEx } from "../model/Model";

// 做杂活
class DebugContorller {
  constructor() {}
  public canDebug(meta: ProblemMeta | null, document: TextDocument) {
    if (
      meta == null ||
      supportDebugLanguages.indexOf(meta.lang) === -1 ||
      debugArgDao.getDebugArgData(meta.id, document) == undefined
    ) {
      return false;
    }
    return true;
  }

  public async startDebug(document: TextDocument, testcase?: string): Promise<void> {
    try {
      const filePath: string | undefined = await getTextEditorFilePathByUri(document.uri);
      if (!filePath) {
        return;
      }
      const fileContent: Buffer = fs.readFileSync(filePath);
      const meta: ProblemMeta | null = fileMeta(fileContent.toString());

      if (!this.canDebug(meta, document)) {
        window.showErrorMessage("这题还不能debug,请尝试配置区域调试参数,麻烦提issuse");
        return;
      }
      let result: any;

      if (testcase != undefined) {
        result = await debugService.execute(document, filePath, testcase.replace(/"/g, '\\"'), meta!.lang);
      } else {
        const ts: string | undefined = await window.showInputBox({
          prompt: "Enter the test cases.",
          validateInput: (s: string): string | undefined =>
            s && s.trim() ? undefined : "Test case must not be empty.",
          placeHolder: "Example: [1,2,3]\\n4",
          ignoreFocusOut: true,
        });
        if (ts) {
          result = await debugService.execute(document, filePath, ts.replace(/"/g, '\\"'), meta!.lang);
        }
      }

      if (!result) {
        return;
      }
    } catch (error) {
      //
    }
  }

  public async addDebugType(document: TextDocument, addType) {
    const picks: Array<IQuickItemEx<string>> = [
      { label: "number", detail: "类型说明:数字", value: "number" },
      { label: "number[]", detail: "类型说明:数字数组", value: "number[]" },
      { label: "number[][]", detail: "类型说明:数字二维数组", value: "number[][]" },
      { label: "string", detail: "类型说明:字符串", value: "string" },
      { label: "string[]", detail: "类型说明:字符串数组", value: "string[]" },
      { label: "string[][]", detail: "类型说明:字符串二维数组", value: "string[][]" },
      { label: "ListNode", detail: "类型说明:链表", value: "ListNode" },
      { label: "ListNode[]", detail: "类型说明:链表数组", value: "ListNode[]" },
      { label: "character", detail: "类型说明:字节", value: "character" },
      { label: "character[]", detail: "类型说明:字节数组", value: "character[]" },
      { label: "character[][]", detail: "类型说明:字节二维数组", value: "character[][]" },
      { label: "NestedInteger[]", detail: "类型说明:数组", value: "NestedInteger[]" },
      { label: "MountainArray", detail: "类型说明:数组", value: "MountainArray" },
      { label: "TreeNode", detail: "类型说明:树节点", value: "TreeNode" },
    ];

    const choice: IQuickItemEx<string> | undefined = await window.showQuickPick(picks, {
      title: "添加调试需要的参数",
      matchOnDescription: false,
      matchOnDetail: false,
      placeHolder: "选择要添加的分类",
      canPickMany: false,
    });
    if (!choice) {
      return;
    }

    const content: string = document.getText();
    const matchResult: RegExpMatchArray | null = content.match(/@lc app=.* id=(.*) lang=(.*)/);
    if (!matchResult || !matchResult[2]) {
      return undefined;
    }
    // 搜集所有debug
    let debugFlag: boolean = false;
    for (let i: number = 0; i < document.lineCount; i++) {
      const lineContent: string = document.lineAt(i).text;

      // 收集所有用例
      if (lineContent.indexOf("@lcpr-div-debug-arg-end") >= 0) {
        debugFlag = false;
      }

      if (debugFlag) {
        let equal_index = lineContent.indexOf("=");
        const last_index = document.lineAt(i).range.end.character;
        if (addType == "paramTypes" && lineContent.indexOf("paramTypes=") >= 0) {
          window.activeTextEditor?.edit((edit) => {
            // 参数是个数组;
            // edit.replace(new Position(i, equal_index + 1), choice.value);
            let cur_param_str = lineContent.substring(equal_index + 1);
            let cur_param_array: any = [];
            try {
              cur_param_array = JSON.parse(cur_param_str);
            } catch (error) {
              cur_param_array = [];
            }

            cur_param_array.push(choice.value);

            edit.replace(new Range(i, equal_index + 1, i, last_index), JSON.stringify(cur_param_array));
          });
        } else if (addType == "returnType" && lineContent.indexOf("returnType=") >= 0) {
          window.activeTextEditor?.edit((edit) => {
            edit.replace(new Range(i, equal_index + 1, i, last_index), choice.value);
          });
        }
      }

      // 收集所有用例
      if (lineContent.indexOf("@lcpr-div-debug-arg-start") >= 0) {
        debugFlag = true;
      }
    }
    return;
  }
  public async resetDebugType(document: TextDocument, addType) {
    const content: string = document.getText();
    const matchResult: RegExpMatchArray | null = content.match(/@lc app=.* id=(.*) lang=(.*)/);
    if (!matchResult || !matchResult[2]) {
      return undefined;
    }
    // 搜集所有debug
    let debugFlag: boolean = false;
    for (let i: number = 0; i < document.lineCount; i++) {
      const lineContent: string = document.lineAt(i).text;

      // 收集所有用例
      if (lineContent.indexOf("@lcpr-div-debug-arg-end") >= 0) {
        debugFlag = false;
      }

      if (debugFlag) {
        let equal_index = lineContent.indexOf("=");
        const last_index = document.lineAt(i).range.end.character;
        if (addType == "paramTypes" && lineContent.indexOf("paramTypes=") >= 0) {
          window.activeTextEditor?.edit((edit) => {
            let cur_param_array: any = [];
            edit.replace(new Range(i, equal_index + 1, i, last_index), JSON.stringify(cur_param_array));
          });
        } else if (addType == "returnType" && lineContent.indexOf("returnType=") >= 0) {
          window.activeTextEditor?.edit((edit) => {
            edit.replace(new Range(i, equal_index + 1, i, last_index), "");
          });
        }
      }

      // 收集所有用例
      if (lineContent.indexOf("@lcpr-div-debug-arg-start") >= 0) {
        debugFlag = true;
      }
    }
    return;
  }
}

export const debugContorller: DebugContorller = new DebugContorller();
