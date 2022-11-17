/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/RemoteCall/actionChain/chainMgr.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
 * Created Date: Monday, November 14th 2022, 4:04:31 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

let underscore = require("underscore");

import { configUtils } from "../utils/configUtils";
import { storageUtils } from "../utils/storageUtils";
import { commUtils } from "../utils/commUtils";
import { ChainNodeBase } from "./chainNodeBase";

export class ChainManager {
  id;
  name;
  ver;
  desc;
  enabled;
  deleted;
  builtin;
  deps;
  next;
  plugins: Array<any> = [];
  installed: Array<ChainNodeBase> = [];
  head; // 插件头 是core
  config;
  constructor() {}

  public save(): void {
    const stats = storageUtils.getCache(commUtils.KEYS.plugins) || {};

    if (this.deleted) delete stats[this.name];
    else stats[this.name] = this.enabled;

    storageUtils.setCache(commUtils.KEYS.plugins, stats);
  }

  public init(): void {
    this.config = configUtils.plugins[this.name] || {};
  }

  public getChainHead(): ChainNodeBase {
    return this.head;
  }

  public base_init(head: ChainNodeBase): Object {
    this.head = head;
    const stats = storageUtils.getCache(commUtils.KEYS.plugins) || {};
    let fileChainNode: Array<any> = storageUtils.listCodeDir(
      "../actionChain/chainNode"
    );
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
    for (let p of this.plugins) {
      last.setNext(p);
      last = p;
    }
    return true;
  }

  public save_all(): void {
    for (let p of this.plugins) {
      p.save();
    }
  }
}

export const chainMgr: ChainManager = new ChainManager();
