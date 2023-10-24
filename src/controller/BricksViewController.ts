/*
 * https://github.com/ccagml/leetcode-extension/src/controller/BricksViewController.ts
 * Path: https://github.com/ccagml/leetcode-extension
 * Created Date: Tuesday, November 22nd 2022, 11:04:59 am
 * Author: ccagml
 *
 * Copyright (c) 2022  ccagml . All rights reserved.
 */

import { Disposable, TreeItemCollapsibleState, window } from "vscode";
import { BABA, BabaStr } from "../BABA";

import { bricksDao } from "../dao/bricksDao";
import { groupDao } from "../dao/groupDao";
import { BricksNormalId, IQuickItemEx } from "../model/ConstDefind";
import { TreeNodeModel, TreeNodeType } from "../model/TreeNodeModel";

// 视图控制器
class BricksViewController implements Disposable {
  // 需要的
  public async getHaveNodes() {
    let all_qid: string[] = await bricksDao.getTodayBricks();
    const baseNode: TreeNodeModel[] = [];
    all_qid.forEach((qid) => {
      let node = BABA.getProxy(BabaStr.QuestionDataProxy).getNodeByQid(qid);
      if (node) {
        baseNode.push(node);
      }
    });
    return baseNode;
  }
  // 今天搬的
  public async getTodayNodes() {
    // 增加tooltip
    let all_qid: string[] = await bricksDao.getTodayBricksSubmit();
    let qid_tip = await bricksDao.getTodayBricksSubmitToolTip(all_qid);
    const baseNode: TreeNodeModel[] = [];
    all_qid.forEach((qid) => {
      let node = BABA.getProxy(BabaStr.QuestionDataProxy).getNodeByQid(qid);
      if (node) {
        let new_obj = new TreeNodeModel(
          Object.assign({}, node.get_data(), {
            collapsibleState: TreeItemCollapsibleState.None,
            groupTime: 0,
            toolTip: qid_tip.get(qid),
          }),
          TreeNodeType.BricksDataLeaf
        );
        baseNode.push(new_obj);
      }
    });
    return baseNode;
  }

  public async getDiyNode(element: TreeNodeModel) {
    let time = element.groupTime;
    if (time == undefined) {
      return [];
    }
    let all_qid: string[] = await groupDao.getQidByTime(time);
    const baseNode: TreeNodeModel[] = [];
    all_qid.forEach((qid) => {
      let node = BABA.getProxy(BabaStr.QuestionDataProxy).getNodeByQid(qid);
      if (node) {
        let new_obj = new TreeNodeModel(
          Object.assign({}, node.get_data(), {
            collapsibleState: TreeItemCollapsibleState.None,
            groupTime: time,
          }),
          TreeNodeType.BricksDataLeaf
        );
        baseNode.push(new_obj);
      }
    });
    return baseNode;
  }

  public async getRootNodes(): Promise<TreeNodeModel[]> {
    let all_qid: string[] = await bricksDao.getTodayBricks();
    let all_submit_qid: string[] = await bricksDao.getTodayBricksSubmit();

    let has_qid = all_qid.length > 0;
    let has_submit = all_submit_qid.length > 0;
    const baseNode: TreeNodeModel[] = [];
    // 监工
    baseNode.push(
      new TreeNodeModel(
        {
          id: has_qid ? BricksNormalId.Have : BricksNormalId.No,
          name: has_qid ? BricksNormalId.HaveDesc : BricksNormalId.NoDesc,
          collapsibleState: has_qid ? TreeItemCollapsibleState.Collapsed : TreeItemCollapsibleState.None,
        },
        TreeNodeType.BricksDataNormal
      )
    );

    // 今日提交
    if (has_submit) {
      let temp_score = 0;
      all_submit_qid.forEach((qid) => {
        let node = BABA.getProxy(BabaStr.QuestionDataProxy).getNodeByQid(qid);
        if (node && node.score && Number(node.score) > 0) {
          temp_score += Number(node.score);
        }
      });

      baseNode.push(
        new TreeNodeModel(
          {
            id: BricksNormalId.Today,
            name:
              `今天搬了${all_submit_qid.length}块砖,赚了${temp_score}分` +
              (all_submit_qid.length > 3 ? ",又是上分的一天~" : ",别吹牛了,赶紧干活啊!!!"),
            collapsibleState: TreeItemCollapsibleState.Collapsed,
          },
          TreeNodeType.BricksDataNormal
        )
      );
    }
    // 分类
    let all_group = await groupDao.getAllGroup();
    all_group.forEach((element) => {
      baseNode.push(
        new TreeNodeModel(
          {
            id: BricksNormalId.DIY,
            name: element.name,
            collapsibleState: TreeItemCollapsibleState.Collapsed,
            groupTime: element.time,
          },

          TreeNodeType.BricksDataNormal
        )
      );
    });

    return baseNode;
  }

  public async setBricksType(node: TreeNodeModel, type) {
    await BABA.getProxy(BabaStr.BricksDataProxy).setBricksType(node, type);
  }
  public dispose(): void {}

  public async newBrickGroup() {
    let name = await window.showInputBox({
      title: "创建新的分类",
      validateInput: (s: string): string | undefined => (s && s.trim() ? undefined : "分类名称不能为空"),
      placeHolder: "输入新分类名称",
      ignoreFocusOut: true,
    });
    if (name && name.trim()) {
      BABA.getProxy(BabaStr.BricksDataProxy).newBrickGroup(name);
      BABA.sendNotification(BabaStr.BricksData_newBrickGroupFinish);
    }
  }

  public async removeBrickGroup(node) {
    let time = node.groupTime;
    BABA.getProxy(BabaStr.BricksDataProxy).removeBrickGroup(time);
    BABA.sendNotification(BabaStr.BricksData_removeBrickGroupFinish);
  }

  public async addQidToGroup(node: TreeNodeModel) {
    const picks: Array<IQuickItemEx<string>> = [];

    let all_group = await BABA.getProxy(BabaStr.BricksDataProxy).getAllGroup();
    all_group.forEach((element) => {
      picks.push({
        label: element.name,
        detail: "",
        value: element.time,
      });
    });

    const choice: Array<IQuickItemEx<string>> | undefined = await window.showQuickPick(picks, {
      title: "正在添加题目到分类中",
      matchOnDescription: false,
      matchOnDetail: false,
      placeHolder: "选择要添加的分类",
      canPickMany: true,
    });
    if (!choice) {
      return;
    }
    let time_list: Array<any> = [];
    choice.forEach((element) => {
      time_list.push(element.value);
    });
    groupDao.addQidToTimeList(node.qid, time_list);
    BABA.sendNotification(BabaStr.BricksData_addQidToGroupFinish);
  }

  public async removeQidFromGroup(node) {
    groupDao.removeQidFromTime(node.qid, node.groupTime);
    BABA.sendNotification(BabaStr.BricksData_removeQidFromGroupFinish);
  }
}

export const bricksViewController: BricksViewController = new BricksViewController();
