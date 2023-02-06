/*
 * Filename: /home/cc/leetcode-vscode/src/controller/DebugController.ts
 * Path: /home/cc/leetcode-vscode
 * Created Date: Wednesday, February 1st 2023, 11:11:23 am
 * Author: ccagml
 *
 * Copyright (c) 2023 ccagml . All rights reserved
 */

import { TextDocument, window } from "vscode";
import { getTextEditorFilePathByUri } from "../utils/SystemUtils";
import * as fs from "fs";
import { fileMeta, ProblemMeta, supportDebugLanguages } from "../utils/problemUtils";

import { debugService } from "../service/DebugService";
import { debugArgDao } from "../dao/debugArgDao";

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
}

export const debugContorller: DebugContorller = new DebugContorller();
