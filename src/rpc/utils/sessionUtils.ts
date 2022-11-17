/*
 * Filename: https://github.com/ccagml/vscode-leetcode-problem-rating/src/rpc/session.ts
 * Path: https://github.com/ccagml/vscode-leetcode-problem-rating
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

let moment_out = require("moment");
let underscore = require("underscore");

import { storageUtils } from "./storageUtils";
import { configUtils } from "./configUtils";
import { commUtils } from "./commUtils";

class Session {
  errors = {
    EXPIRED: {
      msg: "session expired, please login again",
      statusCode: -1,
    },
  };
  argv: any = {};
  constructor() {}
  public getUser = function () {
    return storageUtils.getCache(commUtils.KEYS.user);
  };

  public saveUser = function (user) {
    // when auto login enabled, have to save password to re-login later
    // otherwise don't dump password for the sake of security.
    const _user = underscore.omit(
      user,
      configUtils.autologin.enable ? [] : ["pass"]
    );
    storageUtils.setCache(commUtils.KEYS.user, _user);
  };

  public deleteUser = function () {
    storageUtils.delCache(commUtils.KEYS.user);
  };

  public deleteCodingSession = function () {
    storageUtils.delCache(commUtils.KEYS.problems);
  };

  public isLogin() {
    return this.getUser() !== null;
  }

  public updateStat = function (k, v) {
    // TODO: use other storage if too many stat data
    const today = moment_out().format("YYYY-MM-DD");
    const stats = storageUtils.getCache(commUtils.KEYS.stat) || {};
    const stat = (stats[today] = stats[today] || {});

    if (k.endsWith(".set")) {
      const s = new Set(stat[k] || []);
      s.add(v);
      stat[k] = Array.from(s);
    } else {
      stat[k] = (stat[k] || 0) + v;
    }
    storageUtils.setCache(commUtils.KEYS.stat, stats);
  };
}
export const sessionUtils: Session = new Session();
