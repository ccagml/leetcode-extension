/*
 * https://github.com/ccagml/leetcode-vscode/src/controller/BricksViewController.ts
 * Path: https://github.com/ccagml/leetcode-vscode
 * Created Date: Tuesday, November 22nd 2022, 11:04:59 am
 * Author: ccagml
 *
 * Copyright (c) 2022  ccagml . All rights reserved.
 */

import { Disposable, TreeItemCollapsibleState, window } from "vscode";

import { bricksDao } from "../dao/bricksDao";
import { groupDao } from "../dao/groupDao";
import { BricksNormalId, defaultProblem, IQuickItemEx } from "../model/Model";
import { BricksNode } from "../model/NodeModel";
import { bricksDataService } from "../service/BricksDataService";
import { eventService } from "../service/EventService";
import { treeViewController } from "./TreeViewController";

// 视图控制器
class BricksViewController implements Disposable {
  public async initialize() {
    await bricksDataService.initialize();
  }

  // 需要的
  public async getHaveNodes() {
    let all_qid: string[] = await bricksDao.getTodayBricks();
    const baseNode: BricksNode[] = [];
    all_qid.forEach((qid) => {
      let node = treeViewController.getNodeByQid(qid);
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
    const baseNode: BricksNode[] = [];
    all_qid.forEach((qid) => {
      let node = treeViewController.getNodeByQid(qid);
      if (node) {
        let new_obj = new BricksNode(
          Object.assign({}, node.data, {}),
          true,
          node.user_score,
          TreeItemCollapsibleState.None,
          0,
          qid_tip.get(qid)
        );
        baseNode.push(new_obj);
      }
    });
    return baseNode;
  }

  public async getDiyNode(element: BricksNode) {
    let time = element.groupTime;
    if (time == undefined) {
      return [];
    }
    let all_qid: string[] = await groupDao.getQidByTime(time);
    const baseNode: BricksNode[] = [];
    all_qid.forEach((qid) => {
      let node = treeViewController.getNodeByQid(qid);
      if (node) {
        let new_obj = new BricksNode(
          Object.assign({}, node.data, {}),
          true,
          node.user_score,
          TreeItemCollapsibleState.None,
          time
        );
        baseNode.push(new_obj);
      }
    });
    return baseNode;
  }

  public async getRootNodes(): Promise<BricksNode[]> {
    let all_qid: string[] = await bricksDao.getTodayBricks();
    let all_submit_qid: string[] = await bricksDao.getTodayBricksSubmit();

    let has_qid = all_qid.length > 0;
    let has_submit = all_submit_qid.length > 0;
    const baseNode: BricksNode[] = [];
    // 监工
    baseNode.push(
      new BricksNode(
        Object.assign({}, defaultProblem, {
          id: has_qid ? BricksNormalId.Have : BricksNormalId.No,
          name: has_qid ? BricksNormalId.HaveDesc : BricksNormalId.NoDesc,
        }),
        false,
        0,
        has_qid ? TreeItemCollapsibleState.Collapsed : TreeItemCollapsibleState.None
      )
    );

    // 今日提交
    if (has_submit) {
      let temp_score = 0;
      all_submit_qid.forEach((qid) => {
        let node = treeViewController.getNodeByQid(qid);
        if (node && node.score && Number(node.score) > 0) {
          temp_score += Number(node.score);
        }
      });

      baseNode.push(
        new BricksNode(
          Object.assign({}, defaultProblem, {
            id: BricksNormalId.Today,
            name:
              `今天搬了${all_submit_qid.length}块砖,赚了${temp_score}分` +
              (all_submit_qid.length > 3 ? ",又是上分的一天~" : ",别吹牛了,赶紧干活啊!!!"),
          }),
          false,
          0,
          TreeItemCollapsibleState.Collapsed
        )
      );
    }
    // 分类
    let all_group = await groupDao.getAllGroup();
    all_group.forEach((element) => {
      baseNode.push(
        new BricksNode(
          Object.assign({}, defaultProblem, {
            id: BricksNormalId.DIY,
            name: element.name,
          }),
          false,
          0,
          TreeItemCollapsibleState.Collapsed,
          element.time
        )
      );
    });

    return baseNode;
  }

  public async setBricksType(node: BricksNode, type) {
    await bricksDataService.setBricksType(node, type);
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
      bricksDataService.newBrickGroup(name);
      eventService.emit("groupUpdate");
    }
  }

  public async removeBrickGroup(node) {
    let time = node.groupTime;
    bricksDataService.removeBrickGroup(time);
    eventService.emit("groupUpdate");
  }

  public async addQidToGroup(node: BricksNode) {
    const picks: Array<IQuickItemEx<string>> = [];

    let all_group = await bricksDataService.getAllGroup();
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
    eventService.emit("groupUpdate");
  }

  public async removeQidFromGroup(node) {
    groupDao.removeQidFromTime(node.qid, node.groupTime);
    eventService.emit("groupUpdate");
  }
}

export const bricksViewController: BricksViewController = new BricksViewController();
