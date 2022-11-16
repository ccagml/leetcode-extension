/*
 * Filename: https://github.com/ccagml/vscode-leetcode-problem-rating/src/childProcessCall/commands/star.ts
 * Path: https://github.com/ccagml/vscode-leetcode-problem-rating
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { commUtils } from "../commUtils";
import { log } from "../log";
import { corePlugin } from "../core";
import { session } from "../session";

class StarCommand {
  constructor() {}

  process_argv(argv) {
    let argv_config = commUtils
      .base_argv()
      .option("d", {
        alias: "delete",
        type: "boolean",
        describe: "Unstar question",
        default: false,
      })
      .positional("keyword", {
        type: "string",
        describe: "Question name or id",
        default: "",
      });

    argv_config.process_argv(argv);

    return argv_config.get_result();
  }

  handler(argv) {
    session.argv = argv;
    // translation doesn't affect question lookup
    corePlugin.getProblem(argv.keyword, true, function (e, problem) {
      if (e) return log.info(e);

      corePlugin.starProblem(problem, !argv.delete, function (e, starred) {
        if (e) return log.info(e);
        log.info(
          `[${problem.fid}] ${problem.name} ${
            starred ? "icon.like" : "icon.unlike"
          }`
        );
        corePlugin.updateProblem(problem, { starred: starred });
      });
    });
  }
}

export const starCommand: StarCommand = new StarCommand();
