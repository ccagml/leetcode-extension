var underscore = require('underscore');

import { config as out_config } from "./config";
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
    this.config = out_config.plugins[this.name] || {};
    this.next = null;
  };

  public base_init(head?) {
    head = head || require('./core').corePlugin;
    const stats = cache.get(helper.KEYS.plugins) || {};
    let installed: Array<MyPluginBase> = [];
    let file_plugin: Array<any> = file.listCodeDir('new_lib/plugins')
    for (let f of file_plugin) {
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
    this.plugins = installed.filter(x => x.enabled);
    let last = head;
    for (let p of this.plugins) {
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
    this.hasOwnProperty("getProblems") ? this.getProblems(Translate, cb) : this.next.getProblems(Translate, cb)
  }
  public getQuestionOfToday(cb) {
    this.hasOwnProperty("getQuestionOfToday") ? this.getQuestionOfToday(cb) : this.next.getQuestionOfToday(cb)
  }
  public getTestApi(username, cb) {
    this.hasOwnProperty("getTestApi") ? this.getTestApi(username, cb) : this.next.getTestApi(username, cb)
  }
  public getUserContestP(username, cb) {
    this.hasOwnProperty("getUserContestP") ? this.getUserContestP(username, cb) : this.next.getUserContestP(username, cb)
  }
  public getProblemsTitle(cb) {
    this.hasOwnProperty("getProblemsTitle") ? this.getProblemsTitle(cb) : this.next.getProblemsTitle(cb)
  }
  public createSession(a, cb) {
    this.hasOwnProperty("createSession") ? this.createSession(a, cb) : this.next.createSession(a, cb)
  }
  public getSessions(cb) {
    this.hasOwnProperty("getSessions") ? this.getSessions(cb) : this.next.getSessions(cb)
  }
  public activateSession(s, cb) {
    this.hasOwnProperty("activateSession") ? this.activateSession(s, cb) : this.next.activateSession(s, cb)

  }
  public deleteSession(s, cb) {
    this.hasOwnProperty("deleteSession") ? this.deleteSession(s, cb) : this.next.deleteSession(s, cb)

  }
  public updateProblem(a, b) {
    this.hasOwnProperty("updateProblem") ? this.updateProblem(a, b) : this.next.updateProblem(a, b)

  }
  public getSubmissions(s, cb) {
    this.hasOwnProperty("getSubmissions") ? this.getSubmissions(s, cb) : this.next.getSubmissions(s, cb)

  }
  public getSubmission(s, cb) {
    this.hasOwnProperty("getSubmission") ? this.getSubmission(s, cb) : this.next.getSubmission(s, cb)

  }
  public submitProblem(s, cb) {
    this.hasOwnProperty("submitProblem") ? this.submitProblem(s, cb) : this.next.submitProblem(s, cb)

  }
  public testProblem(s, cb) {
    this.hasOwnProperty("testProblem") ? this.testProblem(s, cb) : this.next.testProblem(s, cb)

  }
  public login(user, cb) {
    this.hasOwnProperty("login") ? this.login(user, cb) : this.next.login(user, cb)

  }
  public logout(user, cb) {
    this.hasOwnProperty("logout") ? this.logout(user, cb) : this.next.logout(user, cb)

  }
  public githubLogin(user, cb) {
    this.hasOwnProperty("githubLogin") ? this.githubLogin(user, cb) : this.next.githubLogin(user, cb)

  }
  public linkedinLogin(user, cb) {
    this.hasOwnProperty("linkedinLogin") ? this.linkedinLogin(user, cb) : this.next.linkedinLogin(user, cb)

  }
  public cookieLogin(user, cb) {
    this.hasOwnProperty("cookieLogin") ? this.cookieLogin(user, cb) : this.next.cookieLogin(user, cb)
  }
  public filterProblems(opts, cb) {
    this.hasOwnProperty("filterProblems") ? this.filterProblems(opts, cb) : this.next.filterProblems(opts, cb)
  }

  public getProblem(keyword, needTranslation, cb) {
    this.hasOwnProperty("getProblem") ? this.getProblem(keyword, needTranslation, cb) : this.next.getProblem(keyword, needTranslation, cb)
  }

  public starProblem(problem, starred, cb) {
    this.hasOwnProperty("starProblem") ? this.starProblem(problem, starred, cb) : this.next.starProblem(problem, starred, cb)
  }
  public exportProblem(problem, opts) {
    this.hasOwnProperty("exportProblem") ? this.exportProblem(problem, opts) : this.next.exportProblem(problem, opts)
  }

  public getTodayQuestion(cb) {
    this.hasOwnProperty("getTodayQuestion") ? this.getTodayQuestion(cb) : this.next.getTodayQuestion(cb)
  }

  public getQueryZ(username, cb) {
    this.hasOwnProperty("getQueryZ") ? this.getQueryZ(username, cb) : this.next.getQueryZ(username, cb)
  }

  public getUserContest(username, cb) {
    this.hasOwnProperty("getUserContest") ? this.getUserContest(username, cb) : this.next.getUserContest(username, cb)
  }
}



export const myPluginBase: MyPluginBase = new MyPluginBase();
