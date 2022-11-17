/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/RemoteCall/factory/api/star.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
 * Created Date: Monday, November 14th 2022, 4:04:31 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { reply } from "../../utils/ReplyUtils";

import { session } from "../../utils/sessionUtils";
import { ApiBase } from "../baseApi";
import { chain } from "../../actionChain/chain";

class StarApi extends ApiBase {
  constructor() {
    super();
  }

  callArg(argv) {
    let argv_config = this.api_argv()
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

    argv_config.parseArgFromCmd(argv);

    return argv_config.get_result();
  }

  call(argv) {
    session.argv = argv;
    // translation doesn't affect question lookup
    chain.getChainHead().getProblem(argv.keyword, true, function (e, problem) {
      if (e) return reply.info(e);

      chain
        .getChainHead()
        .starProblem(problem, !argv.delete, function (e, starred) {
          if (e) return reply.info(e);
          reply.info(
            `[${problem.fid}] ${problem.name} ${
              starred ? "icon.like" : "icon.unlike"
            }`
          );
          chain.getChainHead().updateProblem(problem, { starred: starred });
        });
    });
  }
}

export const starApi: StarApi = new StarApi();
