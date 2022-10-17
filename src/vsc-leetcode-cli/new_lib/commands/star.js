'use strict';

var icon = require('../icon').icon;
var log = require('../log').log;
var core = require('../core').corePlugin;
var session = require('../session').session;

const cmd = {

};


cmd.process_argv = function (argv) {
  var argv_config = h.base_argv().option('d', {
    alias: 'delete',
    type: 'boolean',
    describe: 'Unstar question',
    default: false
  })
    .positional('keyword', {
      type: 'string',
      describe: 'Question name or id',
      default: ''
    })


  argv_config.process_argv(argv)

  return argv_config.get_result()
}

cmd.handler = function (argv) {
  session.argv = argv;
  // translation doesn't affect question lookup
  core.getProblem(argv.keyword, true, function (e, problem) {
    if (e) return log.fail(e);

    core.starProblem(problem, !argv.delete, function (e, starred) {
      if (e) return log.fail(e);

      log.printf('[%s] %s %s', problem.fid, problem.name,
        starred ? icon.like : icon.unlike);

      core.updateProblem(problem, { starred: starred });
    });
  });
};

module.exports = cmd;
