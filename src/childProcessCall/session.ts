/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/childProcessCall/session.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */


var moment_out = require('moment');
var underscore = require('underscore');


import { cache } from "./cache";
import { config } from "./config";
import { helper } from "./helper";

class Session {
  errors = {
    EXPIRED: {
      msg: 'session expired, please login again',
      statusCode: -1
    }
  };
  argv: any = {

  }
  constructor() {

  }


  public getUser = function () {
    return cache.get(helper.KEYS.user);
  };

  public saveUser = function (user) {
    // when auto login enabled, have to save password to re-login later
    // otherwise don't dump password for the sake of security.
    const _user = underscore.omit(user, config.autologin.enable ? [] : ['pass']);
    cache.set(helper.KEYS.user, _user);
  };

  public deleteUser = function () {
    cache.del(helper.KEYS.user);
  };

  public deleteCodingSession = function () {
    cache.del(helper.KEYS.problems);
  };

  public isLogin() {
    return this.getUser() !== null;
  };

  public updateStat = function (k, v) {
    // TODO: use other storage if too many stat data
    const today = moment_out().format('YYYY-MM-DD');
    const stats = cache.get(helper.KEYS.stat) || {};
    const stat = stats[today] = stats[today] || {};

    if (k.endsWith('.set')) {
      const s = new Set(stat[k] || []);
      s.add(v);
      stat[k] = Array.from(s);
    } else {
      stat[k] = (stat[k] || 0) + v;
    }

    cache.set(helper.KEYS.stat, stats);
  };


}
export const session: Session = new Session();
