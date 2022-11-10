/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/childProcessCall/commands/plugin.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */


import { helper } from "../helper";
import { config } from "../config";
import { log } from "../log";
import { myPluginBase } from "../my_plugin_base";
import { session } from "../session";


class PluginCommand {
  constructor() {

  }

  process_argv = function (argv) {
    var argv_config = helper.base_argv().option('d', {
      alias: 'disable',
      type: 'boolean',
      describe: 'Disable plugin',
      default: false
    }).option('e', {
      alias: 'enable',
      type: 'boolean',
      describe: 'Enable plugin',
      default: false
    }).option('i', {
      alias: 'install',
      type: 'boolean',
      describe: 'Install plugin',
      default: false
    }).positional('name', {
      type: 'string',
      describe: 'Filter plugin by name',
      default: ''
    })

    argv_config.process_argv(argv)

    return argv_config.get_result()
  }

  handler = function (argv) {
    session.argv = argv;

    let plugins = myPluginBase.plugins;
    const name = argv.name;

    // if (argv.install) {
    //   const cb = function (e, p) {
    //     if (e) return log.fatal(e);
    //     p.help();
    //     p.save();
    //     myPluginBase.init();
    //   };

    //   return;
    // }

    if (name) plugins = plugins.filter(x => x.name === name);
    if (plugins.length === 0) return log.fatal('Plugin not found!');

    const p = plugins[0];
    if (p.missing && (argv.enable || argv.disable))
      return log.fatal('Plugin missing, install it first');

    if (argv.enable) {
      p.enabled = true;
      p.save();
    } else if (argv.disable) {
      p.enabled = false;
      p.save();
    } else if (argv.delete) {
      p.delete();
      p.save();
      myPluginBase.init();
    } else if (argv.config) {
      log.info(JSON.stringify(config.plugins[name] || {}, null, 2));
    } else {
    }
  };
}


export const pluginCommand: PluginCommand = new PluginCommand();
