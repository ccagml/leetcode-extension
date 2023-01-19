/*
 * https://github.com/ccagml/leetcode-vscode/src/rpc/factory/api/submitApi.ts
 * Path: https://github.com/ccagml/leetcode-vscode
 * Created Date: Thursday, November 17th 2022, 11:44:14 am
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

let util = require("util");
let lodash = require("lodash");

import { storageUtils } from "../../utils/storageUtils";
import { reply } from "../../utils/ReplyUtils";

import { sessionUtils } from "../../utils/sessionUtils";
import { ApiBase } from "../apiBase";
import { chainMgr } from "../../actionChain/chainManager";

class SubmitApi extends ApiBase {
  constructor() {
    super();
  }

  callArg(argv) {
    let argv_config = this.api_argv().positional("filename", {
      type: "string",
      describe: "Code file to submit",
      default: "",
    });
    argv_config.parseArgFromCmd(argv);

    return argv_config.get_result();
  }

  printResult(actual, k, log_obj) {
    if (!actual.hasOwnProperty(k)) return;

    const v = actual[k] || "";
    const lines = Array.isArray(v) ? v : [v];
    for (let line of lines) {
      if (k !== "state") {
        if (!log_obj.hasOwnProperty(lodash.startCase(k))) {
          log_obj[lodash.startCase(k)] = [line];
        } else {
          log_obj[lodash.startCase(k)].push(line);
        }
      } else {
        log_obj.messages.push(line);
      }
    }
  }

  printLine(log_obj, ...ret: any[]) {
    const args = ret.slice(1);
    const line = util.format.apply(util, args);
    log_obj.messages.push(line);
  }

  call(argv) {
    sessionUtils.argv = argv;
    if (!storageUtils.exist(argv.filename)) return reply.fatal("File " + argv.filename + " not exist!");

    const meta = storageUtils.meta(argv.filename);
    let that = this;
    // translation doesn't affect problem lookup
    chainMgr.getChainHead().getProblem(meta, true, function (e, problem) {
      if (e) return reply.info(e);

      problem.file = argv.filename;
      problem.lang = meta.lang;

      chainMgr.getChainHead().submitProblem(problem, function (e, results) {
        if (e) return reply.info(e);

        const result = results[0];

        let log_obj: any = {};
        log_obj.messages = [];
        log_obj.system_message = {};
        log_obj.system_message.fid = problem.fid;
        log_obj.system_message.id = problem.id;
        log_obj.system_message.qid = problem.id;
        log_obj.system_message.sub_type = "submit";
        log_obj.system_message.accepted = false;

        that.printResult(result, "state", log_obj);
        that.printLine(log_obj, result, "%d/%d cases passed (%s)", result.passed, result.total, result.runtime);

        if (result.ok) {
          sessionUtils.updateStat("ac", 1);
          sessionUtils.updateStat("ac.set", problem.fid);
          log_obj.system_message.accepted = true;

          (function () {
            if (result.runtime_percentile)
              that.printLine(
                log_obj,
                result,
                "Your runtime beats %d %% of %s submissions",
                result.runtime_percentile.toFixed(2),
                result.lang
              );
            else return reply.warn("Failed to get runtime percentile.");
            if (result.memory && result.memory_percentile)
              that.printLine(
                log_obj,
                result,
                "Your memory usage beats %d %% of %s submissions (%s)",
                result.memory_percentile.toFixed(2),
                result.lang,
                result.memory
              );
            else return reply.warn("Failed to get memory percentile.");
          })();
        } else {
          result.testcase = result.testcase.slice(1, -1).replace(/\\n/g, "\n");
          that.printResult(result, "error", log_obj);
          that.printResult(result, "testcase", log_obj);
          that.printResult(result, "answer", log_obj);
          that.printResult(result, "expected_answer", log_obj);
          that.printResult(result, "stdout", log_obj);
        }
        reply.info(JSON.stringify(log_obj));
        chainMgr.getChainHead().updateProblem(problem, {
          state: result.ok ? "ac" : "notac",
        });
      });
    });
  }
}

export const submitApi: SubmitApi = new SubmitApi();
