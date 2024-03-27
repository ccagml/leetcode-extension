import { commUtils } from "../utils/commUtils";
import { storageUtils } from "../utils/storageUtils";

/* It's a chain of responsibility pattern */
export class ChainNodeBase {
  next: ChainNodeBase; // 下一个点
  enabled: boolean;
  builtin: boolean = true;
  name: string; // 点的名称
  deleted: boolean;

  public init() { }

  public save(): void {
    const stats = storageUtils.getCache(commUtils.KEYS.plugins) || {};

    if (this.deleted) delete stats[this.name];
    else stats[this.name] = this.enabled;

    storageUtils.setCache(commUtils.KEYS.plugins, stats);
  }

  public setNext(next: ChainNodeBase): void {
    Object.setPrototypeOf(this, next);
    this.next = next;
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
  public curlcookieLogin(user, cb: Function): void {
    this.next.curlcookieLogin(user, cb);
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
  public getHelpOnline(problem, cn_flag, lang): void {
    this.next.getHelpOnline(problem, cn_flag, lang);
  }
  public getHintsOnline(problem, cb: Function): void {
    this.next.getHintsOnline(problem, cb);
  }
}
