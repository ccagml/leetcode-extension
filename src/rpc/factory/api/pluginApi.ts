/*
 * https://github.com/ccagml/leetcode_vsc/src/rpc/factory/api/pluginApi.ts
 * Path: https://github.com/ccagml/leetcode_vsc
 * Created Date: Thursday, November 17th 2022, 11:44:14 am
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { configUtils } from "../../utils/configUtils";
import { reply } from "../../utils/ReplyUtils";
import { chainMgr } from "../../actionChain/chainManager";
import { sessionUtils } from "../../utils/sessionUtils";
import { ApiBase } from "../apiBase";

class PluginApi extends ApiBase {
  constructor() {
    super();
  }

  callArg(argv) {
    let argv_config = this.api_argv()
      .option("d", {
        alias: "disable",
        type: "boolean",
        describe: "Disable plugin",
        default: false,
      })
      .option("e", {
        alias: "enable",
        type: "boolean",
        describe: "Enable plugin",
        default: false,
      })
      .option("i", {
        alias: "install",
        type: "boolean",
        describe: "Install plugin",
        default: false,
      })
      .positional("name", {
        type: "string",
        describe: "Filter plugin by name",
        default: "",
      });

    argv_config.parseArgFromCmd(argv);

    return argv_config.get_result();
  }

  call(argv) {
    sessionUtils.argv = argv;

    let all_plugin = chainMgr.installed;
    const name = argv.name;

    if (name) {
      all_plugin = all_plugin.filter((x) => x.name === name);
    }
    if (all_plugin.length === 0) {
      return reply.fatal("Plugin not found!");
    }

    const p = all_plugin[0];
    if (argv.enable) {
      p.enabled = true;
      p.save();
    } else if (argv.disable) {
      p.enabled = false;
      p.save();
    } else if (argv.delete) {
      // p.delete();
      p.save();
      chainMgr.init(undefined);
    } else if (argv.config) {
      reply.info(JSON.stringify(configUtils.plugins[name] || {}, null, 2));
    }
  }
}

export const pluginApi: PluginApi = new PluginApi();
