var request = require('request');


import { log } from "../log";
import { session } from "../session";
import { MyPluginBase } from "../my_plugin_base";

//
// [Usage]
//
// https://github.com/skygragon/leetcode-cli-plugins/blob/master/docs/solution.discuss.md
//
// var plugin = new Plugin(200, 'solution.discuss', '',
//   'Plugin to fetch most voted solution in discussions.');


class SolutionDiscuss extends MyPluginBase {
  id = 200
  name = "solution.discuss"
  builtin = true;
  constructor() {
    super()
  }


  getProblem = (problem, needTranslation, cb) => {

    this.next.getProblem(problem, needTranslation, function (e, problem) {
      if (e || !session.argv.solution) return cb(e, problem);

      var lang = session.argv.lang;
      getSolution(problem, lang, function (e, solution) {
        if (e) return cb(e);
        if (!solution) return log.error('Solution not found for ' + lang);

        var link = URL_DISCUSS.replace('$slug', problem.slug).replace('$id', solution.id);
        var content = solution.post.content.replace(/\\n/g, '\n').replace(/\\t/g, '\t');

        log.info();
        log.info(problem.name);
        log.info();
        log.info(solution.title);
        log.info();
        log.info(link);
        log.info();
        log.info('* Lang:    ' + lang);
        log.info('* Author:  ' + solution.post.author.username);
        log.info('* Votes:   ' + solution.post.voteCount);
        log.info();
        log.info(content);
      });
    });
  };

}

var URL_DISCUSSES = 'https://leetcode.com/graphql';
var URL_DISCUSS = 'https://leetcode.com/problems/$slug/discuss/$id';

function getSolution(problem, lang, cb) {
  if (!problem) return cb();

  if (lang === 'python3') lang = 'python';

  var opts = {
    url: URL_DISCUSSES,
    json: true,
    body: {
      query: [
        'query questionTopicsList($questionId: String!, $orderBy: TopicSortingOption, $skip: Int, $query: String, $first: Int!, $tags: [String!]) {',
        '  questionTopicsList(questionId: $questionId, orderBy: $orderBy, skip: $skip, query: $query, first: $first, tags: $tags) {',
        '    ...TopicsList',
        '  }',
        '}',
        'fragment TopicsList on TopicConnection {',
        '  totalNum',
        '  edges {',
        '    node {',
        '      id',
        '      title',
        '      post {',
        '        content',
        '        voteCount',
        '        author {',
        '          username',
        '        }',
        '      }',
        '    }',
        '  }',
        '}'
      ].join('\n'),

      operationName: 'questionTopicsList',
      variables: JSON.stringify({
        query: '',
        first: 1,
        skip: 0,
        orderBy: 'most_votes',
        questionId: '' + problem.id,
        tags: [lang]
      })
    }
  };
  request(opts, function (e, resp, body) {
    if (e) return cb(e);
    if (resp.statusCode !== 200)
      return cb({ msg: 'http error', statusCode: resp.statusCode });

    const solutions = body.data.questionTopicsList.edges;
    const solution = solutions.length > 0 ? solutions[0].node : null;
    return cb(null, solution);
  });
}

export const pluginObj: SolutionDiscuss = new SolutionDiscuss();
