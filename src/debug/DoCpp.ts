import * as fse from "fs-extra";
import * as path from "path";
import * as vscode from "vscode";

import { sysCall } from "../utils/SystemUtils";
import {
  fileMeta,
  getEntryFile,
  getProblemSpecialCode,
  randomString,
  extensionState,
  IDebugConfig,
  IProblemType,
} from "../utils/problemUtils";

import { isWindows } from "../utils/SystemUtils";
import { debugArgDao } from "../dao/debugArgDao";
import { BABA, BabaStr } from "../BABA";
import { ShowMessage } from "../utils/OutputUtils";
import { OutPutType } from "../model/Model";

function getGdbDefaultConfig(): IDebugConfig {
  return {
    type: "cppdbg",
    MIMode: "gdb",
    setupCommands: [
      {
        description: "Enable pretty-printing for gdb",
        text: "-enable-pretty-printing",
        ignoreFailures: true,
      },
    ],
    miDebuggerPath: isWindows() ? "gdb.exe" : "gdb",
  };
}

function getClangDefaultConfig(): IDebugConfig {
  return {
    type: "cppdbg",
    MIMode: "lldb",
    externalConsole: false,
  };
}

const templateMap: any = {
  116: [117],
  429: [559, 589, 590],
};

function getTemplateId(id: string): string {
  const findKey: string | undefined = Object.keys(templateMap).find((key: string) => {
    const numId: number = parseInt(id, 10);
    return templateMap[key].includes(numId);
  });
  return findKey ? findKey : id;
}

export class DebugCpp {
  static DEBUG_LANG = "cpp";
  public async execute(
    document: vscode.TextDocument,
    filePath: string,
    testString: string,
    language: string,
    port: number
  ): Promise<string | undefined> {
    const sourceFileContent: string = (await fse.readFile(filePath)).toString();
    const meta: { id: string; lang: string } | null = fileMeta(sourceFileContent);
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

    const program = await getEntryFile(meta.lang, meta.id);

    const newSourceFileName: string = `source${language}problem${meta.id}.cpp`;
    const newSourceFilePath: string = path.join(extensionState.cachePath, newSourceFileName);

    const commonHeaderName: string = `common${language}problem${meta.id}.h`;
    const commonImplementName: string = `common${language}problem${meta.id}.cpp`;

    // check whether module.exports is exist or not
    const moduleExportsReg: RegExp = /\/\/ @lcpr-before-debug-begin/;
    if (!moduleExportsReg.test(sourceFileContent)) {
      const newContent: string =
        `// @lcpr-before-debug-begin\n\n\n\n\n// @lcpr-before-debug-end\n\n` + sourceFileContent;
      await fse.writeFile(filePath, newContent);

      // create source file for build because g++ does not support inlucde file with chinese name
      await fse.writeFile(newSourceFilePath, newContent);
    } else {
      await fse.writeFile(newSourceFilePath, sourceFileContent);
    }

    let params: string[] = testString.split("\\n");
    const paramsType: string[] = problemType.paramTypes;

    // 参数不够就不行

    if (params.length < paramsType.length) {
      ShowMessage("Input parameters is not match the problem!", OutPutType.error);
      return;
    }
    // 参数太多舍弃
    if (params.length < paramsType.length) {
      params = params.slice(0, paramsType.length);
    }

    const templateId: string = getTemplateId(meta.id);

    const indent: string = "    ";
    let insertCode: string = `vector<string> params{${params.map((p: string) => `"${p}"`).join(", ")}};\n`;
    const callArgs: string[] = [];
    paramsType.map((type: string, index: number) => {
      callArgs.push(`arg${index}`);

      insertCode += `
    string param${index} = params[${index}];
    cJSON *item${index} = cJSON_Parse(param${index}.c_str());
`;
      switch (type) {
        case "number":
          insertCode += `${indent}int arg${index} = parseNumber(item${index});\n`;
          break;
        case "number[]":
          insertCode += `${indent}vector<int> arg${index} = parseNumberArray(item${index});\n`;
          break;
        case "number[][]":
          insertCode += `${indent}vector<vector<int>> arg${index} = parseNumberArrayArray(item${index});\n`;
          break;
        case "string":
          insertCode += `${indent}string arg${index} = parseString(item${index});\n`;
          break;
        case "string[]":
          insertCode += `${indent}vector<string> arg${index} = parseStringArray(item${index});\n`;
          break;
        case "string[][]":
          insertCode += `${indent}vector<vector<string>> arg${index} = parseStringArrayArray(item${index});\n`;
          break;
        case "ListNode":
          insertCode += `${indent}ListNode *arg${index} = parseListNode(parseNumberArray(item${index}));\n`;
          break;
        case "ListNode[]":
          insertCode += `${indent}vector<ListNode *> arg${index} = parseListNodeArray(parseNumberArrayArray(item${index}));\n`;
          break;
        case "character":
          insertCode += `${indent}char arg${index} = parseCharacter(item${index});\n`;
          break;
        case "character[]":
          insertCode += `${indent}vector<char> arg${index} = parseCharacterArray(item${index});\n`;
          break;
        case "character[][]":
          insertCode += `${indent}vector<vector<char>> arg${index} = parseCharacterArrayArray(item${index});\n`;
          break;
        case "NestedInteger[]":
          insertCode += `${indent}vector<NestedInteger> arg${index} = parseNestedIntegerArray(item${index});\n`;
          break;
        case "MountainArray":
          insertCode += `${indent}MountainArray arg${index} = MountainArray(parseNumberArray(item${index}));\n`;
          break;
        case "TreeNode":
          insertCode += `${indent}TreeNode * arg${index} = parseTreeNode(item${index});\n`;
          break;
        case "Node":
          if (templateId === "133") {
            insertCode += `${indent}Node * arg${index} = parseNode(parseNumberArrayArray(item${index}));\n`;
          } else if (templateId === "138") {
            insertCode += `${indent}Node * arg${index} = parseNode(parsecJSONArray(item${index}));\n`;
          } else {
            insertCode += `${indent}Node * arg${index} = parseNode(item${index});\n`;
          }
          break;
      }
    });
    if (templateId === "278") {
      insertCode += `${indent}badVersion = arg1;\n`;
      insertCode += `${indent}(new Solution())->${problemType.funName}(arg0);\n`;
    } else if (templateId === "341") {
      insertCode += `${indent}NestedIterator i(arg0);\n`;
      insertCode += `${indent}while (i.hasNext()) cout << i.next();;\n`;
    } else if (templateId === "843") {
      insertCode += `${indent}secret = arg0;\n`;
      insertCode += `${indent}Master master;\n`;
      insertCode += `${indent}(new Solution())->${problemType.funName}(arg1, master);\n`;
    } else if (templateId === "1095") {
      insertCode += `${indent}(new Solution())->${problemType.funName}(arg1, arg0);\n`;
    } else if (templateId === "146") {
      insertCode += `LRUCache *lc; for (int i = 0; i < arg0.size(); i++) { if (arg0[i].compare("LRUCache") == 0) { lc = new LRUCache(arg1[i][0]); } else if (arg0[i].compare("put") == 0) { lc->put(arg1[i][0], arg1[i][1]); } else if (arg0[i].compare("get") == 0) { lc->get(arg1[i][0]); } }      \n`;
    } else {
      insertCode += `${indent}(new Solution())->${problemType.funName}(${callArgs.join(", ")});\n`;
    }

    // insert include code and replace function namem
    const includeFileRegExp: RegExp = /\/\/ @@stub\-for\-include\-code@@/;
    const codeRegExp: RegExp = /\/\/ @@stub\-for\-body\-code@@/;
    const entryFile: string = program;
    const entryFileContent: string = (await fse.readFile(entryFile)).toString();
    const newEntryFileContent: string = entryFileContent
      .replace(includeFileRegExp, `#include "${commonHeaderName}"\n#include "${newSourceFileName}"`)
      .replace(codeRegExp, insertCode);
    await fse.writeFile(entryFile, newEntryFileContent);

    const extDir: string = vscode.extensions.getExtension("ccagml.vscode-leetcode-problem-rating")!.extensionPath;

    // copy common.h
    const commonHeaderPath: string = path.join(extDir, "resources/debug/entry/cpp/problems/common.h");
    const commonHeaderContent: string = (await fse.readFile(commonHeaderPath)).toString();
    const commonHeaderDestPath: string = path.join(extensionState.cachePath, commonHeaderName);

    const specialDefineCode: string = await getProblemSpecialCode(language, templateId, "h", extDir);
    await fse.writeFile(
      commonHeaderDestPath,
      commonHeaderContent.replace(/\/\/ @@stub\-for\-problem\-define\-code@@/, specialDefineCode)
    );

    // copy common.cpp
    const commonPath: string = path.join(extDir, "resources/debug/entry/cpp/problems/common.cpp");
    const commonContent: string = (await fse.readFile(commonPath))
      .toString()
      .replace(includeFileRegExp, `#include "${commonHeaderName}"`);
    const commonDestPath: string = path.join(extensionState.cachePath, commonImplementName);

    const specialCode: string = await getProblemSpecialCode(language, templateId, "cpp", extDir);
    await fse.writeFile(
      commonDestPath,
      commonContent.replace(/\/\/ @@stub\-for\-problem\-define\-code@@/, specialCode)
    );

    const exePath: string = path.join(extensionState.cachePath, `${language}problem${meta.id}.exe`);
    const thirdPartyPath: string = path.join(extDir, "resources/debug/thirdparty/c");
    const jsonPath: string = path.join(extDir, "resources/debug/thirdparty/c/cJSON.c");

    const compiler = vscode.workspace.getConfiguration("leetcode-problem-rating").get<string>("cppCompiler") ?? "gdb";
    let debugConfig: any;
    if (compiler === "clang") {
      debugConfig = await this.getClangDebugConfig({
        program,
        exePath,
        commonDestPath,
        jsonPath,
        thirdPartyPath,
        filePath,
        newSourceFilePath,
      });
    } else {
      debugConfig = await this.getGdbDebugConfig({
        program,
        exePath,
        commonDestPath,
        jsonPath,
        thirdPartyPath,
        filePath,
        newSourceFilePath,
      });
    }

    if (debugConfig == null) {
      return;
    }

    const args: string[] = [
      filePath,
      testString.replace(/\\"/g, '\\\\"'),
      problemType.funName,
      problemType.paramTypes.join(","),
      problemType.returnType || "",
      meta.id,
      port.toString(),
    ];
    const debugSessionName: string = randomString(16);
    const debuging: boolean = await vscode.debug.startDebugging(
      undefined,
      Object.assign({}, debugConfig, {
        request: "launch",
        name: debugSessionName,
        // logging: { engineLogging: true, trace: true, traceResponse: true },
        args,
      })
    );

    if (debuging) {
      const debugSessionDisposes: vscode.Disposable[] = [];

      vscode.debug.breakpoints.map((bp: vscode.SourceBreakpoint) => {
        if (bp.location.uri.fsPath === newSourceFilePath) {
          vscode.debug.removeBreakpoints([bp]);
        }
      });

      vscode.debug.breakpoints.map((bp: vscode.SourceBreakpoint) => {
        if (bp.location.uri.fsPath === filePath) {
          const location: vscode.Location = new vscode.Location(vscode.Uri.file(newSourceFilePath), bp.location.range);
          vscode.debug.addBreakpoints([
            new vscode.SourceBreakpoint(location, bp.enabled, bp.condition, bp.hitCondition, bp.logMessage),
          ]);
        }
      });

      debugSessionDisposes.push(
        vscode.debug.onDidChangeBreakpoints((event: vscode.BreakpointsChangeEvent) => {
          event.added.map((bp: vscode.SourceBreakpoint) => {
            if (bp.location.uri.fsPath === filePath) {
              const location: vscode.Location = new vscode.Location(
                vscode.Uri.file(newSourceFilePath),
                bp.location.range
              );
              vscode.debug.addBreakpoints([
                new vscode.SourceBreakpoint(location, bp.enabled, bp.condition, bp.hitCondition, bp.logMessage),
              ]);
            }
          });

          event.removed.map((bp: vscode.SourceBreakpoint) => {
            if (bp.location.uri.fsPath === filePath) {
              const aaa: vscode.Breakpoint[] = [];
              vscode.debug.breakpoints.map((all_bp_one: vscode.SourceBreakpoint) => {
                if (
                  all_bp_one.location.uri.fsPath === newSourceFilePath &&
                  all_bp_one.location.range.start.line == bp.location.range.start.line &&
                  all_bp_one.location.range.end.line == bp.location.range.end.line
                ) {
                  aaa.push(all_bp_one);
                }
              });
              vscode.debug.removeBreakpoints(aaa);
            }
          });

          event.changed.map((bp: vscode.SourceBreakpoint) => {
            if (bp.location.uri.fsPath === filePath) {
              const location: vscode.Location = new vscode.Location(
                vscode.Uri.file(newSourceFilePath),
                bp.location.range
              );
              const aaa: vscode.Breakpoint[] = [];
              vscode.debug.breakpoints.map((all_bp_one: vscode.SourceBreakpoint) => {
                if (
                  all_bp_one.location.uri.fsPath === newSourceFilePath &&
                  all_bp_one.location.range.start.line == bp.location.range.start.line &&
                  all_bp_one.location.range.end.line == bp.location.range.end.line
                ) {
                  aaa.push(all_bp_one);
                }
              });
              vscode.debug.removeBreakpoints(aaa);
              vscode.debug.addBreakpoints([
                new vscode.SourceBreakpoint(location, bp.enabled, bp.condition, bp.hitCondition, bp.logMessage),
              ]);
            }
          });
        })
      );

      debugSessionDisposes.push(
        vscode.debug.onDidTerminateDebugSession((event: vscode.DebugSession) => {
          if (event.name === debugSessionName) {
            debugSessionDisposes.map((d: vscode.Disposable) => d.dispose());
          }
        })
      );
    }

    return;
  }

  private async getGdbDebugConfig({
    program,
    exePath,
    commonDestPath,
    jsonPath,
    thirdPartyPath,
    filePath,
    newSourceFilePath,
  }: {
    program: string;
    exePath: string;
    commonDestPath: string;
    jsonPath: string;
    thirdPartyPath: string;
    filePath: string;
    newSourceFilePath: string;
  }) {
    const debugConfig = getGdbDefaultConfig();
    try {
      const includePath: string = path.dirname(exePath);
      await sysCall(
        "g++",
        ["-g", program, commonDestPath, jsonPath, "-o", exePath, "-I", includePath, "-I", thirdPartyPath],
        { shell: false }
      );
    } catch (e) {
      ShowMessage(e, OutPutType.error);
      BABA.getProxy(BabaStr.LogOutputProxy).get_log().append(e.stack);
      BABA.getProxy(BabaStr.LogOutputProxy).get_log().show();
      return;
    }

    debugConfig.program = exePath;
    debugConfig.cwd = extensionState.cachePath;
    // map build source file to user source file
    debugConfig.sourceFileMap = {
      [newSourceFilePath]: filePath,
    };
    return debugConfig;
  }

  private async getClangDebugConfig({
    program,
    exePath,
    commonDestPath,
    jsonPath,
    thirdPartyPath,
    filePath,
    newSourceFilePath,
  }: {
    program: string;
    exePath: string;
    commonDestPath: string;
    jsonPath: string;
    thirdPartyPath: string;
    filePath: string;
    newSourceFilePath: string;
  }) {
    const debugConfig = getClangDefaultConfig();
    try {
      const includePath: string = path.dirname(exePath);
      await sysCall(
        "/usr/bin/clang++",
        [
          "-std=c++17",
          "-stdlib=libc++",
          "-g",
          program,
          commonDestPath,
          jsonPath,
          "-o",
          exePath,
          "-I",
          includePath,
          "-I",
          thirdPartyPath,
        ],
        { shell: false }
      );
    } catch (e) {
      ShowMessage(e, OutPutType.error);
      BABA.getProxy(BabaStr.LogOutputProxy).get_log().append(e.stack);
      BABA.getProxy(BabaStr.LogOutputProxy).get_log().show();
      return;
    }

    debugConfig.program = exePath;
    debugConfig.cwd = extensionState.cachePath;
    // map build source file to user source file
    debugConfig.sourceFileMap = {
      [newSourceFilePath]: filePath,
    };
    return debugConfig;
  }
}
