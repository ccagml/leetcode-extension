/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/extension.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
 * Created Date: Monday, October 31st 2022, 10:16:47 am
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */


import { ExtensionContext, window, commands, Uri } from "vscode";
import { fileButtonController } from "./controller/FileButtonController";
import { switchDefaultLanguage } from "./commands/language";
import * as plugin from "./commands/plugin";
import * as show from "./controller/ShowController";
import * as star from "./commands/star";
import * as submit from "./commands/submit";
import * as test from "./commands/test";
import { treeViewController } from "./controller/TreeViewController";
import { NodeModel } from "./model/NodeModel";
import { treeDataService } from "./service/TreeDataService";
import { treeItemDecorationService } from "./service/TreeItemDecorationService";
import { logOutput } from "./utils/logOutput";
import { executeService } from "./service/ExecuteService";
import { eventContorller } from "./controller/EventController";
import { statusBarService } from "./service/StatusBarService";
import { DialogType, promptForOpenOutputChannel } from "./utils/uiUtils";
import { previewService } from "./service/PreviewService";
import { solutionService } from "./service/SolutionService";
import { submissionService } from "./service/SubmissionService";
import { markdownService } from "./service/MarkdownService";
import { mainContorller } from "./controller/MainController";
import { loginContorller } from "./controller/LoginController";


export async function activate(context: ExtensionContext): Promise<void> {
    try {

        await mainContorller.checkNodeEnv(context);
        eventContorller.add_event();
        mainContorller.initialize(context)

        context.subscriptions.push(
            statusBarService,
            logOutput,
            previewService,
            submissionService,
            solutionService,
            executeService,
            markdownService,
            fileButtonController,
            treeViewController,
            window.registerFileDecorationProvider(treeItemDecorationService),
            window.createTreeView("leetCodeExplorer", { treeDataProvider: treeDataService, showCollapseAll: true }),
            commands.registerCommand("leetcode.deleteCache", () => mainContorller.deleteCache()),
            commands.registerCommand("leetcode.toggleLeetCodeCn", () => plugin.switchEndpoint()),
            commands.registerCommand("leetcode.signin", () => loginContorller.signIn()),
            commands.registerCommand("leetcode.signout", () => loginContorller.signOut()),
            commands.registerCommand("leetcode.previewProblem", (node: NodeModel) => show.previewProblem(node)),
            commands.registerCommand("leetcode.showProblem", (node: NodeModel) => show.showProblem(node)),
            commands.registerCommand("leetcode.pickOne", () => show.pickOne()),
            commands.registerCommand("leetcode.deleteAllCache", () => loginContorller.deleteAllCache()),
            commands.registerCommand("leetcode.searchScoreRange", () => show.searchScoreRange()),
            commands.registerCommand("leetcode.searchProblem", () => show.searchProblem()),
            commands.registerCommand("leetcode.showSolution", (input: NodeModel | Uri) => show.showSolution(input)),
            commands.registerCommand("leetcode.refreshExplorer", () => treeDataService.refresh()),
            commands.registerCommand("leetcode.testSolution", (uri?: Uri) => test.testSolution(uri)),
            commands.registerCommand("leetcode.testSolutionDefault", (uri?: Uri, allCase?: boolean) => test.testSolutionDefault(uri, allCase)),
            commands.registerCommand("leetcode.submitSolution", (uri?: Uri) => submit.submitSolution(uri)),
            commands.registerCommand("leetcode.switchDefaultLanguage", () => switchDefaultLanguage()),
            commands.registerCommand("leetcode.addFavorite", (node: NodeModel) => star.addFavorite(node)),
            commands.registerCommand("leetcode.removeFavorite", (node: NodeModel) => star.removeFavorite(node)),
            commands.registerCommand("leetcode.problems.sort", () => plugin.switchSortingStrategy()),
        );

        await executeService.switchEndpoint(plugin.getLeetCodeEndpoint());
        await loginContorller.getLoginStatus();
    } catch (error) {
        logOutput.appendLine(error.toString());
        promptForOpenOutputChannel("Extension initialization failed. Please open output channel for details.", DialogType.error);
    }
}

export function deactivate(): void {
    // Do nothing.
    if (0) {
        var a = 0;
        console.log(a);
    }
}
