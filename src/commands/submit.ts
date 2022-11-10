// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import * as vscode from "vscode";
import { treeDataService } from "../service/TreeDataService";
import { executeService } from "../service/ExecuteService";
import { eventContorller } from "../controller/EventController";
import { DialogType, promptForOpenOutputChannel, promptForSignIn } from "../utils/uiUtils";
import { getActiveFilePath } from "../utils/workspaceUtils";
import { submissionService } from "../service/SubmissionService";
import { statusBarService } from "../service/StatusBarService";

export async function submitSolution(uri?: vscode.Uri): Promise<void> {
    if (!statusBarService.getUser()) {
        promptForSignIn();
        return;
    }

    const filePath: string | undefined = await getActiveFilePath(uri);
    if (!filePath) {
        return;
    }

    try {
        const result: string = await executeService.submitSolution(filePath);
        submissionService.show(result);
        eventContorller.emit("submit", submissionService.getSubmitEvent());
    } catch (error) {
        await promptForOpenOutputChannel("Failed to submit the solution. Please open the output channel for details.", DialogType.error);
        return;
    }

    treeDataService.refresh();
}
