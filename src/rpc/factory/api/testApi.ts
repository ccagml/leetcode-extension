/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/rpc/factory/api/testApi.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
 * Created Date: Thursday, November 17th 2022, 11:44:14 am
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

let _ = require("underscore");
let lodash = require("lodash");

import { storageUtils } from "../../utils/storageUtils";
import { reply } from "../../utils/ReplyUtils";

import { sessionUtils } from "../../utils/sessionUtils";
import { ApiBase } from "../apiBase";
import { commUtils } from "../../utils/commUtils";
import { chainMgr } from "../../actionChain/chainManager";

class TestApi extends ApiBase {
  constructor() {
    super();
  }

  callArg(argv) {
    let argv_config = this.api_argv()
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

    argv_config.parseArgFromCmd(argv);

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
    if (!storageUtils.exist(argv.filename)) return reply.fatal("File " + argv.filename + " not exist!");

    const meta = storageUtils.meta(argv.filename);

    // [key: string]: string[];
    // messages: string[];

    chainMgr.getChainHead().getProblem(meta, true, function (e, problem) {
      if (e)
        return reply.info(
          JSON.stringify({
            messages: ["error"],
            code: [-1],
            error: [e.msg || e],
          })
        );

      if (!problem.testable)
        return reply.info(
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
        let temp_test_set: Set<string> = new Set();

        let new_desc = problem.desc;
        let calcCaseList = storageUtils.getAllCase(new_desc);
        calcCaseList.forEach((x) => {
          let xxx = x.join("\n");
          temp_test_set.add(xxx);
        });
        if (meta.writeCase) {
          meta.writeCase.forEach((xxx) => {
            temp_test_set.add(xxx);
          });
        }

        let temp_test: Array<any> = [];
        temp_test_set.forEach((x) => {
          temp_test.push(x);
        });

        let all_case = temp_test.join("\n");
        problem.testcase = all_case;
      }

      if (!problem.testcase)
        return reply.info(
          JSON.stringify({
            messages: ["error"],
            code: [-3],
            error: ["missing testcase?"],
          })
        );

      problem.file = argv.filename;
      problem.lang = meta.lang;

      chainMgr.getChainHead().testProblem(problem, function (e, results) {
        if (e) return reply.info(JSON.stringify(e));

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
        results[0].stdout = results[0].stdout.slice(1, -1).replace(/\\n/g, "\n");
        that.printResult(results[0], null, "your_input", log_obj);
        that.printResult(results[0], results[0].runtime, "output", log_obj);
        that.printResult(results[0], null, "expected_answer", log_obj);
        that.printResult(results[0], null, "stdout", log_obj);
        reply.info(JSON.stringify(log_obj));
      });
    });
  }

  call(argv) {
    let that = this;
    sessionUtils.argv = argv;
    if (!argv.i) return that.runTest(argv);

    commUtils.readStdin(function (e, data) {
      if (e) return reply.info(e);

      argv.testcase = data;
      return that.runTest(argv);
    });
  }
}

export const testApi: TestApi = new TestApi();
