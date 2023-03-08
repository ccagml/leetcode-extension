export function getQuestionDetailBody(titleSlug_value) {
  return {
    query: [
      "query getQuestionDetail($titleSlug: String!) {",
      "  question(titleSlug: $titleSlug) {",
      "    content",
      "    stats",
      "    likes",
      "    dislikes",
      "    codeDefinition",
      "    sampleTestCase",
      "    enableRunCode",
      "    metaData",
      "    translatedContent",
      "  }",
      "}",
    ].join("\n"),
    variables: { titleSlug: titleSlug_value },
    operationName: "getQuestionDetail",
  };
}

export function getAddQuestionToFavoriteBody(user_hash, problem_id) {
  return {
    query: [
      "mutation addQuestionToFavorite($favoriteIdHash: String!, $questionId: String!) {",
      "    addQuestionToFavorite(favoriteIdHash: $favoriteIdHash, questionId: $questionId) {",
      "            ok",
      "            error",
      "            favoriteIdHash",
      "            questionId",
      "            __typename",
      "      }",
      "}",
    ].join("\n"),
    variables: { favoriteIdHash: user_hash, questionId: "" + problem_id },
    operationName: "addQuestionToFavorite",
  };
}

export function getRemoveQuestionFromFavoriteBody(user_hash, problem_id) {
  return {
    query: [
      "mutation removeQuestionFromFavorite($favoriteIdHash: String!, $questionId: String!) {",
      "    removeQuestionFromFavorite(favoriteIdHash: $favoriteIdHash, questionId: $questionId) {",
      "            ok",
      "            error",
      "            favoriteIdHash",
      "            questionId",
      "            __typename",
      "      }",
      "}",
    ].join("\n"),
    variables: { favoriteIdHash: user_hash, questionId: "" + problem_id },
    operationName: "removeQuestionFromFavorite",
  };
}

export function getUserInfoBody() {
  return {
    query: ["{", "  user {", "    username", "    isCurrentUserPremium", "  }", "}"].join("\n"),
    variables: {},
  };
}

export function getGetHelpEnBody(lang, problem_id) {
  return {
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
      questionId: "" + problem_id,
      tags: [lang],
    }),
  };
}

export function getProblemsTitleCNBody() {
  return {
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
}

export function getQuestionOfTodayCNBody() {
  return {
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
}

export function getUserContestPCNBody(username) {
  return {
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
}

export function getSolutionBySlugCNBody(articles_slug) {
  return {
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
}

export function getSolutionArticlesSlugListCNBody(question_slug, lang) {
  return {
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
}
