import { cacheApi } from "./api/cache";
import { listApi } from "./api/list";
import { pluginApi } from "./api/plugin";
import { queryApi } from "./api/query";
import { showApi } from "./api/show";
import { starApi } from "./api/star";
import { submitApi } from "./api/submit";
import { testApi } from "./api/test";
import { userApi } from "./api/user";
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
