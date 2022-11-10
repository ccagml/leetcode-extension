/*
 * Filename: https://github.com/ccagml/vscode-leetcode-problem-rating/src/dao/scoreDao.ts
 * Path: https://github.com/ccagml/vscode-leetcode-problem-rating
 * Created Date: Thursday, November 10th 2022, 11:40:22 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { IScoreData } from "../model/Model";




class ScoreDao {
    private scoreBase = require("../../../resources/data.json");

    public getScoreData(): Map<string, IScoreData> {

        let nameSiteMapping = new Map<string, IScoreData>();
        const temp = this.scoreBase as IScoreData[];
        temp.forEach(element => {
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






