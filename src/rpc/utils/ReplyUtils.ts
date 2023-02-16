/*
 * https://github.com/ccagml/leetcode-extension/src/rpc/Response.ts
 * Path: https://github.com/ccagml/leetcode-extension
 * Created Date: Monday, November 14th 2022, 4:04:31 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

let _ = require("underscore");

class Reply {
  output = _.bind(console.log, console);
  level: any;
  levels = new Map([
    ["INFO", { value: 2 }],
    ["WARN", { value: 3 }],
    ["ERROR", { value: 4 }],
  ]);
  setLevel(name: any) {
    this.level = this.levels.get(name) || this.levels.get("INFO");
  }

  fail(e: any) {
    let msg = e.msg || e;
    if (e.statusCode) {
      msg += " [code=" + e.statusCode + "]";
    }
    this.error(msg);
  }

  fatal(e: any) {
    this.error(e);
    process.exit(1);
  }

  init() {
    this.setLevel("INFO");
  }

  info(...rest: any[]) {
    const args = rest; //Array.from(arguments);
    let s = args.map((x) => x.toString()).join(" ");
    this.output(s);
  }
  warn(...rest: any[]) {
    const args = rest; //Array.from(arguments);
    args.unshift("[" + "warn" + "]");

    let s = args.map((x) => x.toString()).join(" ");
    this.output(s);
  }
  error(...rest: any[]) {
    const args = rest; //Array.from(arguments);
    args.unshift("[" + "error" + "]");

    let s = args.map((x) => x.toString()).join(" ");
    this.output(s);
  }
}

export const reply: Reply = new Reply();
