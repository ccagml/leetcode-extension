/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/service/BricksDataService.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
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
      contextValue = "bricks";
    } else {
      contextValue = element.id.toLowerCase();
    }

    const result: TreeItem | Thenable<TreeItem> = {
      label: element.isProblem
        ? (element.score > "0" ? "[score:" + element.score + "]" : "") + `ID:${element.id}.${element.name} `
        : element.name,
      tooltip: this.getSubCategoryTooltip(element),
      collapsibleState: element.collapsibleState || TreeItemCollapsibleState.None,
      // ? vscode.TreeItemCollapsibleState.None // 问题没有子节点
      // : vscode.TreeItemCollapsibleState.Collapsed, // 折叠
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
        default:
          return [];
          break;
      }
    }
  }

  public checkSubmit(e: ISubmitEvent) {
    if (e.sub_type == "submit" && e.accepted) {
      let qid: string = e.qid.toString();
      bricksDao.addSubmitTimeByQid(qid);
    }
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
    return "";
  }
}

export const bricksDataService: BricksDataService = new BricksDataService();
