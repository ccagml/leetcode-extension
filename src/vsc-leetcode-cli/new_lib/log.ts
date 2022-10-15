var _ = require('underscore');


class LOG {
  output = _.bind(console.log, console)
  level
  levels = new Map([
    ['INFO', { value: 2 }],
    ['WARN', { value: 3 }],
    ['ERROR', { value: 4 }],
  ])
  setLevel(name) {
    this.level = this.levels.get(name) || this.levels.get('INFO');
  };

  fail(e) {
    let msg = (e.msg || e);
    if (e.statusCode) {
      msg += (' [code=' + e.statusCode + ']');
    }
    this.error(msg);
  };

  fatal(e) {
    this.error(e);
    process.exit(1);
  };

  init() {
    this.setLevel('INFO');
  };

  info(...rest: any[]) {
    const args = rest //Array.from(arguments);
    let s = args.map(x => x.toString()).join(' ');
    this.output(s);
  };
  warn(...rest: any[]) {
    const args = rest //Array.from(arguments);
    args.unshift('[' + "warn" + ']');

    let s = args.map(x => x.toString()).join(' ');
    this.output(s);
  };
  error(...rest: any[]) {
    const args = rest //Array.from(arguments);
    args.unshift('[' + "error" + ']');

    let s = args.map(x => x.toString()).join(' ');
    this.output(s);
  };
}

export const log: LOG = new LOG();
