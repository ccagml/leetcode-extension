
import { MyPluginBase } from "../my_plugin_base";
import { config } from "../config";
import { session } from "../session";

// var plugin = new Plugin(30, 'retry', '',
//   'Plugin to retry last failed request if autologin.enable is on.');
class RetryPlugin extends MyPluginBase {
  id = 30
  name = 'retry'
  builtin = true;
  count = {};

  canRetry = (e, name) => {
    return config.autologin.enable &&
      (e === session.errors.EXPIRED) &&
      (this.count[name] || 0) < config.autologin.retry;
  }
  init = () => {
    const names = [
      'activateSession',
      'createSession',
      'deleteSession',
      'getProblems',
      'getProblem',
      'getSessions',
      'getSubmissions',
      'getSubmission',
      'getFavorites',
      'testProblem',
      'submitProblem',
      'starProblem'
    ];
    var that = this;
    for (let name of names) {
      that.count[name] = 0;
      this[name] = function () {
        const args = Array.from(arguments);
        const cb = args.pop();

        const _cb = function () {
          const results = Array.from(arguments);
          const e = results[0];
          if (!that.canRetry(e, name)) {
            that.count[name] = 0;
            return cb.apply(null, results);
          }

          ++that.count[name];
          that.relogin(function () {
            // for now we don't care result, just blindly retry
            that[name].apply(that, args.concat(cb));
          });
        };

        const next = this.next;
        next[name].apply(next, args.concat(_cb));
      };
    }
  };

  // leetcode.com is limiting one session alive in the same time,
  // which means once you login on web, your cli session will get
  // expired immediately. In that case we will try to re-login in
  // the backend to give a seamless user experience.
  relogin = (cb) => {

    const user = session.getUser();
    if (!user) {

      return cb();
    }

    this.next.login(user, function (e) {
      if (e) {

      } else {

      }
      return cb();
    });
  };

}


export const pluginObj: RetryPlugin = new RetryPlugin();
