/*
 * Filename: /home/cc/leetcode-vscode/src/controller/DebugController.ts
 * Path: /home/cc/leetcode-vscode
 * Created Date: Wednesday, February 1st 2023, 11:11:23 am
 * Author: ccagml
 *
 * Copyright (c) 2023 ccagml . All rights reserved
 */

import { Uri, window } from "vscode";
import { getTextEditorFilePathByUri } from "../utils/SystemUtils";
import * as fs from "fs";
import { fileMeta, ProblemMeta, canDebug } from "../utils/problemUtils";
// import problemTypes from "../utils/problemTypes";
import { debugService } from "../service/DebugService";

// 做杂活
class DebugContorller {
  constructor() {}

  public async startDebug(uri: Uri, testcase?: string): Promise<void> {
    try {
      const filePath: string | undefined = await getTextEditorFilePathByUri(uri);
      if (!filePath) {
        return;
      }
      const fileContent: Buffer = fs.readFileSync(filePath);
      const meta: ProblemMeta | null = fileMeta(fileContent.toString());
      if (!canDebug(meta)) {
        window.showErrorMessage("这题还不能debug 麻烦提issuse");
        return;
      }
      let result: any;

      if (testcase != undefined) {
        result = await debugService.execute(filePath, testcase.replace(/"/g, '\\"'), meta!.lang);
      } else {
        const ts: string | undefined = await window.showInputBox({
          prompt: "Enter the test cases.",
          validateInput: (s: string): string | undefined =>
            s && s.trim() ? undefined : "Test case must not be empty.",
          placeHolder: "Example: [1,2,3]\\n4",
          ignoreFocusOut: true,
        });
        if (ts) {
          result = await debugService.execute(filePath, ts.replace(/"/g, '\\"'), meta!.lang);
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
