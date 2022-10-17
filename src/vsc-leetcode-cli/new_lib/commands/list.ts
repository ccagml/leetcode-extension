
import { helper } from "../helper";
import { log } from "../log";
import { corePlugin } from "../core";
import { session } from "../session";

class ListCommand {
  constructor() {

  }

  process_argv(argv) {
    var argv_config = helper.base_argv().option('q', corePlugin.filters.query)
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
      })

    argv_config.process_argv(argv)

    return argv_config.get_result()
  }

  handler(argv) {
    session.argv = argv;
    corePlugin.filterProblems(argv, function (e, problems) {
      if (e) return log.fail(e);


      log.info(JSON.stringify(problems));

    });
  };
}




export const listCommand: ListCommand = new ListCommand();
