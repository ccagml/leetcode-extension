/*
 * Filename: https://github.com/ccagml/leetcode-extension/src/utils/configUtils.ts
 * Path: https://github.com/ccagml/leetcode-extension
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import {
  workspace,
  WorkspaceConfiguration,
  commands,
  MessageItem,
  window,
  Uri,
  ConfigurationTarget,
  OpenDialogOptions,
  WorkspaceFolder,
  QuickPickItem,
} from "vscode";
import {
  DescriptionConfiguration,
  Endpoint,
  IProblem,
  SortingStrategy,
  AllProgramLanguage,
  DialogOptions,
  OpenOption,
  IQuickItemEx,
} from "../model/Model";

import { useWsl, toWslPath } from "../utils/SystemUtils";
import * as path from "path";
import * as fse from "fs-extra";
import * as os from "os";
import { BABA, BabaStr } from "../BABA";
import { NodeModel } from "../model/NodeModel";

// vscode的配置
export function getVsCodeConfig(): WorkspaceConfiguration {
  return workspace.getConfiguration("leetcode-problem-rating");
}

// 隐藏解决题目
export function isHideSolvedProblem(): boolean {
  return getVsCodeConfig().get<boolean>("hideSolved", false);
}

// 隐藏分数
export function isHideScoreProblem(problem: IProblem, user_score: number): boolean {
  const config_value: string = getVsCodeConfig().get<string>("hideScore", "None");
  const min_v = getPickOneByRankRangeMin();
  const max_v = getPickOneByRankRangeMax();
  const p_score = problem?.scoreData?.Rating || 0;
  const u_score = user_score > 0 ? user_score : 1500;
  switch (config_value) {
    case "Score":
      if ((problem?.scoreData?.Rating || 0) > 0) {
        return true;
      }
      break;
    case "NoScore":
      if ((problem?.scoreData?.Rating || 0) == 0) {
        return true;
      }
      break;
    case "ScoreRange":
      if (p_score < u_score + min_v) {
        return true;
      }
      if (p_score > u_score + max_v) {
        return true;
      }
      break;
    default:
      break;
  }
  return false;
}

// 随机题目最小分数
export function getPickOneByRankRangeMin(): number {
  return getVsCodeConfig().get<number>("pickOneByRankRangeMin") || 50;
}
// 随机题目最大分数
export function getPickOneByRankRangeMax(): number {
  return getVsCodeConfig().get<number>("pickOneByRankRangeMax") || 150;
}
// 工作目录
export function getWorkspaceFolder(): string {
  let cur_wsf = getVsCodeConfig().get<string>("workspaceFolder", "");
  return resolveWorkspaceFolder(cur_wsf);
}

// 尝试从环境变量解析WorkspaceFolder
function resolveWorkspaceFolder(cur_wsf: string): string {
  return cur_wsf.replace(/\$\{(.*?)\}/g, (_substring: string, ...args: string[]) => {
    const placeholder: string = args[0].trim();
    switch (placeholder) {
      default:
        if (process.env[placeholder]) {
          return process.env[placeholder] || "";
        } else {
          BABA.getProxy(BabaStr.LogOutputProxy)
            .get_log()
            .append("环境变量" + JSON.stringify(process.env));
          throw new Error(`无法从环境变量获取到${placeholder}的变量, 请查看控制台信息~ `);
        }
    }
  });
}

// 快捷操作
export function getEditorShortcuts(): string[] {
  return getVsCodeConfig().get<string[]>("editor.shortcuts", [
    "submit",
    "case",
    "allcase",
    "test",
    "retest",
    "solution",
    "debug",
  ]);
}

export function isStarShortcut(): boolean {
  const shortcuts: string[] = getVsCodeConfig().get<string[]>("editor.shortcuts", [
    "submit",
    "case",
    "allcase",
    "test",
    "solution",
  ]);
  return shortcuts.indexOf("star") >= 0;
}

export function isUseEndpointTranslation(): boolean {
  return getVsCodeConfig().get<boolean>("useEndpointTranslation", true);
}

// 状态栏状态设置
export function enableStatusBar(): boolean {
  return getVsCodeConfig().get<boolean>("enableStatusBar", true);
}

// 状态栏定时器可见性
export function enableTimerBar(): boolean {
  return getVsCodeConfig().get<boolean>("enableTimerBar", true);
}

// 展示方式
export function getDescriptionConfiguration(): IDescriptionConfiguration {
  const setting: string = getVsCodeConfig().get<string>("showDescription", DescriptionConfiguration.InWebView);
  const config: IDescriptionConfiguration = {
    showInComment: false,
    showInWebview: true,
  };
  switch (setting) {
    case DescriptionConfiguration.Both:
      config.showInComment = true;
      config.showInWebview = true;
      break;
    case DescriptionConfiguration.None:
      config.showInComment = false;
      config.showInWebview = false;
      break;
    case DescriptionConfiguration.InFileComment:
      config.showInComment = true;
      config.showInWebview = false;
      break;
    case DescriptionConfiguration.InWebView:
      config.showInComment = false;
      config.showInWebview = true;
      break;
  }

  // To be compatible with the deprecated setting:
  if (getVsCodeConfig().get<boolean>("showCommentDescription")) {
    config.showInComment = true;
  }

  return config;
}

export interface IDescriptionConfiguration {
  showInComment: boolean;
  showInWebview: boolean;
}

export function enableSideMode(): boolean {
  return getVsCodeConfig().get<boolean>("enableSideMode", true);
}

export function getNodePath() {
  return getVsCodeConfig().get<string>("nodePath", "node" /* default value */);
}

export function isShowLocked() {
  return !!getVsCodeConfig().get<boolean>("showLocked");
}

export function isUseVscodeNode() {
  return getVsCodeConfig().get<boolean>("useVscodeNode") === true;
}

export function isUseWsl() {
  return getVsCodeConfig().get<boolean>("useWsl") === true;
}

export function getSortingStrategy(): SortingStrategy {
  return getVsCodeConfig().get<SortingStrategy>("problems.sortStrategy", SortingStrategy.None);
}

export function sortNodeList(nodes: NodeModel[]): NodeModel[] {
  const strategy: SortingStrategy = getSortingStrategy();
  switch (strategy) {
    case SortingStrategy.AcceptanceRateAsc:
      return nodes.sort((x: NodeModel, y: NodeModel) => Number(x.acceptanceRate) - Number(y.acceptanceRate));
    case SortingStrategy.AcceptanceRateDesc:
      return nodes.sort((x: NodeModel, y: NodeModel) => Number(y.acceptanceRate) - Number(x.acceptanceRate));
    case SortingStrategy.ScoreAsc:
      return nodes.sort((x: NodeModel, y: NodeModel) => Number(x.score) - Number(y.score));
    case SortingStrategy.ScoreDesc:
      return nodes.sort((x: NodeModel, y: NodeModel) => Number(y.score) - Number(x.score));
    case SortingStrategy.IDDesc:
      return nodes.sort((x: NodeModel, y: NodeModel) => Number(y.id) - Number(x.id));
    default:
      return nodes;
  }
}

export async function updateSortingStrategy(value: string, flag: boolean) {
  await getVsCodeConfig().update("problems.sortStrategy", value, flag);
}

export function getLeetCodeEndpoint(): string {
  return getVsCodeConfig().get<string>("endpoint", Endpoint.LeetCodeCN);
}

export async function openSettingsEditor(query?: string): Promise<void> {
  await commands.executeCommand("workbench.action.openSettings", query);
}

// 设置默认语言
export async function fetchProblemLanguage(): Promise<string | undefined> {
  const leetCodeConfig: WorkspaceConfiguration = workspace.getConfiguration("leetcode-problem-rating");
  let defaultLanguage: string | undefined = leetCodeConfig.get<string>("defaultLanguage");
  if (defaultLanguage && AllProgramLanguage.indexOf(defaultLanguage) < 0) {
    defaultLanguage = undefined;
  }
  const language: string | undefined =
    defaultLanguage ||
    (await window.showQuickPick(AllProgramLanguage, {
      placeHolder: "Select the language you want to use",
      ignoreFocusOut: true,
    }));

  (async (): Promise<void> => {
    if (language && !defaultLanguage && leetCodeConfig.get<boolean>("hint.setDefaultLanguage")) {
      const choice: MessageItem | undefined = await window.showInformationMessage(
        `Would you like to set '${language}' as your default language?`,
        DialogOptions.yes,
        DialogOptions.no,
        DialogOptions.never
      );
      if (choice === DialogOptions.yes) {
        leetCodeConfig.update("defaultLanguage", language, true);
      } else if (choice === DialogOptions.never) {
        leetCodeConfig.update("hint.setDefaultLanguage", false, true);
      }
    }
  })();
  return language;
}

export async function determineLeetCodeFolder(): Promise<string> {
  let result: string;
  const picks: Array<IQuickItemEx<string>> = [];
  picks.push(
    {
      label: `Default location`,
      detail: `${path.join(os.homedir(), ".leetcode")}`,
      value: `${path.join(os.homedir(), ".leetcode")}`,
    },
    {
      label: "$(file-directory) Browse...",
      value: ":browse",
    }
  );
  const choice: IQuickItemEx<string> | undefined = await window.showQuickPick(picks, {
    placeHolder: "Select where you would like to save your LeetCode files",
  });
  if (!choice) {
    result = "";
  } else if (choice.value === ":browse") {
    const directory: Uri[] | undefined = await showDirectorySelectDialog();
    if (!directory || directory.length < 1) {
      result = "";
    } else {
      result = directory[0].fsPath;
    }
  } else {
    result = choice.value;
  }

  getVsCodeConfig().update("workspaceFolder", result, ConfigurationTarget.Global);

  return result;
}

export function getBelongingWorkspaceFolderUri(fsPath: string | undefined): Uri | undefined {
  let defaultUri: Uri | undefined;
  if (fsPath) {
    const workspaceFolder: WorkspaceFolder | undefined = workspace.getWorkspaceFolder(Uri.file(fsPath));
    if (workspaceFolder) {
      defaultUri = workspaceFolder.uri;
    }
  }
  return defaultUri;
}

export async function showDirectorySelectDialog(fsPath?: string): Promise<Uri[] | undefined> {
  const defaultUri: Uri | undefined = getBelongingWorkspaceFolderUri(fsPath);
  const options: OpenDialogOptions = {
    defaultUri,
    canSelectFiles: false,
    canSelectFolders: true,
    canSelectMany: false,
    openLabel: "Select",
  };
  return await window.showOpenDialog(options);
}

export function isSubFolder(from: string, to: string): boolean {
  const relative: string = path.relative(from, to);
  if (relative === "") {
    return true;
  }
  return !relative.startsWith("..") && !path.isAbsolute(relative);
}

export async function selectWorkspaceFolder(isAsk: boolean = true): Promise<string> {
  let workspaceFolderSetting: string = getWorkspaceFolder();
  if (workspaceFolderSetting.trim() === "") {
    workspaceFolderSetting = await determineLeetCodeFolder();
    if (workspaceFolderSetting === "") {
      // User cancelled
      return workspaceFolderSetting;
    }
  }
  let needAsk: boolean = true;
  await fse.ensureDir(workspaceFolderSetting);
  for (const folder of workspace.workspaceFolders || []) {
    if (isSubFolder(folder.uri.fsPath, workspaceFolderSetting)) {
      needAsk = false;
    }
  }

  if (needAsk && isAsk) {
    const choice: string | undefined = await window.showQuickPick(
      [OpenOption.justOpenFile, OpenOption.openInCurrentWindow, OpenOption.openInNewWindow, OpenOption.addToWorkspace],
      {
        placeHolder: "The LeetCode workspace folder is not opened in VS Code, would you like to open it?",
      }
    );
    switch (choice) {
      case OpenOption.justOpenFile:
        return workspaceFolderSetting;
      case OpenOption.openInCurrentWindow:
        await commands.executeCommand("vscode.openFolder", Uri.file(workspaceFolderSetting), false);
        return "";
      case OpenOption.openInNewWindow:
        await commands.executeCommand("vscode.openFolder", Uri.file(workspaceFolderSetting), true);
        return "";
      case OpenOption.addToWorkspace:
        workspace.updateWorkspaceFolders(workspace.workspaceFolders?.length ?? 0, 0, {
          uri: Uri.file(workspaceFolderSetting),
        });
        break;
      default:
        return "";
    }
  }

  return useWsl() ? toWslPath(workspaceFolderSetting) : workspaceFolderSetting;
}

export async function setDefaultLanguage(): Promise<void> {
  const leetCodeConfig: WorkspaceConfiguration = workspace.getConfiguration("leetcode-problem-rating");
  const defaultLanguage: string | undefined = leetCodeConfig.get<string>("defaultLanguage");
  const languageItems: QuickPickItem[] = [];
  for (const language of AllProgramLanguage) {
    languageItems.push({
      label: language,
      description: defaultLanguage === language ? "Currently used" : undefined,
    });
  }
  // Put the default language at the top of the list
  languageItems.sort((a: QuickPickItem, b: QuickPickItem) => {
    if (a.description) {
      return Number.MIN_SAFE_INTEGER;
    } else if (b.description) {
      return Number.MAX_SAFE_INTEGER;
    }
    return a.label.localeCompare(b.label);
  });

  const selectedItem: QuickPickItem | undefined = await window.showQuickPick(languageItems, {
    placeHolder: "请设置默认语言",
    ignoreFocusOut: true,
  });

  if (!selectedItem) {
    return;
  }

  leetCodeConfig.update("defaultLanguage", selectedItem.label, true /* Global */);
  window.showInformationMessage(`设置默认语言 ${selectedItem.label} 成功`);
}

export function isAnswerDiffColor(): boolean {
  return getVsCodeConfig().get<boolean>("answerDiffColor", false);
}

const singleLineFlag = {
  bash: "#",
  c: "//",
  cpp: "//",
  csharp: "//",
  golang: "//",
  java: "//",
  javascript: "//",
  kotlin: "//",
  mysql: "--",
  php: "//",
  python: "#",
  python3: "#",
  ruby: "#",
  rust: "//",
  scala: "//",
  swift: "//",
  typescript: "//",
};

export function includeTemplatesAuto() {
  return getVsCodeConfig().get<boolean>("includeTemplatesAuto", true);
}

export function getIncludeTemplate(lang: string): string {
  let temp_cfg = getVsCodeConfig().get<any>("includeTemplates") || [];
  let result = "";
  let singleLine = singleLineFlag[lang] || "";
  temp_cfg.forEach((element) => {
    if (element.language == lang) {
      result = (element.template || []).join("\n");
      return;
    }
  });

  let new_include_template: any = [
    `\n`,
    `${singleLine} @lcpr-template-start`,
    `${result}`,
    `${singleLine} @lcpr-template-end`,
  ];

  return new_include_template.join("\n");
}

// 获取清除缓存修改时间间隔
export function getOpenClearProblemCacheTime(): number {
  return getVsCodeConfig().get<number>("openClearProblemCacheTime") || 3600;
}

// 是否打开清除题目缓存
export function isOpenClearProblemCache(): boolean {
  return getVsCodeConfig().get<boolean>("openClearProblemCache", false);
}
