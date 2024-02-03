/*
 * Filename: https://github.com/ccagml/leetcode-extension/src/service/SolutionService.ts
 * Path: https://github.com/ccagml/leetcode-extension
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { ViewColumn } from "vscode";
import { BaseWebViewService } from "../service/BaseWebviewService";
import { markdownService } from "../service/MarkdownService";
import { IWebViewOption } from "../model/ConstDefind";

import * as path from "path";
import { BABA, BABAMediator, BABAProxy, BabaStr, BaseCC } from "../BABA";

class SolutionService extends BaseWebViewService {
  protected readonly viewType: string = "leetcode.solution";
  private problemName: string;
  private solution: Solution;
  private is_hints: boolean;
  private hints: Array<string>;

  public show(solutionString: string, is_hints: boolean = false): void {
    this.is_hints = is_hints;
    if (is_hints) {
      this.hints = this.parseHints(solutionString);
      this.showWebviewInternal();
    } else {
      this.solution = this.parseSolution(solutionString);
      if (this.solution.init_data) {
        this.showWebviewInternal();
      }
    }
  }

  protected getWebviewOption(): IWebViewOption {
    if (BABA.getProxy(BabaStr.PreviewProxy).isSideMode()) {
      return {
        title: this.is_hints ? "Hints" : "Solution",
        viewColumn: ViewColumn.Two,
        preserveFocus: true,
      };
    } else {
      return {
        title: this.is_hints ? "Hints" : `Solution: ${this.problemName}`,
        viewColumn: ViewColumn.One,
      };
    }
  }

  protected getWebviewContent(): string {
    if (this.is_hints) {
      return this.getHintsContent();
    } else {
      return this.getSolutionContent();
    }
  }

  private getHintsContent(): string {
    const styles: string = markdownService.getStyles();
    let h = this.hints;
    let body: Array<any> = [];
    if (h.length == 0) {
      body.push("本题无提示");
    } else {
      for (let index = 0; index < h.length; index++) {
        const element = h[index];
        let hint_body = ["<details><summary>", `提示:${index}`, "</summary>", `${element}`, "</details>"].join("\n");
        body.push(hint_body);
      }
    }
    return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta http-equiv="Content-Security-Policy" content="default-src self; img-src vscode-resource:; script-src vscode-resource: 'self' 'unsafe-inline'; style-src vscode-resource: 'self' 'unsafe-inline'; "/>
                ${styles}
                <link rel="stylesheet" type="text/css" href= "vscode-resource:${path.join(
                  __dirname,
                  "..",
                  "..",
                  "..",
                  "resources",
                  "katexcss",
                  "kates.min.css"
                )}">
            </head>
            <body class="vscode-body 'scrollBeyondLastLine' 'wordWrap' 'showEditorSelection'" style="tab-size:4">
                ${body.join("\n")}
            </body>
            </html>
        `;
  }

  private getSolutionContent(): string {
    const styles: string = markdownService.getStyles();
    const { title, url, lang, author, votes } = this.solution;
    const head: string = markdownService.render(`# [${title}](${url})`);
    const auth: string = this.solution.is_cn
      ? `[${author}](https://leetcode.cn/u/${author}/)`
      : `[${author}](https://leetcode.com/${author}/)`;
    const info: string = markdownService.render(
      [
        `| Language |  Author  |  Votes   |`,
        `| :------: | :------: | :------: |`,
        `| ${lang}  | ${auth}  | ${votes} |`,
      ].join("\n")
    );

    // $\textit
    // this.solution.body = this.solution.body.replace(/\$\\textit/g, "$");
    // this.solution.body = this.solution.body.replace(/\$\\texttt/g, "$");
    // this.solution.body = this.solution.body.replace(/\$\\text/g, "$");

    const body: string = markdownService.render(this.solution.body, {
      lang: this.solution.lang,
      host: "https://discuss.leetcode.com/",
    });
    // "<link rel=\"stylesheet\" type=\"text/css\" href=\"vscode-resource:/home/cc/.vscode-server/bin/30d9c6cd9483b2cc586687151bcbcd635f373630/extensions/markdown-language-features/media/markdown.css\">\n<link rel=\"stylesheet\" type=\"text/css\" href=\"vscode-resource:/home/cc/.vscode-server/bin/30d9c6cd9483b2cc586687151bcbcd635f373630/extensions/markdown-language-features/media/highlight.css\">\n<style>\nbody {\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe WPC', 'Segoe UI', system-ui, 'Ubuntu', 'Droid Sans', sans-serif;\n    font-size: 14px;\n    line-height: 1.6;\n}\n</style>"
    // <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src https:; script-src vscode-resource:; style-src vscode-resource:;"/>

    return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta http-equiv="Content-Security-Policy" content="default-src self; img-src vscode-resource:; script-src vscode-resource: 'self' 'unsafe-inline'; style-src vscode-resource: 'self' 'unsafe-inline'; "/>
                ${styles}
                <link rel="stylesheet" type="text/css" href= "vscode-resource:${path.join(
                  __dirname,
                  "..",
                  "..",
                  "..",
                  "resources",
                  "katexcss",
                  "kates.min.css"
                )}">
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
    let obj = JSON.parse(raw);
    let solution: Solution = new Solution();
    if (obj.code == 100 && obj.solution) {
      this.problemName = obj.solution.problem_name;
      solution.title = obj.solution.title;
      solution.url = obj.solution.url;
      solution.lang = obj.solution.lang;
      solution.author = obj.solution.author;
      solution.votes = obj.solution.votes || 0;
      solution.body = obj.solution.body;
      solution.is_cn = obj.solution.is_cn;
      solution.init_data = true;
      return solution;
    }
    return solution;
  }
  private parseHints(raw: string): Array<string> {
    let obj = JSON.parse(raw);

    if (obj.code == 100) {
      return obj.hints;
    }
    return [];
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
  public is_cn?: boolean = false;
  public init_data = false;
}

export const solutionService: SolutionService = new SolutionService();

export class SolutionProxy extends BABAProxy {
  static NAME = BabaStr.SolutionProxy;
  constructor() {
    super(SolutionProxy.NAME);
  }

  public show(solutionString: string, hints: boolean): void {
    solutionService.show(solutionString, hints);
  }
}

export class SolutionMediator extends BABAMediator {
  static NAME = BabaStr.SolutionMediator;
  constructor() {
    super(SolutionMediator.NAME);
  }

  listNotificationInterests(): string[] {
    return [BabaStr.VSCODE_DISPOST];
  }
  async handleNotification(_notification: BaseCC.BaseCC.INotification) {
    switch (_notification.getName()) {
      case BabaStr.VSCODE_DISPOST:
        solutionService.dispose();
        break;
      default:
        break;
    }
  }
}
