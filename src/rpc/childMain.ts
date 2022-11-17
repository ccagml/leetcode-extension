/*
 * Filename: https://github.com/ccagml/vscode-leetcode-problem-rating/src/rpc/cli.ts
 * Path: https://github.com/ccagml/vscode-leetcode-problem-rating
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { chainMgr } from "./actionChain/chainManager";
import { corePlugin } from "./actionChain/chainNode/core";
import { configUtils } from "./utils/configUtils";
import { reply } from "./utils/ReplyUtils";
import { storageUtils } from "./utils/storageUtils";
import { apiFactory } from "./factory/apiFactory";
import { IApi } from "./factory/apiBase";

class Main {
  constructor() {
    this.exec();
  }
  public exec() {
    process.stdout.on("error", function (e) {
      if (e.code === "EPIPE") process.exit();
    });
    configUtils.init(JSON.parse(process.env.ccagml || "{}"));
    reply.init();
    storageUtils.init();
    chainMgr.init(corePlugin);

    let com_str: string = process.argv[2];
    let curApi: IApi | undefined = apiFactory.getApi(com_str);
    curApi?.call(curApi?.callArg(process.argv));
  }
}

export const main: Main = new Main();
