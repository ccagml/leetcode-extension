/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/RemoteCall/factory/api/cacheApi.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
 * Created Date: Thursday, November 17th 2022, 11:44:14 am
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { storageUtils } from "../../utils/storageUtils";
import { sessionUtils } from "../../utils/sessionUtils";
import { ApiBase } from "../apiBase";

class CacheApi extends ApiBase {
  constructor() {
    super();
  }

  callArg(argv) {
    let argv_config = this.api_argv().option("d", {
      alias: "delete",
      type: "boolean",
      describe: "Delete cache by keyword",
      default: false,
    });
    argv_config.parseArgFromCmd(argv);

    return argv_config.get_result();
  }

  call(argv) {
    sessionUtils.argv = argv;

    const name = argv.keyword || "";
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
  }
}

export const cacheApi: CacheApi = new CacheApi();
