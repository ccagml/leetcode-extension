/*
 * Filename: https://github.com/ccagml/vscode-leetcode-problem-rating/src/service/FileButtonService.ts
 * Path: https://github.com/ccagml/vscode-leetcode-problem-rating
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import * as vscode from "vscode";
import { treeViewController } from "../controller/TreeViewController";
import { NodeModel } from "../model/NodeModel";
import { getEditorShortcuts } from "../utils/ConfigUtils";

export class FileButtonService implements vscode.CodeLensProvider {

    private onDidChangeCodeLensesEmitter: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();

    get onDidChangeCodeLenses(): vscode.Event<void> {
        return this.onDidChangeCodeLensesEmitter.event;
    }

    public refresh(): void {
        this.onDidChangeCodeLensesEmitter.fire();
    }

    public provideCodeLenses(document: vscode.TextDocument): vscode.ProviderResult<vscode.CodeLens[]> {
        const shortcuts: string[] = getEditorShortcuts();
        if (!shortcuts) {
            return;
        }

        const content: string = document.getText();
        const matchResult: RegExpMatchArray | null = content.match(/@lc app=.* id=(.*) lang=.*/);
        if (!matchResult) {
            return undefined;
        }
        const nodeId: string | undefined = matchResult[1];
        let node: NodeModel | undefined;
        if (nodeId) {
            node = treeViewController.getNodeById(nodeId);
        }

        let codeLensLine: number = document.lineCount - 1;
        for (let i: number = document.lineCount - 1; i >= 0; i--) {
            const lineContent: string = document.lineAt(i).text;
            if (lineContent.indexOf("@lc code=end") >= 0) {
                codeLensLine = i;
                break;
            }
        }

        const range: vscode.Range = new vscode.Range(codeLensLine, 0, codeLensLine, 0);
        const codeLens: vscode.CodeLens[] = [];

        if (shortcuts.indexOf("submit") >= 0) {
            codeLens.push(new vscode.CodeLens(range, {
                title: "Submit",
                command: "leetcode.submitSolution",
                arguments: [document.uri],
            }));
        }

        if (shortcuts.indexOf("case") >= 0) {
            codeLens.push(new vscode.CodeLens(range, {
                title: "case",
                command: "leetcode.testSolutionDefault",
                arguments: [document.uri, false],
            }));
        }
        if (shortcuts.indexOf("allcase") >= 0) {
            codeLens.push(new vscode.CodeLens(range, {
                title: "allcase",
                command: "leetcode.testSolutionDefault",
                arguments: [document.uri, true],
            }));
        }

        if (shortcuts.indexOf("test") >= 0) {
            codeLens.push(new vscode.CodeLens(range, {
                title: "Test",
                command: "leetcode.testSolution",
                arguments: [document.uri],
            }));
        }

        if (shortcuts.indexOf("star") >= 0 && node) {
            codeLens.push(new vscode.CodeLens(range, {
                title: node.isFavorite ? "Unstar" : "Star",
                command: node.isFavorite ? "leetcode.removeFavorite" : "leetcode.addFavorite",
                arguments: [node],
            }));
        }

        if (shortcuts.indexOf("solution") >= 0) {
            codeLens.push(new vscode.CodeLens(range, {
                title: "Solution",
                command: "leetcode.showSolution",
                arguments: [document.uri],
            }));
        }

        if (shortcuts.indexOf("description") >= 0) {
            codeLens.push(new vscode.CodeLens(range, {
                title: "Description",
                command: "leetcode.previewProblem",
                arguments: [document.uri],
            }));
        }

        return codeLens;
    }
}

export const fileButtonService: FileButtonService = new FileButtonService();
