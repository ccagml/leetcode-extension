import * as vscode from "vscode";
import * as fse from "fs-extra";

import { fileMeta, getEntryFile, IProblemType } from "../utils/problemUtils";

import { ShowMessage } from "../utils/OutputUtils";
import { OutPutType } from "../model/ConstDefind";
import { debugArgDao } from "../dao/debugArgDao";

export class DebugPy3 {
  static DEBUG_LANG = "python3";

  public async execute(
    document: vscode.TextDocument,
    filePath: string,
    testString: string,
    language: string,
    port: number
  ): Promise<string | undefined> {
    if (language != DebugPy3.DEBUG_LANG) {
      return;
    }
    let debugConfig = {
      type: "python",
      env: {
        PYTHONPATH: "",
      },
      program: "",
    };
    const fileContent: Buffer = await fse.readFile(filePath);
    const meta: { id: string; lang: string } | null = fileMeta(fileContent.toString());
    if (meta == null) {
      ShowMessage(
        "File meta info has been changed, please check the content: '@lc app=leetcode.cn id=xx lang=xx'.",
        OutPutType.error
      );
      return;
    }
    const problemType: IProblemType | undefined = debugArgDao.getDebugArgData(meta.id, document);
    if (problemType == undefined) {
      ShowMessage(`Notsupported problem: ${meta.id}.`, OutPutType.error);
      return;
    }

    debugConfig.program = await getEntryFile(meta.lang, meta.id);

    // check whether module.exports is exist or not
    const moduleExportsReg: RegExp = /# @lcpr-before-debug-begin/;
    if (!moduleExportsReg.test(fileContent.toString())) {
      await fse.writeFile(
        filePath,
        `# @lcpr-before-debug-begin\nfrom python3problem${meta.id} import *\nfrom typing import *\n# @lcpr-before-debug-end\n\n` +
          fileContent.toString()
      );
    }
    debugConfig.env!.PYTHONPATH = debugConfig.program;
    const args: string[] = [
      filePath,
      testString,
      problemType.funName,
      problemType.paramTypes.join(","),
      problemType.returnType || "returnType",
      meta.id,
      port.toString(),
    ];
    vscode.debug.startDebugging(
      undefined,
      Object.assign({}, debugConfig, {
        request: "launch",
        name: "Launch Program",
        args,
      })
    );

    return;
  }
}
