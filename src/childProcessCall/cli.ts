/*
 * Filename: https://github.com/ccagml/vscode-leetcode-problem-rating/src/childProcessCall/cli.ts
 * Path: https://github.com/ccagml/vscode-leetcode-problem-rating
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { chain } from "./actionChain/chain";
import { corePlugin } from "./actionChain/chainNode/core";
import { config } from "./config";
import { reply } from "./Reply";
import { storageUtils } from "./storageUtils";
import { IApi, apiFactory } from "./factory/apiFactory";

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
    if (chain.base_init(corePlugin)) {
      chain.save();
      storageUtils.initCache();
      this.doApi();
    }
  }
  private doApi() {
    let com_str = process.argv[2];
    let curApi: IApi | undefined = apiFactory.getApi(com_str);
    if (curApi != undefined) {
      curApi.call(curApi.callArg(process.argv));
    }
  }
}

export const newCli: NewCli = new NewCli();
