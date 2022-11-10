/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/childProcessCall/helper.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */


let ora = require('ora');

import { file } from "./file";

export const UNITS_SIZE = [
  { unit: 'B', name: 'Bytes', count: 1024 },
  { unit: 'K', name: 'KBytes', count: 1024 },
  { unit: 'M', name: 'MBytes', count: 1024 },
  { unit: 'G', name: 'GBytes', count: -1 }
];

export const UNITS_TIME = [
  { unit: 's', name: 'seconds', count: 60 },
  { unit: 'm', name: 'minutes', count: 60 },
  { unit: 'h', name: 'hours', count: 24 },
  { unit: 'd', name: 'days', count: 7 },
  { unit: 'w', name: 'weeks', count: 4 },
  { unit: 'm', name: 'months', count: 12 },
  { unit: 'y', name: 'years', count: -1 }
];

export function getUnit(units, v) {
  for (let i = 0; i < units.length; ++i) {
    if (units[i].count <= 0 || v < units[i].count)
      return [v, units[i]];
    v /= units[i].count;
  }
  return [];
}

export const LANGS = [
  { lang: 'bash', ext: '.sh', style: '#' },
  { lang: 'c', ext: '.c', style: 'c' },
  { lang: 'cpp', ext: '.cpp', style: 'c' },
  { lang: 'csharp', ext: '.cs', style: 'c' },
  { lang: 'golang', ext: '.go', style: 'c' },
  { lang: 'java', ext: '.java', style: 'c' },
  { lang: 'javascript', ext: '.js', style: 'c' },
  { lang: 'kotlin', ext: '.kt', style: 'c' },
  { lang: 'mysql', ext: '.sql', style: '--' },
  { lang: 'php', ext: '.php', style: 'c' },
  { lang: 'python', ext: '.py', style: '#' },
  { lang: 'python3', ext: '.py', style: '#' },
  { lang: 'ruby', ext: '.rb', style: '#' },
  { lang: 'rust', ext: '.rs', style: 'c' },
  { lang: 'scala', ext: '.scala', style: 'c' },
  { lang: 'swift', ext: '.swift', style: 'c' },
  { lang: 'typescript', ext: '.ts', style: 'c' }
];

class HELPER {
  KEYS;
  constructor() {
    this.KEYS = {
      user: '../user',
      stat: '../stat',
      plugins: '../../plugins',
      problems: 'problems',
      translation: 'translationConfig',
      problem: p => p.fid + '.' + p.slug + '.' + p.category
    };
  }

  prettyState(state) {
    switch (state) {
      case 'ac': return this.prettyText('', true);
      case 'notac': return this.prettyText('', false);
      default: return ' ';
    }
  };

  prettyText(text, yesNo) {
    const icon = require('./icon');
    switch (yesNo) {
      case true: return (icon.yes + text);
      case false: return (icon.no + text);
      default: return text;
    }
  };

  prettySize(n) {
    const res = getUnit(UNITS_SIZE, n) || [];
    return res[0].toFixed(2) + res[1].unit;
  };

  prettyTime(n) {
    const res = getUnit(UNITS_TIME, n) || [];
    return res[0].toFixed(0) + ' ' + res[1].name;
  };

  prettyLevel(level) {
    switch (level.toLowerCase().trim()) {
      case 'easy': return (level);
      case 'medium': return (level);
      case 'hard': return (level);
      default: return level;
    }
  };

  levelToName(level) {
    switch (level) {
      case 1: return 'Easy';
      case 2: return 'Medium';
      case 3: return 'Hard';
      default: return ' ';
    }
  };

  statusToName(sc) {
    switch (sc) {
      case 10: return 'Accepted';
      case 11: return 'Wrong Answer';
      case 12: return 'Memory Limit Exceeded';
      case 13: return 'Output Limit Exceeded';
      case 14: return 'Time Limit Exceeded';
      case 15: return 'Runtime Error';
      case 16: return 'Internal Error';
      case 20: return 'Compile Error';
      case 21: return 'Unknown Error';
      default: return 'Unknown';
    }
  };

  langToExt(lang) {
    const res = LANGS.find(x => x.lang === lang);
    return res ? res.ext : '.raw';
  };

  extToLang(fullpath) {
    const res = LANGS.find(x => fullpath.endsWith(x.ext));
    return res ? res.lang : 'unknown';
  };

  langToCommentStyle(lang) {
    const res = LANGS.find(x => x.lang === lang);

    return (res && res.style === 'c') ?
      { start: '/*', line: ' *', end: ' */', singleLine: '//' } :
      { start: res?.style, line: res?.style, end: res?.style, singleLine: res?.style };
  };

  readStdin(cb) {
    const stdin = process.stdin;
    let bufs: Array<any> = [];

    console.log('NOTE: to finish the input, press ' +
      (file.isWindows() ? '<Ctrl-D> and <Return>' : '<Ctrl-D>'));

    stdin.on('readable', function () {
      const data = stdin.read();
      if (data) {
        // windows doesn't treat ctrl-D as EOF
        if (file.isWindows() && data.toString() === '\x04\r\n') {
          stdin.emit('end');
        } else {
          bufs.push(data);
        }
      }
    });
    stdin.on('end', function () {
      cb(null, Buffer.concat(bufs).toString());
    });
    stdin.on('error', cb);
  };

  getSetCookieValue(resp, key) {
    const cookies = resp.headers['set-cookie'];
    if (!cookies) return null;

    for (let i = 0; i < cookies.length; ++i) {
      const sections = cookies[i].split(';');
      for (let j = 0; j < sections.length; ++j) {
        const kv = sections[j].trim().split('=');
        if (kv[0] === key) return kv[1];
      }
    }
    return null;
  };

  printSafeHTTP(msg) {
    return msg.replace(/(Cookie\s*:\s*)'.*?'/, '$1<hidden>')
      .replace(/('X-CSRFToken'\s*:\s*)'.*?'/, '$1<hidden>')
      .replace(/('set-cookie'\s*:\s*)\[.*?\]/, '$1<hidden>');
  };

  spin(s) {
    return ora(s).start();
  };

  badge(s) {
    s = ' ' + s + ' ';
    return (s);
  };

  base_argv() {
    let base = {
      all_base_data: {},
      positional_index: 0,
      positional_key: {},
      option: function (key, value) {
        this.all_base_data[key] = value.default;
        this.all_base_data[value.alias] = value.default;
        this[key] = value;
        return this;
      },
      positional: function (key, value) {
        this.positional_key[this.positional_index] = key;
        this.positional_index = this.positional_index + 1;
        this.all_base_data[key] = value.default;
        this.all_base_data[value.alias] = value.default;
        this[key] = value;
        return this;
      },
      set_opt(key, temp_val?) {
        let cfg = this[key];
        if (cfg) {
          if (cfg.type == "boolean") {
            this.all_base_data[key] = true;
            if (cfg.alias) {
              this.all_base_data[cfg.alias] = true;
            }
            return false;
          } else {
            this.all_base_data[key] = temp_val;
            if (cfg.alias) {
              this.all_base_data[cfg.alias] = temp_val;
            }
            return true;
          }
        } else {
          this.all_base_data[key] = true;
        }
        return false;
      },
      set_posi(value, index) {
        let cfg_key = this.positional_key[index];
        let cfg = this[cfg_key];
        if (cfg) {
          this.all_base_data[cfg_key] = value;
          if (cfg.alias) {
            this.all_base_data[cfg.alias] = value;
          }
        }
      },
      process_argv(argv) {
        let all_posi = 0;
        for (let index = 3; index < argv.length; index++) {
          let con = argv[index];
          if (con[0] == '-' && con[1] == '-') {
            this.set_opt(con.substring(2));
          }
          else if (con[0] == '-') {
            for (let con_index = 1; con_index < con.length; con_index++) {
              if (this.set_opt(con[con_index], argv[index + 1])) {
                con_index++;
              }
            }
          } else {
            this.set_posi(con, all_posi);
            all_posi = all_posi + 1;
          }
        }
      },
      get_result: function () {
        return this.all_base_data;
      }
    };
    return base;
  }
}



export const helper: HELPER = new HELPER();
