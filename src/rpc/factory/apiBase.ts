/*
 * https://github.com/ccagml/leetcode-extension/src/rpc/factory/apiBase.ts
 * Path: https://github.com/ccagml/leetcode-extension
 * Created Date: Thursday, November 17th 2022, 11:44:14 am
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

export interface IApi {
  callArg(arg);
  call(arg): void;
}

export class ApiBase implements IApi {
  constructor() {}
  callArg(arg: any) {
    console.log("未实现callArg", arg);
  }
  call(arg: any) {
    console.log("未实现call", arg);
  }
  api_argv() {
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
      parseArgFromCmd(argv) {
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
