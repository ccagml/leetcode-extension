// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import { workspace, WorkspaceConfiguration } from "vscode";
import { DescriptionConfiguration, IProblem } from "../shared";

export function getWorkspaceConfiguration(): WorkspaceConfiguration {
    return workspace.getConfiguration("leetcode-problem-rating");
}

export function shouldHideSolvedProblem(): boolean {
    return getWorkspaceConfiguration().get<boolean>("hideSolved", false);
}


export function shouldHideScoreProblem(problem: IProblem, user_score: number): boolean {
    // "None",
    // "Score",
    // "NoScore",
    // "ScoreRange"
    const config_value: string = getWorkspaceConfiguration().get<string>("hideScore", "None");
    switch (config_value) {
        case "Score":
            if ((problem?.scoreData?.Rating || 0) > 0) {
                return true;
            }
            break;
        case "NoScore":
            if ((problem?.scoreData?.Rating || 0) == 0) {
                return true;
            }
            break;
        case "ScoreRange":
            const min_v = getPickOneByRankRangeMin();
            const max_v = getPickOneByRankRangeMax();
            const p_score = problem?.scoreData?.Rating || 0;
            const u_score = user_score > 0 ? user_score : 1500;
            if (p_score < u_score + min_v) {
                return true;
            }
            if (p_score > u_score + max_v) {
                return true;
            }
            break;
        default:
            break;
    }
    return false;
}

export function getPickOneByRankRangeMin(): number {
    return getWorkspaceConfiguration().get<number>("pickOneByRankRangeMin") || 50;
}
export function getPickOneByRankRangeMax(): number {
    return getWorkspaceConfiguration().get<number>("pickOneByRankRangeMax") || 150;
}

export function getWorkspaceFolder(): string {
    return getWorkspaceConfiguration().get<string>("workspaceFolder", "");
}

export function getEditorShortcuts(): string[] {
    return getWorkspaceConfiguration().get<string[]>("editor.shortcuts", ["submit", "test"]);
}

export function hasStarShortcut(): boolean {
    const shortcuts: string[] = getWorkspaceConfiguration().get<string[]>("editor.shortcuts", ["submit", "test"]);
    return shortcuts.indexOf("star") >= 0;
}

export function shouldUseEndpointTranslation(): boolean {
    return getWorkspaceConfiguration().get<boolean>("useEndpointTranslation", true);
}

export function getDescriptionConfiguration(): IDescriptionConfiguration {
    const setting: string = getWorkspaceConfiguration().get<string>("showDescription", DescriptionConfiguration.InWebView);
    const config: IDescriptionConfiguration = {
        showInComment: false,
        showInWebview: true,
    };
    switch (setting) {
        case DescriptionConfiguration.Both:
            config.showInComment = true;
            config.showInWebview = true;
            break;
        case DescriptionConfiguration.None:
            config.showInComment = false;
            config.showInWebview = false;
            break;
        case DescriptionConfiguration.InFileComment:
            config.showInComment = true;
            config.showInWebview = false;
            break;
        case DescriptionConfiguration.InWebView:
            config.showInComment = false;
            config.showInWebview = true;
            break;
    }

    // To be compatible with the deprecated setting:
    if (getWorkspaceConfiguration().get<boolean>("showCommentDescription")) {
        config.showInComment = true;
    }

    return config;
}

export interface IDescriptionConfiguration {
    showInComment: boolean;
    showInWebview: boolean;
}
