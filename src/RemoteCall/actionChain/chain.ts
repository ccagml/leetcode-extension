/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/RemoteCall/actionChain/chain.ts
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

export class Chain {
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
  installed: Array<Chain> = [];
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
    this.next = null;
  }

  public getChainHead(): Chain {
    return this.head;
  }

  public base_init(head: Chain): Object {
    this.head = head;
    const stats = storageUtils.getCache(commUtils.KEYS.plugins) || {};
    let file_plugin: Array<any> = storageUtils.listCodeDir(
      "../actionChain/chainNode"
    );
    this.installed = [];
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

  public setNext(next: Chain): void {
    Object.setPrototypeOf(this, next);
    this.next = next;
  }
  public save_all(): void {
    for (let p of this.plugins) {
      p.save();
    }
  }

  public getProblems(Translate: boolean, cb: Function): void {
    this.next.getProblems(Translate, cb);
  }
  public getQuestionOfToday(cb: Function): void {
    this.next.getQuestionOfToday(cb);
  }

  public getRatingOnline(cb: Function): void {
    this.next.getRatingOnline(cb);
  }

  public getTestApi(username, cb: Function): void {
    this.next.getTestApi(username, cb);
  }
  public getUserContestP(username, cb: Function): void {
    this.next.getUserContestP(username, cb);
  }
  public getProblemsTitle(cb: Function): void {
    this.next.getProblemsTitle(cb);
  }
  public createSession(a, cb: Function): void {
    this.next.createSession(a, cb);
  }
  public getSessions(cb: Function): void {
    this.next.getSessions(cb);
  }
  public activateSession(s, cb: Function): void {
    this.next.activateSession(s, cb);
  }
  public deleteSession(s, cb: Function): void {
    this.next.deleteSession(s, cb);
  }
  public updateProblem(a, b): void {
    this.next.updateProblem(a, b);
  }
  public getSubmissions(s, cb: Function): void {
    this.next.getSubmissions(s, cb);
  }
  public getSubmission(s, cb: Function): void {
    this.next.getSubmission(s, cb);
  }
  public submitProblem(s, cb: Function): void {
    this.next.submitProblem(s, cb);
  }
  public testProblem(s, cb: Function): void {
    this.next.testProblem(s, cb);
  }
  public login(user, cb: Function): void {
    this.next.login(user, cb);
  }
  public logout(user, cb): void {
    this.next.logout(user, cb);
  }
  public githubLogin(user, cb: Function): void {
    this.next.githubLogin(user, cb);
  }
  public linkedinLogin(user, cb: Function): void {
    this.next.linkedinLogin(user, cb);
  }
  public cookieLogin(user, cb: Function): void {
    this.next.cookieLogin(user, cb);
  }
  public filterProblems(opts, cb: Function): void {
    this.next.filterProblems(opts, cb);
  }

  public getProblem(keyword, needTranslation, cb: Function): void {
    this.next.getProblem(keyword, needTranslation, cb);
  }

  public starProblem(problem, starred, cb: Function): void {
    this.next.starProblem(problem, starred, cb);
  }
  public exportProblem(problem, opts): void {
    this.next.exportProblem(problem, opts);
  }

  public getTodayQuestion(cb: Function): void {
    this.next.getTodayQuestion(cb);
  }

  public getQueryZ(username, cb: Function): void {
    this.next.getQueryZ(username, cb);
  }

  public getUserContest(username, cb: Function): void {
    this.next.getUserContest(username, cb);
  }
  public getRating(cb: Function): void {
    this.next.getRating(cb);
  }
}

export const chain: Chain = new Chain();
