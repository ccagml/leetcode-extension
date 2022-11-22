/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/rpc/actionChain/leetcode.cn.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
 * Created Date: Monday, November 14th 2022, 4:04:31 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { ChainNodeBase } from "../chainNodeBase";

let request = require("request");

import { configUtils } from "../../utils/configUtils";

import { sessionUtils } from "../../utils/sessionUtils";

class LeetCodeCn extends ChainNodeBase {
  id = 15;
  name = "leetcode.cn";
  builtin = true;
  constructor() {
    super();
  }
  init() {
    configUtils.fix_cn();
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

  /* Getting the title of the problems. */
  getProblemsTitle = (cb) => {
    const opts = makeOpts(configUtils.sys.urls.graphql);
    opts.headers.Origin = configUtils.sys.urls.base;
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

  /* A function that gets the question of the day from leetcode. */
  getQuestionOfToday = (cb) => {
    const opts = makeOpts(configUtils.sys.urls.graphql);
    opts.headers.Origin = configUtils.sys.urls.base;
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
  /* A function that is used to get the user contest ranking information. */
  getUserContestP = (username, cb) => {
    const opts = makeOpts(configUtils.sys.urls.noj_go);
    opts.headers.Origin = configUtils.sys.urls.base;
    opts.headers.Referer = configUtils.sys.urls.u.replace("$username", username);

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

  /* A function that is used to get the rating of the problems. */
  getRatingOnline = (cb) => {
    const _request = request.defaults({ jar: true });
    _request("https://zerotrac.github.io/leetcode_problem_rating/data.json", function (error: any, _, body: any) {
      // console.log(error);
      // console.log(info);
      cb(error, body);
    });
  };

  /* A function that is used to test the api. */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  opts.headers.Cookie = "LEETCODE_SESSION=" + user.sessionId + ";csrftoken=" + user.sessionCSRF + ";";
  opts.headers["X-CSRFToken"] = user.sessionCSRF;
  opts.headers["X-Requested-With"] = "XMLHttpRequest";
}

function makeOpts(url: any) {
  let opts: any = {};
  opts.url = url;
  opts.headers = {};

  if (sessionUtils.isLogin()) signOpts(opts, sessionUtils.getUser());
  return opts;
}

function checkError(e: any, resp: any, expectedStatus: any) {
  if (!e && resp && resp.statusCode !== expectedStatus) {
    const code = resp.statusCode;

    if (code === 403 || code === 401) {
      e = sessionUtils.errors.EXPIRED;
    } else {
      e = { msg: "http error", statusCode: code };
    }
  }
  return e;
}

export const pluginObj: LeetCodeCn = new LeetCodeCn();
