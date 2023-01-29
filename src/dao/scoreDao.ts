/*
 * Filename: https://github.com/ccagml/leetcode_extension/src/dao/scoreDao.ts
 * Path: https://github.com/ccagml/leetcode_extension
 * Created Date: Thursday, November 10th 2022, 11:40:22 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { IScoreData } from "../model/Model";

class ScoreDao {
  private scoreBase = require("../../../resources/data.json");

  public getScoreData(onlineData?): Map<string, IScoreData> {
    let nameSiteMapping = new Map<string, IScoreData>();
    let temp = this.scoreBase as IScoreData[];
    if (onlineData) {
      temp = onlineData;
    }
    temp.forEach((element) => {
      // Rating
      // ID
      // ContestSlug
      element.score = "" + Math.floor(element.Rating || 0);
      nameSiteMapping.set("" + element.ID, element);
    });
    return nameSiteMapping;
  }
}

export const scoreDao: ScoreDao = new ScoreDao();
