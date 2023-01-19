/*
 * https://github.com/ccagml/leetcode-vscode/src/rpc/actionChain/leetcode.cn.ts
 * Path: https://github.com/ccagml/leetcode-vscode
 * Created Date: Monday, November 14th 2022, 4:04:31 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { ChainNodeBase } from "../chainNodeBase";

let request = require("request");

import { configUtils } from "../../utils/configUtils";

import { sessionUtils } from "../../utils/sessionUtils";
import { reply } from "../../utils/ReplyUtils";
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
    const _request = request.defaults({ timeout: 2000, jar: true });
    _request("https://zerotrac.github.io/leetcode_problem_rating/data.json", function (error: any, _, body: any) {
      // console.log(error);
      // console.log(info);
      cb(error, body);
    });
  };

  /* A function that is used to test the api. */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getTestApi = (value: any, _) => {
    console.log(value);
    let question_slug = "determine-color-of-a-chessboard-square";
    let lang = "cpp";

    getSolutionArticlesSlugList(question_slug, lang, (e, articles_slug) => {
      if (e) return;
      getSolutionBySlug(question_slug, articles_slug, lang);
    });
  };

  getHelpOnline = (problem, cn_flag, lang) => {
    if (cn_flag) {
      getSolutionArticlesSlugList(problem.slug, lang, (e, articles_slug) => {
        if (e) return;
        getSolutionBySlug(problem.slug, articles_slug, lang);
      });
    } else {
      this.next.getHelpOnline(problem, cn_flag, lang);
    }
  };
}

function getSolutionBySlug(question_slug: string, articles_slug: string, lang: string) {
  const opts = makeOpts(configUtils.sys.urls.graphql);
  opts.headers.Origin = configUtils.sys.urls.base;
  let URL_DISCUSS = "https://leetcode.cn/problems/$slug/solution/$articles_slug/";
  opts.headers.Referer = URL_DISCUSS.replace("$slug", question_slug).replace("$articles_slug", articles_slug);

  opts.json = true;
  opts.body = {
    operationName: "solutionDetailArticle",
    variables: { slug: articles_slug, orderBy: "DEFAULT" },
    query: [
      "query solutionDetailArticle($slug: String!, $orderBy: SolutionArticleOrderBy!) {",
      "    solutionArticle(slug: $slug, orderBy: $orderBy) {",
      "      ...solutionArticle",
      "      content",
      "      question {",
      "        questionTitleSlug",
      "        __typename",
      "      }",
      "  __typename",
      "}",
      "}",
      "fragment solutionArticle on SolutionArticleNode {",
      "    uuid",
      "    title",
      "    slug",
      "    identifier",
      "author {",
      "      username",
      "      profile {",
      "        realName",
      "        __typename",
      "      }",
      "  __typename",
      "}",
      "byLeetcode",
      "__typename",
      "}",
    ].join("\n"),
  };

  request.post(opts, function (_, __, body) {
    // let bbb = body;
    // console.log(bbb);
    let solution = body.data.solutionArticle;
    if (!solution) return reply.error("本题没有题解");

    let link = URL_DISCUSS.replace("$slug", question_slug).replace("$articles_slug", articles_slug);
    let content = solution.content.replace(/\\n/g, "\n").replace(/\\t/g, "\t");

    let solution_result: any = {};
    solution_result.problem_name = solution.title;
    solution_result.title = solution.title;
    solution_result.url = link;
    solution_result.lang = lang;
    solution_result.author = solution.author.username;
    solution_result.votes = solution.voteCount;
    solution_result.body = content;
    solution_result.is_cn = true;
    reply.info(JSON.stringify({ code: 100, solution: solution_result }));
  });
}

function getSolutionArticlesSlugList(question_slug: string, lang: string, cb) {
  const opts = makeOpts(configUtils.sys.urls.graphql);
  opts.headers.Origin = configUtils.sys.urls.base;
  // let URL_DISCUSSES = "https://leetcode.com/graphql";
  let URL_DISCUSS = "https://leetcode.cn/problems/$slug/solution";
  opts.headers.Referer = URL_DISCUSS.replace("$slug", question_slug);

  opts.json = true;
  opts.body = {
    operationName: "questionSolutionArticles",
    variables: { questionSlug: question_slug, first: 1, skip: 0, orderBy: "DEFAULT", tagSlugs: [lang] },
    query: [
      "query questionSolutionArticles($questionSlug: String!, $skip: Int, $first: Int, $orderBy: SolutionArticleOrderBy, $userInput: String, $tagSlugs: [String!]) {",
      "questionSolutionArticles(questionSlug: $questionSlug, skip: $skip, first: $first, orderBy: $orderBy, userInput: $userInput, tagSlugs: $tagSlugs) {",
      "        totalNum",
      "        edges {",
      "          node {",
      "            ...solutionArticle",
      "            __typename",
      "          }",
      "      __typename",
      "    }",
      "    __typename",
      "  }",
      "}",
      "fragment solutionArticle on SolutionArticleNode {",
      "      uuid",
      "      slug",
      "  byLeetcode",
      "  __typename",
      "}",
    ].join("\n"),
  };

  request.post(opts, function (e, _, body) {
    let edges = body?.data?.questionSolutionArticles?.edges || [];
    let temp_result;
    edges.forEach((element) => {
      if (element?.node?.slug) {
        temp_result = element?.node?.slug;
        return;
      }
    });

    cb(e, temp_result);
  });
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
