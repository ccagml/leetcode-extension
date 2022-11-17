/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/childProcessCall/actionChain/solution.discuss.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
 * Created Date: Monday, November 14th 2022, 4:04:31 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

let request = require("request");

import { reply } from "../../Reply";
import { session } from "../../session";
import { Chain } from "./../chain";

class SolutionDiscuss extends Chain {
  id = 200;
  name = "solution.discuss";
  builtin = true;
  constructor() {
    super();
  }

  getProblem = (problem, needTranslation, cb) => {
    this.next.getProblem(problem, needTranslation, function (e, problem) {
      if (e || !session.argv.solution) return cb(e, problem);

      let lang = session.argv.lang;
      getSolution(problem, lang, function (e, solution) {
        if (e) return cb(e);
        if (!solution) return reply.error("Solution not found for " + lang);

        let link = URL_DISCUSS.replace("$slug", problem.slug).replace(
          "$id",
          solution.id
        );
        let content = solution.post.content
          .replace(/\\n/g, "\n")
          .replace(/\\t/g, "\t");

        reply.info();
        reply.info(problem.name);
        reply.info();
        reply.info(solution.title);
        reply.info();
        reply.info(link);
        reply.info();
        reply.info("* Lang:    " + lang);
        reply.info("* Author:  " + solution.post.author.username);
        reply.info("* Votes:   " + solution.post.voteCount);
        reply.info();
        reply.info(content);
      });
    });
  };
}

let URL_DISCUSSES = "https://leetcode.com/graphql";
let URL_DISCUSS = "https://leetcode.com/problems/$slug/discuss/$id";

function getSolution(problem, lang, cb) {
  if (!problem) return cb();

  if (lang === "python3") lang = "python";

  let opts = {
    url: URL_DISCUSSES,
    json: true,
    body: {
      query: [
        "query questionTopicsList($questionId: String!, $orderBy: TopicSortingOption, $skip: Int, $query: String, $first: Int!, $tags: [String!]) {",
        "  questionTopicsList(questionId: $questionId, orderBy: $orderBy, skip: $skip, query: $query, first: $first, tags: $tags) {",
        "    ...TopicsList",
        "  }",
        "}",
        "fragment TopicsList on TopicConnection {",
        "  totalNum",
        "  edges {",
        "    node {",
        "      id",
        "      title",
        "      post {",
        "        content",
        "        voteCount",
        "        author {",
        "          username",
        "        }",
        "      }",
        "    }",
        "  }",
        "}",
      ].join("\n"),

      operationName: "questionTopicsList",
      variables: JSON.stringify({
        query: "",
        first: 1,
        skip: 0,
        orderBy: "most_votes",
        questionId: "" + problem.id,
        tags: [lang],
      }),
    },
  };
  request(opts, function (e, resp, body) {
    if (e) return cb(e);
    if (resp.statusCode !== 200)
      return cb({ msg: "http error", statusCode: resp.statusCode });

    const solutions = body.data.questionTopicsList.edges;
    const solution = solutions.length > 0 ? solutions[0].node : null;
    return cb(null, solution);
  });
}

export const pluginObj: SolutionDiscuss = new SolutionDiscuss();
