/*
 * https://github.com/ccagml/leetcode-extension/src/service/BricksDataService.ts
 * Path: https://github.com/ccagml/leetcode-extension
 * Created Date: Tuesday, November 22nd 2022, 10:42:49 am
 * Author: ccagml
 *
 * Copyright (c) 2022  ccagml . All rights reserved.
 */

import { TreeDataProvider, EventEmitter, Event, TreeItem, TreeItemCollapsibleState } from "vscode";
import { BricksNormalId, ISubmitEvent } from "../model/ConstDefind";
import { bricksViewController } from "../controller/BricksViewController";
import { TreeNodeModel, TreeNodeType } from "../model/TreeNodeModel";
import { bricksDao } from "../dao/bricksDao";
import { groupDao } from "../dao/groupDao";
import { BABA, BABAMediator, BABAProxy, BabaStr, BaseCC } from "../BABA";

export class BricksDataService implements TreeDataProvider<TreeNodeModel> {
  private onDidChangeTreeDataEvent: EventEmitter<TreeNodeModel | undefined | null> = new EventEmitter<
    TreeNodeModel | undefined | null
  >();
  // tslint:disable-next-line:member-ordering
  public readonly onDidChangeTreeData: Event<any> = this.onDidChangeTreeDataEvent.event;

  public fire() {
    this.onDidChangeTreeDataEvent.fire(null);
  }

  public async initialize() {
    await bricksDao.init();
    await groupDao.init();
  }

  // 节点的内容
  public getTreeItem(element: TreeNodeModel): TreeItem | Thenable<TreeItem> {
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
  public async getChildren(element?: TreeNodeModel | undefined): Promise<TreeNodeModel[] | null | undefined> {
    let sbp = BABA.getProxy(BabaStr.StatusBarProxy);
    if (!sbp.getUser()) {
      return [
        new TreeNodeModel(
          {
            id: "notSignIn",
            name: "工头说你不是我们工地的人",
            collapsibleState: TreeItemCollapsibleState.None,
          },
          TreeNodeType.BricksDataNormal
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
      await bricksDao.addSubmitTimeByQid(qid);
      BABA.sendNotification(BabaStr.BricksData_submitAndAccepted);
    }
  }

  public async setBricksType(node: TreeNodeModel, type) {
    let qid: string = node.qid.toString();
    bricksDao.setTypeByQid(qid, type);
    BABA.sendNotification(BabaStr.BricksData_setBricksTypeFinish);
  }

  private parseIconPathFromProblemState(element: TreeNodeModel): string {
    switch (element.state) {
      default:
        return "";
    }
  }

  private getSubCategoryTooltip(element: TreeNodeModel): string {
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

export class BricksDataProxy extends BABAProxy {
  static NAME = BabaStr.BricksDataProxy;
  constructor() {
    super(BricksDataProxy.NAME);
  }

  public async setBricksType(node: TreeNodeModel, type) {
    bricksDataService.setBricksType(node, type);
  }

  // 创建一个新的分类
  public async newBrickGroup(name) {
    await bricksDataService.newBrickGroup(name);
  }
  // 删除一个分类
  public async removeBrickGroup(time) {
    await bricksDataService.removeBrickGroup(time);
  }

  public async getAllGroup() {
    return await bricksDataService.getAllGroup();
  }
}

export class BricksDataMediator extends BABAMediator {
  static NAME = BabaStr.BricksDataMediator;
  constructor() {
    super(BricksDataMediator.NAME);
  }

  listNotificationInterests(): string[] {
    return [
      BabaStr.VSCODE_DISPOST,
      BabaStr.BricksData_refresh,
      BabaStr.InitFile,
      BabaStr.QuestionData_ReBuildQuestionDataFinish,
      BabaStr.TreeData_searchTodayFinish,
      BabaStr.TreeData_searchUserContestFinish,
      BabaStr.TreeData_searchScoreRangeFinish,
      BabaStr.TreeData_searchContest,
      BabaStr.ConfigChange_hideScore,
      BabaStr.ConfigChange_SortStrategy,
      BabaStr.TreeData_favoriteChange,
      BabaStr.USER_statusChanged,
      BabaStr.statusBar_update_statusFinish,
      BabaStr.BABACMD_setBricksType,
      BabaStr.BABACMD_newBrickGroup,
      BabaStr.BABACMD_addQidToGroup,
      BabaStr.BABACMD_removeBrickGroup,
      BabaStr.BABACMD_removeQidFromGroup,
      BabaStr.BricksData_submitAndAccepted,
      BabaStr.BricksData_setBricksTypeFinish,
      BabaStr.BricksData_newBrickGroupFinish,
      BabaStr.BricksData_removeBrickGroupFinish,
      BabaStr.BricksData_addQidToGroupFinish,
      BabaStr.BricksData_removeQidFromGroupFinish,
      BabaStr.CommitResult_showFinish,
    ];
  }
  async handleNotification(_notification: BaseCC.BaseCC.INotification) {
    let body = _notification.getBody();
    switch (_notification.getName()) {
      case BabaStr.VSCODE_DISPOST:
        break;
      case BabaStr.InitFile:
        await bricksDataService.initialize();
        break;
      case BabaStr.BricksData_newBrickGroupFinish:
      case BabaStr.BricksData_removeBrickGroupFinish:
      case BabaStr.BricksData_addQidToGroupFinish:
      case BabaStr.BricksData_removeQidFromGroupFinish:
      case BabaStr.BricksData_setBricksTypeFinish:
      case BabaStr.BricksData_refresh:
      case BabaStr.BricksData_submitAndAccepted:
      case BabaStr.USER_statusChanged:
      case BabaStr.statusBar_update_statusFinish:
      case BabaStr.QuestionData_ReBuildQuestionDataFinish:
      case BabaStr.TreeData_searchTodayFinish:
      case BabaStr.TreeData_searchUserContestFinish:
      case BabaStr.TreeData_searchScoreRangeFinish:
      case BabaStr.TreeData_searchContest:
      case BabaStr.ConfigChange_hideScore:
      case BabaStr.ConfigChange_SortStrategy:
      case BabaStr.TreeData_favoriteChange:
        bricksDataService.fire();
        break;
      case BabaStr.CommitResult_showFinish:
        await bricksDataService.checkSubmit(_notification.getBody());

      case BabaStr.BABACMD_setBricksType:
        bricksViewController.setBricksType(body.node, body.type);
        break;
      case BabaStr.BABACMD_newBrickGroup:
        bricksViewController.newBrickGroup();
        break;
      case BabaStr.BABACMD_addQidToGroup:
        bricksViewController.addQidToGroup(body);
        break;
      case BabaStr.BABACMD_removeBrickGroup:
        bricksViewController.removeBrickGroup(body);
        break;
      case BabaStr.BABACMD_removeQidFromGroup:
        bricksViewController.removeQidFromGroup(body);
        break;
      default:
        break;
    }
  }
}
