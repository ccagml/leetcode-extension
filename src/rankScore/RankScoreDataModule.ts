/*
 * Filename: /home/cc/leetcode-extension/src/rankScore/RankScoreDataModule.ts
 * Path: /home/cc/leetcode-extension
 * Created Date: Monday, October 23rd 2023, 8:41:31 pm
 * Author: ccagml
 *
 * Copyright (c) 2023 ccagml . All rights reserved
 */

import { BABAMediator, BABAProxy, BabaStr, BaseCC, BABA } from "../BABA";
import { IScoreData, OutPutType } from "../model/ConstDefind";
import { ShowMessage } from "../utils/OutputUtils";

class RankScoreData {
  private scoreBase = require("../../../resources/data.json");
  public scoreData;
  public nameSiteMapping = new Map<string, IScoreData>();
  constructor() {
    let scoreData = this.scoreBase as IScoreData[];

    scoreData.forEach((element) => {
      element.score = "" + Math.floor(element.Rating || 0);
      this.nameSiteMapping.set("" + element.ID, element);
    });
  }
  public async readData() {
    // 增加直接在线获取分数数据
    const AllScoreDataOnline = await this.getScoreDataOnline();
    if (AllScoreDataOnline != undefined) {
      AllScoreDataOnline.forEach((element) => {
        element.score = "" + Math.floor(element.Rating || 0);
        this.nameSiteMapping.set("" + element.ID, element);
      });
    }
  }

  // 在线获取题目数据
  public async getScoreDataOnline() {
    let stringData = await BABA.getProxy(BabaStr.ChildCallProxy).get_instance().getScoreDataOnline();
    let objData;
    try {
      objData = JSON.parse(stringData);
    } catch (error) {
      objData = {};
    }
    if (objData.code == 101) {
      ShowMessage(
        `从 https://zerotrac.github.io/leetcode_problem_rating/data.json 获取数据出错 ${stringData}`,
        OutPutType.info
      );
      objData = {};
    } else if (objData.code == 102) {
      objData = {};
      // 请求超时 不处理
    }
    return objData.data;
  }
}

const rankScoreData: RankScoreData = new RankScoreData();

export class RankScoreDataProxy extends BABAProxy {
  static NAME = BabaStr.RankScoreDataProxy;
  constructor() {
    super(RankScoreDataProxy.NAME);
  }

  public getDataByFid(fid: string): IScoreData | undefined {
    return rankScoreData.nameSiteMapping.get(fid);
  }
}

export class RankScoreDataMediator extends BABAMediator {
  static NAME = BabaStr.RankScoreDataMediator;
  constructor() {
    super(RankScoreDataMediator.NAME);
  }

  listNotificationInterests(): string[] {
    return [BabaStr.VSCODE_DISPOST, BabaStr.StartReadData];
  }
  async handleNotification(_notification: BaseCC.BaseCC.INotification) {
    switch (_notification.getName()) {
      case BabaStr.VSCODE_DISPOST:
        break;
      case BabaStr.StartReadData:
        await rankScoreData.readData();
        break;
      default:
        break;
    }
  }
}
