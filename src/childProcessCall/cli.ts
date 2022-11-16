/*
 * Filename: https://github.com/ccagml/vscode-leetcode-problem-rating/src/childProcessCall/cli.ts
 * Path: https://github.com/ccagml/vscode-leetcode-problem-rating
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { myPluginBase } from "./my_plugin_base";
import { config } from "./config";
import { reply } from "./Reply";
import { storageUtils } from "./storageUtils";
class NewCli {
  constructor() {
    this.run();
  }
  public run() {
    process.stdout.on("error", function (e) {
      if (e.code === "EPIPE") process.exit();
    });
    config.init(JSON.parse(process.env.ccagml || "{}"));
    reply.init();
    storageUtils.init();
    if (myPluginBase.base_init()) {
      myPluginBase.save();
      storageUtils.initCache();
      this.runCommand_new();
    }
  }
  private runCommand_new() {
    let com_str = process.argv[2];
    let auto_js = require("./commands/" + com_str)[com_str + "Command"];
    auto_js.handler(auto_js.process_argv(process.argv));
  }
}

export const newCli: NewCli = new NewCli();
