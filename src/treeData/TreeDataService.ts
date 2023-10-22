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
  defaultProblem,
  IScoreData,
  ProblemState,
  SearchSetType,
  ISubmitEvent,
  OutPutType,
  Endpoint,
  IQuickItemEx,
  IProblem,
} from "../model/Model";
import { treeViewController } from "../controller/TreeViewController";
import { NodeModel } from "../model/NodeModel";
import { scoreDao } from "../dao/scoreDao";
import { choiceDao } from "../dao/choiceDao";
import { tagsDao } from "../dao/tagsDao";
import { ShowMessage, promptForSignIn } from "../utils/OutputUtils";
import { BABA, BABAMediator, BABAProxy, BabaStr, BaseCC } from "../BABA";
import { getLeetCodeEndpoint, isUseEndpointTranslation, setDefaultLanguage } from "../utils/ConfigUtils";
import { getNodeIdFromFile } from "../utils/SystemUtils";

export class TreeDataService implements vscode.TreeDataProvider<NodeModel> {
  private context: vscode.ExtensionContext;
  private onDidChangeTreeDataEvent: vscode.EventEmitter<NodeModel | undefined | null> = new vscode.EventEmitter<
    NodeModel | undefined | null
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

  public getTreeItem(element: NodeModel): vscode.TreeItem | Thenable<vscode.TreeItem> {
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

  public getChildren(element?: NodeModel | undefined): vscode.ProviderResult<NodeModel[]> {
    let sbp = BABA.getProxy(BabaStr.StatusBarProxy);
    if (!sbp.getUser()) {
      return [
        new NodeModel(
          Object.assign({}, defaultProblem, {
            id: "notSignIn",
            name: "未登录",
          }),
          false
        ),
      ];
    }
    if (!element) {
      // Root view
      return treeViewController.getRootNodes();
    } else {
      if (element.isSearchResult) {
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
            return treeViewController.getAllScoreNodes(element.user_score);
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

  // 返回题目id的数据
  public getScoreData(): Map<string, IScoreData> {
    return scoreDao.getScoreData();
  }
  // 在线获取题目数据
  public async getScoreDataOnline() {
    let stringData = await BABA.getProxy(BabaStr.ChildCallProxy).get_instance().getScoreDataOnline();
    let objData;
    try {
      objData = JSON.parse(stringData);
    } catch (error) {
      objData = {};
    }
    if (objData.code == 101) {
      ShowMessage("从 https://zerotrac.github.io/leetcode_problem_rating/data.json 获取数据出错", OutPutType.info);
      objData = {};
    } else if (objData.code == 102) {
      objData = {};
      // 请求超时 不处理
    }
    return scoreDao.getScoreData(objData.data);
  }

  private parseIconPathFromProblemState(element: NodeModel): string {
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

  private getSubCategoryTooltip(element: NodeModel): string {
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
  public async previewProblem(input: IProblem | vscode.Uri, isSideMode: boolean = false): Promise<void> {
    let node: IProblem;
    if (input instanceof vscode.Uri) {
      const activeFilePath: string = input.fsPath;
      const id: string = await getNodeIdFromFile(activeFilePath);
      if (!id) {
        ShowMessage(`Failed to resolve the problem id from file: ${activeFilePath}.`, OutPutType.error);
        return;
      }
      const cachedNode: IProblem | undefined = BABA.getProxy(BabaStr.QuestionDataProxy).getNodeById(id);
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
    BABA.sendNotification(BabaStr.TreeData_refresh);
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
  public getScoreData(): Map<string, IScoreData> {
    return treeDataService.getScoreData();
  }

  public async getScoreDataOnline() {
    return await treeDataService.getScoreDataOnline();
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
      BabaStr.TreeData_refresh,
      BabaStr.InitAll,
      BabaStr.TreeData_cleanUserScore,
      BabaStr.CommitResult_showFinish,
      BabaStr.TreeData_switchEndpoint,
      BabaStr.TreeData_previewProblem,
      BabaStr.TreeData_showProblem,
      BabaStr.TreeData_pickOne,
      BabaStr.TreeData_searchScoreRange,
      BabaStr.TreeData_searchProblem,
      BabaStr.TreeData_getHelp,
      BabaStr.TreeData_testSolution,
      BabaStr.TreeData_reTestSolution,
      BabaStr.TreeData_testCaseDef,
      BabaStr.TreeData_tesCaseArea,
      BabaStr.TreeData_submitSolution,
      BabaStr.TreeData_setDefaultLanguage,
      BabaStr.TreeData_addFavorite,
      BabaStr.TreeData_removeFavorite,
      BabaStr.TreeData_problems_sort,
      BabaStr.TreeData_rebuildTreeData,
      BabaStr.QuestionData_refreshCacheFinish,
      BabaStr.TreeData_searchTodayFinish,
      BabaStr.TreeData_searchUserContestFinish,
      BabaStr.TreeData_searchScoreRangeFinish,
      BabaStr.TreeData_searchContest,
      BabaStr.ConfigChange_hideScore,
      BabaStr.ConfigChange_SortStrategy,
      BabaStr.TreeData_favoriteChange,
      BabaStr.USER_statusChanged,
      BabaStr.statusBar_update_statusFinish,
      BabaStr.Extension_InitFinish,
      BabaStr.TreeData_Login,
      BabaStr.TreeData_LoginOut,
      BabaStr.TreeData_deleteAllCache,
      BabaStr.QuestionData_submitNewAccept,
    ];
  }
  async handleNotification(_notification: BaseCC.BaseCC.INotification) {
    let body = _notification.getBody();
    switch (_notification.getName()) {
      case BabaStr.VSCODE_DISPOST:
        treeViewController.dispose();
        break;
      case BabaStr.TreeData_refresh:
      case BabaStr.ConfigChange_hideScore:
      case BabaStr.Extension_InitFinish:
      case BabaStr.QuestionData_submitNewAccept:
        await treeDataService.refresh();
        break;
      case BabaStr.InitAll:
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
      case BabaStr.TreeData_previewProblem:
        treeDataService.previewProblem(body.input, body.isSideMode);
        break;
      case BabaStr.TreeData_showProblem:
        treeViewController.showProblem(body);
        break;
      case BabaStr.TreeData_pickOne:
        treeViewController.pickOne();
        break;
      case BabaStr.TreeData_searchScoreRange:
        treeViewController.searchScoreRange();
        break;
      case BabaStr.TreeData_searchProblem:
        treeViewController.searchProblem();
        break;
      case BabaStr.TreeData_getHelp:
        treeViewController.getHelp(body);
        break;
      case BabaStr.TreeData_testSolution:
        treeViewController.testSolution(body.uri);
        break;
      case BabaStr.TreeData_reTestSolution:
        treeViewController.reTestSolution(body.uri);
        break;
      case BabaStr.TreeData_testCaseDef:
        treeViewController.testCaseDef(body.uri, body.allCase);
        break;
      case BabaStr.TreeData_tesCaseArea:
        treeViewController.tesCaseArea(body.uri, body.testCase);
        break;
      case BabaStr.TreeData_submitSolution:
        treeViewController.submitSolution(body.uri);
        break;
      case BabaStr.TreeData_setDefaultLanguage:
        setDefaultLanguage();
        break;
      case BabaStr.TreeData_addFavorite:
        treeViewController.addFavorite(body.node);
        break;
      case BabaStr.TreeData_removeFavorite:
        treeViewController.removeFavorite(body.node);
        break;
      case BabaStr.TreeData_problems_sort:
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
      case BabaStr.QuestionData_refreshCacheFinish:
      case BabaStr.TreeData_searchTodayFinish:
      case BabaStr.TreeData_rebuildTreeData:
      case BabaStr.TreeData_searchScoreRangeFinish:
      case BabaStr.TreeData_searchContest:
      case BabaStr.ConfigChange_SortStrategy:
        treeDataService.fire();
        break;
      case BabaStr.TreeData_Login:
        treeDataService.signIn();
        break;
      case BabaStr.TreeData_LoginOut:
        treeDataService.signOut();
        break;
      case BabaStr.TreeData_deleteAllCache:
        treeDataService.deleteAllCache();
        break;

      default:
        break;
    }
  }
}
