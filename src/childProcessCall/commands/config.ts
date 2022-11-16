/*
 * Filename: https://github.com/ccagml/vscode-leetcode-problem-rating/src/childProcessCall/commands/config.ts
 * Path: https://github.com/ccagml/vscode-leetcode-problem-rating
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

// let underscore = require('underscore');
// let nconf = require('nconf');

// import { config } from "../config";
// import { log } from "../log";
// import { file } from "../file";
// import { session } from "../session";
// import { commUtils } from "../commUtils";

class ConfigCommand {
  constructor() {}

  // process_argv(argv) {
  //   let argv_config = commUtils.base_argv().option('a', {
  //     alias: 'all',
  //     type: 'boolean',
  //     describe: 'Show all config',
  //     default: false
  //   })
  //     .option('d', {
  //       alias: 'delete',
  //       type: 'boolean',
  //       describe: 'Delete config by key',
  //       default: false
  //     })
  //     .positional('key', {
  //       type: 'string',
  //       describe: 'Config key, delimited by colon',
  //       default: ''
  //     })
  //     .positional('value', {
  //       type: 'string',
  //       describe: 'Config value',
  //       default: ''
  //     });
  //   argv_config.process_argv(argv);

  //   return argv_config.get_result();
  // }

  // prettyConfig(cfg) {
  //   return JSON.stringify(cfg, null, 2);
  // }

  // loadConfig(showall) {
  //   const cfg = showall ? config.getAll(true) : nconf.get();
  //   return underscore.omit(cfg, 'type');
  // }

  // saveConfig() {
  //   storageUtils.write(storageUtils.configFile(), this.prettyConfig(this.loadConfig(false)));
  // }

  // handler(argv) {
  //   session.argv = argv;
  //   nconf.file('local', storageUtils.configFile());

  //   // show all
  //   if (argv.key.length === 0)
  //     return log.info(this.prettyConfig(this.loadConfig(argv.all)));

  //   const v = nconf.get(argv.key);

  //   // delete
  //   if (argv.delete) {
  //     if (v === undefined) return log.fatal('Key not found: ' + argv.key);
  //     nconf.clear(argv.key);
  //     return this.saveConfig();
  //   }

  //   // show
  //   if (argv.value.length === 0) {
  //     if (v === undefined) return log.fatal('Key not found: ' + argv.key);
  //     return log.info(this.prettyConfig(v));
  //   }

  //   // set
  //   try {
  //     nconf.set(argv.key, JSON.parse(argv.value));
  //   } catch (e) {
  //     nconf.set(argv.key, JSON.parse('"' + argv.value + '"'));
  //   }
  //   return this.saveConfig();
  // };
}

export const configCommand: ConfigCommand = new ConfigCommand();
