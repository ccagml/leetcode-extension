/*
 * Filename: /home/cc/leetcode-extension/src/todayData/TodayDataModule.ts
 * Path: /home/cc/leetcode-extension
 * Created Date: Tuesday, October 24th 2023, 20:06:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2023 ccagml . All rights reserved
 */

import { BABAMediator, BABAProxy, BabaStr, BaseCC, BABA } from "../BABA";
import { ISubmitEvent, OutPutType } from "../model/ConstDefind";
import { ITodayDataResponse } from "../model/TreeNodeModel";
import { isUseEndpointTranslation } from "../utils/ConfigUtils";
import { promptForSignIn, ShowMessage } from "../utils/OutputUtils";
import { getDayEnd, getDayStart } from "../utils/SystemUtils";

class TodayData {
  fidInfo: Map<string, ITodayDataResponse> = new Map<string, ITodayDataResponse>();

  setFidInfo(data) {
    this.fidInfo.set(data.fid, data);
  }

  getFidInfo(fid) {
    return this.fidInfo.get(fid);
  }

  checkNeedReadNew() {
    const day_start = getDayStart(); //获取当天零点的时间
    const day_end = getDayEnd(); //获取当天23:59:59的时间
    let need_get_today: boolean = true;

    this.fidInfo.forEach((value) => {
      if (day_start <= value.time && value.time <= day_end) {
        need_get_today = false;
      }
    });
    if (need_get_today) {
      BABA.getProxy(BabaStr.TodayDataProxy).searchToday();
    }
  }
  public async checkSubmit(e: ISubmitEvent) {
    if (e.sub_type == "submit" && e.accepted) {
      if (this.getFidInfo(e.fid)) {
        let cur_info = this.getFidInfo(e.fid);
        if (cur_info?.userStatus != "FINISH") {
          setTimeout(() => {
            BABA.getProxy(BabaStr.TodayDataProxy).searchToday();
          }, 5000);
        }
      }
    }
  }
}

const todayData: TodayData = new TodayData();

export class TodayDataProxy extends BABAProxy {
  static NAME = BabaStr.TodayDataProxy;
  constructor() {
    super(TodayDataProxy.NAME);
  }

  public getAllTodayData() {
    return todayData.fidInfo;
  }

  public getTodayData(fid) {
    return todayData.getFidInfo(fid);
  }

  public async searchToday(): Promise<void> {
    let sbp = BABA.getProxy(BabaStr.StatusBarProxy);
    if (!sbp.getUser()) {
      promptForSignIn();
      return;
    }
    try {
      const needTranslation: boolean = isUseEndpointTranslation();
      const solution: string = await BABA.getProxy(BabaStr.ChildCallProxy)
        .get_instance()
        .getTodayQuestion(needTranslation);
      const query_result = JSON.parse(solution);
      // "{\"titleSlug\":\"number-of-dice-rolls-with-target-sum\",\"questionId\":\"1263\",\"fid\":\"1155\",\"userStatus\":\"NOT_START\"}\n"

      // const titleSlug: string = query_result.titleSlug
      // const questionId: string = query_result.questionId
      const fid: string = query_result.fid;
      if (fid) {
        let data: any = {};
        data.titleSlug = query_result.titleSlug;
        data.questionId = query_result.questionId;
        data.fid = query_result.fid;
        data.userStatus = query_result.userStatus;
        data.time = Math.floor(Date.now() / 1000);
        todayData.setFidInfo(data);

        BABA.sendNotification(BabaStr.TreeData_searchTodayFinish);
      }
    } catch (error) {
      BABA.getProxy(BabaStr.LogOutputProxy).get_log().appendLine(error.toString());
      await ShowMessage("Failed to fetch today question. 请查看控制台信息~", OutPutType.error);
    }
  }
}

export class TodayDataMediator extends BABAMediator {
  static NAME = BabaStr.TodayDataMediator;
  constructor() {
    super(TodayDataMediator.NAME);
  }

  listNotificationInterests(): string[] {
    return [BabaStr.VSCODE_DISPOST, BabaStr.StartReadData, BabaStr.CommitResult_showFinish, BabaStr.BABACMD_refresh];
  }
  async handleNotification(_notification: BaseCC.BaseCC.INotification) {
    switch (_notification.getName()) {
      case BabaStr.VSCODE_DISPOST:
        break;
      case BabaStr.StartReadData:
        await BABA.getProxy(BabaStr.TodayDataProxy).searchToday();
        break;
      case BabaStr.CommitResult_showFinish:
        todayData.checkSubmit(_notification.getBody());
        break;
      case BabaStr.BABACMD_refresh:
        BABA.getProxy(BabaStr.TodayDataProxy).searchToday();
        break;
      default:
        break;
    }
  }
}
