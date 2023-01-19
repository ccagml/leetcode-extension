/*
 * https://github.com/ccagml/leetcode-vscode/src/service/BricksDataService.ts
 * Path: https://github.com/ccagml/leetcode-vscode
 * Created Date: Tuesday, November 22nd 2022, 10:42:49 am
 * Author: ccagml
 *
 * Copyright (c) 2022  ccagml . All rights reserved.
 */

import { TreeDataProvider, EventEmitter, Event, TreeItem, TreeItemCollapsibleState } from "vscode";
import { BricksNormalId, defaultProblem, ISubmitEvent } from "../model/Model";
import { bricksViewController } from "../controller/BricksViewController";
import { BricksNode } from "../model/NodeModel";
import { statusBarService } from "./StatusBarService";
import { bricksDao } from "../dao/bricksDao";
import { groupDao } from "../dao/groupDao";

export class BricksDataService implements TreeDataProvider<BricksNode> {
  private onDidChangeTreeDataEvent: EventEmitter<BricksNode | undefined | null> = new EventEmitter<
    BricksNode | undefined | null
  >();
  // tslint:disable-next-line:member-ordering
  public readonly onDidChangeTreeData: Event<any> = this.onDidChangeTreeDataEvent.event;

  public async refresh(): Promise<void> {
    this.onDidChangeTreeDataEvent.fire(null);
  }

  public async initialize() {
    await bricksDao.init();
    await groupDao.init();
  }

  // 节点的内容
  public getTreeItem(element: BricksNode): TreeItem | Thenable<TreeItem> {
    if (element.id === "notSignIn") {
      return {
        label: element.name,
        collapsibleState: element.collapsibleState, // 没有子节点
        command: {
          command: "lcpr.signin",
          title: "工头说你不是我们工地的人",
        },
      };
    }
    let contextValue: string;
    if (element.isProblem) {
      contextValue = element.groupTime ? "nodebricksdiy" : "nodebricks";
    } else {
      contextValue = element.id.toLowerCase();
    }

    const result: TreeItem | Thenable<TreeItem> = {
      label: element.isProblem
        ? (element.score > "0" ? "[score:" + element.score + "]" : "") + `ID:${element.id}.${element.name} `
        : element.name,
      tooltip: this.getSubCategoryTooltip(element),
      collapsibleState: element.collapsibleState || TreeItemCollapsibleState.None,
      iconPath: this.parseIconPathFromProblemState(element),
      command: element.isProblem ? element.previewCommand : undefined,
      resourceUri: element.uri,
      contextValue,
    };
    return result;
  }

  // 获取子节点信息
  public async getChildren(element?: BricksNode | undefined): Promise<BricksNode[] | null | undefined> {
    if (!statusBarService.getUser()) {
      return [
        new BricksNode(
          Object.assign({}, defaultProblem, {
            id: "notSignIn",
            name: "工头说你不是我们工地的人",
          }),
          false,
          0,
          TreeItemCollapsibleState.None
        ),
      ];
    }
    if (!element) {
      return await bricksViewController.getRootNodes();
    } else {
      switch (element.id) {
        case BricksNormalId.Today:
          return await bricksViewController.getTodayNodes();
          break;
        case BricksNormalId.Have:
          return await bricksViewController.getHaveNodes();
          break;
        case BricksNormalId.DIY:
          return await bricksViewController.getDiyNode(element);
          break;
        default:
          return [];
          break;
      }
    }
  }

  public async checkSubmit(e: ISubmitEvent) {
    if (e.sub_type == "submit" && e.accepted) {
      let qid: string = e.qid.toString();
      bricksDao.addSubmitTimeByQid(qid);
      await bricksDataService.refresh();
    }
  }

  public async setBricksType(node: BricksNode, type) {
    let qid: string = node.qid.toString();
    bricksDao.setTypeByQid(qid, type);
    await bricksDataService.refresh();
  }

  private parseIconPathFromProblemState(element: BricksNode): string {
    switch (element.state) {
      default:
        return "";
    }
  }

  private getSubCategoryTooltip(element: BricksNode): string {
    // return '' unless it is a sub-category node
    if (element.id === "ROOT") {
      return "";
    }
    if (element.toolTip) {
      return element.toolTip;
    }
    return "";
  }

  // 创建一个新的分类
  public async newBrickGroup(name) {
    await groupDao.newBrickGroup(name);
  }
  // 删除一个分类
  public async removeBrickGroup(time) {
    await groupDao.removeBrickGroupByTime(time);
  }

  public async getAllGroup() {
    return await groupDao.getAllGroup();
  }
}

export const bricksDataService: BricksDataService = new BricksDataService();
