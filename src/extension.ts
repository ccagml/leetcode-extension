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
import { treeViewController } from "./controller/TreeViewController";
import { NodeModel } from "./model/NodeModel";
import { treeDataService } from "./service/TreeDataService";
import { treeItemDecorationService } from "./service/TreeItemDecorationService";
import { logOutput, promptForOpenOutputChannel } from "./utils/OutputUtils";
import { executeService } from "./service/ExecuteService";
import { eventController } from "./controller/EventController";
import { statusBarService } from "./service/StatusBarService";
import { previewService } from "./service/PreviewService";
import { solutionService } from "./service/SolutionService";
import { submissionService } from "./service/SubmissionService";
import { markdownService } from "./service/MarkdownService";
import { mainContorller } from "./controller/MainController";
import { loginContorller } from "./controller/LoginController";
import { getLeetCodeEndpoint } from "./utils/ConfigUtils";
import { DialogType } from "./model/Model";


export async function activate(context: ExtensionContext): Promise<void> {
    try {

        await mainContorller.checkNodeEnv(context);
        eventController.add_event();
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
            commands.registerCommand("leetcode.toggleLeetCodeCn", () => treeViewController.switchEndpoint()),
            commands.registerCommand("leetcode.signin", () => loginContorller.signIn()),
            commands.registerCommand("leetcode.signout", () => loginContorller.signOut()),
            commands.registerCommand("leetcode.previewProblem", (node: NodeModel) => treeViewController.previewProblem(node)),
            commands.registerCommand("leetcode.showProblem", (node: NodeModel) => treeViewController.showProblem(node)),
            commands.registerCommand("leetcode.pickOne", () => treeViewController.pickOne()),
            commands.registerCommand("leetcode.deleteAllCache", () => loginContorller.deleteAllCache()),
            commands.registerCommand("leetcode.searchScoreRange", () => treeViewController.searchScoreRange()),
            commands.registerCommand("leetcode.searchProblem", () => treeViewController.searchProblem()),
            commands.registerCommand("leetcode.showSolution", (input: NodeModel | Uri) => treeViewController.showSolution(input)),
            commands.registerCommand("leetcode.refreshExplorer", () => treeDataService.refresh()),
            commands.registerCommand("leetcode.testSolution", (uri?: Uri) => treeViewController.testSolution(uri)),
            commands.registerCommand("leetcode.testSolutionDefault", (uri?: Uri, allCase?: boolean) => treeViewController.testSolutionDefault(uri, allCase)),
            commands.registerCommand("leetcode.submitSolution", (uri?: Uri) => treeViewController.submitSolution(uri)),
            commands.registerCommand("leetcode.switchDefaultLanguage", () => treeViewController.switchDefaultLanguage()),
            commands.registerCommand("leetcode.addFavorite", (node: NodeModel) => treeViewController.addFavorite(node)),
            commands.registerCommand("leetcode.removeFavorite", (node: NodeModel) => treeViewController.removeFavorite(node)),
            commands.registerCommand("leetcode.problems.sort", () => treeViewController.switchSortingStrategy()),
        );

        await executeService.switchEndpoint(getLeetCodeEndpoint());
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
