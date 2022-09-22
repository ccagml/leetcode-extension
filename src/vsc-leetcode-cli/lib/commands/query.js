'use strict';
var _ = require('underscore');

var h = require('../helper');

var log = require('../log');
var core = require('../core');
var session = require('../session');

const cmd = {
    command: 'query [keyword]',
    aliases: ['ls'],
    desc: 'query something',
    builder: function (yargs) {
        return yargs
            .option('T', {
                alias: 'dontTranslate',
                type: 'boolean',
                default: false,
                describe: 'Set to true to disable endpoint\'s translation',
            })
            .option('a', {
                alias: 'getTodayQuestion',
                type: 'boolean',
                default: false,
                describe: 'getTodayQuestion',
            })
            .example('leetcode query today', 'query today question')
    }
};

cmd.handler = function (argv) {
    session.argv = argv;
    if (argv.a) {
        core.getTodayQuestion(function (e, result) {
            if (e) return;
            log.info(JSON.stringify(result));
        });
    }
};

module.exports = cmd;
