/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/RemoteCall/factory/api/list.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
 * Created Date: Monday, November 14th 2022, 4:04:31 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { reply } from "../../utils/ReplyUtils";
import { sessionUtils } from "../../utils/sessionUtils";
import { ApiBase } from "../baseApi";
import { chain } from "../../actionChain/chain";

class ListApi extends ApiBase {
  constructor() {
    super();
  }

  callArg(argv) {
    let argv_config = this.api_argv()
      .option("q", {
        alias: "query",
        type: "string",
        default: "",
        describe: [
          "Filter questions by condition:",
          "Uppercase means negative",
          "e = easy     E = m+h",
          "m = medium   M = e+h",
          "h = hard     H = e+m",
          "d = done     D = not done",
          "l = locked   L = non locked",
          "s = starred  S = not starred",
        ].join("\n"),
      })
      .option("s", {
        alias: "stat",
        type: "boolean",
        default: false,
        describe: "Show statistics of listed questions",
      })
      .option("t", {
        alias: "tag",
        type: "array",
        default: [],
        describe: "Filter questions by tag",
      })
      .option("x", {
        alias: "extra",
        type: "boolean",
        default: false,
        describe: "Show extra details: category, companies, tags.",
      })
      .option("T", {
        alias: "dontTranslate",
        type: "boolean",
        default: false,
        describe: "Set to true to disable endpoint's translation",
      })
      .positional("keyword", {
        type: "string",
        default: "",
        describe: "Filter questions by keyword",
      });

    argv_config.parseArgFromCmd(argv);

    return argv_config.get_result();
  }

  call(argv) {
    sessionUtils.argv = argv;
    chain.getChainHead().filterProblems(argv, function (e, problems) {
      if (e) return reply.info(e);
      let new_objcet: Array<any> = [];
      problems.forEach((element) => {
        let temp_ele: any = {};
        for (const key in element) {
          if (key != "link") {
            temp_ele[key] = element[key];
          }
        }
        new_objcet.push(temp_ele);
      });
      reply.info(JSON.stringify(new_objcet));
    });
  }
}

export const listApi: ListApi = new ListApi();
