import { cacheApi } from "./api/cacheApi";
import { listApi } from "./api/listApi";
import { pluginApi } from "./api/pluginApi";
import { queryApi } from "./api/queryApi";
import { showApi } from "./api/showApi";
import { starApi } from "./api/starApi";
import { submitApi } from "./api/submitApi";
import { testApi } from "./api/testApi";
import { userApi } from "./api/userApi";
import { IApi } from "./apiBase";

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
