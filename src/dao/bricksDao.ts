// > workspace/ 工作目录
// >
// > > .lcpr_data/ 存数据
// > >
// > > > remake/ 备注
// > > >
// > > > > 题目内部编号.json 根据 qid 备注的信息
// > >

import { fetchProblemLanguage, selectWorkspaceFolder } from "../utils/ConfigUtils";
import { useWsl, toWinPath, getDayStart, getDayNow } from "../utils/SystemUtils";
import * as path from "path";
import * as fse from "fs-extra";
import { BricksType } from "../model/Model";

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
    const language: string | undefined = await fetchProblemLanguage();
    if (!language) {
      return;
    }
    const workspaceFolder: string = await selectWorkspaceFolder(false);
    if (!workspaceFolder) {
      return;
    }
    let lcpr_data_path: string = path.join(workspaceFolder, ".lcpr_data");
    await fse.ensureDir(lcpr_data_path);

    let finalPath = path.join(lcpr_data_path, "bricks.json");
    finalPath = useWsl() ? await toWinPath(finalPath) : finalPath;
    return finalPath;
  }
  public async init() {
    let lcpr_data_path = await this.bricks_data_path();
    if (!lcpr_data_path) {
      return;
    }
    if (!(await fse.pathExists(lcpr_data_path))) {
      await fse.createFile(lcpr_data_path);
      await fse.writeFile(lcpr_data_path, JSON.stringify({ version: this.version }));
    }
  }

  private async _write_data(data: object) {
    let lcpr_data_path = await this.bricks_data_path();
    if (!lcpr_data_path) {
      return;
    }
    return await fse.writeFile(lcpr_data_path, JSON.stringify(data));
  }

  private async _read_data() {
    let lcpr_data_path = await this.bricks_data_path();
    if (!lcpr_data_path) {
      return;
    }
    let temp_data = await fse.readFile(lcpr_data_path, "utf8");
    return JSON.parse(temp_data) || {};
  }

  public async getAllBricks() {
    let allData = await this._read_data();
    return allData.all_bricks || {};
  }

  private getTimeByType(type: number, today_time: number) {
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
    return today_time - need_day_ago * 86400;
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
    submit_time.push(getDayNow());
    temp_data.submit_time = submit_time;
    if (!temp_data.type) {
      temp_data.type = BricksType.TYPE_2;
    }
    await this.setInfoByQid(qid, temp_data);
  }
  public async setTypeByQid(qid: string, type) {
    let temp_data = await this.getInfoByQid(qid);
    temp_data.type = type;
    await this.setInfoByQid(qid, temp_data);
  }
}

export const bricksDao: BricksDao = new BricksDao();
