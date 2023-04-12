/*
 * https://github.com/ccagml/leetcode-extension/src/rpc/factory/api/showApi.ts
 * Path: https://github.com/ccagml/leetcode-extension
 * Created Date: Thursday, November 17th 2022, 11:44:14 am
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

// let util = require("util");

import { storageUtils } from "../../utils/storageUtils";

import { reply } from "../../utils/ReplyUtils";
import { configUtils } from "../../utils/configUtils";

import { sessionUtils } from "../../utils/sessionUtils";
import { ApiBase } from "../apiBase";
import { chainMgr } from "../../actionChain/chainManager";

class ShowApi extends ApiBase {
  constructor() {
    super();
  }

  callArg(argv) {
    let argv_config = this.api_argv()
      .option("c", {
        alias: "codeonly",
        type: "boolean",
        default: false,
        describe: "Only show code template",
      })
      .option("l", {
        alias: "lang",
        type: "string",
        default: configUtils.code.lang,
        describe: "Programming language of the source code",
        choices: configUtils.sys.langs,
      })
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
        describe: "Show extra question details in source code",
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
        describe: "Show question by name or id",
      });
    argv_config.parseArgFromCmd(argv);
    return argv_config.get_result();
  }
  genFileName(problem, opts) {
    const path = require("path");
    const params = [storageUtils.fmt(configUtils.file.show, problem), "", storageUtils.getFileExtByLanguage(opts.lang)];

    // try new name to avoid overwrite by mistake
    for (let i = 0; ; ++i) {
      const name = path.join(opts.outdir, params.join(".").replace(/\.+/g, "."));
      if (!storageUtils.exist(name)) return name;
      params[1] = i;
    }
  }

  showProblem(problem, argv) {
    let code;
    const needcode = argv.gen || argv.codeonly;
    if (needcode) {
      const template = problem.templates.find((x) => x.value === argv.lang);
      if (!template) {
        reply.info(JSON.stringify({ code: 101, error: `Not supported language ${argv.lang} ` }));
        return;
      }

      const opts = {
        lang: argv.lang,
        code: template.defaultCode,
        tpl: argv.extra ? "detailed" : "codeonly",
      };
      code = chainMgr.getChainHead().exportProblem(problem, opts);
    }

    if (argv.codeonly) {
      reply.info(JSON.stringify({ code: 100, msg: code }));
      return;
    }

    let preview_data: any = {};
    preview_data.url = problem.link;
    preview_data.category = `${problem.category}`;
    preview_data.difficulty = `${problem.level} (${problem.percent.toFixed(2)}%)`;
    preview_data.likes = `${problem.likes}`;
    preview_data.dislikes = `${problem.dislikes}`;
    preview_data.desc = problem.desc;
    reply.info(JSON.stringify({ code: 100, msg: preview_data }));
  }

  call(argv) {
    let that = this;
    sessionUtils.argv = argv;
    if (argv.keyword.length > 0) {
      // show specific one
      chainMgr.getChainHead().getProblem(argv.keyword, !argv.dontTranslate, function (e, problem) {
        if (e) return reply.info(JSON.stringify({ code: 102, error: e }));
        that.showProblem(problem, argv);
      });
    } else {
      //
    }
  }
}

export const showApi: ShowApi = new ShowApi();
