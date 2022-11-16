/*
 * Filename: https://github.com/ccagml/vscode-leetcode-problem-rating/src/childProcessCall/commands/query.ts
 * Path: https://github.com/ccagml/vscode-leetcode-problem-rating
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { helper } from "../helper";
import { log } from "../log";
import { corePlugin } from "../core";
import { session } from "../session";

class QueryCommand {
  constructor() {}
  process_argv = function (argv) {
    let argv_config = helper
      .base_argv()
      .option("T", {
        alias: "dontTranslate",
        type: "boolean",
        default: false,
        describe: "Set to true to disable endpoint's translation",
      })
      .option("a", {
        alias: "getTodayQuestion",
        type: "boolean",
        default: false,
        describe: "getTodayQuestion",
      })
      .option("b", {
        alias: "username",
        type: "string",
        default: "",
        describe: "user name",
      })
      .option("c", {
        alias: "getRating",
        type: "boolean",
        default: false,
        describe: "ranking",
      })
      .option("z", {
        alias: "test",
        type: "string",
        default: "",
        describe: "test",
      });
    argv_config.process_argv(argv);
    return argv_config.get_result();
  };

  handler = function (argv) {
    session.argv = argv;
    if (argv.a) {
      corePlugin.getTodayQuestion(function (e, result) {
        if (e) return;
        log.info(JSON.stringify(result));
      });
    } else if (argv.b) {
      corePlugin.getUserContest(argv.b, function (e, result) {
        if (e) return;
        log.info(JSON.stringify(result));
      });
    } else if (argv.c) {
      corePlugin.getRating(function (e, result) {
        if (e) {
          let log_data = {
            code: 101,
            data: {},
          };
          log.info(JSON.stringify(log_data));
          return;
        }
        let log_data = {
          code: 100,
          data: result,
        };
        log.info(JSON.stringify(log_data));
      });
    } else if (argv.z) {
      corePlugin.getQueryZ(argv.z, function (e, result) {
        if (e) return;
        log.info(JSON.stringify(result));
      });
    }
  };
}

export const queryCommand: QueryCommand = new QueryCommand();
