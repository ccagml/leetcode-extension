import * as net from "net";
// import * as path from "path";
import * as vscode from "vscode";
import { IDebugResult } from "../utils/problemUtils";
import { cppExecutor } from "../debug/executor/cppExecutor";
import { logOutput } from "../utils/OutputUtils";
import * as fse from "fs-extra";
import { fileMeta, getEntryFile, IDebugConfig, IProblemType } from "../utils/problemUtils";
import problemTypes from "../utils/problemTypes";

const debugConfigMap: Map<string, IDebugConfig> = new Map([
  [
    "javascript",
    {
      type: "node",
    },
  ],
  [
    "python3",
    {
      type: "python",
      env: {
        PYTHONPATH: "",
      },
    },
  ],
]);

class DebugExecutor {
  private server: net.Server;

  constructor() {
    this.start();
  }

  private getProblemFunName(language: string, problemType: IProblemType): string {
    if (problemType.specialFunName && problemType.specialFunName[language]) {
      return problemType.specialFunName[language];
    }
    return problemType.funName;
  }

  public async execute(filePath: string, testString: string, language: string): Promise<string | undefined> {
    if (this.server == null || this.server.address() == null) {
      vscode.window.showErrorMessage("Debug server error, maybe you can restart vscode.");
      return;
    }

    if (language === "cpp") {
      return await cppExecutor.execute(filePath, testString, language, (this.server.address() as net.AddressInfo).port);
    }

    const debugConfig: undefined | IDebugConfig = debugConfigMap.get(language);
    if (debugConfig == null) {
      vscode.window.showErrorMessage("Notsupported language.");
      return;
    }

    const fileContent: Buffer = await fse.readFile(filePath);
    const meta: { id: string; lang: string } | null = fileMeta(fileContent.toString());
    if (meta == null) {
      vscode.window.showErrorMessage(
        "File meta info has been changed, please check the content: '@lc app=leetcode.cn id=xx lang=xx'."
      );
      return;
    }
    const problemType: IProblemType = problemTypes[meta.id];
    if (problemType == null) {
      vscode.window.showErrorMessage(`Notsupported problem: ${meta.id}.`);
      return;
    }

    debugConfig.program = await getEntryFile(meta.lang, meta.id);

    const funName: string = this.getProblemFunName(language, problemType);

    if (language === "javascript") {
      // check whether module.exports is exist or not
      const moduleExportsReg: RegExp = new RegExp(`module.exports = ${problemType.funName};`);
      if (!moduleExportsReg.test(fileContent.toString())) {
        fse.writeFile(
          filePath,
          fileContent.toString() +
            `\n// @after-stub-for-debug-begin\nmodule.exports = ${funName};\n// @after-stub-for-debug-end`
        );
      }
    } else if (language === "python3") {
      // check whether module.exports is exist or not
      const moduleExportsReg: RegExp = /# @before-stub-for-debug-begin/;
      if (!moduleExportsReg.test(fileContent.toString())) {
        await fse.writeFile(
          filePath,
          `# @before-stub-for-debug-begin\nfrom python3problem${meta.id} import *\nfrom typing import *\n# @before-stub-for-debug-end\n\n` +
            fileContent.toString()
        );
      }
      debugConfig.env!.PYTHONPATH = debugConfig.program;
    }

    const args: string[] = [
      filePath,
      testString,
      problemType.funName,
      problemType.paramTypes.join(","),
      problemType.returnType,
      meta.id,
      (this.server.address() as net.AddressInfo).port.toString(),
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

  private async start(): Promise<any> {
    this.server = net.createServer((clientSock: net.Socket) => {
      clientSock.setEncoding("utf8");

      clientSock.on("data", async (data: Buffer) => {
        const result: IDebugResult = JSON.parse(data.toString());
        if (result.type === "error") {
          vscode.window.showErrorMessage(result.message);
        } else {
          // const leetcodeResult: string = await leetCodeExecutor.testSolution(
          //     result.filePath,
          //     parseTestString(result.testString.replace(/\\"/g, '"')),
          // );
          // if (!leetcodeResult) {
          //     return;
          // }
          // leetCodeSubmissionProvider.show(leetcodeResult);
        }
      });

      clientSock.on("error", (error: Error) => {
        logOutput.appendLine(error.toString());
      });
    });

    this.server.on("error", (error: Error) => {
      logOutput.appendLine(error.toString());
    });

    // listen on a random port
    this.server.listen({ port: 0, host: "127.0.0.1" });
  }
}

export const debugExecutor: DebugExecutor = new DebugExecutor();
