// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import * as vscode from "vscode";

export interface IQuickItemEx<T> extends vscode.QuickPickItem {
    value: T;
}

export enum UserStatus {
    SignedIn = 1,
    SignedOut = 2,
}

export const loginArgsMapping: Map<string, string> = new Map([
    ["LeetCode", "-l"],
    ["Cookie", "-c"],
    ["GitHub", "-g"],
    ["LinkedIn", "-i"],
]);

export const languages: string[] = [
    "bash",
    "c",
    "cpp",
    "csharp",
    "golang",
    "java",
    "javascript",
    "kotlin",
    "mysql",
    "php",
    "python",
    "python3",
    "ruby",
    "rust",
    "scala",
    "swift",
    "typescript",
];

export const langExt: Map<string, string> = new Map([
    ["bash", "sh"],
    ["c", "c"],
    ["cpp", "cpp"],
    ["csharp", "cs"],
    ["golang", "go"],
    ["java", "java"],
    ["javascript", "js"],
    ["kotlin", "kt"],
    ["mysql", "sql"],
    ["php", "php"],
    ["python", "py"],
    ["python3", "py"],
    ["ruby", "rb"],
    ["rust", "rs"],
    ["scala", "scala"],
    ["swift", "swift"],
    ["typescript", "ts"],
]);

export enum ProblemState {
    AC = 1,
    NotAC = 2,
    Unknown = 3,
}

export enum Endpoint {
    LeetCode = "leetcode",
    LeetCodeCN = "leetcode-cn",
}

export interface IProblem {
    isFavorite: boolean;
    locked: boolean;
    state: ProblemState;
    id: string; // 题目编号
    name: string;
    difficulty: string;
    passRate: string;
    companies: string[];
    tags: string[];
    scoreData: IScoreData | undefined; // 分数的结构
    isSearchResult: boolean;
    input: string;
}

export interface IScoreData {
    Rating: number; // 分数
    score: string; // rank分
    ID: string;   // 题目ID
    ContestID_en: string; // 周赛名称
    ProblemIndex: string; // 周赛第几题
    ContestSlug: string; // 周赛名称
}

export const defaultProblem: IProblem = {
    isFavorite: false,
    locked: false,
    state: ProblemState.Unknown,
    id: "",
    name: "",
    difficulty: "",
    passRate: "",
    companies: [] as string[],
    tags: [] as string[],
    scoreData: undefined,
    isSearchResult: false,
    input: ""
};

export enum Category {
    All = "All",
    Difficulty = "Difficulty",
    Tag = "Tag",
    Company = "Company",
    Favorite = "Favorite",
    Score = "Score"
}

export const supportedPlugins: string[] = [
    "company",
    "solution.discuss",
    "leetcode.cn",
];

export enum DescriptionConfiguration {
    InWebView = "In Webview",
    InFileComment = "In File Comment",
    Both = "Both",
    None = "None",
}

export const leetcodeHasInited: string = "leetcode.hasInited";

export enum SortingStrategy {
    None = "None",
    AcceptanceRateAsc = "Acceptance Rate (Ascending)",
    AcceptanceRateDesc = "Acceptance Rate (Descending)",
    FrequencyAsc = "Frequency (Ascending)",
    FrequencyDesc = "Frequency (Descending)",
    ScoreAsc = "Score (Ascending)",
    ScoreDesc = "Score (Descending)",
    IDDesc = "ID (Descending)"
}

export enum SearchSetType {
    ScoreRange = "ScoreRange",
    Context = "Context",
}

export enum SearchSetTypeName {
    ScoreRange = "分数范围:",
    Context = "周赛期数:"
}

export interface ISearchSet {
    value: string,
    type: SearchSetType
}

export const SearchNode: ISearchSet = {
    value: "",
    type: SearchSetType.ScoreRange,
}
