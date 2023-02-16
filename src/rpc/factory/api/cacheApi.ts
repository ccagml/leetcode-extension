/*
 * https://github.com/ccagml/leetcode-extension/src/rpc/factory/api/cacheApi.ts
 * Path: https://github.com/ccagml/leetcode-extension
 * Created Date: Thursday, November 17th 2022, 11:44:14 am
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { storageUtils } from "../../utils/storageUtils";
import { sessionUtils } from "../../utils/sessionUtils";
import { ApiBase } from "../apiBase";
import { reply } from "../../utils/ReplyUtils";

class CacheApi extends ApiBase {
  constructor() {
    super();
  }

  callArg(argv) {
    let argv_config = this.api_argv()
      .option("d", {
        alias: "delete",
        type: "boolean",
        describe: "Delete cache by keyword",
        default: false,
      })
      .option("t", {
        alias: "lastmodify",
        type: "string",
        default: "",
        describe: "",
      })
      .positional("keyword", {
        type: "string",
        default: "",
        describe: "帮助的参数?",
      });
    argv_config.parseArgFromCmd(argv);

    return argv_config.get_result();
  }

  call(argv) {
    sessionUtils.argv = argv;

    const name = argv.keyword || "";
    const isInteger = Number.isInteger(Number(name));

    let option_t = Number(argv.t);
    const need_last_modify_time = Number.isInteger(option_t);
    if (need_last_modify_time) {
      option_t *= 1000;
    }
    const all_data_file = storageUtils.listCache().filter(function (f) {
      return name.length === 0 || (isInteger ? f.name.startsWith(name + ".") : f.name === name);
    });

    if (argv.delete) {
      const cur_time = new Date().getTime();
      for (let f of all_data_file) {
        if (!need_last_modify_time || (f.mtimeMs || 0) + option_t < cur_time) {
          storageUtils.delCache(f.name);
        }
      }
    }
    reply.info(JSON.stringify({ code: 100 }));
  }
}

export const cacheApi: CacheApi = new CacheApi();
