/*
 * Filename: https://github.com/ccagml/leetcode-extension/src/utils/SystemUtils.ts
 * Path: https://github.com/ccagml/leetcode-extension
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import * as fs from "fs";
import * as _ from "lodash";
import * as path from "path";
import { IProblem, langExt } from "../model/Model";

import { isUseVscodeNode, isUseWsl } from "./ConfigUtils";
import { Uri, window, TextEditor } from "vscode";
import { fileMeta, ProblemMeta } from "../utils/problemUtils";

import * as cp from "child_process";
import * as vscode from "vscode";
import { BABA, BabaStr } from "../BABA";

export function isWindows(): boolean {
  return process.platform === "win32";
}

// 用wsl命令的时候,好像没办法用vscode的node
// 相当于使用fork,而不是之前的 spawn(node xxx
export function useVscodeNode(): boolean {
  return !useWsl() && isUseVscodeNode();
}

export function useWsl(): boolean {
  return isWindows() && isUseWsl();
}

export async function toWslPath(path: string): Promise<string> {
  return (await sysCall("wsl", ["wslpath", "-u", `"${path.replace(/\\/g, "/")}"`])).trim();
}

export async function toWinPath(path: string): Promise<string> {
  if (path.startsWith("\\mnt\\")) {
    return (
      (await sysCall("wsl", ["wslpath", "-w", `"${path.replace(/\\/g, "/").substr(0, 6)}"`])).trim() + path.substr(7)
    );
  }
  return (await sysCall("wsl", ["wslpath", "-w", "/"])).trim() + path;
}

export function genFileExt(language: string): string {
  const ext: string | undefined = langExt.get(language);
  if (!ext) {
    throw new Error(`The language "${language}" is not supported.`);
  }
  return ext;
}

export function genFileName(node: IProblem, language: string): string {
  const slug: string = _.kebabCase(node.name);
  const ext: string = genFileExt(language);
  return `${node.id}.${slug}.${ext}`;
}

export async function getNodeIdFromFile(fsPath: string): Promise<string> {
  const fileContent: Buffer = fs.readFileSync(fsPath);
  const meta: ProblemMeta | null = fileMeta(fileContent.toString());

  let id = meta?.id;
  // Try to get id from file name if getting from comments failed
  if (!id) {
    id = path.basename(fsPath).split(".")[0];
  }

  return id;
}

//获取当天零点的时间
export function getDayStart(): number {
  return new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 1000;
}

//获取当天23:59:59的时间
export function getDayEnd(): number {
  return getDayStart() + 86399;
}

export function getDayNow(): number {
  return Math.round(new Date().getTime() / 1000);
}

export function getDayNowStr(): string {
  return Math.round(new Date().getTime() / 1000).toString();
}

export function getDayNowM(): number {
  return Math.round(new Date().getTime());
}

export function getRemakeName(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
  const hours = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
  const min = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
  const s = date.getSeconds() >= 10 ? date.getSeconds() : `0${date.getSeconds()}`;

  const newDate = `${year}-${month}-${day} ${hours}:${min}:${s}`;
  return newDate;
}

export function getYMD(timeSecond: number): string {
  const date = timeSecond ? new Date(timeSecond * 1000) : new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
  const newDate = `${year}-${month}-${day}`;
  return newDate;
}

export function getyyyymmdd(timeSecond: number | undefined): string {
  const date = timeSecond ? new Date(timeSecond * 1000) : new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
  const newDate = `${year}${month}${day}`;
  return newDate;
}

/**
 * "If the ComSpec environment variable is not set, or if it is set to cmd.exe, then return true."
 *
 * The ComSpec environment variable is set to the path of the command processor. On Windows, this is
 * usually cmd.exe. On Linux, it is usually bash
 * @returns A boolean value.
 */
export function usingCmd(): boolean {
  const comSpec: string | undefined = process.env.ComSpec;
  // 'cmd.exe' is used as a fallback if process.env.ComSpec is unavailable.
  if (!comSpec) {
    return true;
  }

  if (comSpec.indexOf("cmd.exe") > -1) {
    return true;
  }
  return false;
}

// 获取当前文件的路径
/**
 * It returns the path of the currently active file, or undefined if there is no active file
 * @param [uri] - The file path to open.
 * @returns A promise that resolves to a string or undefined.
 */
export async function getTextEditorFilePathByUri(uri?: Uri): Promise<string | undefined> {
  let textEditor: TextEditor | undefined;
  if (uri) {
    textEditor = await window.showTextDocument(uri, {
      preview: false,
    });
  } else {
    textEditor = window.activeTextEditor;
  }

  if (!textEditor) {
    return undefined;
  }
  if (textEditor.document.isDirty && !(await textEditor.document.save())) {
    window.showWarningMessage("请先保存当前文件");
    return undefined;
  }
  return useWsl() ? toWslPath(textEditor.document.uri.fsPath) : textEditor.document.uri.fsPath;
}

// 执行操作系统的指令

export async function sysCall(
  command: string,
  args: string[],
  options: cp.SpawnOptions = { shell: true },
  procInitCallback?,
  procInitCallbackArg?
): Promise<string> {
  return new Promise((resolve: (res: string) => void, reject: (e: Error) => void): void => {
    let result: string = "";
    let childProc: cp.ChildProcess;
    if (useVscodeNode() && command == "node") {
      let newargs: string[] = [];
      command = args[0];
      for (let arg_index = 1; arg_index < args.length; arg_index++) {
        newargs.push(args[arg_index]);
      }
      let new_opt = { silent: true, ...options, env: createEnvOption() };
      childProc = cp.fork(command, newargs, new_opt);
    } else {
      childProc = cp.spawn(command, args, {
        ...options,
        env: createEnvOption(),
      });
    }

    childProc.stdout?.on("data", (data: string | Buffer) => {
      data = data.toString();
      result = result.concat(data);
      BABA.getProxy(BabaStr.LogOutputProxy).get_log().append(data);
    });

    childProc.stderr?.on("data", (data: string | Buffer) =>
      BABA.getProxy(BabaStr.LogOutputProxy).get_log().append(data.toString())
    );

    childProc.on("error", reject);

    childProc.on("close", (code: number) => {
      let try_result_json;
      try {
        try_result_json = JSON.parse(result);
      } catch (e) {
        try_result_json;
      }
      if (code !== 0 || (try_result_json ? try_result_json.code < 0 : result.indexOf("ERROR") > -1)) {
        const error = new Error(
          `Command "${command} ${args.toString()}" failed with exit code "${code}". ${result || ""}`
        );
        reject(error);
      } else {
        resolve(result);
      }
    });

    if (procInitCallback != undefined) {
      procInitCallback(procInitCallbackArg, childProc, resolve, reject);
    }
  });
}

function childLCPTCTX(): string {
  return JSON.stringify(BABA.getProxy(BabaStr.LogOutputProxy).get_log().getLCPTCTXAll());
}

// clone process.env and add http proxy
export function createEnvOption(): {} {
  const proxy: string | undefined = getHttpAgent();
  const env: any = Object.create(process.env);
  if (proxy) {
    env.http_proxy = proxy;
    return env;
  }
  env.ccagml = childLCPTCTX();
  return env;
}

function getHttpAgent(): string | undefined {
  return vscode.workspace.getConfiguration("http").get<string>("proxy");
}
