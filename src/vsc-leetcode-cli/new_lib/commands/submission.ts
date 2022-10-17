
var path = require('path');

var _ = require('underscore');



import { helper } from "../helper";
import { file } from "../file";
import { config } from "../config";
import { log } from "../log";
import { Queue } from "../queue";
import { corePlugin } from "../core";
import { session } from "../session";


class SubMission {
  constructor() {

  }

  process_argv = function (argv) {
    var argv_config = helper.base_argv().option('a', {
      alias: 'all',
      type: 'boolean',
      default: false,
      describe: 'Download all questions'
    })
      .option('l', {
        alias: 'lang',
        type: 'string',
        default: 'all',
        describe: 'Filter by programming language'
      })
      .option('o', {
        alias: 'outdir',
        type: 'string',
        describe: 'Where to save submission code',
        default: '.'
      })
      .option('x', {
        alias: 'extra',
        type: 'boolean',
        default: false,
        describe: 'Show extra question details in submission code'
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
        describe: 'Download specific question by id'
      })
    argv_config.process_argv(argv)

    return argv_config.get_result()
  }


  doTask(problem, queue, cb) {
    var that = this;
    const argv = queue.ctx.argv;

    function onTaskDone(e, msg) {
      // NOTE: msg color means different purpose:
      // - red: error
      // - green: accepted, fresh download
      // - yellow: not ac-ed, fresh download
      // - white: existed already, skip download
      log.info('[%=4s] %-60s %s', problem.fid, problem.name,
        (e ? 'ERROR: ' + (e.msg || e) : msg));
      if (cb) cb(e);
    }

    if (argv.extra) {
      // have to get problem details, e.g. problem description.
      corePlugin.getProblem(problem.fid, !argv.dontTranslate, function (e, problem) {
        if (e) return cb(e);
        that.exportSubmission(problem, argv, onTaskDone);
      });
    } else {
      that.exportSubmission(problem, argv, onTaskDone);
    }
  }

  exportSubmission(problem, argv, cb) {
    corePlugin.getSubmissions(problem, function (e, submissions) {
      if (e) return cb(e);
      if (submissions.length === 0)
        return cb('No submissions?');

      // get obj list contain required filetype
      submissions = submissions.filter(x => argv.lang === 'all' || argv.lang === x.lang);
      if (submissions.length === 0)
        return cb('No submissions in required language.');

      // if no accepted, use the latest non-accepted one
      const submission = submissions.find(x => x.status_display === 'Accepted') || submissions[0];
      submission.ac = (submission.status_display === 'Accepted');

      const data = _.extend({}, submission, problem);
      data.sid = submission.id;
      data.ac = submission.ac ? 'ac' : 'notac';
      const basename = file.fmt(config.file.submission, data);
      const f = path.join(argv.outdir, basename + helper.langToExt(submission.lang));

      file.mkdir(argv.outdir);
      // skip the existing cached submissions
      if (file.exist(f))
        return cb(null, f);

      corePlugin.getSubmission(submission, function (e, submission) {
        if (e) return cb(e);

        const opts = {
          lang: submission.lang,
          code: submission.code,
          tpl: argv.extra ? 'detailed' : 'codeonly'
        };
        file.write(f, corePlugin.exportProblem(problem, opts));
        cb(null, submission.ac ? f
          : f);
      });
    });
  }

  handler(argv) {
    session.argv = argv;
    const q = new Queue(null, { argv: argv }, this.doTask);

    if (argv.all) {
      corePlugin.getProblems(false, function (e, problems) {
        if (e) return log.fail(e);
        problems = problems.filter(x => x.state === 'ac' || x.state === 'notac');
        q.addTasks(problems).run();
      });
      return;
    }

    if (!argv.keyword)
      return log.fail('missing keyword?');

    corePlugin.getProblem(argv.keyword, !argv.dontTranslate, function (e, problem) {
      if (e) return log.fail(e);
      q.addTask(problem).run();
    });
  };
}



export const subMission: SubMission = new SubMission();
