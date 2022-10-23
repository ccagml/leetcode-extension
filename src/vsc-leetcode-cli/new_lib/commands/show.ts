
var util = require('util');
var childProcess = require('child_process');


import { helper } from "../helper";
import { file } from "../file";

import { log } from "../log";
import { config } from "../config";
import { corePlugin } from "../core";
import { session } from "../session";

class ShowCommand {
  constructor() {

  }


  process_argv = function (argv) {
    var argv_config = helper.base_argv().option('c', {
      alias: 'codeonly',
      type: 'boolean',
      default: false,
      describe: 'Only show code template'
    })
      .option('e', {
        alias: 'editor',
        type: 'string',
        describe: 'Open source code in editor'
      })
      .option('g', {
        alias: 'gen',
        type: 'boolean',
        default: false,
        describe: 'Generate source code'
      })
      .option('l', {
        alias: 'lang',
        type: 'string',
        default: config.code.lang,
        describe: 'Programming language of the source code',
        choices: config.sys.langs
      })
      .option('o', {
        alias: 'outdir',
        type: 'string',
        describe: 'Where to save source code',
        default: '.'
      })
      .option('q', corePlugin.filters.query)
      .option('t', corePlugin.filters.tag)
      .option('x', {
        alias: 'extra',
        type: 'boolean',
        default: false,
        describe: 'Show extra question details in source code'
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
        describe: 'Show question by name or id'
      })


    argv_config.process_argv(argv)

    return argv_config.get_result()
  }


  genFileName(problem, opts) {
    const path = require('path');
    const params = [
      file.fmt(config.file.show, problem),
      '',
      helper.langToExt(opts.lang)
    ];

    // try new name to avoid overwrite by mistake
    for (let i = 0; ; ++i) {
      const name = path.join(opts.outdir, params.join('.').replace(/\.+/g, '.'));
      if (!file.exist(name))
        return name;
      params[1] = i;
    }
  }

  showProblem(problem, argv) {
    const taglist = [problem.category]
      .concat(problem.companies || [])
      .concat(problem.tags || [])
      .map(x => helper.badge(x))
      .join(' ');
    const langlist = problem.templates
      .map(x => helper.badge(x.value))
      .sort()
      .join(' ');

    let code;
    const needcode = argv.gen || argv.codeonly;
    if (needcode) {
      const template = problem.templates.find(x => x.value === argv.lang);
      if (!template) {
        log.info('Not supported language "' + argv.lang + '"');
        log.warn('Supported languages: ' + langlist);
        return;
      }

      const opts = {
        lang: argv.lang,
        code: template.defaultCode,
        tpl: argv.extra ? 'detailed' : 'codeonly'
      };
      code = corePlugin.exportProblem(problem, opts);
    }

    let filename;
    if (argv.gen) {
      file.mkdir(argv.outdir);
      filename = this.genFileName(problem, argv);
      file.write(filename, code);

      if (argv.editor !== undefined) {
        childProcess.spawn(argv.editor || config.code.editor, [filename], {
          // in case your editor of choice is vim or emacs
          stdio: 'inherit'
        });
      }
    } else {
      if (argv.codeonly) {
        log.info(code);
        return;
      }
    }

    log.info(`[${problem.fid}] ${problem.name}`);
    log.info();
    log.info(problem.link);
    if (argv.extra) {
      log.info();
      log.info('Tags:  ' + taglist);
      log.info();
      log.info('Langs: ' + langlist);
    }

    log.info();
    log.info(`* ${problem.category}`);
    log.info(`* ${helper.prettyLevel(problem.level)} (${problem.percent.toFixed(2)}%)`);

    if (problem.likes)
      log.info(`* Likes:    ${problem.likes}`);
    if (problem.dislikes)
      log.info(`* Dislikes: ${problem.dislikes}`);
    else
      log.info(`* Dislikes: -`);
    if (problem.totalAC)
      log.info(`* Total Accepted:    ${problem.totalAC}`);
    if (problem.totalSubmit)
      log.info(`* Total Submissions: ${problem.totalSubmit}`);
    if (problem.testable && problem.testcase) {
      var testcase_value = util.inspect(problem.testcase)
      log.info(`* Testcase Example:  ${testcase_value}`);
    }
    if (filename)
      log.info(`* Source Code:       ${filename}`);

    log.info();
    log.info(problem.desc);
  }

  handler(argv) {
    var that = this
    session.argv = argv;
    if (argv.keyword.length > 0) {
      // show specific one
      corePlugin.getProblem(argv.keyword, !argv.dontTranslate, function (e, problem) {
        if (e) return log.info(e);
        that.showProblem(problem, argv);
      });
    } else {

    }
  };
}

export const showCommand: ShowCommand = new ShowCommand();


