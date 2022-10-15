'use strict';

import { MyPluginBase } from "../my_plugin_base";

var request = require('request');

import { config } from "../config";
import { helper } from "../helper";
// import { log } from "../log";
import { session } from "../session";


// var plugin = new Plugin(15, 'leetcode.cn', '',
//   'Plugin to talk with leetcode-cn APIs.');

class LeetCodeCn extends MyPluginBase {
  id = 15
  name = 'leetcode.cn'
  constructor() {
    super()
  }
  init() {
    config.fix_cn()
  };

  getProblems(needTranslation, cb) {
    var that = this;
    this.next.getProblems(needTranslation, function (e, problems) {
      if (e) return cb(e);

      if (needTranslation) {
        // only translate titles of the list if user requested
        that.getProblemsTitle(function (e, titles) {
          if (e) return cb(e);

          problems.forEach(function (problem) {
            const title = titles[problem.id];
            if (title)
              problem.name = title;
          });

          return cb(null, problems);
        });
      } else {
        return cb(null, problems);
      }
    });
  };

  getProblemsTitle = function (cb) {

    const opts = makeOpts(config.sys.urls.graphql);
    opts.headers.Origin = config.sys.urls.base;
    opts.headers.Referer = 'https://leetcode.cn/api/problems/algorithms/';

    opts.json = true;
    opts.body = {
      query: [
        'query getQuestionTranslation($lang: String) {',
        '  translations: allAppliedQuestionTranslations(lang: $lang) {',
        '    title',
        '    questionId',
        '    __typename',
        '    }',
        '}'
      ].join('\n'),
      variables: {},
      operationName: 'getQuestionTranslation'
    };

    const spin = helper.spin('Downloading questions titles');
    request.post(opts, function (e, resp, body) {
      spin.stop();
      e = checkError(e, resp, 200);
      if (e) return cb(e);

      const titles: Object = [];
      body.data.translations.forEach(function (x) {
        titles[x.questionId] = x.title;
      });

      return cb(null, titles);
    });
  };

  getQuestionOfToday = function (cb) {

    const opts = makeOpts(config.sys.urls.graphql);
    opts.headers.Origin = config.sys.urls.base;
    opts.headers.Referer = 'https://leetcode.cn/';

    opts.json = true;
    opts.body = {
      operationName: "questionOfToday",
      variables: {},
      query: [
        'query questionOfToday {',
        '  todayRecord {',
        '    date',
        '    userStatus',
        '    question {',
        '      titleSlug',
        '      questionId',
        '      questionFrontendId',
        // '      content',
        // '      stats',
        // '      likes',
        // '      dislikes',
        // '      codeDefinition',
        // '      sampleTestCase',
        // '      enableRunCode',
        // '      metaData',
        // '      translatedContent',
        '      __typename',
        '    }',
        '  __typename',
        '  }',
        '}'
      ].join('\n'),
    };

    const spin = helper.spin('Downloading today question');
    request.post(opts, function (e, resp, body) {
      spin.stop();
      e = checkError(e, resp, 200);
      if (e) return cb(e);
      var result: any = {}
      result.titleSlug = body.data.todayRecord[0].question.titleSlug
      result.questionId = body.data.todayRecord[0].question.questionId
      result.fid = body.data.todayRecord[0].question.questionFrontendId
      result.date = body.data.todayRecord[0].data
      result.userStatus = body.data.todayRecord[0].userStatus
      return cb(null, result);
    });
  };
  getUserContestP = function (username, cb) {

    const opts = makeOpts(config.sys.urls.noj_go);
    opts.headers.Origin = config.sys.urls.base;
    opts.headers.Referer = config.sys.urls.u.replace('$username', username);

    opts.json = true;
    opts.body = {
      variables: {
        userSlug: username
      },
      query: [
        '        query userContestRankingInfo($userSlug: String!) {',
        '          userContestRanking(userSlug: $userSlug) {',
        '            attendedContestsCount',
        '            rating',
        '            globalRanking',
        '            localRanking',
        '            globalTotalParticipants',
        '            localTotalParticipants',
        '            topPercentage',
        '        }',
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
        '    }'
      ].join('\n'),
    };

    const spin = helper.spin('Downloading userContest');
    request.post(opts, function (e, resp, body) {
      spin.stop();
      e = checkError(e, resp, 200);
      if (e) return cb(e);

      return cb(null, body.data);
    });
  };

  getTestApi = function (value, cb) {

    const opts = makeOpts(config.sys.urls.graphql);
    opts.headers.Origin = config.sys.urls.base;

    const value_array = value.split("-")

    opts.json = true;
    opts.body = {
      variables: {
        categorySlug: "",
        skip: value_array[0],
        limit: value_array[1],
        filters: {},
      },
      query: [
        '    query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {',
        '      problemsetQuestionList(',
        '        categorySlug: $categorySlug',
        '        limit: $limit',
        '        skip: $skip',
        '        filters: $filters',
        '      ) {',
        '        hasMore',
        '        total',
        '        questions {',
        '          frontendQuestionId',
        '          topicTags {',
        '            slug',
        '          }',
        '        }',
        '       }',
        '  }',
      ].join('\n'),
    };

    const spin = helper.spin('Downloading ');
    request.post(opts, function (e, resp, body) {
      spin.stop();
      e = checkError(e, resp, 200);
      if (e) return cb(e);
      let result = {}
      body.data.problemsetQuestionList.questions.forEach(element => {
        result[element.frontendQuestionId] = {
          topicTags: element.topicTags.map(function (p) { return p.slug; }),
          CompanyTags: element.extra.topCompanyTags.map(function (p) { return p.slug; }),
        }
      })
      return cb(null, result);
    });
  };


}


function signOpts(opts, user) {
  opts.headers.Cookie = 'LEETCODE_SESSION=' + user.sessionId +
    ';csrftoken=' + user.sessionCSRF + ';';
  opts.headers['X-CSRFToken'] = user.sessionCSRF;
  opts.headers['X-Requested-With'] = 'XMLHttpRequest';
}

function makeOpts(url) {
  var opts: any = {};
  opts.url = url;
  opts.headers = {};

  if (session.isLogin())
    signOpts(opts, session.getUser());
  return opts;
}

function checkError(e, resp, expectedStatus) {
  if (!e && resp && resp.statusCode !== expectedStatus) {
    const code = resp.statusCode;


    if (code === 403 || code === 401) {
      e = session.errors.EXPIRED;
    } else {
      e = { msg: 'http error', statusCode: code };
    }
  }
  return e;
}

export const leetCodeCn: LeetCodeCn = new LeetCodeCn();
