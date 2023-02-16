/*
 * Filename: https://github.com/ccagml/leetcode_vsc/src/service/FileButtonService.ts
 * Path: https://github.com/ccagml/leetcode_vsc
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import * as vscode from "vscode";
import { treeViewController } from "../controller/TreeViewController";
import { NodeModel } from "../model/NodeModel";
import { getEditorShortcuts } from "../utils/ConfigUtils";
import { supportDebugLanguages } from "../utils/problemUtils";

export class FileButtonService implements vscode.CodeLensProvider {
  private onDidChangeCodeLensesEmitter: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();

  get onDidChangeCodeLenses(): vscode.Event<void> {
    return this.onDidChangeCodeLensesEmitter.event;
  }

  public refresh(): void {
    this.onDidChangeCodeLensesEmitter.fire();
  }

  // 处理代码的按钮
  private processCodeButton(codeLensLine, document, node, nodeLang): vscode.CodeLens[] {
    const temp_result: vscode.CodeLens[] = [];
    const shortcuts: string[] = getEditorShortcuts();
    if (!shortcuts) {
      return temp_result;
    }

    const range: vscode.Range = new vscode.Range(codeLensLine, 0, codeLensLine, 0);

    if (shortcuts.indexOf("submit") >= 0) {
      temp_result.push(
        new vscode.CodeLens(range, {
          title: "Submit",
          command: "lcpr.submitSolution",
          arguments: [document.uri],
        })
      );
    }

    if (shortcuts.indexOf("case") >= 0) {
      temp_result.push(
        new vscode.CodeLens(range, {
          title: "case",
          command: "lcpr.testCaseDef",
          arguments: [document.uri, false],
        })
      );
    }
    if (shortcuts.indexOf("allcase") >= 0) {
      temp_result.push(
        new vscode.CodeLens(range, {
          title: "allcase",
          command: "lcpr.testCaseDef",
          arguments: [document.uri, true],
        })
      );
    }

    if (shortcuts.indexOf("test") >= 0) {
      temp_result.push(
        new vscode.CodeLens(range, {
          title: "Test",
          command: "lcpr.testSolution",
          arguments: [document.uri],
        })
      );
    }

    if (shortcuts.indexOf("star") >= 0 && node) {
      temp_result.push(
        new vscode.CodeLens(range, {
          title: node.isFavorite ? "Unstar" : "Star",
          command: node.isFavorite ? "lcpr.removeFavorite" : "lcpr.addFavorite",
          arguments: [node],
        })
      );
    }

    if (shortcuts.indexOf("solution") >= 0) {
      temp_result.push(
        new vscode.CodeLens(range, {
          title: "Solution",
          command: "lcpr.getHelp",
          arguments: [document.uri],
        })
      );
    }

    if (shortcuts.indexOf("description") >= 0) {
      temp_result.push(
        new vscode.CodeLens(range, {
          title: "Description",
          command: "lcpr.previewProblem",
          arguments: [document.uri],
        })
      );
    }

    if (supportDebugLanguages.indexOf(nodeLang) != -1) {
      temp_result.push(
        new vscode.CodeLens(range, {
          title: "debug",
          command: "lcpr.simpleDebug",
          arguments: [document],
        })
      );
    }

    return temp_result;
  }

  /**
   * createCase
   */
  public createCase(codeLensLine, document, testCase, nodeLang): vscode.CodeLens[] {
    const range: vscode.Range = new vscode.Range(codeLensLine, 0, codeLensLine, 0);

    const temp_result: vscode.CodeLens[] = [];

    temp_result.push(
      new vscode.CodeLens(range, {
        title: "case",
        command: "lcpr.tesCaseArea",
        arguments: [document.uri, testCase],
      })
    );

    if (supportDebugLanguages.indexOf(nodeLang) != -1) {
      temp_result.push(
        new vscode.CodeLens(range, {
          title: "debug",
          command: "lcpr.simpleDebug",
          arguments: [document, testCase],
        })
      );
    }

    return temp_result;
  }

  public singleLineFlag = {
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

  public processRemarkButton(codeLensLine, document): vscode.CodeLens[] {
    const temp_result: vscode.CodeLens[] = [];

    const range: vscode.Range = new vscode.Range(codeLensLine, 0, codeLensLine, 0);

    temp_result.push(
      new vscode.CodeLens(range, {
        title: "remark",
        command: "lcpr.startRemark",
        arguments: [document],
      }),
      new vscode.CodeLens(range, {
        title: "includeTemplates",
        command: "lcpr.includeTemplates",
        arguments: [document],
      })
    );
    return temp_result;
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

  public createDebugButton(codeLensLine, document, lineContent): vscode.CodeLens[] {
    // const last_index = document.lineAt(codeLensLine).range.end.character;

    const range: vscode.Range = new vscode.Range(codeLensLine + 1, 0, codeLensLine + 1, 0);
    const temp_result: vscode.CodeLens[] = [];

    // paramTypes= []
    // returnType=

    if (lineContent.indexOf("paramTypes=") >= 0) {
      temp_result.push(
        new vscode.CodeLens(range, {
          title: "addParam",
          command: "lcpr.addDebugType",
          arguments: [document, "paramTypes"],
        })
      );
      temp_result.push(
        new vscode.CodeLens(range, {
          title: "resetParam",
          command: "lcpr.resetDebugType",
          arguments: [document, "paramTypes"],
        })
      );
    }

    if (lineContent.indexOf("returnType=") >= 0) {
      temp_result.push(
        new vscode.CodeLens(range, {
          title: "addReturn",
          command: "lcpr.addDebugType",
          arguments: [document, "returnType"],
        })
      );
      temp_result.push(
        new vscode.CodeLens(range, {
          title: "resetReturn",
          command: "lcpr.resetDebugType",
          arguments: [document, "returnType"],
        })
      );
    }
    return temp_result;
  }

  public provideCodeLenses(document: vscode.TextDocument): vscode.ProviderResult<vscode.CodeLens[]> {
    const content: string = document.getText();
    const matchResult: RegExpMatchArray | null = content.match(/@lc app=.* id=(.*) lang=(.*)/);
    if (!matchResult) {
      return undefined;
    }
    const nodeId: string | undefined = matchResult[1];
    let node: NodeModel | undefined;
    if (nodeId) {
      node = treeViewController.getNodeById(nodeId);
    }
    let nodeLang: string | undefined = matchResult[2];

    const codeLens: vscode.CodeLens[] = [];
    let caseFlag: boolean = false;
    let curCase = "";
    // 搜集所有debug
    let debugFlag: boolean = false;
    for (let i: number = 0; i < document.lineCount; i++) {
      const lineContent: string = document.lineAt(i).text;
      if (lineContent.indexOf("@lc code=end") >= 0) {
        this.processCodeButton(i, document, node, nodeLang).forEach((x) => codeLens.push(x));
      }

      if (lineContent.indexOf("@lc code=start") >= 0) {
        this.processRemarkButton(i, document).forEach((x) => codeLens.push(x));
      }

      if (caseFlag && lineContent.indexOf("@lcpr case=end") < 0) {
        curCase += this.fix_lineContent(lineContent).replace(/\s+/g, "");
      }
      // 收集所有用例
      if (lineContent.indexOf("@lcpr case=start") >= 0) {
        caseFlag = true;
      }

      if (caseFlag && lineContent.indexOf("@lcpr case=end") >= 0) {
        this.createCase(i, document, curCase, nodeLang).forEach((x) => codeLens.push(x));
        curCase = "";
        caseFlag = false;
      }

      // 收集所有用例
      if (lineContent.indexOf("@lcpr-div-debug-arg-end") >= 0) {
        debugFlag = false;
      }

      if (debugFlag) {
        this.createDebugButton(i, document, lineContent).forEach((x) => codeLens.push(x));
      }

      // 收集所有用例
      if (lineContent.indexOf("@lcpr-div-debug-arg-start") >= 0) {
        debugFlag = true;
      }
    }

    return codeLens;
  }
}

export const fileButtonService: FileButtonService = new FileButtonService();
