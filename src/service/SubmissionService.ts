/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/service/SubmissionService.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */


import { ViewColumn } from "vscode";
import { openKeybindingsEditor, promptHintMessage } from "../utils/uiUtils";
import { BaseWebViewService } from "./BaseWebviewService";
import { markdownService } from "./MarkdownService";
import { ISubmitEvent } from "../model/Model";
import { IWebViewOption } from "../model/Model";

class SubmissionService extends BaseWebViewService {

    protected readonly viewType: string = "leetcode.submission";
    private result: IResult;

    public show(resultString: string): void {
        this.result = this.parseResult(resultString);
        this.showWebviewInternal();
        this.showKeybindingsHint();
    }
    public getSubmitEvent(): ISubmitEvent {
        return this.result.system_message as unknown as ISubmitEvent
    }

    protected getWebviewOption(): IWebViewOption {
        return {
            title: "Submission",
            viewColumn: ViewColumn.Two,
        };
    }

    protected getWebviewContent(): string {
        const styles: string = markdownService.getStyles();
        const title: string = `## ${this.result.messages[0]}`;
        const messages: string[] = this.result.messages.slice(1).map((m: string) => `* ${m}`);
        const sections: string[] = Object.keys(this.result)
            .filter((key: string) => (key !== "messages" && key !== "system_message"))
            .map((key: string) => [
                `### ${key}`,
                "```",
                this.result[key].join("\n"),
                "```",
            ].join("\n"));
        const body: string = markdownService.render([
            title,
            ...messages,
            ...sections,
        ].join("\n"));
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src https:; script-src vscode-resource:; style-src vscode-resource:;"/>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                ${styles}
            </head>
            <body class="vscode-body 'scrollBeyondLastLine' 'wordWrap' 'showEditorSelection'" style="tab-size:4">
                ${body}
            </body>
            </html>
        `;
    }

    protected onDidDisposeWebview(): void {
        super.onDidDisposeWebview();
    }

    private async showKeybindingsHint(): Promise<void> {
        await promptHintMessage(
            "hint.commandShortcut",
            'You can customize shortcut key bindings in File > Preferences > Keyboard Shortcuts with query "leetcode".',
            "Open Keybindings",
            (): Promise<any> => openKeybindingsEditor("leetcode solution"),
        );
    }

    private parseResult(raw: string): IResult {
        return JSON.parse(raw);
    }
}

interface IResult {
    [key: string]: string[];
    messages: string[];
}


export const submissionService: SubmissionService = new SubmissionService();
