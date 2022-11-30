/*
 * https://github.com/ccagml/vscode-leetcode-problem-rating/src/rpc/actionChain/cache.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
 * Created Date: Monday, November 14th 2022, 4:04:31 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { ChainNodeBase } from "../chainNodeBase";

let underscore = require("underscore");

import { storageUtils } from "../../utils/storageUtils";
import { commUtils } from "../../utils/commUtils";
import { sessionUtils } from "../../utils/sessionUtils";

/* It's a plugin that caches the data it gets from the next plugin in the chain */
class CachePlugin extends ChainNodeBase {
  id = 50;
  name = "cache";
  builtin = true;
  constructor() {
    super();
  }

  /* Checking if the translation config has changed. If it has, it clears the cache. */
  clearCacheIfTchanged = (needTranslation) => {
    const translationConfig = storageUtils.getCache(commUtils.KEYS.translation);
    if (!translationConfig || translationConfig["useEndpointTranslation"] != needTranslation) {
      storageUtils.deleteAllCache();
      storageUtils.setCache(commUtils.KEYS.translation, {
        useEndpointTranslation: needTranslation,
      });
    }
  };

  /* A method that is used to get problems from the cache. If the cache is empty, it will get the
problems from the next layer. */
  public getProblems = (needTranslation, cb) => {
    this.clearCacheIfTchanged(needTranslation);
    const problems = storageUtils.getCache(commUtils.KEYS.problems);
    if (problems) {
      return cb(null, problems);
    }
    this.next.getProblems(needTranslation, function (e, problems) {
      if (e) return cb(e);
      storageUtils.setCache(commUtils.KEYS.problems, problems);
      return cb(null, problems);
    });
  };

  /* A method that is used to get problems from the cache. If the cache is empty, it will get the
problems from the next layer. */

  public getRatingOnline = (cb) => {
    const cacheRantingData = storageUtils.getCache(commUtils.KEYS.ranting_path);
    if (cacheRantingData) {
      return cb(null, cacheRantingData);
    }
    this.next.getRatingOnline(function (e, ratingData) {
      if (e) return cb(e);
      let ratingObj;
      try {
        ratingObj = JSON.parse(ratingData);
      } catch (error) {
        return cb("JSON.parse(ratingData) error");
      }
      storageUtils.setCache(commUtils.KEYS.ranting_path, ratingObj);
      return cb(null, ratingObj);
    });
  };

  /* A cache layer for the getProblem function. */
  public getProblem = (problem, needTranslation, cb) => {
    this.clearCacheIfTchanged(needTranslation);
    const k = commUtils.KEYS.problem(problem);
    const _problem = storageUtils.getCache(k);
    let that = this;
    if (_problem) {
      if (!_problem.desc.includes("<pre>")) {
        //
      } else if (!["likes", "dislikes"].every((p) => p in _problem)) {
        //
      } else {
        underscore.extendOwn(problem, _problem);
        return cb(null, problem);
      }
    }
    this.next.getProblem(problem, needTranslation, function (e, _problem) {
      if (e) return cb(e);

      that.saveProblem(_problem);
      return cb(null, _problem);
    });
  };

  saveProblem = (problem) => {
    const _problem = underscore.omit(problem, ["locked", "state", "starred"]);
    return storageUtils.setCache(commUtils.KEYS.problem(problem), _problem);
  };

  /* Updating the problem in the cache. */
  updateProblem = (problem, kv) => {
    const problems = storageUtils.getCache(commUtils.KEYS.problems);
    if (!problems) return false;

    const _problem = problems.find((x) => x.id === problem.id);
    if (!_problem) return false;

    underscore.extend(_problem, kv);
    return storageUtils.setCache(commUtils.KEYS.problems, problems);
  };

  /* Logging out the user and then logging in the user. */
  login = (user, cb) => {
    this.logout(user, false);
    this.next.login(user, function (e, user) {
      if (e) return cb(e);
      sessionUtils.saveUser(user);
      return cb(null, user);
    });
  };

  /* Logging out the user and then logging in the user. */
  logout = (user, purge) => {
    if (!user) user = sessionUtils.getUser();
    if (purge) sessionUtils.deleteUser();
    sessionUtils.deleteCodingSession();
    return user;
  };
}

export const pluginObj: CachePlugin = new CachePlugin();
