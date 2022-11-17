import { cacheApi } from "./api/cache";
import { listApi } from "./api/list";
import { pluginApi } from "./api/plugin";
import { queryApi } from "./api/query";
import { showApi } from "./api/show";
import { starApi } from "./api/star";
import { submitApi } from "./api/submit";
import { testApi } from "./api/test";
import { userApi } from "./api/user";

export interface IApi {
  callArg(arg);
  call(arg): void;
}

export class ApiBase implements IApi {
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

class ApiFactory {
  constructor() {}
  getApi(api: string): IApi | undefined {
    if (api == "cache") {
      return cacheApi;
    } else if (api == "list") {
      return listApi;
    } else if (api == "plugin") {
      return pluginApi;
    } else if (api == "query") {
      return queryApi;
    } else if (api == "show") {
      return showApi;
    } else if (api == "star") {
      return starApi;
    } else if (api == "submit") {
      return submitApi;
    } else if (api == "test") {
      return testApi;
    } else if (api == "user") {
      return userApi;
    }
    return undefined;
  }
}
export const apiFactory: ApiFactory = new ApiFactory();
