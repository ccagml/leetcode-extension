/*
 * Filename: https://github.com/ccagml/vscode-leetcode-problem-rating/src/controller/MainController.ts
 * Path: https://github.com/ccagml/vscode-leetcode-problem-rating
 * Created Date: Thursday, November 10th 2022, 2:18:21 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import * as systemUtils from "../utils/SystemUtils";
import { executeService } from "../service/ExecuteService";
import { ExtensionContext } from "vscode";
import { treeDataService } from "../service/TreeDataService";

// 做杂活
class MainContorller {
  constructor() {}

  /**
   * 检查运行环境
   */
  public async checkNodeEnv(context: ExtensionContext) {
    if (!systemUtils.useVscodeNode()) {
      if (!(await executeService.checkNodeEnv(context))) {
        throw new Error("The environment doesn't meet requirements.");
      }
    }
  }

  // 初始化上下文
  public initialize(context: ExtensionContext) {
    treeDataService.initialize(context);
  }

  // 删除缓存
  public async deleteCache() {
    await executeService.deleteCache();
  }
}

export const mainContorller: MainContorller = new MainContorller();
