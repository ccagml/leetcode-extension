'use strict';
var moment_out = require('moment');
var underscore = require('underscore');

var cache = require('./cache');
var config = require('./config');
var h = require('./helper');


class Session {
  errors = {
    EXPIRED: {
      msg: 'session expired, please login again',
      statusCode: -1
    }
  };
  constructor() {

  }


  public getUser = function () {
    return cache.get(h.KEYS.user);
  };

  public saveUser = function (user) {
    // when auto login enabled, have to save password to re-login later
    // otherwise don't dump password for the sake of security.
    const _user = underscore.omit(user, config.autologin.enable ? [] : ['pass']);
    cache.set(h.KEYS.user, _user);
  };

  public deleteUser = function () {
    cache.del(h.KEYS.user);
  };

  public deleteCodingSession = function () {
    cache.del(h.KEYS.problems);
  };

  public isLogin() {
    return this.getUser() !== null;
  };

  public updateStat = function (k, v) {
    // TODO: use other storage if too many stat data
    const today = moment_out().format('YYYY-MM-DD');
    const stats = cache.get(h.KEYS.stat) || {};
    const stat = stats[today] = stats[today] || {};

    if (k.endsWith('.set')) {
      const s = new Set(stat[k] || []);
      s.add(v);
      stat[k] = Array.from(s);
    } else {
      stat[k] = (stat[k] || 0) + v;
    }

    cache.set(h.KEYS.stat, stats);
  };


}
export const session: Session = new Session();
