import * as net from "net";
// import * as path from "path";
import * as vscode from "vscode";
import { IDebugResult } from "../utils/problemUtils";
import { debugCpp } from "../debugex/debugCpp";
import { logOutput } from "../utils/OutputUtils";
import * as fse from "fs-extra";
import { fileMeta, getEntryFile, IDebugConfig, IProblemType } from "../utils/problemUtils";
import { debugArgDao } from "../dao/debugArgDao";

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

class DebugService {
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

  public async execute(
    document: vscode.TextDocument,
    filePath: string,
    testString: string,
    language: string
  ): Promise<string | undefined> {
    if (this.server == null || this.server.address() == null) {
      vscode.window.showErrorMessage("Debug server error, maybe you can restart vscode.");
      return;
    }

    if (language === "cpp") {
      return await debugCpp.execute(
        document,
        filePath,
        testString,
        language,
        (this.server.address() as net.AddressInfo).port
      );
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
    const problemType: IProblemType | undefined = debugArgDao.getDebugArgData(meta.id, document);
    if (problemType == undefined) {
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
            `\n// @lcpr-after-debug-begin\nmodule.exports = ${funName};\n// @lcpr-after-debug-end`
        );
      }
    } else if (language === "python3") {
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
    }

    const args: string[] = [
      filePath,
      testString,
      problemType.funName,
      problemType.paramTypes.join(","),
      problemType.returnType || "returnType",
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

export const debugService: DebugService = new DebugService();
