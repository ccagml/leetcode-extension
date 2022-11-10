// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import * as vscode from "vscode";
import { treeDataService } from "../service/TreeDataService";
import { executeService } from "../service/ExecuteService";
import { IQuickItemEx } from "../model/Model";
import { Endpoint, SortingStrategy } from "../model/Model";
import { DialogType, promptForOpenOutputChannel, promptForSignIn } from "../utils/uiUtils";

export async function switchEndpoint(): Promise<void> {
    const isCnEnabled: boolean = getLeetCodeEndpoint() === Endpoint.LeetCodeCN;
    const picks: Array<IQuickItemEx<string>> = [];
    picks.push(
        {
            label: `${isCnEnabled ? "" : "$(check) "}LeetCode`,
            description: "leetcode.com",
            detail: `Enable LeetCode US`,
            value: Endpoint.LeetCode,
        },
        {
            label: `${isCnEnabled ? "$(check) " : ""}力扣`,
            description: "leetcode.cn",
            detail: `启用中国版 LeetCode`,
            value: Endpoint.LeetCodeCN,
        },
    );
    const choice: IQuickItemEx<string> | undefined = await vscode.window.showQuickPick(picks);
    if (!choice || choice.value === getLeetCodeEndpoint()) {
        return;
    }
    const leetCodeConfig: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration("leetcode-problem-rating");
    try {
        const endpoint: string = choice.value;
        await executeService.switchEndpoint(endpoint);
        await leetCodeConfig.update("endpoint", endpoint, true /* UserSetting */);
        vscode.window.showInformationMessage(`Switched the endpoint to ${endpoint}`);
    } catch (error) {
        await promptForOpenOutputChannel("Failed to switch endpoint. Please open the output channel for details.", DialogType.error);
    }

    try {
        await vscode.commands.executeCommand("leetcode.signout");
        await executeService.deleteCache();
        await promptForSignIn();
    } catch (error) {
        await promptForOpenOutputChannel("Failed to sign in. Please open the output channel for details.", DialogType.error);
    }
}

export function getLeetCodeEndpoint(): string {
    const leetCodeConfig: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration("leetcode-problem-rating");
    return leetCodeConfig.get<string>("endpoint", Endpoint.LeetCodeCN);
}

const SORT_ORDER: SortingStrategy[] = [
    SortingStrategy.None,
    SortingStrategy.AcceptanceRateAsc,
    SortingStrategy.AcceptanceRateDesc,
    SortingStrategy.ScoreAsc,
    SortingStrategy.ScoreDesc,
    SortingStrategy.IDDesc,
];

export async function switchSortingStrategy(): Promise<void> {
    const currentStrategy: SortingStrategy = getSortingStrategy();
    const picks: Array<IQuickItemEx<string>> = [];
    picks.push(
        ...SORT_ORDER.map((s: SortingStrategy) => {
            return {
                label: `${currentStrategy === s ? "$(check)" : "    "} ${s}`,
                value: s,
            };
        }),
    );

    const choice: IQuickItemEx<string> | undefined = await vscode.window.showQuickPick(picks);
    if (!choice || choice.value === currentStrategy) {
        return;
    }

    const leetCodeConfig: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration("leetcode-problem-rating");
    await leetCodeConfig.update("problems.sortStrategy", choice.value, true);
    await treeDataService.refresh();
}

export function getSortingStrategy(): SortingStrategy {
    const leetCodeConfig: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration("leetcode-problem-rating");
    return leetCodeConfig.get<SortingStrategy>("problems.sortStrategy", SortingStrategy.None);
}
