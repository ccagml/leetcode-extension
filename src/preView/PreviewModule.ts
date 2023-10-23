/*
 * Filename: https://github.com/ccagml/leetcode-extension/src/service/previewService.ts
 * Path: https://github.com/ccagml/leetcode-extension
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { commands, ViewColumn } from "vscode";
import { Endpoint, IProblem, IWebViewOption } from "../model/ConstDefind";
import { getLeetCodeEndpoint } from "../utils/ConfigUtils";
import { BaseWebViewService } from "../service/BaseWebviewService";
import { markdownService } from "../service/MarkdownService";
import { BABAMediator, BABAProxy, BabaStr, BaseCC } from "../BABA";

class PreviewService extends BaseWebViewService {
  protected readonly viewType: string = "leetcode.preview";
  private node: IProblem;
  private description: IDescription;
  private sideMode: boolean = false;

  public isSideMode(): boolean {
    return this.sideMode;
  }

  public show(descString: string, node: IProblem, isSideMode: boolean = false): void {
    this.description = this.parseDescription(descString, node);
    this.node = node;
    this.sideMode = isSideMode;
    this.showWebviewInternal();
    // Comment out this operation since it sometimes may cause the webview become empty.
    // Waiting for the progress of the VS Code side issue: https://github.com/microsoft/vscode/issues/3742
    // if (this.sideMode) {
    //     this.hideSideBar(); // For better view area
    // }
  }

  protected getWebviewOption(): IWebViewOption {
    if (!this.sideMode) {
      return {
        title: `${this.node.name}: Preview`,
        viewColumn: ViewColumn.One,
      };
    } else {
      return {
        title: "Description",
        viewColumn: ViewColumn.Two,
        preserveFocus: true,
      };
    }
  }

  protected getWebviewContent(): string {
    const button: { element: string; script: string; style: string } = {
      element: `<button id="solve">Code Now</button>`,
      script: `const button = document.getElementById('solve');
                    button.onclick = () => vscode.postMessage({
                        command: 'ShowProblem',
                    });`,
      style: `<style>
                #solve {
                    position: fixed;
                    bottom: 1rem;
                    right: 1rem;
                    border: 0;
                    margin: 1rem 0;
                    padding: 0.2rem 1rem;
                    color: white;
                    background-color: var(--vscode-button-background);
                }
                #solve:hover {
                    background-color: var(--vscode-button-hoverBackground);
                }
                #solve:active {
                    border: 0;
                }
                </style>`,
    };
    const { title, url, category, difficulty, likes, dislikes, body, contest_slug, problem_index, problem_score } =
      this.description;
    const head: string = markdownService.render(`# [${title}](${url})`);
    const info: string = markdownService.render(
      [
        `| Category | Difficulty | Likes | Dislikes |  ContestSlug |  ProblemIndex |  Score |`,
        `| :------: | :--------: | :---: | :------: |  :---------: |  :----------: |  :---: |`,
        `| ${category} | ${difficulty} | ${likes} | ${dislikes} | ${contest_slug} | ${problem_index} | ${problem_score} | `,
      ].join("\n")
    );
    const tags: string = [
      `<details>`,
      `<summary><strong>Tags</strong></summary>`,
      markdownService.render(
        this.description.tags.map((t: string) => `[\`${t}\`](https://leetcode.com/tag/${t})`).join(" | ")
      ),
      `</details>`,
    ].join("\n");
    const companies: string = [
      `<details>`,
      `<summary><strong>Companies</strong></summary>`,
      markdownService.render(this.description.companies.map((c: string) => `\`${c}\``).join(" | ")),
      `</details>`,
    ].join("\n");
    const links: string = markdownService.render(
      `[Discussion](${this.getDiscussionLink(url)}) | [Solution](${this.getSolutionLink(url)})`
    );
    return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src https:; script-src vscode-resource: 'unsafe-inline'; style-src vscode-resource: 'unsafe-inline';"/>
                ${markdownService.getStyles()}
                ${!this.sideMode ? button.style : ""}
                <style>
                    code { white-space: pre-wrap; }
                </style>
            </head>
            <body>
                ${head}
                ${info}
                ${tags}
                ${companies}
                ${body}
                <hr />
                ${links}
                ${!this.sideMode ? button.element : ""}
                <script>
                    const vscode = acquireVsCodeApi();
                    ${!this.sideMode ? button.script : ""}
                </script>
            </body>
            </html>
        `;
  }

  protected onDidDisposeWebview(): void {
    super.onDidDisposeWebview();
    this.sideMode = false;
  }

  protected async onDidReceiveMessage(message: IWebViewMessage): Promise<void> {
    switch (message.command) {
      case "ShowProblem": {
        await commands.executeCommand("lcpr.showProblem", this.node);
        break;
      }
    }
  }

  private parseDescription(descString: string, problem: IProblem): IDescription {
    let preview_data = JSON.parse(descString);
    return {
      title: problem.name,
      url: preview_data.url,
      tags: problem.tags,
      companies: problem.companies,
      category: preview_data.category,
      difficulty: preview_data.difficulty,
      likes: preview_data.likes,
      dislikes: preview_data.dislikes,
      body: preview_data.desc.replace(/<pre>[\r\n]*([^]+?)[\r\n]*<\/pre>/g, "<pre><code>$1</code></pre>"),
      contest_slug: problem?.scoreData?.ContestSlug || "-",
      problem_index: problem?.scoreData?.ProblemIndex || "-",
      problem_score: problem?.scoreData?.score || "0",
    };
  }

  private getDiscussionLink(url: string): string {
    const endPoint: string = getLeetCodeEndpoint();
    if (endPoint === Endpoint.LeetCodeCN) {
      return url.replace("/description/", "/comments/");
    } else if (endPoint === Endpoint.LeetCode) {
      return url.replace("/description/", "/discuss/?currentPage=1&orderBy=most_votes&query=");
    }

    return "https://leetcode.com";
  }

  private getSolutionLink(url: string): string {
    return url.replace("/description/", "/solution/");
  }
}

interface IDescription {
  title: string;
  url: string;
  tags: string[];
  companies: string[];
  category: string;
  difficulty: string;
  likes: string;
  dislikes: string;
  body: string;
  contest_slug: string;
  problem_index: string;
  problem_score: string;
}

interface IWebViewMessage {
  command: string;
}

export const previewService: PreviewService = new PreviewService();

export class PreviewProxy extends BABAProxy {
  static NAME = BabaStr.PreviewProxy;
  constructor() {
    super(PreviewProxy.NAME);
  }

  public isSideMode(): boolean {
    return previewService.isSideMode();
  }
}

export class PreviewMediator extends BABAMediator {
  static NAME = BabaStr.PreviewMediator;
  constructor() {
    super(PreviewMediator.NAME);
  }

  listNotificationInterests(): string[] {
    return [BabaStr.VSCODE_DISPOST, BabaStr.Preview_show];
  }
  async handleNotification(_notification: BaseCC.BaseCC.INotification) {
    let body = _notification.getBody();
    switch (_notification.getName()) {
      case BabaStr.VSCODE_DISPOST:
        previewService.dispose();
        break;

      case BabaStr.Preview_show:
        previewService.show(body.descString, body.node, body.isSideMode);
        break;
      default:
        break;
    }
  }
}
