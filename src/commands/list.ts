// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import * as vscode from "vscode";
import { leetCodeExecutor } from "../leetCodeExecutor";
import { leetCodeManager } from "../leetCodeManager";
import { IProblem, ProblemState, RootNodeSort, UserStatus } from "../shared";
import * as settingUtils from "../utils/settingUtils";
import { DialogType, promptForOpenOutputChannel } from "../utils/uiUtils";
import { leetCodeTreeDataProvider } from "../explorer/LeetCodeTreeDataProvider";

export async function listProblems(): Promise<IProblem[]> {
    try {
        if (leetCodeManager.getStatus() === UserStatus.SignedOut) {
            return [];
        }
        const leetCodeConfig: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration("leetcode-problem-rating");
        const showLocked: boolean = !!leetCodeConfig.get<boolean>("showLocked");
        const useEndpointTranslation: boolean = settingUtils.shouldUseEndpointTranslation();
        const result: string = await leetCodeExecutor.listProblems(showLocked, useEndpointTranslation);
        const all_problem_info = JSON.parse(result);
        const problems: IProblem[] = [];
        // const lines: string[] = result.split("\n");
        // const reg: RegExp = /^(.)\s(.{1,2})\s(.)\s\[\s*(\d*)\s*\]\s*(.*)\s*(Easy|Medium|Hard)\s*\((\s*\d+\.\d+ %)\)/;
        // const { companies, tags } = await leetCodeExecutor.getCompaniesAndTags();
        const AllScoreData = leetCodeTreeDataProvider.getScoreData();
        for (const p of all_problem_info) {
            // console.log(p)
            problems.push({
                id: p.fid,
                qid: p.id,
                isFavorite: p.starred,
                locked: p.locked,
                state: parseProblemState(p.state),
                name: p.name,
                difficulty: p.level,
                passRate: p.percent,
                companies: p.companies || ["Unknown"],
                tags: p.tags || ["Unknown"],
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
