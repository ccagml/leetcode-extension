'use strict';
var _ = require('underscore');

var h = require('../helper');
var log = require('../log');
var cache = require('../cache');
var session = require('../session');
var sprintf = require('../sprintf');

const cmd = {
  command: 'cache [keyword]',
  desc: 'Manage local cache',
  builder: function (yargs) {
    return yargs
      .option('d', {
        alias: 'delete',
        type: 'boolean',
        describe: 'Delete cache by keyword',
        default: false
      })
      .positional('keyword', {
        type: 'string',
        describe: 'Cache name or question id',
        default: ''
      })
      .example('leetcode cache', 'Show all cache')
      .example('leetcode cache 1', 'Show cache of question 1')
      .example('', '')
      .example('leetcode cache -d', 'Delete all cache')
      .example('leetcode cache 1 -d', 'Delete cache of question 1');
  }
};

cmd.handler = function (argv) {
  session.argv = argv;

  const name = argv.keyword;
  const isInteger = Number.isInteger(Number(name));

  const caches = cache.list()
    .filter(function (f) {
      return (name.length === 0) ||
        (isInteger ? f.name.startsWith(name + '.') : f.name === name);
    });

  if (argv.delete) {
    for (let f of caches) cache.del(f.name);
  } else {
    log.info(sprintf(' %s %63s    %s', 'Cache', 'Size', 'Created'));
    log.info('-'.repeat(86));

    _.sortBy(caches, function (f) {
      let x = parseInt(f.name.split('.')[0], 10);
      if (Number.isNaN(x)) x = 0;
      return x;
    })
      .forEach(function (f) {
        log.printf(' %-60s %8s    %s ago',
          f.name,
          h.prettySize(f.size),
          h.prettyTime((Date.now() - f.mtime) / 1000));
      });
  }
};

module.exports = cmd;
