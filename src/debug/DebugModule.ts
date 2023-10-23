import * as net from "net";
// import * as path from "path";
import * as vscode from "vscode";
import { IDebugResult } from "../utils/problemUtils";

import { fileMeta, ProblemMeta, supportDebugLanguages, extensionState } from "../utils/problemUtils";
import { debugArgDao } from "../dao/debugArgDao";
import { BABA, BABAMediator, BABAProxy, BabaStr, BaseCC } from "../BABA";
import { ShowMessage } from "../utils/OutputUtils";
import { OutPutType, singleLineFlag } from "../model/ConstDefind";
import { IQuickItemEx } from "../model/ConstDefind";

import * as fse from "fs-extra";

import { getTextEditorFilePathByUri } from "../utils/SystemUtils";
import * as fs from "fs";
import { DebugCpp } from "./DoCpp";
import { DebugPy3 } from "./DoPy3";
import { DebugJs } from "./DoJs";

class DebugService {
  private server: net.Server;

  private sub_object: Map<string, any>;

  constructor() {
    this.start();
    this.sub_object = new Map<string, any>();
    let subList = [DebugCpp, DebugPy3, DebugJs];
    for (let index = 0; index < subList.length; index++) {
      let sub_clazz = subList[index];
      this.sub_object.set(sub_clazz.DEBUG_LANG, new sub_clazz());
    }
  }

  public async InitAll(context) {
    extensionState.context = context;
    extensionState.cachePath = context.globalStoragePath;

    if (!(await fse.pathExists(extensionState.cachePath))) {
      await fse.mkdirs(extensionState.cachePath);
    }
  }

  public async execute(
    document: vscode.TextDocument,
    filePath: string,
    testString: string,
    language: string
  ): Promise<string | undefined> {
    if (this.server == null || this.server.address() == null) {
      ShowMessage("Debug server error, maybe you can restart vscode.", OutPutType.error);
      return;
    }

    let sub = this.sub_object.get(language);
    if (sub == undefined) {
      return;
    }

    return await sub.execute(document, filePath, testString, language, (this.server.address() as net.AddressInfo).port);
  }

  private async start(): Promise<any> {
    this.server = net.createServer((clientSock: net.Socket) => {
      clientSock.setEncoding("utf8");

      clientSock.on("data", async (data: Buffer) => {
        const result: IDebugResult = JSON.parse(data.toString());
        if (result.type === "error") {
          ShowMessage(result.message, OutPutType.error);
        } else {
        }
      });

      clientSock.on("error", (error: Error) => {
        BABA.getProxy(BabaStr.LogOutputProxy).get_log().appendLine(error.toString());
      });
    });

    this.server.on("error", (error: Error) => {
      BABA.getProxy(BabaStr.LogOutputProxy).get_log().appendLine(error.toString());
    });

    // listen on a random port
    this.server.listen({ port: 0, host: "127.0.0.1" });
  }

  public async addDebugType(document: vscode.TextDocument, addType) {
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

    const choice: IQuickItemEx<string> | undefined = await vscode.window.showQuickPick(picks, {
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
          vscode.window.activeTextEditor?.edit((edit) => {
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

            edit.replace(new vscode.Range(i, equal_index + 1, i, last_index), JSON.stringify(cur_param_array));
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
  public async resetDebugType(document: vscode.TextDocument, addType) {
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
          vscode.window.activeTextEditor?.edit((edit) => {
            let cur_param_array: any = [];
            edit.replace(new vscode.Range(i, equal_index + 1, i, last_index), JSON.stringify(cur_param_array));
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

  public canDebug(meta: ProblemMeta | null, document: vscode.TextDocument) {
    if (
      meta == null ||
      supportDebugLanguages.indexOf(meta.lang) === -1 ||
      debugArgDao.getDebugArgData(meta.id, document) == undefined
    ) {
      return false;
    }
    return true;
  }

  public async check_create_debug_area(meta: ProblemMeta | null, document: vscode.TextDocument) {
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

  public get_one_case(document: vscode.TextDocument) {
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

  public async create_diy_debug_arg(meta: ProblemMeta | null, document: vscode.TextDocument) {
    const name: string | undefined = await vscode.window.showInputBox({
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
        const editor = vscode.window.activeTextEditor;

        await new Promise(async (resolve, _) => {
          editor
            ?.edit((edit) => {
              edit.insert(new vscode.Position(i + 1, i + 1), div_debug_arg.join("\n"));
            })
            .then((success) => {
              if (success) {
                editor.document.save().then(() => {
                  resolve(1);
                });
              } else {
                resolve(1);
              }
            });
        });
        break;
      }
    }
  }

  public async checkCanDebug(document: vscode.TextDocument, testcase?: string) {
    try {
      let filePath: string | undefined = await getTextEditorFilePathByUri(document.uri);
      if (!filePath) {
        return;
      }
      const fileContent: Buffer = fs.readFileSync(filePath);
      let meta: ProblemMeta | null = fileMeta(fileContent.toString());

      if (!this.canDebug(meta, document)) {
        // 判断生成测试区块
        await this.check_create_debug_area(meta, document);

        try {
          document = await vscode.workspace.openTextDocument(document.uri);
        } catch (error) {
          return;
        }

        if (!this.canDebug(meta, document)) {
          return;
        }
        meta = fileMeta(document.getText());
      }
      if (testcase == undefined) {
        const ts_temp: string | undefined = await vscode.window.showInputBox({
          prompt: "Enter the test cases.",
          validateInput: (s: string): string | undefined =>
            s && s.trim() ? undefined : "Test case must not be empty.",
          placeHolder: "Example: [1,2,3]\\n4",
          ignoreFocusOut: true,
        });
        testcase = ts_temp;

        if (testcase == undefined) {
          return;
        }
      }

      if (meta == undefined) {
        return;
      }

      await this.execute(document, filePath, testcase.replace(/"/g, '\\"'), meta!.lang);
    } catch (error) {}
  }
}

export const debugService: DebugService = new DebugService();

export class DebugProxy extends BABAProxy {
  static NAME = BabaStr.DebugProxy;
  constructor() {
    super(DebugProxy.NAME);
  }
}

export class DebugMediator extends BABAMediator {
  static NAME = BabaStr.DebugMediator;
  constructor() {
    super(DebugMediator.NAME);
  }

  listNotificationInterests(): string[] {
    return [
      BabaStr.VSCODE_DISPOST,
      BabaStr.BABACMD_simpleDebug,
      BabaStr.BABACMD_addDebugType,
      BabaStr.BABACMD_resetDebugType,
      BabaStr.InitFile,
    ];
  }
  async handleNotification(_notification: BaseCC.BaseCC.INotification) {
    let body = _notification.getBody();
    switch (_notification.getName()) {
      case BabaStr.VSCODE_DISPOST:
        break;
      case BabaStr.BABACMD_simpleDebug:
        debugService.checkCanDebug(body.document, body.testCase);
        break;
      case BabaStr.BABACMD_addDebugType:
        debugService.addDebugType(body.document, body.addType);
        break;
      case BabaStr.BABACMD_resetDebugType:
        debugService.resetDebugType(body.document, body.addType);
        break;

      case BabaStr.InitFile:
        await debugService.InitAll(body);
      default:
        break;
    }
  }
}
