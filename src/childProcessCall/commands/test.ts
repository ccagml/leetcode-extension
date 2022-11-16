/*
 * Filename: https://github.com/ccagml/vscode-leetcode-problem-rating/src/childProcessCall/commands/test.ts
 * Path: https://github.com/ccagml/vscode-leetcode-problem-rating
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

let _ = require("underscore");
let lodash = require("lodash");

import { helper } from "../helper";
import { storageUtils } from "../storageUtils";
import { log } from "../log";
import { corePlugin } from "../core";
import { session } from "../session";

class TestCommand {
  constructor() {}

  process_argv(argv) {
    let argv_config = helper
      .base_argv()
      .option("i", {
        alias: "interactive",
        type: "boolean",
        default: false,
        describe: "Provide test case interactively",
      })
      .option("t", {
        alias: "testcase",
        type: "string",
        default: "",
        describe: "Provide test case",
      })
      .option("a", {
        alias: "allcase",
        type: "boolean",
        default: false,
        describe: "Provide all test case",
      })
      .positional("filename", {
        type: "string",
        default: "",
        describe: "Code file to test",
      });

    argv_config.process_argv(argv);

    return argv_config.get_result();
  }

  printResult(actual, extra, k, log_obj) {
    if (!actual.hasOwnProperty(k)) return;
    // HACk: leetcode still return 'Accepted' even the answer is wrong!!
    const v = actual[k] || "";
    if (k === "state" && v === "Accepted") return;

    // let ok = actual.ok;

    const lines = Array.isArray(v) ? v : [v];
    for (let line of lines) {
      const extraInfo = extra ? ` (${extra})` : "";
      if (k !== "state") {
        let new_kk = lodash.startCase(k) + extraInfo;
        if (!log_obj.hasOwnProperty(new_kk)) {
          log_obj[new_kk] = [line];
        } else {
          log_obj[new_kk].push(line);
        }
      } else {
        log_obj.messages.push(line);
      }
    }
  }

  runTest(argv) {
    let that = this;
    if (!storageUtils.exist(argv.filename))
      return log.fatal("File " + argv.filename + " not exist!");

    const meta = storageUtils.meta(argv.filename);

    // [key: string]: string[];
    // messages: string[];

    corePlugin.getProblem(meta, true, function (e, problem) {
      if (e)
        return log.info(
          JSON.stringify({
            messages: ["error"],
            code: [-1],
            error: [e.msg || e],
          })
        );

      if (!problem.testable)
        return log.info(
          JSON.stringify({
            messages: ["error"],
            code: [-2],
            error: ["not testable? please submit directly!"],
          })
        );

      if (argv.testcase) {
        problem.testcase = argv.testcase.replace(/\\n/g, "\n");
      }

      if (argv.allcase) {
        let new_desc = problem.desc;
        new_desc = new_desc.replace(/<\/sup>/gm, "").replace(/<sup>/gm, "^");
        new_desc = require("he").decode(
          require("cheerio").load(new_desc).root().text()
        );
        // NOTE: wordwrap internally uses '\n' as EOL, so here we have to
        // remove all '\r' in the raw string.
        new_desc = new_desc.replace(/\r\n/g, "\n").replace(/^ /gm, "⁠");
        let input = require("wordwrap")(120)(new_desc).split("\n");
        let temp_test: Array<any> = [];
        let start_flag = false;
        let temp_collect = "";
        for (let all_input = 0; all_input < input.length; all_input++) {
          const element = input[all_input];
          var check_index = element.indexOf("输入");
          if (check_index == -1) {
            check_index = element.indexOf("Input:");
          }
          if (check_index != -1) {
            temp_collect += element.substring(check_index + 1);
            start_flag = true;
            continue;
          }

          var check_index = element.indexOf("输出");
          if (check_index == -1) {
            check_index = element.indexOf("Output:");
          }
          if (check_index != -1) {
            start_flag = false;
          }
          if (start_flag) {
            temp_collect += element;
          } else {
            if (temp_collect.length > 0) {
              let new_ele = temp_collect;
              let temp_case: Array<any> = [];
              let wait_cur = "";
              let no_need_flag = false;
              for (let index = new_ele.length - 1; index >= 0; index--) {
                if (no_need_flag) {
                  if (new_ele[index] == ",") {
                    no_need_flag = false;
                  }
                } else {
                  if (new_ele[index] == "=") {
                    temp_case.push(wait_cur.trim());
                    no_need_flag = true;
                    wait_cur = "";
                  } else {
                    wait_cur = new_ele[index] + wait_cur;
                  }
                }
              }
              for (let index = temp_case.length - 1; index >= 0; index--) {
                temp_test.push(temp_case[index]);
              }
              temp_collect = "";
            }
          }
        }

        if (temp_test.length < 1) {
          return;
        }
        let all_case = temp_test.join("\n");
        problem.testcase = all_case;
      }

      if (!problem.testcase)
        return log.info(
          JSON.stringify({
            messages: ["error"],
            code: [-3],
            error: ["missing testcase?"],
          })
        );

      problem.file = argv.filename;
      problem.lang = meta.lang;

      corePlugin.testProblem(problem, function (e, results) {
        if (e) return log.info(JSON.stringify(e));

        results = _.sortBy(results, (x) => x.type);

        let log_obj: any = {};
        log_obj.messages = [];
        log_obj.system_message = {};
        log_obj.system_message.fid = problem.fid;
        log_obj.system_message.id = problem.id;
        log_obj.system_message.qid = problem.id;
        log_obj.system_message.sub_type = "test";
        log_obj.system_message.accepted = false;

        if (results[0].state === "Accepted") {
          results[0].state = "Finished";
          log_obj.system_message.accepted = true;
        }
        that.printResult(results[0], null, "state", log_obj);
        that.printResult(results[0], null, "error", log_obj);

        results[0].your_input = problem.testcase;
        results[0].output = results[0].answer;
        // LeetCode-CN returns the actual and expected answer into two separate responses
        if (results[1]) {
          results[0].expected_answer = results[1].answer;
        }
        results[0].stdout = results[0].stdout
          .slice(1, -1)
          .replace(/\\n/g, "\n");
        that.printResult(results[0], null, "your_input", log_obj);
        that.printResult(results[0], results[0].runtime, "output", log_obj);
        that.printResult(results[0], null, "expected_answer", log_obj);
        that.printResult(results[0], null, "stdout", log_obj);
        log.info(JSON.stringify(log_obj));
      });
    });
  }

  handler(argv) {
    let that = this;
    session.argv = argv;
    if (!argv.i) return that.runTest(argv);

    helper.readStdin(function (e, data) {
      if (e) return log.info(e);

      argv.testcase = data;
      return that.runTest(argv);
    });
  }
}

export const testCommand: TestCommand = new TestCommand();
