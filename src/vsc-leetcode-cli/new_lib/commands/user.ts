
var prompt_out = require('prompt');
import { helper } from "../helper";
import { log } from "../log";
import { corePlugin } from "../core";
import { session } from "../session";

class UserCommand {
  constructor() {

  }

  process_argv(argv) {
    var argv_config = helper.base_argv().option('l', {
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


  handler(argv) {
    session.argv = argv;
    let user: any = null;
    if (argv.login) {
      // login
      prompt_out.colors = false;
      prompt_out.message = '';
      prompt_out.start();
      prompt_out.get([
        { name: 'login', required: true },
        { name: 'pass', required: true, hidden: true }
      ], function (e, user) {
        if (e) {
          return log.fail(JSON.stringify({ code: -1, msg: e.msg || e }));
        }

        corePlugin.login(user, function (e, user) {
          if (e) {
            return log.fail(JSON.stringify({ code: -2, msg: e.msg || e }));
          }
          log.info(JSON.stringify({ code: 100, user_name: user.name }));
        });
      });
    } else if (argv.logout) {
      // logout
      user = corePlugin.logout(user, true);
      if (user)
        log.info(JSON.stringify({ code: 100, user_name: user.name }));
      else
        log.fail(JSON.stringify({ code: -3, msg: 'You are not login yet?' }));
      // third parties
    } else if (argv.github || argv.linkedin) {
      // add future third parties here
      const functionMap = new Map(
        [
          ['g', corePlugin.githubLogin],
          ['github', corePlugin.githubLogin],
          ['i', corePlugin.linkedinLogin],
          ['linkedin', corePlugin.linkedinLogin],
        ]
      );
      const keyword = Object.entries(argv).filter((i) => (i[1] === true))[0][0];
      const coreFunction = functionMap.get(keyword);
      if (coreFunction) {
        prompt_out.colors = false;
        prompt_out.message = '';
        prompt_out.start();
        prompt_out.get([
          { name: 'login', required: true },
          { name: 'pass', required: true, hidden: true }
        ], function (e, user) {
          if (e) return log.fail(JSON.stringify({ code: -4, msg: e.msg || e }));
          coreFunction(user, function (e, user) {
            if (e) return log.fail(JSON.stringify({ code: -5, msg: e.msg || e }));
            log.info(JSON.stringify({ code: 100, user_name: user.name }));
          });
        });
      }

    } else if (argv.cookie) {
      // session
      prompt_out.colors = false;
      prompt_out.message = '';
      prompt_out.start();
      prompt_out.get([
        { name: 'login', required: true },
        { name: 'cookie', required: true }
      ], function (e, user) {
        if (e) return log.fail(e);
        corePlugin.cookieLogin(user, function (e, user) {
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
}



export const userCommand: UserCommand = new UserCommand();
