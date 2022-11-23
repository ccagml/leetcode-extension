/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/controller/BricksViewController.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
 * Created Date: Tuesday, November 22nd 2022, 11:04:59 am
 * Author: ccagml
 *
 * Copyright (c) 2022  ccagml . All rights reserved.
 */

import { Disposable, TreeItemCollapsibleState } from "vscode";

import { bricksDao } from "../dao/bricksDao";
import { BricksNormalId, defaultProblem } from "../model/Model";
import { BricksNode } from "../model/NodeModel";
import { bricksDataService } from "../service/BricksDataService";
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
    const baseNode: BricksNode[] = [];
    return baseNode;
  }

  public async getRootNodes(): Promise<BricksNode[]> {
    let all_qid: string[] = await bricksDao.getTodayBricks();
    let has_qid = all_qid.length > 0;
    const baseNode: BricksNode[] = [];

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

    // baseNode.push(
    //   new BricksNode(
    //     Object.assign({}, defaultProblem, {
    //       id: BricksNormalId.Today,
    //       name: BricksNormalId.TodayDesc,
    //     }),
    //     false,
    //     0,
    //     TreeItemCollapsibleState.Collapsed
    //   )
    // );

    return baseNode;
  }
  public dispose(): void {}
}

export const bricksViewController: BricksViewController = new BricksViewController();
