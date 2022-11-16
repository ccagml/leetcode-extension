/*
 * Filename: https://github.com/ccagml/vscode-leetcode-problem-rating/src/childProcessCall/commands/cache.ts
 * Path: https://github.com/ccagml/vscode-leetcode-problem-rating
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

// let underscore = require('underscore');

import { commUtils } from "../commUtils";
// import { log } from "../log";
import { storageUtils } from "../storageUtils";
import { session } from "../session";

class CacheCommand {
  constructor() {}

  process_argv = function (argv) {
    let argv_config = commUtils.base_argv().option("d", {
      alias: "delete",
      type: "boolean",
      describe: "Delete cache by keyword",
      default: false,
    });
    argv_config.process_argv(argv);

    return argv_config.get_result();
  };

  handler = function (argv) {
    session.argv = argv;

    const name = argv.keyword;
    const isInteger = Number.isInteger(Number(name));

    const all_data_file = storageUtils.listCache().filter(function (f) {
      return (
        name.length === 0 ||
        (isInteger ? f.name.startsWith(name + ".") : f.name === name)
      );
    });

    if (argv.delete) {
      for (let f of all_data_file) {
        storageUtils.delCache(f.name);
      }
    }
  };
}

export const cacheCommand: CacheCommand = new CacheCommand();
