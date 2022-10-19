
// var h = require('./helper');


import { myPluginBase } from "./my_plugin_base";
import { config } from "./config";
import { log } from "./log";
import { file } from "./file";
class NewCli {
    constructor() {
        this.run()
    }
    public run() {
        process.stdout.on('error', function (e) {
            if (e.code === 'EPIPE') process.exit();
        });
        config.init();
        this.initLogLevel();
        this.initDir()
        this.initPlugins((e) => {
            if (e) return log.fatal(e);
            require('./cache').cache.init();
            this.runCommand_new();
            return;
        });
    };
    private initLogLevel() {
        log.init();
    }

    private initDir() {
        file.init();
        file.mkdir(file.homeDir())
    }

    private initPlugins(cb) {
        if (myPluginBase.base_init()) {
            myPluginBase.save();
            return cb();
        }
    }

    private runCommand_new() {
        var com_str = process.argv[2]
        var auto_js = require("./commands/" + com_str)[com_str + "Command"]
        auto_js.handler(auto_js.process_argv(process.argv))
    }
}


export const newCli: NewCli = new NewCli();
