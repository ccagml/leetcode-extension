var underscore = require('underscore');


import { helper } from "../helper";
import { log } from "../log";
import { cache } from "../cache";
import { session } from "../session";

class CacheCommand {
  constructor() {
  }

  process_argv = function (argv) {
    var argv_config = helper.base_argv().option('d', {
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
    argv_config.process_argv(argv)

    return argv_config.get_result()
  }


  handler = function (argv) {
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
      log.info(' %s %63s    %s', 'Cache', 'Size', 'Created');
      log.info('-'.repeat(86));

      underscore.sortBy(caches, function (f) {
        let x = parseInt(f.name.split('.')[0], 10);
        if (Number.isNaN(x)) x = 0;
        return x;
      })
        .forEach(function (f) {
          log.info(' %-60s %8s    %s ago',
            f.name,
            helper.prettySize(f.size),
            helper.prettyTime((Date.now() - f.mtime) / 1000));
        });
    }
  };
}



export const cacheCommand: CacheCommand = new CacheCommand();
