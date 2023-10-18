/*
 * Filename: https://github.com/ccagml/leetcode-extension/src/controller/MainController.ts
 * Path: https://github.com/ccagml/leetcode-extension
 * Created Date: Thursday, November 10th 2022, 2:18:21 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import * as systemUtils from "../utils/SystemUtils";
import { executeService } from "../service/ExecuteService";
import { ExtensionContext } from "vscode";
import { extensionState } from "../utils/problemUtils";

import * as fse from "fs-extra";
import { BABA, BabaStr } from "../BABA";
// 做杂活
class MainContorller {
  constructor() {}

  /**
   * 检查运行环境
   */
  /**
   * It checks if the environment meets the requirements
   * @param {ExtensionContext} context - ExtensionContext
   */
  public async checkNodeEnv(context: ExtensionContext) {
    if (!systemUtils.useVscodeNode()) {
      if (!(await executeService.checkNodeEnv(context))) {
        throw new Error("The environment doesn't meet requirements.");
      }
    }
    if (!(await fse.pathExists(extensionState.cachePath))) {
      await fse.mkdirs(extensionState.cachePath);
    }
  }

  /**
   * 检查题目缓存
   */

  public async deleteProblemCache() {
    await executeService.deleteProblemCache();
  }

  /**
   * It takes the version number from the package.json file and converts it to a number
   * @param {ExtensionContext} context - ExtensionContext
   */
  public setGlobal(context: ExtensionContext) {
    let cur_version: string = context.extension.packageJSON.version || "1.0.0";
    let cur_version_arr: Array<string> = cur_version.split(".");
    let cur_version_num = 0;
    cur_version_arr.forEach((e) => {
      cur_version_num *= 100;
      cur_version_num += Number(e);
    });
    BABA.getProxy(BabaStr.LogOutputProxy).get_log().setLCPTCTX("version", cur_version_num);
  }

  // 初始化上下文
  /**
   * This function sets the global variable and then calls the initialize function of the

   * @param {ExtensionContext} context - ExtensionContext
   */
  public initialize(context: ExtensionContext) {
    this.setGlobal(context);
    extensionState.context = context;
    extensionState.cachePath = context.globalStoragePath;
  }

  // 删除缓存
  /**
   * It deletes the cache.
   */
  public async deleteCache() {
    await executeService.deleteCache();
  }
}

export const mainContorller: MainContorller = new MainContorller();
