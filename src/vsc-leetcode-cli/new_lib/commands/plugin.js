'use strict';
var h = require('../helper').helper;
var config = require('../config').config;
var log = require('../log').log;
var Plugin = require('../my_plugin_base').myPluginBase;
var session = require('../session').session;

const cmd = {

};


cmd.process_argv = function (argv) {
  var argv_config = h.base_argv().option('d', {
    alias: 'disable',
    type: 'boolean',
    describe: 'Disable plugin',
    default: false
  }).option('e', {
    alias: 'enable',
    type: 'boolean',
    describe: 'Enable plugin',
    default: false
  }).option('i', {
    alias: 'install',
    type: 'boolean',
    describe: 'Install plugin',
    default: false
  }).positional('name', {
    type: 'string',
    describe: 'Filter plugin by name',
    default: ''
  })

  argv_config.process_argv(argv)

  return argv_config.get_result()
}

cmd.handler = function (argv) {
  session.argv = argv;

  let plugins = Plugin.plugins;
  const name = argv.name;

  if (argv.install) {
    const cb = function (e, p) {
      if (e) return log.fatal(e);
      p.help();
      p.save();
      Plugin.init();
    };

    if (name) {
      Plugin.install(name, cb);
    } else {
      Plugin.installMissings(cb);
    }
    return;
  }

  if (name) plugins = plugins.filter(x => x.name === name);
  if (plugins.length === 0) return log.fatal('Plugin not found!');

  const p = plugins[0];
  if (p.missing && (argv.enable || argv.disable))
    return log.fatal('Plugin missing, install it first');

  if (argv.enable) {
    p.enabled = true;
    p.save();
  } else if (argv.disable) {
    p.enabled = false;
    p.save();
  } else if (argv.delete) {
    p.delete();
    p.save();
    Plugin.init();
  } else if (argv.config) {
    log.info(JSON.stringify(config.plugins[name] || {}, null, 2));
  } else {
  }
};

module.exports = cmd;
