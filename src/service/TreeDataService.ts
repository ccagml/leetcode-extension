/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/service/TreeDataService.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */


// import * as os from "os";
import * as path from "path";
import * as vscode from "vscode";
import { Category, defaultProblem, IScoreData, ProblemState, SearchSetType, ISubmitEvent } from "../model/Model";
import { treeViewController } from "../controller/TreeViewController";
import { NodeModel } from "../model/NodeModel";
import { statusBarService } from "./StatusBarService";
import { scoreDao } from "../dao/scoreDao";
import { choiceDao } from "../dao/choiceDao";
import { tagsDao } from "../dao/tagsDao";

export class TreeDataService implements vscode.TreeDataProvider<NodeModel> {

    private context: vscode.ExtensionContext;
    private onDidChangeTreeDataEvent: vscode.EventEmitter<NodeModel | undefined | null> = new vscode.EventEmitter<NodeModel | undefined | null>();
    // tslint:disable-next-line:member-ordering
    public readonly onDidChangeTreeData: vscode.Event<any> = this.onDidChangeTreeDataEvent.event;

    public initialize(context: vscode.ExtensionContext): void {
        this.context = context;
    }

    public checkSubmit(e: ISubmitEvent) {
        treeViewController.checkSubmit(e);
    }

    public cleanUserScore() {
        treeViewController.clearUserScore();
    }

    public async refresh(): Promise<void> {
        await treeViewController.refreshCache();
        this.onDidChangeTreeDataEvent.fire(null);
        await treeViewController.refreshCheck();
    }

    public getTreeItem(element: NodeModel): vscode.TreeItem | Thenable<vscode.TreeItem> {
        if (element.id === "notSignIn") {
            return {
                label: element.name,
                collapsibleState: vscode.TreeItemCollapsibleState.None,
                command: {
                    command: "leetcode.signin",
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
            label: element.isProblem ? (element.score > "0" ? "[score:" + (element.score) + "]" : "") + `ID:${element.id}.${element.name} ` : element.name,
            tooltip: this.getSubCategoryTooltip(element),
            collapsibleState: element.isProblem ? vscode.TreeItemCollapsibleState.None : vscode.TreeItemCollapsibleState.Collapsed,
            iconPath: this.parseIconPathFromProblemState(element),
            command: element.isProblem ? element.previewCommand : undefined,
            resourceUri: element.uri,
            contextValue,
        };
        return result;
    }

    public getChildren(element?: NodeModel | undefined): vscode.ProviderResult<NodeModel[]> {
        if (!statusBarService.getUser()) {
            return [
                new NodeModel(Object.assign({}, defaultProblem, {
                    id: "notSignIn",
                    name: "未登录",
                }), false),
            ];
        }
        if (!element) { // Root view
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
                switch (element.id) { // First-level
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

    // 返回题目id的数据
    public getScoreData(): Map<string, IScoreData> {
        return scoreDao.getScoreData();
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
}

export const treeDataService: TreeDataService = new TreeDataService();
