// > workspace/ 工作目录
// >
// > > .lcpr_data/ 存数据
// > >
// > > > remake/ 备注
// > > >
// > > > > 题目内部编号.json 根据 qid 备注的信息
// > >

import { selectWorkspaceFolder } from "../utils/ConfigUtils";
import { useWsl, toWinPath } from "../utils/SystemUtils";
import * as path from "path";
import * as fse from "fs-extra";

class RemarkDao {
  version = 1;
  public async get_remark_dir_path() {
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

    let remark_dir: string = path.join(lcpr_data_path, "remark");
    await fse.ensureDir(remark_dir);

    remark_dir = useWsl() ? await toWinPath(remark_dir) : remark_dir;
    return remark_dir;
  }
  public async init() {
    let lcpr_data_path = await this.get_remark_dir_path();
    if (!lcpr_data_path) {
      return;
    }
  }

  private async getQidPath(qid: string) {
    let remark_dir = await this.get_remark_dir_path();
    if (!remark_dir) {
      return;
    }
    if (!qid) {
      return;
    }
    let qid_path: string = path.join(remark_dir, qid);
    qid_path = useWsl() ? await toWinPath(qid_path) : qid_path;
    return qid_path;
  }

  private async _write_data(qid: string, data: object) {
    let qid_data_path = await this.getQidPath(qid);
    if (!qid_data_path) {
      return;
    }
    return await fse.writeFile(qid_data_path, JSON.stringify(data));
  }

  private async _read_data(qid: string) {
    let qid_data_path = await this.getQidPath(qid);
    if (!qid_data_path) {
      return;
    }

    if (!(await fse.pathExists(qid_data_path))) {
      return {};
    }
    let temp_data = await fse.readFile(qid_data_path, "utf8");
    return JSON.parse(temp_data) || {};
  }

  public async getInfoByQid(qid: string) {
    let all_remark = await this._read_data(qid);
    return all_remark || {};
  }
  public async setInfoByQid(qid: string, info) {
    await this._write_data(qid, info);
  }
}

export const remarkDao: RemarkDao = new RemarkDao();
