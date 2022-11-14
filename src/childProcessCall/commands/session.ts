/*
 * Filename: https://github.com/ccagml/vscode-leetcode-problem-rating/src/childProcessCall/commands/session.ts
 * Path: https://github.com/ccagml/vscode-leetcode-problem-rating
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */



// import { helper } from "../helper";
// import { corePlugin } from "../core";
// import { log } from "../log";
// import { session } from "../session";


class SessionCommand {
  constructor() {

  }

  // printSessions(e, sessions) {
  //   if (e) return log.info(e);

  //   log.info(' %6s %5s %18s %28s %16s',
  //     'Active', 'Id', 'Name', 'AC Questions', 'AC Submits');
  //   log.info('-'.repeat(80));

  //   for (let s of sessions) {
  //     let questionRate = 0;
  //     let submissionRate = 0;
  //     if (s.submitted_questions > 0)
  //       questionRate = s.ac_questions * 100 / s.submitted_questions;
  //     if (s.total_submitted > 0)
  //       submissionRate = s.total_acs * 100 / s.total_submitted;

  //     log.info(
  //       s.is_active ? helper.prettyState('ac') : ' ',
  //       s.id,
  //       s.name || 'Anonymous Session',
  //       s.ac_questions,
  //       questionRate.toFixed(2),
  //       s.total_acs,
  //       submissionRate.toFixed(2));
  //   }
  // }

  // handler(argv) {
  //   session.argv = argv;

  //   if (argv.create)
  //     return corePlugin.createSession(argv.keyword, this.printSessions);

  //   let that = this;
  //   corePlugin.getSessions(function (e, sessions) {
  //     if (e) return log.info(e);

  //     if (argv.keyword) {
  //       const id = Number(argv.keyword);
  //       sessions = sessions.filter(x => x.name === argv.keyword || x.id === id);
  //       if (sessions.length > 1) return log.info('Ambiguous sessions?');

  //       const session = sessions[0];
  //       if (!session) return log.info('Session not found!');

  //       if (argv.enable && !session.is_active) {
  //         corePlugin.activateSession(session, function (e, sessions) {
  //           if (e) return log.info(e);
  //           require('../session').session.deleteCodingSession();
  //           that.printSessions(e, sessions);
  //         });
  //         return;
  //       }

  //       if (argv.delete) {
  //         return corePlugin.deleteSession(session, that.printSessions);
  //       }
  //     }
  //     that.printSessions(null, sessions);
  //   });
  // };
}


export const sessionCommand: SessionCommand = new SessionCommand();
