/*
 * Filename: /home/cc/leetcode-vscode/src/controller/DebugController.ts
 * Path: /home/cc/leetcode-vscode
 * Created Date: Wednesday, February 1st 2023, 11:11:23 am
 * Author: ccagml
 *
 * Copyright (c) 2023 ccagml . All rights reserved
 */

import { TextDocument, window, Range, Position, workspace } from "vscode";
import { getTextEditorFilePathByUri } from "../utils/SystemUtils";
import * as fs from "fs";
import { fileMeta, ProblemMeta, supportDebugLanguages } from "../utils/problemUtils";

import { debugService } from "../service/DebugService";
import { debugArgDao } from "../dao/debugArgDao";

import { IQuickItemEx } from "../model/Model";

const singleLineFlag = {
  bash: "#",
  c: "//",
  cpp: "//",
  csharp: "//",
  golang: "//",
  java: "//",
  javascript: "//",
  kotlin: "//",
  mysql: "--",
  php: "//",
  python: "#",
  python3: "#",
  ruby: "#",
  rust: "//",
  scala: "//",
  swift: "//",
  typescript: "//",
};

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

  public async check_create_debug_area(meta: ProblemMeta | null, document: TextDocument) {
    if (supportDebugLanguages.indexOf(meta?.lang || "") != -1) {
      // 分析uri代码块
      if (document != null) {
        const fileContent: string = document.getText();
        const debug_div_arg: RegExp = /@lcpr-div-debug-arg-start/;
        if (!debug_div_arg.test(fileContent.toString())) {
          // 弹一个生成配置区的选项
          await this.create_diy_debug_arg(meta, document);
        }
      }
    }
  }

  public try_get_array_type(obj) {
    if (Array.isArray(obj)) {
      if (Array.isArray(obj[0])) {
        if (typeof obj[0][0] == "number") {
          return "number[][]";
        } else if (typeof obj[0][0] == "string") {
          return "string[][]";
        }
      } else if (typeof obj[0] == "number") {
        return "number[]";
      } else if (typeof obj[0] == "string") {
        return "string[]";
      }
    }
    return "try_arg_error";
  }

  // 尝试获取diy的参数
  public try_get_diy_param(ts: string) {
    let debug_param: Array<any> = [];

    ts = (ts || "").replace(/\r?\n/g, "\\n");
    ts += "\\n";

    let case_array: Array<string> = ts.split("\\n");

    case_array.forEach((element) => {
      if (element.length > 0) {
        try {
          let cur_param = JSON.parse(element);
          if (typeof cur_param == "number") {
            debug_param.push("number");
          } else if (Array.isArray(cur_param)) {
            debug_param.push(this.try_get_array_type(cur_param));
          } else if (typeof cur_param == "string") {
            debug_param.push(element.length == 1 ? "character" : "string");
          } else {
            debug_param = [];
            return;
          }
        } catch (error) {
          // 这里是字符串
          debug_param.push(element.length == 1 ? "character" : "string");
        }
      }
    });

    // console.log("结果", debug_param);
    return debug_param;
  }

  // 去除测试用例前的注释符号, 测试用例 可能有某些语言的注释符号, 例如 844题的#
  public fix_lineContent(lineContent) {
    let cut_pos = 0;
    for (let left = 0; left < lineContent.length; left++) {
      if (lineContent[left] == "#") {
        continue;
      }
      if (lineContent[left] == "/" && lineContent[left + 1] == "/") {
        left++;
        continue;
      }
      if (lineContent[left] == "-" && lineContent[left + 1] == "-") {
        left++;
        continue;
      }
      if (lineContent[left] == " ") {
        continue;
      }
      cut_pos = left;
      break;
    }
    return lineContent.substring(cut_pos);
  }

  public get_one_case(document: TextDocument) {
    let caseFlag = false;
    let curCase = "";
    for (let i: number = 0; i < document.lineCount; i++) {
      const lineContent: string = document.lineAt(i).text;

      if (caseFlag && lineContent.indexOf("@lcpr case=end") < 0) {
        curCase += this.fix_lineContent(lineContent).replace(/\s+/g, "");
      }
      // 收集所有用例
      if (lineContent.indexOf("@lcpr case=start") >= 0) {
        caseFlag = true;
      }

      if (caseFlag && lineContent.indexOf("@lcpr case=end") >= 0) {
        return curCase;
      }
    }
    return curCase;
  }

  public async create_diy_debug_arg(meta: ProblemMeta | null, document: TextDocument) {
    const name: string | undefined = await window.showInputBox({
      prompt: "输入函数名",
      title: "尝试生成区域调试参数",
      ignoreFocusOut: true,
    });

    if (!(name && name.trim())) {
      return;
    }

    let singleLine = singleLineFlag[meta?.lang || ""];
    let div_debug_arg: any = [
      `\n`,
      `${singleLine} @lcpr-div-debug-arg-start`,
      `${singleLine} funName=${name}`,
      `${singleLine} paramTypes= ${JSON.stringify(this.try_get_diy_param(this.get_one_case(document)))}`,
      `${singleLine} @lcpr-div-debug-arg-end`,
      `\n`,
    ];

    for (let i: number = 0; i < document.lineCount; i++) {
      const lineContent: string = document.lineAt(i).text;

      if (lineContent.indexOf("@lc code=end") >= 0) {
        const editor = window.activeTextEditor;
        await editor
          ?.edit((edit) => {
            edit.insert(new Position(i + 1, i + 1), div_debug_arg.join("\n"));
          })
          .then(() => {
            editor.document.save();
          });
      }
    }
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
        // 判断生成测试区块
        await this.check_create_debug_area(meta, document);

        try {
          document = await workspace.openTextDocument(document.uri);
        } catch (error) {
          return;
        }

        if (!this.canDebug(meta, document)) {
          return;
        }
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
    const matchResult: RegExpMatchArray | null = content.match(
      /@lc app=(.*) id=(.*|\w*|\W*|[\\u4e00-\\u9fa5]*) lang=(.*)/
    );
    if (!matchResult || !matchResult[3]) {
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
        }
        //  else if (addType == "returnType" && lineContent.indexOf("returnType=") >= 0) {
        //   window.activeTextEditor?.edit((edit) => {
        //     edit.replace(new Range(i, equal_index + 1, i, last_index), choice.value);
        //   });
        // }
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
    const matchResult: RegExpMatchArray | null = content.match(
      /@lc app=(.*) id=(.*|\w*|\W*|[\\u4e00-\\u9fa5]*) lang=(.*)/
    );
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
        }
        //  else if (addType == "returnType" && lineContent.indexOf("returnType=") >= 0) {
        //   window.activeTextEditor?.edit((edit) => {
        //     edit.replace(new Range(i, equal_index + 1, i, last_index), "");
        //   });
        // }
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
