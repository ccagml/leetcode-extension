// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import * as vscode from "vscode";
import { leetCodeExecutor } from "../leetCodeExecutor";
import { leetCodeManager } from "../leetCodeManager";
import { IProblem, ProblemState, RootNodeSort, UserStatus } from "../shared";
import { isUseEndpointTranslation } from "../utils/configUtils";
import { DialogType, promptForOpenOutputChannel } from "../utils/uiUtils";
import { leetCodeTreeDataProvider } from "../explorer/LeetCodeTreeDataProvider";
import { resourcesData } from "../ResourcesData";

export async function listProblems(): Promise<IProblem[]> {
    try {
        if (leetCodeManager.getStatus() === UserStatus.SignedOut) {
            return [];
        }
        const leetCodeConfig: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration("leetcode-problem-rating");
        const showLocked: boolean = !!leetCodeConfig.get<boolean>("showLocked");
        const useEndpointTranslation: boolean = isUseEndpointTranslation();
        const result: string = await leetCodeExecutor.listProblems(showLocked, useEndpointTranslation);
        const all_problem_info = JSON.parse(result);
        const problems: IProblem[] = [];
        const AllScoreData = leetCodeTreeDataProvider.getScoreData();
        for (const p of all_problem_info) {
            problems.push({
                id: p.fid,
                qid: p.id,
                isFavorite: p.starred,
                locked: p.locked,
                state: parseProblemState(p.state),
                name: p.name,
                difficulty: p.level,
                passRate: p.percent,
                companies: p.companies || [],
                tags: resourcesData.getTagsData(p.fid) || ["Unknown"],
                scoreData: AllScoreData.get(p.fid),
                isSearchResult: false,
                input: "",
                rootNodeSortId: RootNodeSort.ZERO,
                todayData: undefined,
            });
        }
        return problems.reverse();
    } catch (error) {
        await promptForOpenOutputChannel("Failed to list problems. Please open the output channel for details.", DialogType.error);
        return [];
    }
}

function parseProblemState(stateOutput: string): ProblemState {
    if (!stateOutput) {
        return ProblemState.Unknown;
    }
    switch (stateOutput.trim()) {
        case "v":
        case "✔":
        case "√":
        case "ac":
            return ProblemState.AC;
        case "X":
        case "✘":
        case "×":
        case "notac":
            return ProblemState.NotAC;
        default:
            return ProblemState.Unknown;
    }
}
