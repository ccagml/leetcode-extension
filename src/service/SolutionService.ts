/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/service/SolutionService.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */


import { ViewColumn } from "vscode";
import { previewService } from "./PreviewService";
import { BaseWebViewService } from "./baseWebviewService";
import { markdownService } from "./markdownService";
import { IWebViewOption } from "../model/Model";



class SolutionService extends BaseWebViewService {
    protected readonly viewType: string = "leetcode.solution";
    private problemName: string;
    private solution: Solution;

    public show(solutionString: string): void {
        this.solution = this.parseSolution(solutionString);
        this.showWebviewInternal();
    }

    protected getWebviewOption(): IWebViewOption {
        if (previewService.isSideMode()) {
            return {
                title: "Solution",
                viewColumn: ViewColumn.Two,
                preserveFocus: true,
            };
        } else {
            return {
                title: `Solution: ${this.problemName}`,
                viewColumn: ViewColumn.One,
            };
        }
    }

    protected getWebviewContent(): string {
        const styles: string = markdownService.getStyles();
        const { title, url, lang, author, votes } = this.solution;
        const head: string = markdownService.render(`# [${title}](${url})`);
        const auth: string = `[${author}](https://leetcode.com/${author}/)`;
        const info: string = markdownService.render([
            `| Language |  Author  |  Votes   |`,
            `| :------: | :------: | :------: |`,
            `| ${lang}  | ${auth}  | ${votes} |`,
        ].join("\n"));
        const body: string = markdownService.render(this.solution.body, {
            lang: this.solution.lang,
            host: "https://discuss.leetcode.com/",
        });
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src https:; script-src vscode-resource:; style-src vscode-resource:;"/>
                ${styles}
            </head>
            <body class="vscode-body 'scrollBeyondLastLine' 'wordWrap' 'showEditorSelection'" style="tab-size:4">
                ${head}
                ${info}
                ${body}
            </body>
            </html>
        `;
    }

    protected onDidDisposeWebview(): void {
        super.onDidDisposeWebview();
    }

    private parseSolution(raw: string): Solution {
        raw = raw.slice(1); // skip first empty line
        [this.problemName, raw] = raw.split(/\n\n([^]+)/); // parse problem name and skip one line
        const solution: Solution = new Solution();
        // [^] matches everything including \n, yet can be replaced by . in ES2018's `m` flag
        [solution.title, raw] = raw.split(/\n\n([^]+)/);
        [solution.url, raw] = raw.split(/\n\n([^]+)/);
        [solution.lang, raw] = raw.match(/\* Lang:\s+(.+)\n([^]+)/)!.slice(1);
        [solution.author, raw] = raw.match(/\* Author:\s+(.+)\n([^]+)/)!.slice(1);
        [solution.votes, raw] = raw.match(/\* Votes:\s+(\d+)\n\n([^]+)/)!.slice(1);
        solution.body = raw;
        return solution;
    }
}

// tslint:disable-next-line:max-classes-per-file
class Solution {
    public title: string = "";
    public url: string = "";
    public lang: string = "";
    public author: string = "";
    public votes: string = "";
    public body: string = ""; // Markdown supported
}

export const solutionService: SolutionService = new SolutionService();