/*
 * Filename: /home/cc/leetcode-extension/src/questionData/questionDataModule.ts
 * Path: /home/cc/leetcode-extension
 * Created Date: Monday, October 16th 2023, 10:00:51 am
 * Author: ccagml
 *
 * Copyright (c) 2023 ccagml . All rights reserved
 */

import { BABA, BABAMediator, BABAProxy, BabaStr, BaseCC } from "../BABA";
import { IProblem, OutPutType, ProblemState, RootNodeSort, UserStatus } from "../model/Model";
import { NodeModel } from "../model/NodeModel";

import { isShowLocked, isUseEndpointTranslation } from "../utils/ConfigUtils";
import { ShowMessage } from "../utils/OutputUtils";

class QuestionData {
  private explorerNodeMap: Map<string, NodeModel> = new Map<string, NodeModel>();
  private fidToQid: Map<string, string> = new Map<string, string>();
  private qidToFid: Map<string, string> = new Map<string, string>();
  private companySet: Set<string> = new Set<string>();
  private tagSet: Set<string> = new Set<string>();

  public clearCache(): void {
    this.explorerNodeMap.clear();
    this.companySet.clear();
    this.tagSet.clear();
    this.fidToQid.clear();
    this.qidToFid.clear();
  }

  public async refreshCache() {
    let user_score = BABA.getProxy(BabaStr.StatusBarProxy).getUserContestScore();
    for (const problem of await BABA.getProxy(BabaStr.QuestionDataProxy).getAllProblems()) {
      this.explorerNodeMap.set(problem.id, new NodeModel(problem, true, user_score));
      this.fidToQid.set(problem.id, problem.qid.toString());
      this.qidToFid.set(problem.qid.toString(), problem.id);

      for (const company of problem.companies) {
        this.companySet.add(company);
      }
      for (const tag of problem.tags) {
        this.tagSet.add(tag);
      }
    }

    BABA.sendNotification(BabaStr.QuestionData_refreshCacheFinish);
  }
  public getExplorerNodeMap(): Map<string, NodeModel> {
    return this.explorerNodeMap;
  }

  public getCompanySet() {
    return this.companySet;
  }
  public getTagSet() {
    return this.tagSet;
  }
  public getFidToQid() {
    return this.fidToQid;
  }
  public getQidToFid() {
    return this.qidToFid;
  }
}

const questionData: QuestionData = new QuestionData();

export class QuestionDataProxy extends BABAProxy {
  static NAME = BabaStr.QuestionDataProxy;
  constructor() {
    super(QuestionDataProxy.NAME);
  }

  public getExplorerNodeMap(): Map<string, NodeModel> {
    return questionData.getExplorerNodeMap();
  }

  public getCompanySet() {
    return questionData.getCompanySet();
  }
  public getTagSet() {
    return questionData.getTagSet();
  }

  public getNodeById(id: string): NodeModel | undefined {
    return this.getExplorerNodeMap().get(id);
  }

  public getNodeByQid(qid: string): NodeModel | undefined {
    let new_qid = qid.toString();
    return this.getNodeById(questionData.getQidToFid().get(new_qid) || "");
  }

  public getQidByFid(id: string) {
    return questionData.getFidToQid().get(id);
  }

  public async getAllProblems(): Promise<IProblem[]> {
    try {
      let sbp = BABA.getProxy(BabaStr.StatusBarProxy);
      if (sbp.getStatus() === UserStatus.SignedOut) {
        return [];
      }

      const showLockedFlag: boolean = isShowLocked();
      const useEndpointTranslation: boolean = isUseEndpointTranslation();
      const result: string = await BABA.getProxy(BabaStr.ChildCallProxy)
        .get_instance()
        .getAllProblems(showLockedFlag, useEndpointTranslation);
      let all_problem_info = JSON.parse(result);
      if (!showLockedFlag) {
        all_problem_info = all_problem_info.filter((p) => !p.locked);
      }
      const problems: IProblem[] = [];
      const AllScoreData = BABA.getProxy(BabaStr.TreeDataProxy).getScoreData();
      // 增加直接在线获取分数数据
      const AllScoreDataOnline = await BABA.getProxy(BabaStr.TreeDataProxy).getScoreDataOnline();
      for (const p of all_problem_info) {
        problems.push({
          id: p.fid,
          qid: p.id,
          isFavorite: p.starred,
          locked: p.locked,
          state: this.parseProblemState(p.state),
          name: p.name,
          cn_name: p.cn_name,
          en_name: p.en_name,
          difficulty: p.level,
          passRate: p.percent,
          companies: p.companies || [],
          tags: BABA.getProxy(BabaStr.TreeDataProxy).getTagsData(p.fid),
          scoreData: AllScoreDataOnline.get(p.fid) || AllScoreData.get(p.fid),
          isSearchResult: false,
          input: "",
          rootNodeSortId: RootNodeSort.ZERO,
          todayData: undefined,
        });
      }
      return problems.reverse();
    } catch (error) {
      await ShowMessage("获取题目失败. 请查看控制台信息~", OutPutType.error);
      return [];
    }
  }
  public parseProblemState(stateOutput: string): ProblemState {
    if (!stateOutput) {
      return ProblemState.Unknown;
    }
    switch (stateOutput.trim()) {
      case "v":
      case "✔":
      case "√":
      case "ac":
        return ProblemState.AC;
      case "X":
      case "✘":
      case "×":
      case "notac":
        return ProblemState.NotAC;
      default:
        return ProblemState.Unknown;
    }
  }
}

export class QuestionDataMediator extends BABAMediator {
  static NAME = BabaStr.QuestionDataMediator;
  constructor() {
    super(QuestionDataMediator.NAME);
  }

  listNotificationInterests(): string[] {
    return [BabaStr.VSCODE_DISPOST, BabaStr.QuestionData_clearCache, BabaStr.QuestionData_refreshCache];
  }
  async handleNotification(_notification: BaseCC.BaseCC.INotification) {
    switch (_notification.getName()) {
      case BabaStr.VSCODE_DISPOST:
        break;
      case BabaStr.QuestionData_clearCache:
        questionData.clearCache();
        break;
      case BabaStr.QuestionData_refreshCache:
        questionData.refreshCache();
      default:
        break;
    }
  }
}
