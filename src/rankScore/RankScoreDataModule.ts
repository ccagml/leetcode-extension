/*
 * Filename: /home/cc/leetcode-extension/src/rankScore/RankScoreDataModule.ts
 * Path: /home/cc/leetcode-extension
 * Created Date: Monday, October 23rd 2023, 5:41:31 pm
 * Author: ccagml
 *
 * Copyright (c) 2023 ccagml . All rights reserved
 */

import { BABAMediator, BABAProxy, BabaStr, BaseCC } from "../BABA";

class RankScoreData {}

const rankScoreData: RankScoreData = new RankScoreData();

export class RankScoreDataProxy extends BABAProxy {
  static NAME = BabaStr.RankScoreDataProxy;
  constructor() {
    super(RankScoreDataProxy.NAME);
  }
}

export class RankScoreDataMediator extends BABAMediator {
  static NAME = BabaStr.RankScoreDataMediator;
  constructor() {
    super(RankScoreDataMediator.NAME);
  }

  listNotificationInterests(): string[] {
    return [BabaStr.VSCODE_DISPOST];
  }
  async handleNotification(_notification: BaseCC.BaseCC.INotification) {
    switch (_notification.getName()) {
      case BabaStr.VSCODE_DISPOST:
        break;
      default:
        break;
    }
  }
}
