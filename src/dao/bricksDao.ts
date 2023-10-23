/*
 * https://github.com/ccagml/leetcode-extension/src/dao/bricksDao.ts
 * Path: https://github.com/ccagml/leetcode-extension
 * Created Date: Wednesday, November 23rd 2022, 4:36:38 pm
 * Author: ccagml
 *
 * Copyright (c) 2022  ccagml . All rights reserved.
 */

import { selectWorkspaceFolder } from "../utils/ConfigUtils";
import { useWsl, toWinPath, getDayStart, getDayNow, getYMD } from "../utils/SystemUtils";
import * as path from "path";
import * as fse from "fs-extra";
import { BricksType, BricksTypeName } from "../model/ConstDefind";

// let bricks_json = {
//   version: 1,
//   all_bricks: {
//     [qid]: {
//       fid: "xxx", // 页面显示的编号可能有空格之类的
//       submit_time: [], // 上次提交的时间
//       type: 1, // 类型
//     },
//   },
// };

class BricksDao {
  version = 1;
  public async bricks_data_path() {
    // const language: string | undefined = await fetchProblemLanguage();
    // if (!language) {
    //   return;
    // }
    const workspaceFolder: string = await selectWorkspaceFolder(false);
    if (!workspaceFolder) {
      return;
    }
    let lcpr_data_path: string = path.join(workspaceFolder, ".lcpr_data");
    await fse.ensureDir(lcpr_data_path);

    let finalPath = path.join(lcpr_data_path, "bricks.json");
    finalPath = useWsl() ? await toWinPath(finalPath) : finalPath;

    if (!(await fse.pathExists(finalPath))) {
      await fse.createFile(finalPath);
      await fse.writeFile(finalPath, JSON.stringify({ version: this.version }));
    }

    return finalPath;
  }
  public async init() {
    let lcpr_data_path = await this.bricks_data_path();
    if (!lcpr_data_path) {
      return;
    }
  }

  private async _write_data(data: object) {
    let lcpr_data_path = await this.bricks_data_path();
    if (!lcpr_data_path) {
      return;
    }
    return await fse.writeFile(lcpr_data_path, JSON.stringify(data, null, 4));
  }

  private async _read_data() {
    let lcpr_data_path = await this.bricks_data_path();
    if (!lcpr_data_path) {
      return {};
    }
    let temp_data = await fse.readFile(lcpr_data_path, "utf8");
    return JSON.parse(temp_data) || {};
  }

  public async getAllBricks() {
    let allData = await this._read_data();
    return allData.all_bricks || {};
  }

  private getTimeByType(type: number, today_time: number, add_flag?: boolean) {
    let need_day_ago = 7;
    switch (type) {
      case BricksType.TYPE_0:
        return today_time - today_time;
        break;
      case BricksType.TYPE_1:
        // 1:(14天搬砖simple)
        need_day_ago = 14;
        break;
      case BricksType.TYPE_2:
        //  2:(7天后搬砖simple_error)
        need_day_ago = 7;
        break;
      case BricksType.TYPE_3:
        // 3:(5天后搬砖simple_time)
        need_day_ago = 5;
        break;
      case BricksType.TYPE_4:
        // 4:(3天后搬砖(time_limit))
        need_day_ago = 3;
        break;
      case BricksType.TYPE_5:
        //  5:(2天后搬砖(medium))
        need_day_ago = 2;
        break;
      case BricksType.TYPE_6:
        // 6: (1天后搬砖(hard))
        need_day_ago = 1;
        break;
      default:
        break;
    }

    return add_flag ? today_time + need_day_ago * 86400 : today_time - need_day_ago * 86400;
  }

  private getTypeName(type: number) {
    switch (type) {
      case BricksType.TYPE_0:
        return BricksTypeName.TYPE_0;
      case BricksType.TYPE_1:
        // 1:(14天搬砖simple)
        return BricksTypeName.TYPE_1;
      case BricksType.TYPE_2:
        //  2:(7天后搬砖simple_error)
        return BricksTypeName.TYPE_2;
      case BricksType.TYPE_3:
        // 3:(5天后搬砖simple_time)
        return BricksTypeName.TYPE_3;
      case BricksType.TYPE_4:
        // 4:(3天后搬砖(time_limit))
        return BricksTypeName.TYPE_4;
      case BricksType.TYPE_5:
        //  5:(2天后搬砖(medium))
        return BricksTypeName.TYPE_5;
      case BricksType.TYPE_6:
        // 6: (1天后搬砖(hard))
        return BricksTypeName.TYPE_6;
      default:
        return "";
    }
  }

  public async getTodayBricks(): Promise<string[]> {
    let today_time = getDayStart();
    let all_bricks = await this.getAllBricks();
    let all_qid: Array<string> = [];
    for (const qid in all_bricks) {
      const value = all_bricks[qid];
      const submit_time = value.submit_time || [];
      const submit_size = submit_time.length;
      if (value.type > BricksType.TYPE_0) {
        if (submit_size < 1 || submit_time[submit_size - 1] < this.getTimeByType(value.type, today_time)) {
          all_qid.push(qid);
        }
      }
    }
    return all_qid;
  }

  public async getTodayBricksSubmit(): Promise<string[]> {
    let today_time = getDayStart();
    let all_bricks = await this.getAllBricks();
    let all_qid: Array<string> = [];
    for (const qid in all_bricks) {
      const value = all_bricks[qid];
      const submit_time = value.submit_time || [];
      let submit_size = submit_time.length;
      if (submit_size > 0 && submit_time[submit_size - 1] >= today_time) {
        all_qid.push(qid);
      }
    }
    return all_qid;
  }

  public async getTodayBricksSubmitToolTip(qid_list: Array<string>) {
    let today_time = getDayStart();
    let all_bricks = await this.getAllBricks();
    let result: Map<string, string> = new Map<string, string>();
    qid_list.forEach((qid) => {
      const value = all_bricks[qid];
      if (value == undefined) {
        result.set(qid, this.TypetimeToMan(BricksType.TYPE_2, this.getTimeByType(BricksType.TYPE_2, today_time, true)));
      } else {
        result.set(
          qid,
          this.TypetimeToMan(
            value.type != undefined ? value.type : BricksType.TYPE_2,
            this.getTimeByType(value.type != undefined ? value.type : BricksType.TYPE_2, today_time, true)
          )
        );
      }
    });
    return result;
  }
  public TypetimeToMan(type, time: number) {
    if (time < 10) {
      return BricksTypeName.TYPE_0;
    }

    return `${this.getTypeName(type)}后${getYMD(time)}出现`; //this.getTypeName(type) + getYMD(time) + "出现";
  }

  public async getInfoByQid(qid: string) {
    let all_bricks = await this.getAllBricks();
    return all_bricks[qid] || {};
  }
  public async setInfoByQid(qid: string, info) {
    let all_data = await this._read_data();
    let temp = all_data.all_bricks || {};
    temp[qid] = info;
    all_data.all_bricks = temp;
    await this._write_data(all_data);
  }

  public async addSubmitTimeByQid(qid: string) {
    let temp_data = await this.getInfoByQid(qid);
    let submit_time = temp_data.submit_time || [];
    let submit_now = getDayNow();
    submit_time.push(submit_now);
    temp_data.submit_time = submit_time;
    if (!temp_data.type) {
      temp_data.type = BricksType.TYPE_2;
    }
    await this.setInfoByQid(qid, temp_data);
    return submit_now;
  }
  public async setTypeByQid(qid: string, type) {
    let temp_data = await this.getInfoByQid(qid);
    temp_data.type = type;
    await this.setInfoByQid(qid, temp_data);
  }
}

export const bricksDao: BricksDao = new BricksDao();
