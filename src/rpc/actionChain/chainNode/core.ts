/*
 * https://github.com/ccagml/leetcode_extension/src/rpc/actionChain/core.ts
 * Path: https://github.com/ccagml/leetcode_extension
 * Created Date: Monday, November 14th 2022, 4:04:31 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

let util = require("util");

let _ = require("underscore");
let cheerio = require("cheerio");

import { storageUtils } from "../../utils/storageUtils";
import { configUtils } from "../../utils/configUtils";

import { ChainNodeBase } from "../chainNodeBase";

// function hasTag(o, tag) {
//   return Array.isArray(o) && o.some((x) => x.indexOf(tag.toLowerCase()) >= 0);
// }

/* It's a class that extends the ChainNodeBase class, and it has a bunch of methods that are called by
the LeetCode CLI */
class CorePlugin extends ChainNodeBase {
  id = 99999999;
  name = "core";
  builtin = true;
  constructor() {
    super();
  }

  /* It's a method that filters the problems. */
  filterProblems = (opts, cb) => {
    this.getProblems(!opts.dontTranslate, function (e, problems) {
      if (e) return cb(e);

      // for (let q of (opts.query || "").split("")) {
      //   const f = QUERY_HANDLERS[q];
      //   if (!f) continue;
      //   problems = problems.filter((x) => f(x, q));
      // }

      // for (let t of opts.tag || []) {
      //   problems = problems.filter(function (x) {
      //     return x.category === t || hasTag(x.companies, t) || hasTag(x.tags, t);
      //   });
      // }

      return cb(null, problems);
    });
  };
  /* It's a method that gets the problem. */
  public getProblem = (keyword, needTranslation, cb) => {
    let that = this;
    this.getProblems(needTranslation, function (e, problems) {
      if (e) return cb(e);
      keyword = Number(keyword) || keyword;
      const metaFid = storageUtils.exist(keyword) ? storageUtils.meta(keyword).id : NaN;
      const problem = problems.find(function (x) {
        if (keyword?.fid) {
          return x.fid + "" === keyword.fid + "";
        } else if (keyword?.qid) {
          return x.id + "" === keyword.qid + "";
        } else {
          return x.id + "" === keyword + "" || x.fid + "" === metaFid + "" || x.name === keyword || x.slug === keyword;
        }
      });
      if (!problem) return cb("Problem not found!");
      that.next.getProblem(problem, needTranslation, cb);
    });
  };

  /* It's a method that stars the problem. */
  starProblem = (problem, starred, cb) => {
    if (problem.starred === starred) {
      return cb(null, starred);
    }

    this.next.starProblem(problem, starred, cb);
  };

  /* It's a method that exports the problem. */
  exportProblem = (problem, opts) => {
    const data = _.extend({}, problem);

    // 增加版本信息
    data.LCPTCTX = configUtils.LCPTCTX;
    data.allCaseList = storageUtils.getAllCase(problem.desc);
    // unify format before rendering

    data.app = configUtils.app || "leetcode";
    if (!data.fid) data.fid = data.id;
    if (!data.lang) data.lang = opts.lang;
    data.code = (opts.code || data.code || "").replace(/\r\n/g, "\n");
    data.comment = storageUtils.getCommentStyleByLanguage(data.lang);
    data.percent = data.percent.toFixed(2);
    data.testcase = util.inspect(data.testcase || "");

    if (opts.tpl === "detailed") {
      let desc = data.desc;
      // Replace <sup/> with '^' as the power operator
      desc = desc.replace(/<\/sup>/gm, "").replace(/<sup>/gm, "^");
      desc = require("he").decode(cheerio.load(desc).root().text());
      // NOTE: wordwrap internally uses '\n' as EOL, so here we have to
      // remove all '\r' in the raw string.
      desc = desc.replace(/\r\n/g, "\n").replace(/^ /gm, "⁠");
      const wrap = require("wordwrap")(79 - data.comment.line.length);
      data.desc = wrap(desc).split("\n");
    }
    return storageUtils.render(opts.tpl, data);
  };

  getTodayQuestion = (cb) => {
    this.getQuestionOfToday(function (e, result) {
      if (e) return cb(e);
      return cb(null, result);
    });
  };

  getRating = (cb) => {
    this.getRatingOnline(function (e, result) {
      if (e) return cb(e);
      return cb(null, result);
    });
  };

  getQueryZ = (username, cb) => {
    this.getTestApi(username, function (e, result) {
      if (e) return cb(e);
      return cb(null, result);
    });
  };

  getUserContest = (username, cb) => {
    this.getUserContestP(username, function (e, result) {
      if (e) return cb(e);
      return cb(null, result);
    });
  };
  getHelp = (problem, cn_flag, lang) => {
    this.getHelpOnline(problem, cn_flag, lang);
  };
}

// const isLevel = (x, q) => x.level[0].toLowerCase() === q.toLowerCase();
// const isACed = (x) => x.state === "ac";
// const isLocked = (x) => x.locked;
// const isStarred = (x) => x.starred;

/* It's a dictionary that maps the query to the function that filters the problems. */
// const QUERY_HANDLERS = {
//   e: isLevel,
//   E: _.negate(isLevel),
//   m: isLevel,
//   M: _.negate(isLevel),
//   h: isLevel,
//   H: _.negate(isLevel),
//   l: isLocked,
//   L: _.negate(isLocked),
//   d: isACed,
//   D: _.negate(isACed),
//   s: isStarred,
//   S: _.negate(isStarred),
// };

export const corePlugin: CorePlugin = new CorePlugin();
