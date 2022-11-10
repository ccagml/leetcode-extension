// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import * as _ from "lodash";
import * as path from "path";
import * as unescapeJS from "unescape-js";
import * as vscode from "vscode";
import { explorerNodeManager } from "../explorer/explorerNodeManager";
import { LeetCodeNode } from "../explorer/LeetCodeNode";
import { logOutput } from "../utils/logOutput";
import { leetCodeExecutor } from "../leetCodeExecutor";
import { leetCodeManager } from "../leetCodeManager";
import { IProblem, IQuickItemEx, languages, ProblemState, SearchNode, SearchSetType, userContestRankingObj, userContestRanKingBase } from "../shared";
import { leetCodeTreeDataProvider } from "../explorer/LeetCodeTreeDataProvider";
import { genFileExt, genFileName, getNodeIdFromFile } from "../utils/problemUtils";
import * as settingUtils from "../utils/configUtils";
import { IDescriptionConfiguration } from "../utils/configUtils";
import { DialogOptions, DialogType, openSettingsEditor, promptForOpenOutputChannel, promptForSignIn, promptHintMessage } from "../utils/uiUtils";
import { getActiveFilePath, selectWorkspaceFolder } from "../utils/workspaceUtils";
import * as wsl from "../utils/wslUtils";
import { leetCodePreviewProvider } from "../webview/leetCodePreviewProvider";
import { leetCodeSolutionProvider } from "../webview/leetCodeSolutionProvider";
import { getPickOneByRankRangeMin, getPickOneByRankRangeMax } from "../utils/configUtils";
import * as list from "./list";
import { getLeetCodeEndpoint } from "./plugin";

export async function previewProblem(input: IProblem | vscode.Uri, isSideMode: boolean = false): Promise<void> {
    let node: IProblem;
    if (input instanceof vscode.Uri) {
        const activeFilePath: string = input.fsPath;
        const id: string = await getNodeIdFromFile(activeFilePath);
        if (!id) {
            vscode.window.showErrorMessage(`Failed to resolve the problem id from file: ${activeFilePath}.`);
            return;
        }
        const cachedNode: IProblem | undefined = explorerNodeManager.getNodeById(id);
        if (!cachedNode) {
            vscode.window.showErrorMessage(`Failed to resolve the problem with id: ${id}.`);
            return;
        }
        node = cachedNode;
        // Move the preview page aside if it's triggered from Code Lens
        isSideMode = true;
    } else {
        node = input;
    }
    const needTranslation: boolean = settingUtils.isUseEndpointTranslation();
    const descString: string = await leetCodeExecutor.getDescription(node.qid, needTranslation);
    leetCodePreviewProvider.show(descString, node, isSideMode);
}

export async function deleteAllCache(): Promise<void> {
    await leetCodeManager.signOut();
    await leetCodeExecutor.removeOldCache();
    await leetCodeExecutor.switchEndpoint(getLeetCodeEndpoint());
    await leetCodeTreeDataProvider.refresh()
}


export async function pickOne(): Promise<void> {
    const problems: IProblem[] = await list.listProblems();
    var randomProblem: IProblem;

    const user_score = leetCodeManager.getUserContestScore()
    if (user_score > 0) {

        let min_score: number = getPickOneByRankRangeMin();
        let max_score: number = getPickOneByRankRangeMax();
        let temp_problems: IProblem[] = new Array();
        const need_min = user_score + min_score;
        const need_max = user_score + max_score;
        problems.forEach(element => {
            if (element.scoreData?.Rating) {
                if (element.scoreData.Rating >= need_min && element.scoreData.Rating <= need_max) {
                    temp_problems.push(element);
                }
            }
        });
        randomProblem = temp_problems[Math.floor(Math.random() * temp_problems.length)];

    } else {
        randomProblem = problems[Math.floor(Math.random() * problems.length)];
    }
    if (randomProblem) {
        await showProblemInternal(randomProblem);
    }
}
export async function searchScoreRange(): Promise<void> {
    const twoFactor: string | undefined = await vscode.window.showInputBox({
        prompt: "输入分数范围 低分-高分 例如: 1500-1600",
        ignoreFocusOut: true,
        validateInput: (s: string): string | undefined => s && s.trim() ? undefined : "The input must not be empty",
    });

    // vscode.window.showErrorMessage(twoFactor || "输入错误");
    const tt = Object.assign({}, SearchNode, {
        value: twoFactor,
        type: SearchSetType.ScoreRange,
        time: Math.floor(Date.now() / 1000)
    })
    explorerNodeManager.insertSearchSet(tt);
    await leetCodeTreeDataProvider.refresh()
}

export async function searchContest(): Promise<void> {
    const twoFactor: string | undefined = await vscode.window.showInputBox({
        prompt: "单期数 例如: 300 或者 输入期数范围 低期数-高期数 例如: 303-306",
        ignoreFocusOut: true,
        validateInput: (s: string): string | undefined => s && s.trim() ? undefined : "The input must not be empty",
    });

    // vscode.window.showErrorMessage(twoFactor || "输入错误");
    const tt = Object.assign({}, SearchNode, {
        value: twoFactor,
        type: SearchSetType.Context,
        time: Math.floor(Date.now() / 1000)
    })
    explorerNodeManager.insertSearchSet(tt);
    await leetCodeTreeDataProvider.refresh()
}

export async function showProblem(node?: LeetCodeNode): Promise<void> {
    if (!node) {
        return;
    }
    await showProblemInternal(node);
}


export async function searchProblemByID(): Promise<void> {
    if (!leetCodeManager.getUser()) {
        promptForSignIn();
        return;
    }
    const choice: IQuickItemEx<IProblem> | undefined = await vscode.window.showQuickPick(
        parseProblemsToPicks(list.listProblems()),
        {
            matchOnDetail: true,
            matchOnDescription: true,
            placeHolder: "Select one problem",
        },
    );
    if (!choice) {
        return;
    }
    await showProblemInternal(choice.value);
}


export async function searchProblem(): Promise<void> {
    if (!leetCodeManager.getUser()) {
        promptForSignIn();
        return;
    }

    const picks: Array<IQuickItemEx<string>> = [];
    picks.push(
        {
            label: `题目id查询`,
            detail: `通过题目id查询`,
            value: `byid`,
        },
        {
            label: `分数范围查询`,
            detail: `例如 1500-1600`,
            value: `range`,
        },
        {
            label: `周赛期数查询`,
            detail: `周赛期数查询`,
            value: `contest`,
        },
        // {
        //     label: `测试api`,
        //     detail: `测试api`,
        //     value: `testapi`,
        // }
        // ,
        // {
        //     label: `每日一题`,
        //     detail: `每日一题`,
        //     value: `today`,
        // },
        // {
        //     label: `查询自己竞赛信息`,
        //     detail: `查询自己竞赛信息`,
        //     value: `userContest`,
        // }
    );
    const choice: IQuickItemEx<string> | undefined = await vscode.window.showQuickPick(
        picks,
        { title: "选择查询选项" },
    );
    if (!choice) {
        return
    }
    if (choice.value == "byid") {
        await searchProblemByID();
    } else if (choice.value == "range") {
        await searchScoreRange();
    } else if (choice.value == "contest") {
        await searchContest();
    } else if (choice.value == "today") {
        await searchToday();
    } else if (choice.value == "userContest") {
        await searchUserContest();
    } else if (choice.value == "testapi") {
        await testapi();
    }

}

export async function testapi(): Promise<void> {
    if (!leetCodeManager.getUser()) {
        promptForSignIn();
        return;
    }
    try {
        const twoFactor: string | undefined = await vscode.window.showInputBox({
            prompt: "测试数据",
            ignoreFocusOut: true,
            validateInput: (s: string): string | undefined => s && s.trim() ? undefined : "The input must not be empty",
        });

        // vscode.window.showErrorMessage(twoFactor || "输入错误");
        const solution: string = await leetCodeExecutor.getTestApi(twoFactor || "")
        const query_result = JSON.parse(solution);
        console.log(query_result);
    } catch (error) {
        logOutput.appendLine(error.toString());
        await promptForOpenOutputChannel("Failed to fetch today question. Please open the output channel for details.", DialogType.error);
    }
}

export async function searchUserContest(): Promise<void> {
    if (!leetCodeManager.getUser()) {
        promptForSignIn();
        return;
    }
    try {
        const needTranslation: boolean = settingUtils.isUseEndpointTranslation();
        const solution: string = await leetCodeExecutor.getUserContest(needTranslation, leetCodeManager.getUser() || "");
        const query_result = JSON.parse(solution);
        const tt: userContestRanKingBase = Object.assign({}, userContestRankingObj, query_result.userContestRanking)
        await leetCodeManager.insertCurrentUserContestInfo(tt);
        leetCodeManager.emit("searchUserContest")
    } catch (error) {
        logOutput.appendLine(error.toString());
        await promptForOpenOutputChannel("Failed to fetch today question. Please open the output channel for details.", DialogType.error);
    }
}
export async function searchToday(): Promise<void> {
    if (!leetCodeManager.getUser()) {
        promptForSignIn();
        return;
    }
    try {
        const needTranslation: boolean = settingUtils.isUseEndpointTranslation();
        const solution: string = await leetCodeExecutor.getTodayQuestion(needTranslation);
        const query_result = JSON.parse(solution);
        // const titleSlug: string = query_result.titleSlug
        // const questionId: string = query_result.questionId
        const fid: string = query_result.fid
        if (fid) {
            const tt = Object.assign({}, SearchNode, {
                value: fid,
                type: SearchSetType.Day,
                time: Math.floor(Date.now() / 1000),
                todayData: query_result,
            })
            explorerNodeManager.insertSearchSet(tt);
            await leetCodeTreeDataProvider.refresh()
        }

    } catch (error) {
        logOutput.appendLine(error.toString());
        await promptForOpenOutputChannel("Failed to fetch today question. Please open the output channel for details.", DialogType.error);
    }
}


export async function showSolution(input: LeetCodeNode | vscode.Uri): Promise<void> {
    let problemInput: string | undefined;
    if (input instanceof LeetCodeNode) { // Triggerred from explorer
        problemInput = input.qid;
    } else if (input instanceof vscode.Uri) { // Triggerred from Code Lens/context menu
        if (wsl.useVscodeNode()) {
            problemInput = `${input.fsPath}`;
        } else {
            problemInput = `"${input.fsPath}"`;
            if (wsl.useWsl()) {
                problemInput = await wsl.toWslPath(input.fsPath);
            }
        }
    } else if (!input) { // Triggerred from command
        problemInput = await getActiveFilePath();
    }

    if (!problemInput) {
        vscode.window.showErrorMessage("Invalid input to fetch the solution data.");
        return;
    }

    const language: string | undefined = await fetchProblemLanguage();
    if (!language) {
        return;
    }
    try {
        const needTranslation: boolean = settingUtils.isUseEndpointTranslation();
        const solution: string = await leetCodeExecutor.showSolution(problemInput, language, needTranslation);
        leetCodeSolutionProvider.show(unescapeJS(solution));
    } catch (error) {
        logOutput.appendLine(error.toString());
        await promptForOpenOutputChannel("Failed to fetch the top voted solution. Please open the output channel for details.", DialogType.error);
    }
}

async function fetchProblemLanguage(): Promise<string | undefined> {
    const leetCodeConfig: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration("leetcode-problem-rating");
    let defaultLanguage: string | undefined = leetCodeConfig.get<string>("defaultLanguage");
    if (defaultLanguage && languages.indexOf(defaultLanguage) < 0) {
        defaultLanguage = undefined;
    }
    const language: string | undefined = defaultLanguage || await vscode.window.showQuickPick(languages, { placeHolder: "Select the language you want to use", ignoreFocusOut: true });
    // fire-and-forget default language query
    (async (): Promise<void> => {
        if (language && !defaultLanguage && leetCodeConfig.get<boolean>("hint.setDefaultLanguage")) {
            const choice: vscode.MessageItem | undefined = await vscode.window.showInformationMessage(
                `Would you like to set '${language}' as your default language?`,
                DialogOptions.yes,
                DialogOptions.no,
                DialogOptions.never,
            );
            if (choice === DialogOptions.yes) {
                leetCodeConfig.update("defaultLanguage", language, true /* UserSetting */);
            } else if (choice === DialogOptions.never) {
                leetCodeConfig.update("hint.setDefaultLanguage", false, true /* UserSetting */);
            }
        }
    })();
    return language;
}

async function showProblemInternal(node: IProblem): Promise<void> {
    try {
        const language: string | undefined = await fetchProblemLanguage();
        if (!language) {
            return;
        }

        const leetCodeConfig: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration("leetcode-problem-rating");
        const workspaceFolder: string = await selectWorkspaceFolder();
        if (!workspaceFolder) {
            return;
        }

        const fileFolder: string = leetCodeConfig
            .get<string>(`filePath.${language}.folder`, leetCodeConfig.get<string>(`filePath.default.folder`, ""))
            .trim();
        const fileName: string = leetCodeConfig
            .get<string>(
                `filePath.${language}.filename`,
                leetCodeConfig.get<string>(`filePath.default.filename`) || genFileName(node, language),
            )
            .trim();

        let finalPath: string = path.join(workspaceFolder, fileFolder, fileName);

        if (finalPath) {
            finalPath = await resolveRelativePath(finalPath, node, language);
            if (!finalPath) {
                logOutput.appendLine("Showing problem canceled by user.");
                return;
            }
        }

        finalPath = wsl.useWsl() ? await wsl.toWinPath(finalPath) : finalPath;

        const descriptionConfig: IDescriptionConfiguration = settingUtils.getDescriptionConfiguration();
        const needTranslation: boolean = settingUtils.isUseEndpointTranslation();

        await leetCodeExecutor.showProblem(node, language, finalPath, descriptionConfig.showInComment, needTranslation);
        const promises: any[] = [
            vscode.window.showTextDocument(vscode.Uri.file(finalPath), { preview: false, viewColumn: vscode.ViewColumn.One }),
            promptHintMessage(
                "hint.commentDescription",
                'You can config how to show the problem description through "leetcode.showDescription".',
                "Open settings",
                (): Promise<any> => openSettingsEditor("leetcode.showDescription"),
            ),
        ];
        if (descriptionConfig.showInWebview) {
            promises.push(showDescriptionView(node));
        }

        await Promise.all(promises);
    } catch (error) {
        await promptForOpenOutputChannel(`${error} Please open the output channel for details.`, DialogType.error);
    }
}

async function showDescriptionView(node: IProblem): Promise<void> {
    return previewProblem(node, vscode.workspace.getConfiguration("leetcode-problem-rating").get<boolean>("enableSideMode", true));
}
async function parseProblemsToPicks(p: Promise<IProblem[]>): Promise<Array<IQuickItemEx<IProblem>>> {
    return new Promise(async (resolve: (res: Array<IQuickItemEx<IProblem>>) => void): Promise<void> => {
        const picks: Array<IQuickItemEx<IProblem>> = (await p).map((problem: IProblem) => Object.assign({}, {
            label: `${parseProblemDecorator(problem.state, problem.locked)}${problem.id}.${problem.name}`,
            description: `QID:${problem.qid}`,
            detail: ((problem.scoreData?.score || "0") > "0" ? ("score: " + problem.scoreData?.score + " , ") : "") + `AC rate: ${problem.passRate}, Difficulty: ${problem.difficulty}`,
            value: problem,
        }));
        resolve(picks);
    });
}

function parseProblemDecorator(state: ProblemState, locked: boolean): string {
    switch (state) {
        case ProblemState.AC:
            return "$(check) ";
        case ProblemState.NotAC:
            return "$(x) ";
        default:
            return locked ? "$(lock) " : "";
    }
}

async function resolveRelativePath(relativePath: string, node: IProblem, selectedLanguage: string): Promise<string> {
    let tag: string = "";
    if (/\$\{tag\}/i.test(relativePath)) {
        tag = (await resolveTagForProblem(node)) || "";
    }

    let company: string = "";
    if (/\$\{company\}/i.test(relativePath)) {
        company = (await resolveCompanyForProblem(node)) || "";
    }

    return relativePath.replace(/\$\{(.*?)\}/g, (_substring: string, ...args: string[]) => {
        const placeholder: string = args[0].toLowerCase().trim();
        switch (placeholder) {
            case "id":
                return node.id;
            case "name":
                return node.name;
            case "camelcasename":
                return _.camelCase(node.name);
            case "pascalcasename":
                return _.upperFirst(_.camelCase(node.name));
            case "kebabcasename":
            case "kebab-case-name":
                return _.kebabCase(node.name);
            case "snakecasename":
            case "snake_case_name":
                return _.snakeCase(node.name);
            case "ext":
                return genFileExt(selectedLanguage);
            case "language":
                return selectedLanguage;
            case "difficulty":
                return node.difficulty.toLocaleLowerCase();
            case "tag":
                return tag;
            case "company":
                return company;
            default:
                const errorMsg: string = `The config '${placeholder}' is not supported.`;
                logOutput.appendLine(errorMsg);
                throw new Error(errorMsg);
        }
    });
}

async function resolveTagForProblem(problem: IProblem): Promise<string | undefined> {
    if (problem.tags.length === 1) {
        return problem.tags[0];
    }
    return await vscode.window.showQuickPick(
        problem.tags,
        {
            matchOnDetail: true,
            placeHolder: "Multiple tags available, please select one",
            ignoreFocusOut: true,
        },
    );
}

async function resolveCompanyForProblem(problem: IProblem): Promise<string | undefined> {
    if (problem.companies.length === 1) {
        return problem.companies[0];
    }
    return await vscode.window.showQuickPick(problem.companies, {
        matchOnDetail: true,
        placeHolder: "Multiple tags available, please select one",
        ignoreFocusOut: true,
    });
}
