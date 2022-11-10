
var util = require('util');
var lodash = require('lodash');


import { helper } from "../helper";
import { file } from "../file";
import { log } from "../log";
import { corePlugin } from "../core";
import { session } from "../session";



class SubmitCommand {
  constructor() {

  }


  process_argv(argv) {
    var argv_config = helper.base_argv().positional('filename', {
      type: 'string',
      describe: 'Code file to submit',
      default: ''
    })
    argv_config.process_argv(argv)

    return argv_config.get_result()
  }


  printResult(actual, k, log_obj) {
    if (!actual.hasOwnProperty(k)) return;

    const v = actual[k] || '';
    const lines = Array.isArray(v) ? v : [v];
    for (let line of lines) {
      if (k !== 'state') {
        if (!log_obj.hasOwnProperty(lodash.startCase(k))) {
          log_obj[lodash.startCase(k)] = [line]
        } else {
          log_obj[lodash.startCase(k)].push(line)
        }
      } else {
        log_obj.messages.push(line)
      }
    }
  }

  printLine(log_obj, ...ret: any[]) {
    const args = ret.slice(1);
    const line = util.format.apply(util, args);
    log_obj.messages.push(line)
  }

  handler(argv) {
    session.argv = argv;
    if (!file.exist(argv.filename))
      return log.fatal('File ' + argv.filename + ' not exist!');

    const meta = file.meta(argv.filename);
    var that = this;
    // translation doesn't affect problem lookup
    corePlugin.getProblem(meta, true, function (e, problem) {
      if (e) return log.info(e);

      problem.file = argv.filename;
      problem.lang = meta.lang;

      corePlugin.submitProblem(problem, function (e, results) {
        if (e) return log.info(e);

        const result = results[0];

        var log_obj: any = {}
        log_obj.messages = []
        log_obj.system_message = {}
        log_obj.system_message.fid = problem.fid
        log_obj.system_message.id = problem.id
        log_obj.system_message.qid = problem.id
        log_obj.system_message.sub_type = "submit"
        log_obj.system_message.accepted = false;

        that.printResult(result, 'state', log_obj);
        that.printLine(log_obj, result, '%d/%d cases passed (%s)',
          result.passed, result.total, result.runtime);

        if (result.ok) {
          session.updateStat('ac', 1);
          session.updateStat('ac.set', problem.fid);
          log_obj.system_message.accepted = true;

          (function () {
            if (result.runtime_percentile)
              that.printLine(log_obj, result, 'Your runtime beats %d %% of %s submissions',
                result.runtime_percentile.toFixed(2), result.lang);
            else
              return log.warn('Failed to get runtime percentile.');
            if (result.memory && result.memory_percentile)
              that.printLine(log_obj, result, 'Your memory usage beats %d %% of %s submissions (%s)',
                result.memory_percentile.toFixed(2), result.lang, result.memory);
            else
              return log.warn('Failed to get memory percentile.');
          })();
        } else {
          result.testcase = result.testcase.slice(1, -1).replace(/\\n/g, '\n');
          that.printResult(result, 'error', log_obj);
          that.printResult(result, 'testcase', log_obj);
          that.printResult(result, 'answer', log_obj);
          that.printResult(result, 'expected_answer', log_obj);
          that.printResult(result, 'stdout', log_obj);
        }
        log.info(JSON.stringify(log_obj))
        corePlugin.updateProblem(problem, { state: (result.ok ? 'ac' : 'notac') });
      });
    });
  };
}


export const submitCommand: SubmitCommand = new SubmitCommand();
