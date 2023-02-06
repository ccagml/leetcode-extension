/*
 * https://github.com/ccagml/leetcode_ext/src/dao/groupDao.ts
 * Path: https://github.com/ccagml/leetcode_ext
 * Created Date: Wednesday, November 30th 2022, 9:47:36 am
 * Author: ccagml
 *
 * Copyright (c) 2022  ccagml . All rights reserved.
 */

import { selectWorkspaceFolder } from "../utils/ConfigUtils";
import { useWsl, toWinPath, getDayNowM } from "../utils/SystemUtils";
import * as path from "path";
import * as fse from "fs-extra";

// let group_json = {
//   version: 1,
//   all_group: [{ name: "aaa", time: "qqq", qid_list: [] }, {}, {}],
// };

class GroupDao {
  version = 1;
  public async group_data_path() {
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

    let finalPath = path.join(lcpr_data_path, "group.json");
    finalPath = useWsl() ? await toWinPath(finalPath) : finalPath;

    if (!(await fse.pathExists(finalPath))) {
      await fse.createFile(finalPath);
      await fse.writeFile(finalPath, JSON.stringify({ version: this.version }));
    }
    return finalPath;
  }
  public async init() {
    let lcpr_data_path = await this.group_data_path();
    if (!lcpr_data_path) {
      return;
    }
  }

  private async _write_data(data: object) {
    let lcpr_data_path = await this.group_data_path();
    if (!lcpr_data_path) {
      return;
    }
    return await fse.writeFile(lcpr_data_path, JSON.stringify(data));
  }

  private async _read_data() {
    let lcpr_data_path = await this.group_data_path();
    if (!lcpr_data_path) {
      return {};
    }
    let temp_data = await fse.readFile(lcpr_data_path, "utf8");
    return JSON.parse(temp_data) || {};
  }

  // 获取所有分组
  public async getAllGroup() {
    let old_data = await this._read_data();
    let all_group = old_data.all_group || [];
    return all_group;
  }

  // 新的分组
  public async newBrickGroup(name: string) {
    let old_data = await this._read_data();
    let all_group = old_data.all_group || [];
    let newGroup = {};
    newGroup["name"] = name;
    newGroup["time"] = getDayNowM();
    newGroup["qid_list"] = [];
    all_group.push(newGroup);
    old_data.all_group = all_group;
    this._write_data(old_data);
  }

  public async removeBrickGroupByTime(time) {
    let old_data = await this._read_data();
    let all_group = old_data.all_group || [];
    old_data.all_group = all_group.filter((gob) => gob.time !== time);
    this._write_data(old_data);
  }

  public async getQidByTime(time) {
    let old_data = await this._read_data();
    let all_group = old_data.all_group || [];
    let result = [];
    all_group.forEach((element) => {
      if (element.time == time) {
        result = element.qid_list || [];
        return;
      }
    });
    return result;
  }

  public async addQidToTimeList(qid, time_list) {
    let new_qid = qid.toString();
    let time_map: Map<number, number> = new Map<number, number>();
    time_list.forEach((element) => {
      time_map.set(element, 1);
    });

    let old_data = await this._read_data();
    let all_group = old_data.all_group || [];
    all_group.forEach((element) => {
      if (time_map.get(element.time)) {
        element.qid_list = element.qid_list.filter((eqid) => eqid !== new_qid);
        element.qid_list.push(new_qid);
      }
    });
    old_data.all_group = all_group;
    this._write_data(old_data);
  }

  public async removeQidFromTime(qid, time) {
    let new_qid = qid.toString();
    let old_data = await this._read_data();
    let all_group = old_data.all_group || [];
    all_group.forEach((element) => {
      if (element.time == time) {
        element.qid_list = element.qid_list.filter((eqid) => eqid !== new_qid);
      }
    });
    old_data.all_group = all_group;
    this._write_data(old_data);
  }
}

export const groupDao: GroupDao = new GroupDao();
