// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import * as vscode from "vscode";
import { executeCommand } from "./cliUtils";
import { isWindows } from "./osUtils";

// 用wsl命令的时候,好像没办法用vscode的node
// 相当于使用fork,而不是之前的 spawn(node xxx
export function useVscodeNode(): boolean {
    const leetCodeConfig: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration("leetcode-problem-rating");
    return !useWsl() && leetCodeConfig.get<boolean>("useVscodeNode") === true;
}

export function useWsl(): boolean {
    const leetCodeConfig: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration("leetcode-problem-rating");
    return isWindows() && leetCodeConfig.get<boolean>("useWsl") === true;
}

export async function toWslPath(path: string): Promise<string> {
    return (await executeCommand("wsl", ["wslpath", "-u", `"${path.replace(/\\/g, "/")}"`])).trim();
}

export async function toWinPath(path: string): Promise<string> {
    if (path.startsWith("\\mnt\\")) {
        return (await executeCommand("wsl", ["wslpath", "-w", `"${path.replace(/\\/g, "/").substr(0, 6)}"`])).trim() + path.substr(7);
    }
    return (await executeCommand("wsl", ["wslpath", "-w", "/"])).trim() + path;
}
