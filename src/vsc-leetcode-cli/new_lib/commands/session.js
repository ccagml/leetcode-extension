'use strict';
var prompt = require('prompt');

var h = require('../helper').helper;
var log = require('../log').log;
var core = require('../core').corePlugin;
var session = require('../session').session;
var sprintf = require('../sprintf').sprintf;

const cmd = {
};


function printSessions(e, sessions) {
  if (e) return log.fail(e);

  log.info(sprintf(' %6s %5s %18s %28s %16s',
    'Active', 'Id', 'Name', 'AC Questions', 'AC Submits'));
  log.info('-'.repeat(80));

  for (let s of sessions) {
    let questionRate = 0;
    let submissionRate = 0;
    if (s.submitted_questions > 0)
      questionRate = s.ac_questions * 100 / s.submitted_questions;
    if (s.total_submitted > 0)
      submissionRate = s.total_acs * 100 / s.total_submitted;

    log.printf('   %s   %8s   %-26s %6s (%6s %%) %6s (%6s %%)',
      s.is_active ? h.prettyState('ac') : ' ',
      s.id,
      s.name || 'Anonymous Session',
      s.ac_questions,
      questionRate.toFixed(2),
      s.total_acs,
      submissionRate.toFixed(2));
  }
}

cmd.handler = function (argv) {
  session.argv = argv;

  if (argv.create)
    return core.createSession(argv.keyword, printSessions);

  core.getSessions(function (e, sessions) {
    if (e) return log.fail(e);

    if (argv.keyword) {
      const id = Number(argv.keyword);
      sessions = sessions.filter(x => x.name === argv.keyword || x.id === id);
      if (sessions.length > 1) return log.fail('Ambiguous sessions?');

      const session = sessions[0];
      if (!session) return log.fail('Session not found!');

      if (argv.enable && !session.is_active) {
        core.activateSession(session, function (e, sessions) {
          if (e) return log.fail(e);
          require('../session').deleteCodingSession();
          printSessions(e, sessions);
        });
        return;
      }

      if (argv.delete) {
        return core.deleteSession(session, printSessions);
      }
    }
    printSessions(null, sessions);
  });
};

module.exports = cmd;
