import * as fse from "fs-extra";
import * as path from "path";
import * as vscode from "vscode";

import { useWsl, isWindows, usingCmd } from "./SystemUtils";

const beforeStubReg: RegExp = /@lcpr-before-debug-begin([\s\S]*?)@lcpr-before-debug-end/;
const afterStubReg: RegExp = /@lcpr-after-debug-begin([\s\S]*?)@lcpr-after-debug-end/;

interface IExtensionState {
  context: vscode.ExtensionContext;
  cachePath: string;
}

export interface IDebugConfig {
  type: string;
  program?: string;
  env?: {
    [key: string]: any;
  };
  [x: string]: any;
}

export interface IProblemType {
  funName: string;
  paramTypes: string[];
  returnType: string;
  testCase?: string;
  specialFunName?: {
    [x: string]: string;
  };
}

export interface IDebugResult {
  type: "success" | "error";
  message: string;
  problemNum: number;
  language: string;
  filePath: string;
  testString: string;
}

export const extensionState: IExtensionState = {
  context: null as any,
  cachePath: "",
};

export const languages: string[] = [
  "bash",
  "c",
  "cpp",
  "csharp",
  "golang",
  "java",
  "javascript",
  "kotlin",
  "mysql",
  "php",
  "python",
  "python3",
  "ruby",
  "rust",
  "scala",
  "swift",
];

export const langExt: Map<string, string> = new Map([
  ["bash", "sh"],
  ["c", "c"],
  ["cpp", "cpp"],
  ["csharp", "cs"],
  ["golang", "go"],
  ["java", "java"],
  ["javascript", "js"],
  ["kotlin", "kt"],
  ["mysql", "sql"],
  ["php", "php"],
  ["python", "py"],
  ["python3", "py"],
  ["ruby", "rb"],
  ["rust", "rs"],
  ["scala", "scala"],
  ["swift", "swift"],
]);

export const supportDebugLanguages: string[] = ["javascript", "python3", "cpp"];

export interface ProblemMeta {
  id: string;
  lang: string;
}

export function genFileExt(language: string): string {
  const ext: string | undefined = langExt.get(language);
  if (!ext) {
    throw new Error(`The language "${language}" is not supported.`);
  }
  return ext;
}

export function fileMeta(content: string): ProblemMeta | null {
  const result: RegExpExecArray | null = /@lc app=(.*) id=(.*|\w*|\W*|[\\u4e00-\\u9fa5]*) lang=(.*)/.exec(content);
  if (result != null) {
    return {
      id: result[2],
      lang: result[3],
    };
  }
  return null;
}

export async function getUnstubedFile(filePath: string): Promise<string> {
  const content: string = (await fse.readFile(filePath)).toString();
  const stripped: string = content.replace(beforeStubReg, "").replace(afterStubReg, "");

  if (content.length === stripped.length) {
    // no stub, return original filePath
    return filePath;
  }

  const meta: { id: string; lang: string } | null = fileMeta(content);
  if (meta == null) {
    vscode.window.showErrorMessage(
      "File meta info has been changed, please check the content: '@lc app=leetcode.cn id=xx lang=xx'."
    );
    throw new Error("");
  }

  const newPath: string = path.join(extensionState.cachePath, `${meta.id}-${meta.lang}`);
  await fse.writeFile(newPath, stripped);
  return newPath;
}

export async function getProblemSpecialCode(
  language: string,
  problem: string,
  fileExt: string,
  extDir: string
): Promise<string> {
  const problemPath: string = path.join(extDir, "resources/debug/entry", language, "problems", `${problem}.${fileExt}`);
  const isSpecial: boolean = await fse.pathExists(problemPath);
  if (isSpecial) {
    const specialContent: Buffer = await fse.readFile(problemPath);
    return specialContent.toString();
  }
  if (language === "cpp") {
    return "";
  }
  const fileContent: Buffer = await fse.readFile(
    path.join(extDir, "resources/debug/entry", language, "problems", `common.${fileExt}`)
  );
  return fileContent.toString();
}

export async function getEntryFile(language: string, problem: string): Promise<string> {
  const extDir: string = vscode.extensions.getExtension("ccagml.vscode-leetcode-problem-rating")!.extensionPath;
  const fileExt: string = genFileExt(language);
  const specialCode: string = await getProblemSpecialCode(language, problem, fileExt, extDir);
  const tmpEntryCode: string = (
    await fse.readFile(path.join(extDir, "resources/debug/entry", language, `entry.${fileExt}`))
  ).toString();
  const entryCode: string = tmpEntryCode.replace(/\/\/ @@stub-for-code@@/, specialCode);
  const entryPath: string = path.join(extensionState.cachePath, `${language}problem${problem}.${fileExt}`);
  await fse.writeFile(entryPath, entryCode);
  return entryPath;
}

export function parseTestString(test: string): string {
  if (useWsl() || !isWindows()) {
    return `'${test}'`;
  }

  // In windows and not using WSL
  if (usingCmd()) {
    return `"${test.replace(/"/g, '\\"')}"`;
  } else {
    // Assume using PowerShell
    return `'${test.replace(/"/g, '\\"')}'`;
  }
}

export function randomString(len: number): string {
  len = len || 32;
  const $chars: string = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  const maxPos: number = $chars.length;
  let pwd: string = "";
  for (let i: number = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}
