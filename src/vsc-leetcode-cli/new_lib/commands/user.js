'use strict';
var prompt = require('prompt');

var h = require('../helper');
var config = require('../config');
var log = require('../log');
var core = require('../core');
var session = require('../session');
var sprintf = require('../sprintf');

const cmd = {
  command: 'user',
  aliases: ['account'],
  desc: 'Manage account',
  builder: function (yargs) {
    return yargs
      .option('l', {
        alias: 'login',
        type: 'boolean',
        default: false,
        describe: 'Login'
      })
      .option('c', {
        alias: 'cookie',
        type: 'boolean',
        default: false,
        describe: 'cookieLogin'
      })
      .option('g', {
        alias: 'github',
        type: 'boolean',
        default: false,
        describe: 'githubLogin'
      })
      .option('i', {
        alias: 'linkedin',
        type: 'boolean',
        default: false,
        describe: 'linkedinLogin'
      })
      .option('L', {
        alias: 'logout',
        type: 'boolean',
        default: false,
        describe: 'Logout'
      })
      .example('leetcode user', 'Show current user')
      .example('leetcode user -l', 'User login')
      .example('leetcode user -c', 'User Cookie login')
      .example('leetcode user -g', 'User GitHub login')
      .example('leetcode user -i', 'User LinkedIn login')
      .example('leetcode user -L', 'User logout');
  }
};

cmd.process_argv = function (argv) {
  var argv_config = h.base_argv().option('l', {
    alias: 'login',
    type: 'boolean',
    default: false,
    describe: 'Login'
  })
    .option('c', {
      alias: 'cookie',
      type: 'boolean',
      default: false,
      describe: 'cookieLogin'
    })
    .option('g', {
      alias: 'github',
      type: 'boolean',
      default: false,
      describe: 'githubLogin'
    })
    .option('i', {
      alias: 'linkedin',
      type: 'boolean',
      default: false,
      describe: 'linkedinLogin'
    })
    .option('L', {
      alias: 'logout',
      type: 'boolean',
      default: false,
      describe: 'Logout'
    })

  argv_config.process_argv(argv)

  return argv_config.get_result()
}


cmd.handler = function (argv) {
  session.argv = argv;
  let user = null;
  if (argv.login) {
    // login
    prompt.colors = false;
    prompt.message = '';
    prompt.start();
    prompt.get([
      { name: 'login', required: true },
      { name: 'pass', required: true, hidden: true }
    ], function (e, user) {
      if (e) {
        return log.fail(JSON.stringify({ code: -1, msg: e.msg || e }));
      }

      core.login(user, function (e, user) {
        if (e) {
          return log.fail(JSON.stringify({ code: -2, msg: e.msg || e }));
        }
        log.info(JSON.stringify({ code: 100, user_name: user.name }));
      });
    });
  } else if (argv.logout) {
    // logout
    user = core.logout(user, true);
    if (user)
      log.info(JSON.stringify({ code: 100, user_name: user.name }));
    else
      log.fail(JSON.stringify({ code: -3, msg: 'You are not login yet?' }));
    // third parties
  } else if (argv.github || argv.linkedin) {
    // add future third parties here
    const functionMap = new Map(
      [
        ['g', core.githubLogin],
        ['github', core.githubLogin],
        ['i', core.linkedinLogin],
        ['linkedin', core.linkedinLogin],
      ]
    );
    const keyword = Object.entries(argv).filter((i) => (i[1] === true))[0][0];
    const coreFunction = functionMap.get(keyword);
    prompt.colors = false;
    prompt.message = '';
    prompt.start();
    prompt.get([
      { name: 'login', required: true },
      { name: 'pass', required: true, hidden: true }
    ], function (e, user) {
      if (e) return log.fail(JSON.stringify({ code: -4, msg: e.msg || e }));
      coreFunction(user, function (e, user) {
        if (e) return log.fail(JSON.stringify({ code: -5, msg: e.msg || e }));
        log.info(JSON.stringify({ code: 100, user_name: user.name }));
      });
    });
  } else if (argv.cookie) {
    // session
    prompt.colors = false;
    prompt.message = '';
    prompt.start();
    prompt.get([
      { name: 'login', required: true },
      { name: 'cookie', required: true }
    ], function (e, user) {
      if (e) return log.fail(e);
      core.cookieLogin(user, function (e, user) {
        if (e) return log.fail(JSON.stringify({ code: -6, msg: e.msg || e }));
        log.info(JSON.stringify({ code: 100, user_name: user.name }));
      });
    });
  } else {
    // show current user
    user = session.getUser();
    if (user) {
      log.info(JSON.stringify({ code: 100, user_name: user.name }));
    } else
      return log.fail(JSON.stringify({ code: -7, msg: 'You are not login yet?' }));
  }
};

module.exports = cmd;
