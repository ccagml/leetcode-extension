/*
 * https://github.com/ccagml/leetcode-extension/src/rpc/actionChain/retry.ts
 * Path: https://github.com/ccagml/leetcode-extension
 * Created Date: Monday, November 14th 2022, 4:04:31 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { ChainNodeBase } from "../chainNodeBase";
import { configUtils } from "../../utils/configUtils";
import { sessionUtils } from "../../utils/sessionUtils";

class RetryPlugin extends ChainNodeBase {
  id = 30;
  name = "retry";
  builtin = true;
  count = {};

  canRetry = (e, name) => {
    return (
      configUtils.autologin.enable &&
      e === sessionUtils.errors.EXPIRED &&
      (this.count[name] || 0) < configUtils.autologin.retry
    );
  };
  /* A wrapper for the API. */
  init = () => {
    const names = [
      "activateSession",
      "createSession",
      "deleteSession",
      "getProblems",
      "getProblem",
      "getSessions",
      "getSubmissions",
      "getSubmission",
      "getFavorites",
      "testProblem",
      "submitProblem",
      "starProblem",
    ];
    let that = this;
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

  /* The above code is checking if the user is logged in. If the user is logged in, it will call the next
login function. */
  // leetcode.com is limiting one session alive in the same time,
  // which means once you login on web, your cli session will get
  // expired immediately. In that case we will try to re-login in
  // the backend to give a seamless user experience.
  relogin = (cb) => {
    const user = sessionUtils.getUser();
    if (!user) {
      return cb();
    }

    this.next.login(user, function (e) {
      if (e) {
        //
      } else {
        //
      }
      return cb();
    });
  };
}

export const pluginObj: RetryPlugin = new RetryPlugin();
