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
            .option('b', {
                alias: 'username',
                type: 'string',
                default: "",
                describe: 'user name',
            }).option('z', {
                alias: 'test',
                type: 'string',
                default: "",
                describe: 'test',
            })
            .example('leetcode query today', 'query today question')
    }
};

cmd.process_argv = function (argv) {
    var argv_config = h.base_argv().option('T', {
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
        .option('b', {
            alias: 'username',
            type: 'string',
            default: "",
            describe: 'user name',
        }).option('z', {
            alias: 'test',
            type: 'string',
            default: "",
            describe: 'test',
        })

    argv_config.process_argv(argv)

    return argv_config.get_result()
}

cmd.handler = function (argv) {
    session.argv = argv;
    if (argv.a) {
        core.getTodayQuestion(function (e, result) {
            if (e) return;
            log.info(JSON.stringify(result));
        });
    } else if (argv.b) {
        core.getUserContest(argv.b, function (e, result) {
            if (e) return;
            log.info(JSON.stringify(result));
        });
    } else if (argv.z) {
        core.getQueryZ(argv.z, function (e, result) {
            if (e) return;
            log.info(JSON.stringify(result));
        });
    }
};

module.exports = cmd;
