'use strict';
var _ = require('underscore');
var nconf = require('nconf');

var file = require('../file').file;
var config = require('../config').config;
var log = require('../log').log;
var session = require('../session').session;

const cmd = {

};


cmd.process_argv = function (argv) {
  var argv_config = h.base_argv().option('a', {
    alias: 'all',
    type: 'boolean',
    describe: 'Show all config',
    default: false
  })
    .option('d', {
      alias: 'delete',
      type: 'boolean',
      describe: 'Delete config by key',
      default: false
    })
    .positional('key', {
      type: 'string',
      describe: 'Config key, delimited by colon',
      default: ''
    })
    .positional('value', {
      type: 'string',
      describe: 'Config value',
      default: ''
    })
  argv_config.process_argv(argv)

  return argv_config.get_result()
}


function prettyConfig(cfg) {
  return JSON.stringify(cfg, null, 2);
}

function loadConfig(showall) {
  const cfg = showall ? config.getAll(true) : nconf.get();
  return _.omit(cfg, 'type');
}

function saveConfig() {
  file.write(file.configFile(), prettyConfig(loadConfig(false)));
}

cmd.handler = function (argv) {
  session.argv = argv;
  nconf.file('local', file.configFile());

  // show all
  if (argv.key.length === 0)
    return log.info(prettyConfig(loadConfig(argv.all)));

  // sugar: notice user that use ':' instead of '.'
  if (argv.key.includes('.') && !argv.key.includes(':'))
    return log.printf('Key should use colon(:) as the delimiter, do you mean %s?',
      argv.key.replace(/\./g, ':'));

  const v = nconf.get(argv.key);

  // delete
  if (argv.delete) {
    if (v === undefined) return log.fatal('Key not found: ' + argv.key);
    nconf.clear(argv.key);
    return saveConfig();
  }

  // show
  if (argv.value.length === 0) {
    if (v === undefined) return log.fatal('Key not found: ' + argv.key);
    return log.info(prettyConfig(v));
  }

  // set
  try {
    nconf.set(argv.key, JSON.parse(argv.value));
  } catch (e) {
    nconf.set(argv.key, JSON.parse('"' + argv.value + '"'));
  }
  return saveConfig();
};

module.exports = cmd;
