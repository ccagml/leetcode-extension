/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/childProcessCall/actionChain/leetcode.cn.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
 * Created Date: Monday, November 14th 2022, 4:04:31 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { Chain } from "./../chain";

let request = require("request");

import { config } from "../../config";

import { session } from "../../session";

class LeetCodeCn extends Chain {
  id = 15;
  name = "leetcode.cn";
  builtin = true;
  constructor() {
    super();
  }
  init() {
    config.fix_cn();
  }

  getProblems = (needTranslation, cb) => {
    let that = this;
    this.next.getProblems(needTranslation, function (e, problems) {
      if (e) return cb(e);

      if (needTranslation) {
        // only translate titles of the list if user requested
        that.getProblemsTitle(function (e, titles) {
          if (e) return cb(e);

          problems.forEach(function (problem) {
            const title = titles[problem.id];
            if (title) problem.name = title;
          });

          return cb(null, problems);
        });
      } else {
        return cb(null, problems);
      }
    });
  };

  getProblemsTitle = (cb) => {
    const opts = makeOpts(config.sys.urls.graphql);
    opts.headers.Origin = config.sys.urls.base;
    opts.headers.Referer = "https://leetcode.cn/api/problems/algorithms/";

    opts.json = true;
    opts.body = {
      query: [
        "query getQuestionTranslation($lang: String) {",
        "  translations: allAppliedQuestionTranslations(lang: $lang) {",
        "    title",
        "    questionId",
        "    __typename",
        "    }",
        "}",
      ].join("\n"),
      variables: {},
      operationName: "getQuestionTranslation",
    };

    request.post(opts, function (e, resp, body) {
      e = checkError(e, resp, 200);
      if (e) return cb(e);

      const titles: Object = [];
      body.data.translations.forEach(function (x) {
        titles[x.questionId] = x.title;
      });

      return cb(null, titles);
    });
  };

  getQuestionOfToday = (cb) => {
    const opts = makeOpts(config.sys.urls.graphql);
    opts.headers.Origin = config.sys.urls.base;
    opts.headers.Referer = "https://leetcode.cn/";

    opts.json = true;
    opts.body = {
      operationName: "questionOfToday",
      variables: {},
      query: [
        "query questionOfToday {",
        "  todayRecord {",
        "    date",
        "    userStatus",
        "    question {",
        "      titleSlug",
        "      questionId",
        "      questionFrontendId",
        // '      content',
        // '      stats',
        // '      likes',
        // '      dislikes',
        // '      codeDefinition',
        // '      sampleTestCase',
        // '      enableRunCode',
        // '      metaData',
        // '      translatedContent',
        "      __typename",
        "    }",
        "  __typename",
        "  }",
        "}",
      ].join("\n"),
    };

    request.post(opts, function (e, resp, body) {
      e = checkError(e, resp, 200);
      if (e) return cb(e);
      let result: any = {};
      result.titleSlug = body.data.todayRecord[0].question.titleSlug;
      result.questionId = body.data.todayRecord[0].question.questionId;
      result.fid = body.data.todayRecord[0].question.questionFrontendId;
      result.date = body.data.todayRecord[0].data;
      result.userStatus = body.data.todayRecord[0].userStatus;
      return cb(null, result);
    });
  };
  getUserContestP = (username, cb) => {
    const opts = makeOpts(config.sys.urls.noj_go);
    opts.headers.Origin = config.sys.urls.base;
    opts.headers.Referer = config.sys.urls.u.replace("$username", username);

    opts.json = true;
    opts.body = {
      variables: {
        userSlug: username,
      },
      query: [
        "        query userContestRankingInfo($userSlug: String!) {",
        "          userContestRanking(userSlug: $userSlug) {",
        "            attendedContestsCount",
        "            rating",
        "            globalRanking",
        "            localRanking",
        "            globalTotalParticipants",
        "            localTotalParticipants",
        "            topPercentage",
        "        }",
        // '      userContestRankingHistory(userSlug: $userSlug) {',
        // '            attended',
        // '            totalProblems',
        // '            trendingDirection',
        // '            finishTimeInSeconds',
        // '            rating',
        // '            score',
        // '            ranking',
        // '            contest {',
        // '              title',
        // '              titleCn',
        // '              startTime',
        // '            }',
        // '        }',
        "    }",
      ].join("\n"),
    };

    request.post(opts, function (e, resp, body) {
      e = checkError(e, resp, 200);
      if (e) return cb(e);

      return cb(null, body.data);
    });
  };

  getRatingOnline = (cb) => {
    const _request = request.defaults({ jar: true });
    _request(
      "https://zerotrac.github.io/leetcode_problem_rating/data.json",
      function (error: any, _, body: any) {
        // console.log(error);
        // console.log(info);
        cb(error, body);
      }
    );
  };

  getTestApi = (value: any, _) => {
    const _request = request.defaults({ jar: true });
    _request(
      "https://zerotrac.github.io/leetcode_problem_rating/data.json",
      function (error: any, info: any, body: any) {
        console.log(error);
        console.log(info);
        let a = body;
        console.log(a, value);
      }
    );
  };
}

function signOpts(opts: any, user: any) {
  opts.headers.Cookie =
    "LEETCODE_SESSION=" +
    user.sessionId +
    ";csrftoken=" +
    user.sessionCSRF +
    ";";
  opts.headers["X-CSRFToken"] = user.sessionCSRF;
  opts.headers["X-Requested-With"] = "XMLHttpRequest";
}

function makeOpts(url: any) {
  let opts: any = {};
  opts.url = url;
  opts.headers = {};

  if (session.isLogin()) signOpts(opts, session.getUser());
  return opts;
}

function checkError(e: any, resp: any, expectedStatus: any) {
  if (!e && resp && resp.statusCode !== expectedStatus) {
    const code = resp.statusCode;

    if (code === 403 || code === 401) {
      e = session.errors.EXPIRED;
    } else {
      e = { msg: "http error", statusCode: code };
    }
  }
  return e;
}

export const pluginObj: LeetCodeCn = new LeetCodeCn();
