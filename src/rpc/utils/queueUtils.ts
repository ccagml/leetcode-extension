/*
 * Filename: https://github.com/ccagml/leetcode_vsc/src/rpc/queue.ts
 * Path: https://github.com/ccagml/leetcode_vsc
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

let underscore = require("underscore");

import { configUtils } from "./configUtils";

export class Queue {
  tasks;
  ctx;
  onTask;
  error;
  concurrency;
  onDone;
  constructor(tasks, ctx, onTask) {
    this.tasks = underscore.clone(tasks) || [];
    this.ctx = ctx || {};
    this.onTask = onTask;
    this.error = null;
  }

  addTask(task) {
    this.tasks.push(task);
    return this;
  }

  addTasks(tasks) {
    this.tasks = this.tasks.concat(tasks);
    return this;
  }

  run(concurrency?, onDone?) {
    this.concurrency = concurrency || configUtils.network.concurrency || 1;
    this.onDone = onDone;

    const self = this;
    for (let i = 0; i < this.concurrency; ++i) {
      setImmediate(function () {
        self.workerRun();
      });
    }
  }

  workerRun() {
    // no more tasks, quit now
    if (this.tasks.length === 0) {
      if (--this.concurrency === 0 && this.onDone) this.onDone(this.error, this.ctx);
      return;
    }

    const task = this.tasks.shift();
    const self = this;
    this.onTask(task, self, function (e) {
      if (e) self.error = e;

      // TODO: could retry failed task here.
      setImmediate(function () {
        self.workerRun();
      });
    });
  }
}
