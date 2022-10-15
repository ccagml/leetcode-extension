var _ = require('underscore');


class LOG {
  output = _.bind(console.log, console)
  level = null
  levels = new Map([
    ['INFO', { value: 2 }],
    ['WARN', { value: 3 }],
    ['ERROR', { value: 4 }],
  ])
  setLevel = function (name) {
    this.level = this.levels.get(name) || this.levels.get('INFO');
  };

  fail = function (e) {
    let msg = (e.msg || e);
    if (e.statusCode) {
      msg += (' [code=' + e.statusCode + ']');
    }
    this.error(msg);
  };

  fatal = function (e) {
    this.error(e);
    process.exit(1);
  };

  init = function () {
    this.setLevel('INFO');
  };

  info = function (...rest: any[]) {
    const args = Array.from(arguments);
    let s = args.map(x => x.toString()).join(' ');
    this.output(s);
  };
  warn = function (...rest: any[]) {
    const args = Array.from(arguments);
    args.unshift('[' + "warn" + ']');

    let s = args.map(x => x.toString()).join(' ');
    this.output(s);
  };
  error = function (...rest: any[]) {
    const args = Array.from(arguments);
    args.unshift('[' + "error" + ']');

    let s = args.map(x => x.toString()).join(' ');
    this.output(s);
  };
}

export const log: LOG = new LOG();
