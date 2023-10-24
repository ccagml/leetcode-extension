/*
 * Filename: https://github.com/ccagml/leetcode-extension/src/service/TreeDataService.ts
 * Path: https://github.com/ccagml/leetcode-extension
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

// import * as os from "os";
import * as path from "path";
import * as vscode from "vscode";
import {
  Category,
  ProblemState,
  SearchSetType,
  ISubmitEvent,
  OutPutType,
  Endpoint,
  IQuickItemEx,
} from "../model/ConstDefind";
import { treeViewController } from "../controller/TreeViewController";
import { TreeNodeModel, TreeNodeType } from "../model/TreeNodeModel";
import { choiceDao } from "../dao/choiceDao";
import { tagsDao } from "../dao/tagsDao";
import { ShowMessage, promptForSignIn } from "../utils/OutputUtils";
import { BABA, BABAMediator, BABAProxy, BabaStr, BaseCC } from "../BABA";
import { getLeetCodeEndpoint, isUseEndpointTranslation, setDefaultLanguage } from "../utils/ConfigUtils";
import { getNodeIdFromFile } from "../utils/SystemUtils";

export class TreeDataService implements vscode.TreeDataProvider<TreeNodeModel> {
  private context: vscode.ExtensionContext;
  private onDidChangeTreeDataEvent: vscode.EventEmitter<TreeNodeModel | undefined | null> = new vscode.EventEmitter<
    TreeNodeModel | undefined | null
  >();
  // tslint:disable-next-line:member-ordering
  public readonly onDidChangeTreeData: vscode.Event<any> = this.onDidChangeTreeDataEvent.event;

  public initialize(context: vscode.ExtensionContext): void {
    this.context = context;
  }

  public async checkSubmit(e: ISubmitEvent) {
    await treeViewController.checkSubmit(e);
  }

  public cleanUserScore() {
    treeViewController.clearUserScore();
  }

  public fire() {
    this.onDidChangeTreeDataEvent.fire(null);
  }

  public async refresh(): Promise<void> {
    await treeViewController.refreshCache();
    await treeViewController.refreshCheck();
  }

  public getTreeItem(element: TreeNodeModel): vscode.TreeItem | Thenable<vscode.TreeItem> {
    if (element.id === "notSignIn") {
      return {
        label: element.name,
        collapsibleState: vscode.TreeItemCollapsibleState.None,
        command: {
          command: "lcpr.signin",
          title: "未登录",
        },
      };
    }

    let contextValue: string;
    if (element.isProblem) {
      contextValue = element.isFavorite ? "problem-favorite" : "problem";
    } else {
      contextValue = element.id.toLowerCase();
    }

    const result: vscode.TreeItem | Thenable<vscode.TreeItem> = {
      label: element.isProblem
        ? (element.score > "0" ? "[score:" + element.score + "]" : "") + `ID:${element.id}.${element.name} `
        : element.name,
      tooltip: this.getSubCategoryTooltip(element),
      collapsibleState: element.isProblem
        ? vscode.TreeItemCollapsibleState.None
        : vscode.TreeItemCollapsibleState.Collapsed,
      iconPath: this.parseIconPathFromProblemState(element),
      command: element.isProblem ? element.previewCommand : undefined,
      resourceUri: element.uri,
      contextValue,
    };
    return result;
  }

  public getChildren(element?: TreeNodeModel | undefined): vscode.ProviderResult<TreeNodeModel[]> {
    if (!BABA.getProxy(BabaStr.StatusBarProxy).getUser()) {
      return [
        new TreeNodeModel(
          {
            id: "notSignIn",
            name: "未登录",
          },
          TreeNodeType.TreeDataNormal
        ),
      ];
    }
    if (!element) {
      // Root view
      return treeViewController.getRootNodes();
    } else {
      if (element.nodeType == TreeNodeType.TreeDataDay) {
        return treeViewController.getDayNodes(element);
      } else if (element.isSearchResult) {
        switch (element.id) {
          case SearchSetType.ScoreRange:
            return treeViewController.getScoreRangeNodes(element.input);
            break;
          case SearchSetType.Context:
            return treeViewController.getContextNodes(element.input);
            break;
          case SearchSetType.Day:
            return treeViewController.getDayNodes(element);
            break;
          default:
            break;
        }
        return [];
      } else {
        switch (
          element.id // First-level
        ) {
          case Category.All:
            return treeViewController.getAllNodes();
          case Category.Favorite:
            return treeViewController.getFavoriteNodes();
          case Category.Difficulty:
            return treeViewController.getAllDifficultyNodes();
          case Category.Tag:
            return treeViewController.getAllTagNodes();
          case Category.Company:
            return treeViewController.getAllCompanyNodes();
          case Category.Score:
            return treeViewController.getAllScoreNodes();
          case Category.Choice:
            return treeViewController.getAllChoiceNodes();
          case Category.Contest:
            return treeViewController.getAllContestNodes();
          default:
            if (element.isProblem) {
              return [];
            }
            return treeViewController.getChildrenNodesById(element.id);
        }
      }
    }
  }

  public getChoiceData() {
    return choiceDao.getChoiceData();
  }
  public getTagsData(fid: string): Array<string> {
    return tagsDao.getTagsData(fid) || ["Unknown"];
  }

  public getTagsDataEn(fid: string): Array<string> {
    return tagsDao.getTagsDataEn(fid) || ["Unknown"];
  }

  private parseIconPathFromProblemState(element: TreeNodeModel): string {
    if (!element.isProblem) {
      return "";
    }
    switch (element.state) {
      case ProblemState.AC:
        return this.context.asAbsolutePath(path.join("resources", "check.png"));
      case ProblemState.NotAC:
        return this.context.asAbsolutePath(path.join("resources", "x.png"));
      case ProblemState.Unknown:
        if (element.locked) {
          return this.context.asAbsolutePath(path.join("resources", "lock.png"));
        }
        return this.context.asAbsolutePath(path.join("resources", "blank.png"));
      default:
        return "";
    }
  }

  private getSubCategoryTooltip(element: TreeNodeModel): string {
    // return '' unless it is a sub-category node
    if (element.isProblem || element.id === "ROOT" || element.id in Category) {
      return "";
    }
    return "";
  }
  public async switchEndpoint(): Promise<void> {
    const isCnEnabled: boolean = getLeetCodeEndpoint() === Endpoint.LeetCodeCN;
    const picks: Array<IQuickItemEx<string>> = [];
    picks.push(
      {
        label: `${isCnEnabled ? "" : "$(check) "}LeetCode`,
        description: "leetcode.com",
        detail: `Enable LeetCode.com US`,
        value: Endpoint.LeetCode,
      },
      {
        label: `${isCnEnabled ? "$(check) " : ""}力扣`,
        description: "leetcode.cn",
        detail: `启用中国版 LeetCode.cn`,
        value: Endpoint.LeetCodeCN,
      }
    );
    const choice: IQuickItemEx<string> | undefined = await vscode.window.showQuickPick(picks);
    if (!choice || choice.value === getLeetCodeEndpoint()) {
      return;
    }
    const leetCodeConfig: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration("leetcode-problem-rating");
    try {
      const endpoint: string = choice.value;
      await BABA.getProxy(BabaStr.ChildCallProxy).get_instance().switchEndpoint(endpoint);
      await leetCodeConfig.update("endpoint", endpoint, true /* UserSetting */);
      vscode.window.showInformationMessage(`Switched the endpoint to ${endpoint}`);
    } catch (error) {
      await ShowMessage("切换站点出错. 请查看控制台信息~", OutPutType.error);
    }

    try {
      await vscode.commands.executeCommand("lcpr.signout");
      await BABA.getProxy(BabaStr.ChildCallProxy).get_instance().deleteCache();
      await promptForSignIn();
    } catch (error) {
      await ShowMessage("登录失败. 请查看控制台信息~", OutPutType.error);
    }
  }
  public async previewProblem(input: TreeNodeModel | vscode.Uri, isSideMode: boolean = false): Promise<void> {
    let node: TreeNodeModel;
    if (input instanceof vscode.Uri) {
      const activeFilePath: string = input.fsPath;
      const id: string = await getNodeIdFromFile(activeFilePath);
      if (!id) {
        ShowMessage(`Failed to resolve the problem id from file: ${activeFilePath}.`, OutPutType.error);
        return;
      }
      const cachedNode: TreeNodeModel | undefined = BABA.getProxy(BabaStr.QuestionDataProxy).getNodeById(id);
      if (!cachedNode) {
        ShowMessage(`Failed to resolve the problem with id: ${id}.`, OutPutType.error);
        return;
      }
      node = cachedNode;
      // Move the preview page aside if it's triggered from Code Lens
      isSideMode = true;
    } else {
      node = input;
    }
    const needTranslation: boolean = isUseEndpointTranslation();
    const descString: string = await BABA.getProxy(BabaStr.ChildCallProxy)
      .get_instance()
      .getDescription(node.qid, needTranslation);

    let successResult;
    try {
      successResult = JSON.parse(descString);
    } catch (e) {
      successResult = {};
    }
    if (successResult.code == 100) {
      BABA.sendNotification(BabaStr.Preview_show, {
        descString: JSON.stringify(successResult.msg),
        node: node,
        isSideMode: isSideMode,
      });
    } else {
      await ShowMessage(`${descString} 请查看控制台信息~`, OutPutType.error);
    }
  }

  public async signIn(): Promise<void> {
    const picks: Array<IQuickItemEx<string>> = [];
    let qpOpiton: vscode.QuickPickOptions = {
      title: "正在登录leetcode.com",
      matchOnDescription: false,
      matchOnDetail: false,
      placeHolder: "请选择登录方式 正在登录leetcode.com",
    };
    if (getLeetCodeEndpoint() == Endpoint.LeetCodeCN) {
      picks.push({
        label: "LeetCode Account",
        detail: "只能登录leetcode.cn",
        value: "LeetCode",
      });
      qpOpiton.title = "正在登录中文版leetcode.cn";
      qpOpiton.placeHolder = "请选择登录方式 正在登录中文版leetcode.cn";
    }
    picks.push(
      {
        label: "Third-Party: GitHub",
        detail: "Use GitHub account to login",
        value: "GitHub",
      },
      {
        label: "Third-Party: LinkedIn",
        detail: "Use LinkedIn account to login",
        value: "LinkedIn",
      },
      {
        label: "LeetCode Cookie",
        detail: "Use LeetCode cookie copied from browser to login",
        value: "Cookie",
      }
    );
    const choice: IQuickItemEx<string> | undefined = await vscode.window.showQuickPick(picks, qpOpiton);
    if (!choice) {
      return;
    }
    let loginMethod = choice.value;

    const isByCookie: boolean = loginMethod === "Cookie";
    const inMessage: string = isByCookie ? " 通过cookie登录" : "登录";
    try {
      const userName: string | undefined = await BABA.getProxy(BabaStr.ChildCallProxy)
        .get_instance()
        .trySignIn(loginMethod);
      if (userName) {
        BABA.sendNotification(BabaStr.USER_LOGIN_SUC, { userName: userName });
        vscode.window.showInformationMessage(`${inMessage} 成功`);
      }
    } catch (error) {
      ShowMessage(`${inMessage}失败. 请看看控制台输出信息`, OutPutType.error);
    }
  }

  // 登出
  /**
   * It signs out the user
   */
  public async signOut(): Promise<void> {
    try {
      await BABA.getProxy(BabaStr.ChildCallProxy).get_instance().signOut();
      vscode.window.showInformationMessage("成功登出");

      BABA.sendNotification(BabaStr.USER_LOGIN_OUT, {});
    } catch (error) {
      // ShowMessage(`Failed to signOut. Please open the output channel for details`, OutPutType.error);
    }
  }

  // 删除所有缓存
  /**
   * It signs out, removes old cache, switches to the default endpoint, and refreshes the tree data
   */
  public async deleteAllCache(): Promise<void> {
    await this.signOut();
    await BABA.getProxy(BabaStr.ChildCallProxy).get_instance().removeOldCache();
    await BABA.getProxy(BabaStr.ChildCallProxy).get_instance().switchEndpoint(getLeetCodeEndpoint());
    BABA.sendNotification(BabaStr.BABACMD_refresh);
    BABA.sendNotification(BabaStr.BricksData_refresh);
  }
}

export const treeDataService: TreeDataService = new TreeDataService();

export class TreeDataProxy extends BABAProxy {
  static NAME = BabaStr.TreeDataProxy;
  constructor() {
    super(TreeDataProxy.NAME);
  }

  public getTagsDataEn(fid: string): Array<string> {
    return treeDataService.getTagsDataEn(fid) || ["Unknown"];
  }
  public getChoiceData() {
    return treeDataService.getChoiceData();
  }

  public getTagsData(fid: string): Array<string> {
    return treeDataService.getTagsData(fid);
  }
}

export class TreeDataMediator extends BABAMediator {
  static NAME = BabaStr.TreeDataMediator;
  constructor() {
    super(TreeDataMediator.NAME);
  }

  listNotificationInterests(): string[] {
    return [
      BabaStr.VSCODE_DISPOST,
      BabaStr.BABACMD_refresh,
      BabaStr.InitFile,
      BabaStr.TreeData_cleanUserScore,
      BabaStr.CommitResult_showFinish,
      BabaStr.TreeData_switchEndpoint,
      BabaStr.BABACMD_previewProblem,
      BabaStr.BABACMD_showProblem,
      BabaStr.BABACMD_pickOne,
      BabaStr.BABACMD_searchScoreRange,
      BabaStr.BABACMD_searchProblem,
      BabaStr.BABACMD_getHelp,
      BabaStr.BABACMD_testSolution,
      BabaStr.BABACMD_reTestSolution,
      BabaStr.BABACMD_testCaseDef,
      BabaStr.BABACMD_tesCaseArea,
      BabaStr.BABACMD_submitSolution,
      BabaStr.BABACMD_setDefaultLanguage,
      BabaStr.BABACMD_addFavorite,
      BabaStr.BABACMD_removeFavorite,
      BabaStr.BABACMD_problems_sort,
      BabaStr.TreeData_rebuildTreeData,
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
      BabaStr.StartReadData,
      BabaStr.BABACMD_Login,
      BabaStr.BABACMD_LoginOut,
      BabaStr.BABACMD_deleteAllCache,
      BabaStr.QuestionData_submitNewAccept,
    ];
  }
  async handleNotification(_notification: BaseCC.BaseCC.INotification) {
    let body = _notification.getBody();
    switch (_notification.getName()) {
      case BabaStr.VSCODE_DISPOST:
        treeViewController.dispose();
        break;
      case BabaStr.StartReadData:
        break;
      case BabaStr.BABACMD_refresh:
      case BabaStr.ConfigChange_hideScore:
      case BabaStr.QuestionData_submitNewAccept:
        await treeDataService.refresh();
        break;
      case BabaStr.InitFile:
        treeDataService.initialize(body);
        break;
      case BabaStr.TreeData_cleanUserScore:
        treeDataService.cleanUserScore();
        break;

      case BabaStr.CommitResult_showFinish:
        treeDataService.checkSubmit(body);
        break;
      case BabaStr.TreeData_switchEndpoint:
        treeDataService.switchEndpoint();
      case BabaStr.BABACMD_previewProblem:
        treeDataService.previewProblem(body.input, body.isSideMode);
        break;
      case BabaStr.BABACMD_showProblem:
        treeViewController.showProblem(body);
        break;
      case BabaStr.BABACMD_pickOne:
        treeViewController.pickOne();
        break;
      case BabaStr.BABACMD_searchScoreRange:
        treeViewController.searchScoreRange();
        break;
      case BabaStr.BABACMD_searchProblem:
        treeViewController.searchProblem();
        break;
      case BabaStr.BABACMD_getHelp:
        treeViewController.getHelp(body);
        break;
      case BabaStr.BABACMD_testSolution:
        treeViewController.testSolution(body.uri);
        break;
      case BabaStr.BABACMD_reTestSolution:
        treeViewController.reTestSolution(body.uri);
        break;
      case BabaStr.BABACMD_testCaseDef:
        treeViewController.testCaseDef(body.uri, body.allCase);
        break;
      case BabaStr.BABACMD_tesCaseArea:
        treeViewController.tesCaseArea(body.uri, body.testCase);
        break;
      case BabaStr.BABACMD_submitSolution:
        treeViewController.submitSolution(body.uri);
        break;
      case BabaStr.BABACMD_setDefaultLanguage:
        setDefaultLanguage();
        break;
      case BabaStr.BABACMD_addFavorite:
        treeViewController.addFavorite(body.node);
        break;
      case BabaStr.BABACMD_removeFavorite:
        treeViewController.removeFavorite(body.node);
        break;
      case BabaStr.BABACMD_problems_sort:
        treeViewController.switchSortingStrategy();
        break;
      case BabaStr.USER_statusChanged:
      case BabaStr.statusBar_update_statusFinish:
        treeDataService.cleanUserScore();
        treeDataService.fire();
        treeDataService.refresh();
        break;
      case BabaStr.TreeData_searchUserContestFinish:
      case BabaStr.TreeData_favoriteChange:
        treeDataService.refresh();
        break;
      case BabaStr.QuestionData_ReBuildQuestionDataFinish:
      case BabaStr.TreeData_searchTodayFinish:
      case BabaStr.TreeData_rebuildTreeData:
      case BabaStr.TreeData_searchScoreRangeFinish:
      case BabaStr.TreeData_searchContest:
      case BabaStr.ConfigChange_SortStrategy:
        treeDataService.fire();
        break;
      case BabaStr.BABACMD_Login:
        treeDataService.signIn();
        break;
      case BabaStr.BABACMD_LoginOut:
        treeDataService.signOut();
        break;
      case BabaStr.BABACMD_deleteAllCache:
        treeDataService.deleteAllCache();
        break;

      default:
        break;
    }
  }
}
