/*
 * https://github.com/ccagml/vscode-leetcode-problem-rating/src/rpc/actionChain/chainMgr.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
 * Created Date: Monday, November 14th 2022, 4:04:31 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

let underscore = require("underscore");

import { storageUtils } from "../utils/storageUtils";
import { commUtils } from "../utils/commUtils";
import { ChainNodeBase } from "./chainNodeBase";

/* It's a class that manages a chain of plugins */
export class ChainManager {
  id;
  name;
  ver;
  desc;

  plugins: Array<ChainNodeBase> = [];
  installed: Array<ChainNodeBase> = [];
  head: ChainNodeBase; // 插件头 是core

  constructor() {}

  /**
   * Return the head of the chain.
   * @returns The head of the chain.
   */
  public getChainHead(): ChainNodeBase {
    return this.head;
  }

  /**
   * It loads all the plugins in the directory and initializes them.
   * @param {ChainNodeBase | undefined} head - The first node in the chain of responsibility.
   * @returns The return value is a boolean.
   */
  public init(head: ChainNodeBase | undefined): Object | undefined {
    if (head) {
      this.head = head;
    }
    const stats = storageUtils.getCache(commUtils.KEYS.plugins) || {};
    let fileChainNode: Array<any> = storageUtils.listCodeDir("../actionChain/chainNode");
    this.installed = [];
    for (let f of fileChainNode) {
      const p = f.data;
      if (!p) continue;
      p.file = f.file;
      p.enabled = stats[p.name];
      if (!(p.name in stats)) {
        if (p.builtin) {
          p.enabled = true;
        } else {
          p.enabled = false;
        }
      }
      this.installed.push(p);
    }
    // 根据id大小排序, 大的前面
    this.installed = underscore.sortBy(this.installed, (x) => -x.id);
    // 从小的开始init
    for (let i = this.installed.length - 1; i >= 0; --i) {
      const p = this.installed[i];
      if (p.enabled) {
        p.init();
      }
    }
    // 连成链表状
    this.plugins = this.installed.filter((x) => x.enabled);
    let last = head;
    if (last) {
      for (let p of this.plugins) {
        last.setNext(p);
        last = p;
      }
    }

    return true;
  }

  /**
   * For each plugin in the plugins array, call the save function.
   */
  public save_all(): void {
    for (let p of this.plugins) {
      p.save();
    }
  }
}

export const chainMgr: ChainManager = new ChainManager();
