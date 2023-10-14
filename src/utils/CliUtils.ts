/*
 * Filename: https://github.com/ccagml/leetcode-extension/src/utils/cliUtils.ts
 * Path: https://github.com/ccagml/leetcode-extension
 * Created Date: Monday, October 31st 2022, 10:16:47 am
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import * as cp from "child_process";
import * as vscode from "vscode";
import { BABA, BabaStr } from "../BABA";
import * as systemUtils from "./SystemUtils";

interface IExecError extends Error {
  result?: string;
}

export async function executeCommand(
  command: string,
  args: string[],
  options: cp.SpawnOptions = { shell: true }
): Promise<string> {
  return new Promise((resolve: (res: string) => void, reject: (e: Error) => void): void => {
    let result: string = "";
    let childProc: cp.ChildProcess;
    if (systemUtils.useVscodeNode() && command == "node") {
      let newargs: string[] = [];
      command = args[0];
      for (let arg_index = 1; arg_index < args.length; arg_index++) {
        newargs.push(args[arg_index]);
      }
      let new_opt = { silent: true, ...options, env: createEnvOption() };
      if (false) {
        new_opt["execArgv"] = ["--inspect=43210"];
      }
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
        const error: IExecError = new Error(`Command "${command} ${args.toString()}" failed with exit code "${code}".`);
        if (result) {
          error.result = result;
        }
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

export async function executeCommandWithProgress(
  message: string,
  command: string,
  args: string[],
  options: cp.SpawnOptions = { shell: true }
): Promise<string> {
  let result: string = "";
  await vscode.window.withProgress(
    { location: vscode.ProgressLocation.Notification },
    async (p: vscode.Progress<{}>) => {
      return new Promise<void>(async (resolve: () => void, reject: (e: Error) => void): Promise<void> => {
        p.report({ message });
        try {
          result = await executeCommand(command, args, options);
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    }
  );
  return result;
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
