/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/childProcessCall/actionChain/cache.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
 * Created Date: Monday, November 14th 2022, 4:04:31 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { Chain } from "../chain";

let underscore = require("underscore");

import { storageUtils } from "../../storageUtils";
import { commUtils } from "../../commUtils";
import { session } from "../../session";

class CachePlugin extends Chain {
  id = 50;
  name = "cache";
  builtin = true;
  constructor() {
    super();
  }

  clearCacheIfTchanged = (needTranslation) => {
    const translationConfig = storageUtils.getCache(commUtils.KEYS.translation);
    if (
      !translationConfig ||
      translationConfig["useEndpointTranslation"] != needTranslation
    ) {
      storageUtils.deleteAllCache();
      storageUtils.setCache(commUtils.KEYS.translation, {
        useEndpointTranslation: needTranslation,
      });
    }
  };

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

  /**
   * getRatingOnline
   */
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

  updateProblem = (problem, kv) => {
    const problems = storageUtils.getCache(commUtils.KEYS.problems);
    if (!problems) return false;

    const _problem = problems.find((x) => x.id === problem.id);
    if (!_problem) return false;

    underscore.extend(_problem, kv);
    return storageUtils.setCache(commUtils.KEYS.problems, problems);
  };

  login = (user, cb) => {
    this.logout(user, false);
    this.next.login(user, function (e, user) {
      if (e) return cb(e);
      session.saveUser(user);
      return cb(null, user);
    });
  };

  logout = (user, purge) => {
    if (!user) user = session.getUser();
    if (purge) session.deleteUser();
    // NOTE: need invalidate any user related cache
    session.deleteCodingSession();
    return user;
  };
}

export const pluginObj: CachePlugin = new CachePlugin();
