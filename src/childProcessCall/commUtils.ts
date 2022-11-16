/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/childProcessCall/commUtils.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
 * Created Date: Wednesday, November 16th 2022, 4:50:55 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { storageUtils } from "./storageUtils";

class CommUtils {
  KEYS;
  constructor() {
    this.KEYS = {
      user: "../user",
      stat: "../stat",
      plugins: "../../plugins",
      problems: "problems",
      translation: "translationConfig",
      ranting_path: "../../rating",
      problem: (p) => p.fid + "." + p.slug + "." + p.category,
    };
  }

  prettyLevel(level) {
    switch (level.toLowerCase().trim()) {
      case "easy":
        return level;
      case "medium":
        return level;
      case "hard":
        return level;
      default:
        return level;
    }
  }

  levelToName(level) {
    switch (level) {
      case 1:
        return "Easy";
      case 2:
        return "Medium";
      case 3:
        return "Hard";
      default:
        return " ";
    }
  }

  statusToName(sc) {
    switch (sc) {
      case 10:
        return "Accepted";
      case 11:
        return "Wrong Answer";
      case 12:
        return "Memory Limit Exceeded";
      case 13:
        return "Output Limit Exceeded";
      case 14:
        return "Time Limit Exceeded";
      case 15:
        return "Runtime Error";
      case 16:
        return "Internal Error";
      case 20:
        return "Compile Error";
      case 21:
        return "Unknown Error";
      default:
        return "Unknown";
    }
  }

  readStdin(cb) {
    const stdin = process.stdin;
    let bufs: Array<any> = [];

    console.log(
      "NOTE: to finish the input, press " +
        (storageUtils.isWindows() ? "<Ctrl-D> and <Return>" : "<Ctrl-D>")
    );

    stdin.on("readable", function () {
      const data = stdin.read();
      if (data) {
        // windows doesn't treat ctrl-D as EOF
        if (storageUtils.isWindows() && data.toString() === "\x04\r\n") {
          stdin.emit("end");
        } else {
          bufs.push(data);
        }
      }
    });
    stdin.on("end", function () {
      cb(null, Buffer.concat(bufs).toString());
    });
    stdin.on("error", cb);
  }

  getSetCookieValue(resp, key) {
    const cookies = resp.headers["set-cookie"];
    if (!cookies) return null;

    for (let i = 0; i < cookies.length; ++i) {
      const sections = cookies[i].split(";");
      for (let j = 0; j < sections.length; ++j) {
        const kv = sections[j].trim().split("=");
        if (kv[0] === key) return kv[1];
      }
    }
    return null;
  }

  printSafeHTTP(msg) {
    return msg
      .replace(/(Cookie\s*:\s*)'.*?'/, "$1<hidden>")
      .replace(/('X-CSRFToken'\s*:\s*)'.*?'/, "$1<hidden>")
      .replace(/('set-cookie'\s*:\s*)\[.*?\]/, "$1<hidden>");
  }

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
          if (con[0] == "-" && con[1] == "-") {
            this.set_opt(con.substring(2));
          } else if (con[0] == "-") {
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
      },
    };
    return base;
  }
}

export const commUtils: CommUtils = new CommUtils();
