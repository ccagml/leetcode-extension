var moment_out = require('moment');
var underscore = require('underscore');

import { helper } from "../helper";
import { log } from "../log";
import { corePlugin } from "../core";
import { session } from "../session";

class StatCommand {
  constructor() {

  }

  process_argv(argv) {
    var argv_config = helper.base_argv().option('c', {
      alias: 'cal',
      type: 'boolean',
      default: false,
      describe: 'Show calendar statistics'
    })
      .option('g', {
        alias: 'graph',
        type: 'boolean',
        default: false,
        describe: 'Show graphic statistics'
      })
      .option('l', {
        alias: 'lock',
        type: 'boolean',
        default: true,
        describe: 'Include locked questions'
      })
      .option('q', corePlugin.filters.query)
      .option('t', corePlugin.filters.tag)
    argv_config.process_argv(argv)

    return argv_config.get_result()
  }

  printLine(key, done, all) {
    const n = 30;
    const percent = (all > 0) ? done / all : 0;
    const x = Math.ceil(n * percent);
    log.info(' %s\t%3s/%-3s (%6s %%)  %s%s',
      helper.prettyLevel(key), done, all,
      (100 * percent).toFixed(2),
      '█'.repeat(x),
      '░'.repeat(n - x));
  }

  showProgress(problems) {
    const stats = {
      easy: { all: 0, ac: 0 },
      medium: { all: 0, ac: 0 },
      hard: { all: 0, ac: 0 }
    };

    for (let problem of problems) {
      const level = problem.level.toLowerCase();
      const state = problem.state.toLowerCase();

      if (!(level in stats)) continue;
      ++stats[level].all;

      if (!(state in stats[level])) continue;
      ++stats[level][state];
    }

    this.printLine('Easy', stats.easy.ac, stats.easy.all);
    this.printLine('Medium', stats.medium.ac, stats.medium.all);
    this.printLine('Hard', stats.hard.ac, stats.hard.all);
  }

  showGraph(problems) {
    const ICONS = {

    };

    let groups = 1;

    const header = underscore.range(groups)
      .map(x => x * 10 + 1 + '' + x * 10 + 10)
      .join('');
    log.info('      ' + header);

    const graph: Array<any> = [];
    for (let problem of problems)
      graph[problem.fid] = ICONS[problem.state] || ' ICONS.none ';

    let line = ['0'];
    for (let i = 1, n = graph.length; i <= n; ++i) {
      // padding before group
      if (i % 10 === 1) line.push(' ');

      line.push(graph[i] || ' ICONS.empty');

      // time to start new row
      if (i % (10 * groups) === 0 || i === n) {
        log.info(line.join(' '));
        line = [' ' + i];
      }
    }

    log.info();
    log.info('%7s%s%3s%s%3s%s',
      ' ', 'ICONS.ac' + '  Accepted',
      ' ', 'ICONS.notac' + '  Not Accepted',
      ' ', 'ICONS.none' + '  Remaining');
  }

  showCal(problems) {
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const ICONS = [
      'icon.none',
      'icon.ac',
      'icon.ac',
      'icon.ac',
      'icon.ac',
    ];

    const N_MONTHS = 12;
    const N_WEEKS = 53;
    const N_WEEKDAYS = 7;

    const now = moment_out();

    const SCORES = { easy: 1, medium: 2, hard: 5 };
    function toScore(sum, id) {
      const problem = problems.find(x => x.fid === id);
      if (problem) sum += (SCORES[problem.level.toLowerCase()] || 1);
      return sum;
    }

    // load historical stats
    const graph: Array<any> = [];
    const stats = require('../cache').get(helper.KEYS.stat) || {};
    for (let k of underscore.keys(stats)) {
      const score = (stats[k]['ac.set'] || []).reduce(toScore, 0);
      if (score === 0) continue;

      const d = moment_out(k, 'YYYY-MM-DD');
      graph[now.diff(d, 'days')] = score;
    }

    // print header
    const buf = Buffer.alloc(120, ' ', 'ascii');
    for (let i = 0; i <= N_MONTHS; ++i) {
      // for day 1 in each month, calculate its column position in graph
      const d = now.clone().subtract(i, 'months').date(1);
      const idx = now.diff(d, 'days');

      const j = (N_WEEKS - idx / N_WEEKDAYS + 1) * 2;
      if (j >= 0) buf.write(MONTHS[d.month()], j);
    }
    log.info('%7s%s', ' ', buf.toString());

    // print graph
    for (let i = 0; i < N_WEEKDAYS; ++i) {
      const line: Array<any> = [];
      // print day in week
      const idx = (now.day() + i + 1) % N_WEEKDAYS;
      line.push(WEEKDAYS[idx]);

      for (let j = 0; j < N_WEEKS; ++j) {
        let idx = (N_WEEKS - j - 1) * N_WEEKDAYS + N_WEEKDAYS - i - 1;
        const d = now.clone().subtract(idx, 'days');

        // map count to icons index:
        // [0] => 0, [1,5] => 1, [6,10] => 2, [11,15] => 3, [16,) => 4
        const count = graph[idx] || 0;
        idx = Math.floor((count - 1) / 5) + 1;
        if (idx > 4) idx = 4;

        let icon = ICONS[idx];
        // use different colors for adjacent months
        if (idx === 0 && d.month() % 2) icon = icon;
        line.push(icon);
      }
      log.info(line.join(' '));
    }

    log.info();
    log.info('%8s%s%3s%s%3s%s%3s%s',
      ' ', ICONS[1] + '  1~5',
      ' ', ICONS[2] + '  6~10',
      ' ', ICONS[3] + '  11~15',
      ' ', ICONS[4] + '  16+');
  }

  handler(argv) {
    session.argv = argv;
    var that = this;
    corePlugin.filterProblems(argv, function (e, problems) {
      if (e) return log.info(e);

      if (!argv.lock)
        problems = problems.filter(x => !x.locked);

      log.info();
      if (argv.graph) that.showGraph(problems);
      else if (argv.cal) that.showCal(problems);
      else that.showProgress(problems);
      log.info();
    });
  };
}

export const statCommand: StatCommand = new StatCommand();

