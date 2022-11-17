/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/RemoteCall/factory/api/show.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
 * Created Date: Monday, November 14th 2022, 4:04:31 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

let util = require("util");
let childProcess = require("child_process");

import { storageUtils } from "../../utils/storageUtils";

import { reply } from "../../utils/ReplyUtils";
import { configUtils } from "../../utils/configUtils";

import { session } from "../../utils/sessionUtils";
import { ApiBase } from "../baseApi";
import { chain } from "../../actionChain/chain";

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
      .option("e", {
        alias: "editor",
        type: "string",
        describe: "Open source code in editor",
      })
      .option("g", {
        alias: "gen",
        type: "boolean",
        default: false,
        describe: "Generate source code",
      })
      .option("l", {
        alias: "lang",
        type: "string",
        default: configUtils.code.lang,
        describe: "Programming language of the source code",
        choices: configUtils.sys.langs,
      })
      .option("o", {
        alias: "outdir",
        type: "string",
        describe: "Where to save source code",
        default: ".",
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
    const params = [
      storageUtils.fmt(configUtils.file.show, problem),
      "",
      storageUtils.getFileExtByLanguage(opts.lang),
    ];

    // try new name to avoid overwrite by mistake
    for (let i = 0; ; ++i) {
      const name = path.join(
        opts.outdir,
        params.join(".").replace(/\.+/g, ".")
      );
      if (!storageUtils.exist(name)) return name;
      params[1] = i;
    }
  }

  showProblem(problem, argv) {
    const taglist = [problem.category]
      .concat(problem.companies || [])
      .concat(problem.tags || [])
      .map((x) => " " + x + " ")
      .join(" ");
    const langlist = problem.templates
      .map((x) => " " + x.value + " ")
      .sort()
      .join(" ");

    let code;
    const needcode = argv.gen || argv.codeonly;
    if (needcode) {
      const template = problem.templates.find((x) => x.value === argv.lang);
      if (!template) {
        reply.info('Not supported language "' + argv.lang + '"');
        reply.warn("Supported languages: " + langlist);
        return;
      }

      const opts = {
        lang: argv.lang,
        code: template.defaultCode,
        tpl: argv.extra ? "detailed" : "codeonly",
      };
      code = chain.getChainHead().exportProblem(problem, opts);
    }

    let filename;
    if (argv.gen) {
      storageUtils.mkdir(argv.outdir);
      filename = this.genFileName(problem, argv);
      storageUtils.write(filename, code);

      if (argv.editor !== undefined) {
        childProcess.spawn(argv.editor || configUtils.code.editor, [filename], {
          // in case your editor of choice is vim or emacs
          stdio: "inherit",
        });
      }
    } else {
      if (argv.codeonly) {
        reply.info(code);
        return;
      }
    }

    reply.info(`[${problem.fid}] ${problem.name}`);
    reply.info();
    reply.info(problem.link);
    if (argv.extra) {
      reply.info();
      reply.info("Tags:  " + taglist);
      reply.info();
      reply.info("Langs: " + langlist);
    }

    reply.info();
    reply.info(`* ${problem.category}`);
    reply.info(`* ${problem.level} (${problem.percent.toFixed(2)}%)`);

    if (problem.likes) reply.info(`* Likes:    ${problem.likes}`);
    if (problem.dislikes) reply.info(`* Dislikes: ${problem.dislikes}`);
    else reply.info(`* Dislikes: -`);
    if (problem.totalAC) reply.info(`* Total Accepted:    ${problem.totalAC}`);
    if (problem.totalSubmit)
      reply.info(`* Total Submissions: ${problem.totalSubmit}`);
    if (problem.testable && problem.testcase) {
      let testcase_value = util.inspect(problem.testcase);
      reply.info(`* Testcase Example:  ${testcase_value}`);
    }
    if (filename) reply.info(`* Source Code:       ${filename}`);

    reply.info();
    reply.info(problem.desc);
  }

  call(argv) {
    let that = this;
    session.argv = argv;
    if (argv.keyword.length > 0) {
      // show specific one
      chain
        .getChainHead()
        .getProblem(argv.keyword, !argv.dontTranslate, function (e, problem) {
          if (e) return reply.info(e);
          that.showProblem(problem, argv);
        });
    } else {
      //
    }
  }
}

export const showApi: ShowApi = new ShowApi();
