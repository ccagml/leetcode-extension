var underscore = require('underscore');


import { config } from "./config";
import { file } from "./file";
// import { log } from "./log";
import { cache } from "./cache";
import { helper } from "./helper";


export class MyPluginBase {
  id;
  name;
  ver;
  desc;
  enabled;
  deleted;
  missing;
  builtin;
  deps;
  next;
  plugins: Array<any> = [];
  head; // 插件头 是core
  config;
  constructor() {
  }

  public save() {
    const stats = cache.get(helper.KEYS.plugins) || {};

    if (this.deleted) delete stats[this.name];
    else if (this.missing) return;
    else stats[this.name] = this.enabled;

    cache.set(helper.KEYS.plugins, stats);
  };

  public init() {
    this.config = config.plugins[this.name] || {};
    this.next = null;
  };

  public base_init(head?) {
    head = head || require('./core');
    const stats = cache.get(helper.KEYS.plugins) || {};
    let installed: Array<MyPluginBase> = [];
    for (let f of file.listCodeDir('lib/plugins')) {
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
      installed.push(p);
    }
    // 根据id大小排序, 大的前面
    installed = underscore.sortBy(installed, x => -x.id);
    // 从小的开始init
    for (let i = installed.length - 1; i >= 0; --i) {
      const p = installed[i];
      if (p.enabled) {
        p.init();
      }
    }
    // 连成链表状
    const plugins: Array<any> = installed.filter(x => x.enabled);
    let last = head;
    for (let p of plugins) {
      last.setNext(p);
      last = p;
    }
    return true;
  };

  public setNext(next) {
    Object.setPrototypeOf(this, next);
    this.next = next;
  };
  public save_all() {
    for (let p of this.plugins) {
      p.save();
    }
  };

  public getProblems(Translate: boolean, cb) {
    this.next.getProblems(Translate, cb)
  }
  public getQuestionOfToday(cb) {
    this.next.getQuestionOfToday(cb)
  }
  public getTestApi(username, cb) {
    this.next.getTestApi(username, cb)
  }
  public getUserContestP(username, cb) {
    this.next.getUserContestP(username, cb)
  }
}




export const myPluginBase: MyPluginBase = new MyPluginBase();
