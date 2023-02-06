/*
 * Filename: https://github.com/ccagml/leetcode_ext/src/rpc/config.ts
 * Path: https://github.com/ccagml/leetcode_ext
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

let underscore = require("underscore");

class Config {
  LCPTCTX: any;
  app: any;
  sys: any;
  autologin: any;
  code: any;
  file: any;
  color: any;
  icon: any;
  network: any;
  plugins: any;
  constructor() {
    this.sys = {
      categories: ["algorithms", "LCCI", "LCOF", "LCOF2"],
      langs: [
        "bash",
        "c",
        "cpp",
        "csharp",
        "golang",
        "java",
        "javascript",
        "kotlin",
        "mysql",
        "php",
        "python",
        "python3",
        "ruby",
        "rust",
        "scala",
        "swift",
        "typescript",
      ],
      urls: {
        // base urls
        base: "https://leetcode.com",
        graphql: "https://leetcode.com/graphql",
        login: "https://leetcode.com/accounts/login/",
        // third part login base urls. TODO facebook google
        github_login: "https://leetcode.com/accounts/github/login/?next=%2F",
        facebook_login: "https://leetcode.com/accounts/facebook/login/?next=%2F",
        linkedin_login: "https://leetcode.com/accounts/linkedin_oauth2/login/?next=%2F",
        // redirect urls
        leetcode_redirect: "https://leetcode.com/",
        github_tf_redirect: "https://github.com/sessions/two-factor",
        // simulate login urls
        github_login_request: "https://github.com/login",
        github_session_request: "https://github.com/session",
        github_tf_session_request: "https://github.com/sessions/two-factor",
        linkedin_login_request: "https://www.linkedin.com/login",
        linkedin_session_request: "https://www.linkedin.com/checkpoint/lg/login-submit",
        // questions urls
        problems: "https://leetcode.com/api/problems/$category/",
        problem: "https://leetcode.com/problems/$slug/description/",
        test: "https://leetcode.com/problems/$slug/interpret_solution/",
        session: "https://leetcode.com/session/",
        submit: "https://leetcode.com/problems/$slug/submit/",
        submissions: "https://leetcode.com/api/submissions/$slug",
        submission: "https://leetcode.com/submissions/detail/$id/",
        verify: "https://leetcode.com/submissions/detail/$id/check/",
        favorites: "https://leetcode.com/list/api/questions",
        favorite_delete: "https://leetcode.com/list/api/questions/$hash/$id",
        problem_detail: "",
        noj_go: "",
        u: "",
      },
    };

    this.autologin = {
      enable: false,
      retry: 2,
    };
    this.code = {
      editor: "vim",
      lang: "cpp",
    };
    this.file = {
      show: "${fid}.${slug}",
      submission: "${fid}.${slug}.${sid}.${ac}",
    };
    this.color = {
      enable: true,
      theme: "default",
    };
    this.icon = {
      theme: "",
    };
    this.network = {
      concurrency: 10,
      delay: 1,
    };
    this.plugins = {};
  }

  init(ctx) {
    this.LCPTCTX = ctx;
  }

  getAll(useronly) {
    const cfg = underscore.extendOwn({}, this);
    if (useronly) delete cfg.sys;
    return cfg;
  }

  fix_cn() {
    this.app = "leetcode.cn";
    this.sys.urls.base = "https://leetcode.cn";
    this.sys.urls.login = "https://leetcode.cn/accounts/login/";
    this.sys.urls.problems = "https://leetcode.cn/api/problems/$category/";
    this.sys.urls.problem = "https://leetcode.cn/problems/$slug/description/";
    this.sys.urls.graphql = "https://leetcode.cn/graphql";
    this.sys.urls.problem_detail = "https://leetcode.cn/graphql";
    this.sys.urls.test = "https://leetcode.cn/problems/$slug/interpret_solution/";
    this.sys.urls.session = "https://leetcode.cn/session/";
    this.sys.urls.submit = "https://leetcode.cn/problems/$slug/submit/";
    this.sys.urls.submissions = "https://leetcode.cn/api/submissions/$slug";
    this.sys.urls.submission = "https://leetcode.cn/submissions/detail/$id/";
    this.sys.urls.verify = "https://leetcode.cn/submissions/detail/$id/check/";
    this.sys.urls.favorites = "https://leetcode.cn/list/api/questions";
    this.sys.urls.favorite_delete = "https://leetcode.cn/list/api/questions/$hash/$id";
    this.sys.urls.noj_go = "https://leetcode.cn/graphql/noj-go/";
    this.sys.urls.u = "https://leetcode.cn/u/$username/";
    this.sys.urls.github_login = "https://leetcode.cn/accounts/github/login/?next=%2F";
    this.sys.urls.linkedin_login = "https://leetcode.cn/accounts/linkedin_oauth2/login/?next=%2F";
    this.sys.urls.leetcode_redirect = "https://leetcode.cn/";
  }
}

export const configUtils: Config = new Config();
