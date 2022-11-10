/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/utils/configUtils.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */


import { workspace, WorkspaceConfiguration } from "vscode";
import { DescriptionConfiguration, IProblem } from "../model/Model";

// vscode的配置
export function getVsCodeConfig(): WorkspaceConfiguration {
    return workspace.getConfiguration("leetcode-problem-rating");
}

// 隐藏解决题目
export function isHideSolvedProblem(): boolean {
    return getVsCodeConfig().get<boolean>("hideSolved", false);
}

// 隐藏分数
export function isHideScoreProblem(problem: IProblem, user_score: number): boolean {
    // "None",
    // "Score",
    // "NoScore",
    // "ScoreRange"
    const config_value: string = getVsCodeConfig().get<string>("hideScore", "None");
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

// 随机题目最小分数
export function getPickOneByRankRangeMin(): number {
    return getVsCodeConfig().get<number>("pickOneByRankRangeMin") || 50;
}
// 随机题目最大分数
export function getPickOneByRankRangeMax(): number {
    return getVsCodeConfig().get<number>("pickOneByRankRangeMax") || 150;
}
// 工作目录
export function getWorkspaceFolder(): string {
    return getVsCodeConfig().get<string>("workspaceFolder", "");
}

// 快捷操作
export function getEditorShortcuts(): string[] {
    return getVsCodeConfig().get<string[]>("editor.shortcuts", ["submit", "case", "allcase", "test", "solution"]);
}

export function isStarShortcut(): boolean {
    const shortcuts: string[] = getVsCodeConfig().get<string[]>("editor.shortcuts", ["submit", "case", "allcase", "test", "solution"]);
    return shortcuts.indexOf("star") >= 0;
}

export function isUseEndpointTranslation(): boolean {
    return getVsCodeConfig().get<boolean>("useEndpointTranslation", true);
}

// 状态栏状态设置
export function enableStatusBar(): boolean {
    return getVsCodeConfig().get<boolean>("enableStatusBar", true);
}

// 展示方式
export function getDescriptionConfiguration(): IDescriptionConfiguration {
    const setting: string = getVsCodeConfig().get<string>("showDescription", DescriptionConfiguration.InWebView);
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
    if (getVsCodeConfig().get<boolean>("showCommentDescription")) {
        config.showInComment = true;
    }

    return config;
}

export interface IDescriptionConfiguration {
    showInComment: boolean;
    showInWebview: boolean;
}
