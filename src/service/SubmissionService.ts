/*
 * Filename: https://github.com/ccagml/leetcode-vscode/src/service/SubmissionService.ts
 * Path: https://github.com/ccagml/leetcode-vscode
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { ViewColumn, commands } from "vscode";
import { BaseWebViewService } from "./BaseWebviewService";
import { markdownService } from "./MarkdownService";
import { ISubmitEvent } from "../model/Model";
import { IWebViewOption } from "../model/Model";
import { promptHintMessage } from "../utils/OutputUtils";
import { isAnswerDiffColor } from "../utils/ConfigUtils";
import { statusBarTimeService } from "../service/StatusBarTimeService";
class SubmissionService extends BaseWebViewService {
  protected readonly viewType: string = "leetcode.submission";
  private result: IResult;

  public show(resultString: string): void {
    this.result = this.parseResult(resultString);

    const temp = this.getSubmitEvent();
    if (temp?.accepted && temp?.sub_type == "submit") {
      this.result["costTime"] = [`耗时${statusBarTimeService.getCostTimeStr()}`];
    }
    this.showWebviewInternal();
    this.showKeybindingsHint();
  }
  public getSubmitEvent(): ISubmitEvent {
    return this.result.system_message as unknown as ISubmitEvent;
  }

  protected getWebviewOption(): IWebViewOption {
    return {
      title: "Submission",
      viewColumn: ViewColumn.Two,
    };
  }

  private sections_filtter(key) {
    if (key.substring(0, 6) == "Output" || key.substring(0, 6) == "Answer") {
      return false;
    } else if (key.substring(0, 8) == "Expected") {
      return false;
    } else if (key == "messages") {
      return false;
    } else if (key == "system_message") {
      return false;
    } else if (key == "costTime") {
      return false;
    }
    return true;
  }
  private getAnswerKey(result) {
    let ans;
    let exp;
    for (const key in result) {
      if (key.substring(0, 6) == "Output" || key.substring(0, 6) == "Answer") {
        ans = key;
      } else if (key.substring(0, 8) == "Expected") {
        exp = key;
      }
      if (ans != undefined && exp != undefined) {
        break;
      }
    }
    let key: Array<any> = [];
    key.push(ans);
    key.push(exp);
    return key;
  }

  protected getWebviewContent(): string {
    const styles: string = markdownService.getStyles();
    const title: string = `## ${this.result.messages[0]}`;
    if (this.result?.costTime && this.result?.costTime.length > 0) {
      this.result.messages.push(this.result?.costTime[0]);
    }
    const messages: string[] = this.result.messages.slice(1).map((m: string) => `* ${m}`);
    let sections: string[] = [];
    if (isAnswerDiffColor()) {
      sections = Object.keys(this.result)
        .filter(this.sections_filtter)
        .map((key: string) => [`### ${key}`, "```", this.result[key].join("\n"), "```"].join("\n"));

      let ans_key: Array<any> = this.getAnswerKey(this.result);
      if (ans_key[0] != undefined && ans_key[1] != undefined) {
        sections.push(`### Answer\n`);
        sections.push(`| ${ans_key[0]} | ${ans_key[1]}  | `);
        sections.push(`|  :---------:  | :---------:    | `);
        let ans = this.result[ans_key[0]];
        let exp = this.result[ans_key[1]];
        let max_len = Math.max(ans.length, exp.length);
        for (let index = 0; index < max_len; index++) {
          sections.push(`| ${ans[index] || ""} | ${exp[index] || ""}  | `);
        }
      }
      // require("../utils/testHot").test_add_table(sections);
    } else {
      sections = Object.keys(this.result)
        .filter((key: string) => key !== "messages" && key !== "system_message")
        .map((key: string) => [`### ${key}`, "```", this.result[key].join("\n"), "```"].join("\n"));
    }
    let body: string = markdownService.render([title, ...messages, ...sections].join("\n"));

    let aaa = `
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
    return aaa;
  }

  protected onDidDisposeWebview(): void {
    super.onDidDisposeWebview();
  }

  private async showKeybindingsHint(): Promise<void> {
    let that = this;
    await promptHintMessage(
      "hint.commandShortcut",
      'You can customize shortcut key bindings in File > Preferences > Keyboard Shortcuts with query "leetcode".',
      "Open Keybindings",
      (): Promise<any> => that.openKeybindingsEditor("leetcode solution")
    );
  }

  private async openKeybindingsEditor(query?: string): Promise<void> {
    await commands.executeCommand("workbench.action.openGlobalKeybindings", query);
  }

  private add_color_str(str1, str2) {
    let result: Array<string> = [];
    let min_len = Math.min(str1.length, str2.length);
    let dif_len = 0;
    for (let index = 0; index < min_len; index++) {
      if (str1[index] != str2[index]) {
        dif_len = index;
        break;
      }
    }
    let str1_left = str1.substring(0, dif_len);
    let str1_right = str1.substring(dif_len);
    let str2_left = str2.substring(0, dif_len);
    let str2_right = str2.substring(dif_len);
    result.push(str1_left + this.getRedPre() + str1_right + this.getRedEnd());
    result.push(str2_left + this.getRedPre() + str2_right + this.getRedEnd());

    return result;
  }

  private add_color(temp) {
    // let;
    let output_key;
    let expected_key;
    for (const key in temp) {
      if (typeof key == "string") {
        if (key.substring(0, 6) == "Output" || key.substring(0, 6) == "Answer") {
          output_key = key;
        } else if (key.substring(0, 8) == "Expected") {
          expected_key = key;
        }
        if (output_key && expected_key) {
          break;
        }
      }
    }
    if (output_key && expected_key) {
      let output_str = temp[output_key] || [];
      let expected_str = temp[expected_key] || [];
      let min_len = Math.min(output_str.length, expected_str.length);
      for (let index = 0; index < min_len; index++) {
        if (output_str[index] != expected_str[index]) {
          let temp_result = this.add_color_str(output_str[index], expected_str[index]);
          output_str[index] = temp_result[0] || "";
          expected_str[index] = temp_result[1] || "";
        }
      }
    }
  }

  private getRedPre() {
    return "__`";
  }
  private getRedEnd() {
    return "`__";
  }

  private parseResult(raw: string): IResult {
    let temp = JSON.parse(raw);
    if (isAnswerDiffColor()) {
      this.add_color(temp);
    }

    return temp;
  }
}

interface IResult {
  [key: string]: string[];
  messages: string[];
}

export const submissionService: SubmissionService = new SubmissionService();
