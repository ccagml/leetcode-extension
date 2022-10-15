var underscore = require('underscore');


import { config } from "./config";
import { file } from "./file";
import { log } from "./log";
import { cache } from "./cache";
import { helper } from "./helper";


class MyPluginBase {
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
  plugins = [];
  head; // 插件头 是core
  constructor() {
  }

  public init(head?) {
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
    const plugins = installed.filter(x => x.enabled);
    let last = head;
    for (let p of plugins) {
      last.setNext(p);
      last = p;
    }
    return true;
  };

  setNext(next) {
    Object.setPrototypeOf(this, next);
    this.next = next;
  };
  save_all() {
    for (let p of this.plugins) {
      p.save();
    }
  };
}


// save() {
//   const stats = cache.get(h.KEYS.plugins) || {};

//   if (this.deleted) delete stats[this.name];
//   else if (this.missing) return;
//   else stats[this.name] = this.enabled;

//   cache.set(h.KEYS.plugins, stats);
// };

// EXPlugin.prototype.init() {
//   this.config = config.plugins[this.name] || {};
//   this.next = null;
// };


export const myPluginBase: MyPluginBase = new MyPluginBase();
