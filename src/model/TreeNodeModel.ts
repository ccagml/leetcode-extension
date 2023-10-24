/*
 * Filename: /home/cc/leetcode-extension/src/model/TreeNodeModel.ts
 * Path: /home/cc/leetcode-extension
 * Created Date: Tuesday, October 24th 2023, 7:45:05 pm
 * Author: ccagml
 *
 * Copyright (c) 2023 ccagml . All rights reserved
 */

import { Command, Uri } from "vscode";
import { BABA, BabaStr } from "../BABA";
import { IScoreData, ProblemState, RootNodeSort } from "./ConstDefind";

// 普通节点数据
export interface ITreeDataNormal {
  id: string;
  name: string;
  rootNodeSortId: RootNodeSort;
}

// 查询节点
export interface ITreeDataSearch {
  id: string;
  name: string;
  rootNodeSortId: RootNodeSort;
  input: string;
  isSearchResult: boolean;
}

// 每日一题的节点
export interface ITreeDataDay {
  id: string;
  name: string;
  rootNodeSortId: RootNodeSort;
  input: string;
  isSearchResult: boolean;
  todayData: ITodayDataResponse | undefined;
}

export interface IQuestionData {
  isFavorite: boolean;
  locked: boolean;
  state: ProblemState;
  id: string; // 题目编号 fid
  qid: string;
  name: string;
  cn_name: string;
  en_name: string;
  difficulty: string;
  passRate: string;
  companies: string[];
}

// 今天搬砖的点
export interface IBricksToday {
  id: string;
  name: string;
  collapsibleState?;
  groupTime?;
  toolTip?;
}

// 每日一题的数据
// "{\"titleSlug\":\"number-of-dice-rolls-with-target-sum\",\"questionId\":\"1263\",\"fid\":\"1155\",\"userStatus\":\"NOT_START\"}\n"
export interface ITodayDataResponse {
  date: string; // 日期
  userStatus: string; // 状态   'NOT_START' 'FINISH'
  titleSlug: string;
  questionId: string;
  fid: string;
  time: number;
}

export enum TreeNodeType {
  TreeDataNormal = 1, // 普通题目根
  TreeDataLeaf = 2, // 普通题目叶子
  BricksDataNormal = 3, // 普通砖头根
  BricksDataLeaf = 4, // 普通砖头叶子
  TreeDataSearch = 5, // 查询的根
  TreeDataSearchLeaf = 6, // 查询的叶子
  TreeDataDay = 7, // 每日一题的根
  TreeDataDayLeaf = 8, // 每日一题的叶子
  TreeQuestionData = 9, // 题目数据
}

export class TreeNodeModel {
  __DataPool: Map<TreeNodeType, any> = new Map<TreeNodeType, any>();

  constructor(
    data: ITreeDataNormal | ITreeDataSearch | ITreeDataDay | IQuestionData | IBricksToday,
    public nodeType: TreeNodeType
  ) {
    this.init_data(data);
  }

  public get_data() {
    return this.__DataPool.get(this.nodeType);
  }
  public init_data(data: ITreeDataNormal | ITreeDataSearch | ITreeDataDay | IQuestionData | IBricksToday) {
    this.__DataPool.set(this.nodeType, data);
  }

  public get rootNodeSortId(): RootNodeSort {
    return this.get_data()?.rootNodeSortId;
  }

  public get qid(): string {
    return this.get_data()?.qid || "";
  }
  public get id(): string {
    return this.get_data()?.id || "";
  }
  public get fid(): string {
    return this.get_data()?.id || "";
  }
  public get toolTip(): string {
    return this.get_data()?.toolTip || "";
  }

  public get name(): string {
    return this.get_data()?.name || "";
  }
  public get cn_name(): string {
    return this.get_data()?.cn_name;
  }
  public get en_name(): string {
    return this.get_data()?.en_name;
  }

  public get collapsibleState() {
    return this.get_data()?.collapsibleState;
  }

  public get acceptanceRate(): number {
    return Number(this.get_data()?.passRate) || 50;
  }
  public get groupTime(): number {
    return Number(this.get_data()?.groupTime) || 0;
  }

  public get locked(): boolean {
    return this.get_data()?.locked;
  }

  public get passRate(): string {
    return this.get_data()?.passRate;
  }

  public get difficulty(): string {
    return this.get_data()?.difficulty;
  }

  public get companies(): string[] {
    return this.get_data()?.companies;
  }

  public get input(): string {
    return this.get_data()?.input || "";
  }

  public get isFavorite(): boolean {
    return this.get_data()?.isFavorite;
  }

  public get isSearchResult(): boolean {
    return this.nodeType == TreeNodeType.TreeDataSearch || this.nodeType == TreeNodeType.TreeDataDay;
  }

  public get isProblem(): boolean {
    return (
      this.nodeType == TreeNodeType.TreeDataLeaf ||
      this.nodeType == TreeNodeType.BricksDataLeaf ||
      this.nodeType == TreeNodeType.TreeDataSearchLeaf ||
      this.nodeType == TreeNodeType.TreeDataDayLeaf
    );
  }

  // rank分
  public get score(): string {
    return BABA.getProxy(BabaStr.RankScoreDataProxy).getDataByFid(this.fid)?.score || "0";
  }
  // 周赛名称
  public get ContestID_en(): string {
    return BABA.getProxy(BabaStr.RankScoreDataProxy).getDataByFid(this.fid)?.ContestID_en || "";
  }
  // 周赛第几题
  public get ProblemIndex(): string {
    return BABA.getProxy(BabaStr.RankScoreDataProxy).getDataByFid(this.fid)?.ProblemIndex || "";
  }
  // 周赛名称符号链接
  public get ContestSlug(): string {
    return BABA.getProxy(BabaStr.RankScoreDataProxy).getDataByFid(this.fid)?.ContestSlug || "";
  }

  public get scoreData(): IScoreData | undefined {
    return BABA.getProxy(BabaStr.RankScoreDataProxy).getDataByFid(this.fid);
  }

  public get tags(): string[] {
    return BABA.getProxy(BabaStr.TreeDataProxy).getTagsData(this.fid) || [];
  }

  public get state(): ProblemState {
    // 每日一题的修正

    if (BABA.getProxy(BabaStr.TodayDataProxy).getTodayData(this.fid)) {
      const us = BABA.getProxy(BabaStr.TodayDataProxy).getTodayData(this.fid)?.userStatus || "";
      if (us == "FINISH") {
        return ProblemState.AC;
      } else {
        return ProblemState.Unknown;
      }
    }
    return this.get_data()?.state;
  }

  public get previewCommand(): Command {
    return {
      title: "Preview Problem",
      command: "lcpr.previewProblem",
      arguments: [this],
    };
  }

  public get uri(): Uri {
    return Uri.from({
      scheme: "leetcode",
      authority: this.isProblem ? "problems" : "tree-node",
      path: `/${this.id}`, // path must begin with slash /
      query: `difficulty=${this.difficulty}&score=${this.score}&user_score=0`,
    });
  }
}

// export class NodeModel {
//   private _u_score;
//   constructor(public data: IProblem, public isProblemNode: boolean = true, userscore: number = 0) {
//     this._u_score = userscore;
//   }

//   public get locked(): boolean {
//     return this.data.locked;
//   }
//   public get name(): string {
//     return this.data.name;
//   }
//   public get cn_name(): string {
//     return this.data.cn_name;
//   }
//   public get en_name(): string {
//     return this.data.en_name;
//   }

//   public get state(): ProblemState {
//     // 每日一题的修正
//     if (this.todayData) {
//       const us = this.todayDataUserStatus;
//       if (us == "FINISH") {
//         return ProblemState.AC;
//       } else {
//         return ProblemState.Unknown;
//       }
//     }

//     return this.data.state;
//   }

//   public get id(): string {
//     return this.data.id;
//   }

//   public get passRate(): string {
//     return this.data.passRate;
//   }

//   public get difficulty(): string {
//     return this.data.difficulty;
//   }

//   public get companies(): string[] {
//     return this.data.companies;
//   }

//   public get isFavorite(): boolean {
//     return this.data.isFavorite;
//   }

//   public get isProblem(): boolean {
//     return this.isProblemNode;
//   }
//   public get rootNodeSortId(): RootNodeSort {
//     return this.data.rootNodeSortId;
//   }

//   public get previewCommand(): Command {
//     return {
//       title: "Preview Problem",
//       command: "lcpr.previewProblem",
//       arguments: [this],
//     };
//   }

//   public get acceptanceRate(): number {
//     return Number(this.passRate) || 50;
//   }

//   public get uri(): Uri {
//     return Uri.from({
//       scheme: "leetcode",
//       authority: this.isProblem ? "problems" : "tree-node",
//       path: `/${this.id}`, // path must begin with slash /
//       query: `difficulty=${this.difficulty}&score=${this.score}&user_score=${this._u_score}`,
//     });
//   }

//   public set set_user_score(s: number) {
//     this._u_score = s;
//   }

//   public get user_score(): number {
//     return this._u_score;
//   }

//   // rank分
//   public get score(): string {
//     return this.data.scoreData?.score || "0";
//   }
//   // 周赛名称
//   public get ContestID_en(): string {
//     return this.data.scoreData?.ContestID_en || "";
//   }
//   // 周赛第几题
//   public get ProblemIndex(): string {
//     return this.data.scoreData?.ProblemIndex || "";
//   }
//   // 周赛名称符号链接
//   public get ContestSlug(): string {
//     return this.data.scoreData?.ContestSlug || "";
//   }
//   public get scoreData(): IScoreData | undefined {
//     return this.data.scoreData;
//   }
//   public get isSearchResult(): boolean {
//     return this.data.isSearchResult;
//   }
//   public get input(): string {
//     return this.data.input || "";
//   }
//   // 每日一题的一些信息
//   public get todayData(): ITodayData | undefined {
//     return this.data.todayData;
//   }
//   public set todayData(s: ITodayData | undefined) {
//     this.data.todayData = s;
//   }
//   public get todayDataDate(): string {
//     return this.data.todayData?.date || "";
//   }
//   public get todayDataUserStatus(): string {
//     return this.data.todayData?.userStatus || "";
//   }
//   public get qid(): string {
//     return this.data.qid || "";
//   }
// }

// export class BricksNode extends NodeModel {
//   public collapsibleState?;
//   public groupTime?;
//   public toolTip?;
//   constructor(
//     data: IProblem,
//     ipn: boolean = true,
//     userscore: number = 0,
//     collapsibleState = 0,
//     groupTime?: number,
//     toolTip?: string
//   ) {
//     super(data, ipn, userscore);
//     this.isProblemNode = ipn;
//     this.collapsibleState = collapsibleState;
//     this.groupTime = groupTime;
//     this.toolTip = toolTip;
//   }
// }
