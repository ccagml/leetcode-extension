import * as vscode from "vscode";
import * as fse from "fs-extra";
import { fileMeta, getEntryFile, IProblemType } from "../utils/problemUtils";

import { ShowMessage } from "../utils/OutputUtils";
import { OutPutType } from "../model/Model";
import { debugArgDao } from "../dao/debugArgDao";

export class DebugJs {
  static DEBUG_LANG = "javascript";
  private getProblemFunName(language: string, problemType: IProblemType): string {
    if (problemType.specialFunName && problemType.specialFunName[language]) {
      return problemType.specialFunName[language];
    }
    return problemType.funName;
  }

  public async execute(
    document: vscode.TextDocument,
    filePath: string,
    testString: string,
    language: string,
    port: number
  ): Promise<string | undefined> {
    if (language != DebugJs.DEBUG_LANG) {
      return;
    }

    let debugConfig = {
      type: "node",
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

    const funName: string = this.getProblemFunName(language, problemType);

    // check whether module.exports is exist or not
    const moduleExportsReg: RegExp = new RegExp(`module.exports = ${problemType.funName};`);
    if (!moduleExportsReg.test(fileContent.toString())) {
      fse.writeFile(
        filePath,
        fileContent.toString() + `\n// @lcpr-after-debug-begin\nmodule.exports = ${funName};\n// @lcpr-after-debug-end`
      );
    }

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
