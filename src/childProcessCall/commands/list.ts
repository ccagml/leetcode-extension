
/*
 * Filename: https://github.com/ccagml/vscode-leetcode-problem-rating/src/childProcessCall/commands/list.ts
 * Path: https://github.com/ccagml/vscode-leetcode-problem-rating
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */


import { helper } from "../helper";
import { log } from "../log";
import { corePlugin } from "../core";
import { session } from "../session";

class ListCommand {
  constructor() {

  }

  process_argv(argv) {
    let argv_config = helper.base_argv().option('q', corePlugin.filters.query)
      .option('s', {
        alias: 'stat',
        type: 'boolean',
        default: false,
        describe: 'Show statistics of listed questions'
      })
      .option('t', corePlugin.filters.tag)
      .option('x', {
        alias: 'extra',
        type: 'boolean',
        default: false,
        describe: 'Show extra details: category, companies, tags.'
      })
      .option('T', {
        alias: 'dontTranslate',
        type: 'boolean',
        default: false,
        describe: 'Set to true to disable endpoint\'s translation',
      })
      .positional('keyword', {
        type: 'string',
        default: '',
        describe: 'Filter questions by keyword'
      });

    argv_config.process_argv(argv);

    return argv_config.get_result();
  }

  handler(argv) {
    session.argv = argv;
    corePlugin.filterProblems(argv, function (e, problems) {
      if (e) return log.info(e);
      let new_objcet: Array<any> = [];
      problems.forEach(element => {
        let temp_ele: any = {};
        for (const key in element) {
          if (key != "link") {
            temp_ele[key] = element[key];
          }
        }
        new_objcet.push(temp_ele);
      });
      log.info(JSON.stringify(new_objcet));
    });
  };
}

export const listCommand: ListCommand = new ListCommand();
