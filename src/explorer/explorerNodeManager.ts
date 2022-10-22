// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import * as _ from "lodash";
import { toNumber } from "lodash";
import { Disposable } from "vscode";
import * as list from "../commands/list";
import { getSortingStrategy } from "../commands/plugin";
import { Category, defaultProblem, ProblemState, SortingStrategy, SearchSetTypeName, RootNodeSort, SearchSetType, ISubmitEvent } from "../shared";
import { shouldHideSolvedProblem, shouldHideScoreProblem } from "../utils/settingUtils";
import { LeetCodeNode } from "./LeetCodeNode";
import { ISearchSet } from "../shared";
import { searchToday, searchUserContest } from "../commands/show";
import { leetCodeTreeDataProvider } from "./LeetCodeTreeDataProvider";
import { resourcesData } from "../ResourcesData";
import { leetCodeManager } from "../leetCodeManager";

class ExplorerNodeManager implements Disposable {
    private explorerNodeMap: Map<string, LeetCodeNode> = new Map<string, LeetCodeNode>();
    private companySet: Set<string> = new Set<string>();
    private tagSet: Set<string> = new Set<string>();
    private searchSet: Map<string, ISearchSet> = new Map<string, ISearchSet>();
    private waitTodayQuestion: boolean;
    private waitUserContest: boolean;
    private user_score: number;


    public async update_user_score(user_score: number) {
        this.user_score = user_score;
        await leetCodeTreeDataProvider.refresh()
    }

    public insertSearchSet(tt: ISearchSet) {
        this.searchSet.set(tt.value, tt);
    }
    public clearUserScore() {
        this.user_score = 0;
        this.waitUserContest = false;
        this.waitTodayQuestion = false;
        this.searchSet = new Map<string, ISearchSet>();
    }

    public checkSubmit(e: ISubmitEvent) {
        if (e.sub_type == "submit" && e.accepted) {
            const day_start = new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 1000; //获取当天零点的时间
            const day_end = new Date(new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1).getTime() / 1000; //获取当天23:59:59的时间
            var need_get_today: boolean = false;
            this.searchSet.forEach(element => {
                if (element.type == SearchSetType.Day) {
                    if (day_start <= element.time && element.time <= day_end) {
                        if (e.fid == element.value) {
                            need_get_today = true;
                        }
                    }
                }
            });
            if (need_get_today) {
                searchToday();
            }
        }
    }

    public async refreshCheck(): Promise<void> {
        if (!leetCodeManager.getUser()) {
            return;
        }
        const day_start = new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 1000; //获取当天零点的时间
        const day_end = new Date(new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1).getTime() / 1000; //获取当天23:59:59的时间
        var need_get_today: boolean = true;
        this.searchSet.forEach(element => {
            if (element.type == SearchSetType.Day) {
                if (day_start <= element.time && element.time <= day_end) {
                    need_get_today = false;
                } else {
                    this.waitTodayQuestion = false
                }
            }
        });
        if (need_get_today && !this.waitTodayQuestion) {
            this.waitTodayQuestion = true
            await searchToday();
        }
        if (!this.user_score && !this.waitUserContest) {
            this.waitUserContest = true;
            await searchUserContest();
        }
    }

    public async refreshCache(): Promise<void> {
        const temp_searchSet: Map<string, ISearchSet> = this.searchSet
        const temp_waitTodayQuestion: boolean = this.waitTodayQuestion
        const temp_waitUserContest: boolean = this.waitUserContest
        this.dispose();
        for (const problem of await list.listProblems()) {
            this.explorerNodeMap.set(problem.id, new LeetCodeNode(problem, true, this.user_score));
            for (const company of problem.companies) {
                this.companySet.add(company);
            }
            for (const tag of problem.tags) {
                this.tagSet.add(tag);
            }
        }
        this.searchSet = temp_searchSet;
        this.waitTodayQuestion = temp_waitTodayQuestion
        this.waitUserContest = temp_waitUserContest
    }

    public getRootNodes(): LeetCodeNode[] {
        const baseNode: LeetCodeNode[] = [
            new LeetCodeNode(Object.assign({}, defaultProblem, {
                id: Category.All,
                name: Category.All,
                rootNodeSortId: RootNodeSort.All,
            }), false),
            new LeetCodeNode(Object.assign({}, defaultProblem, {
                id: Category.Difficulty,
                name: Category.Difficulty,
                rootNodeSortId: RootNodeSort.Difficulty,
            }), false),
            new LeetCodeNode(Object.assign({}, defaultProblem, {
                id: Category.Tag,
                name: Category.Tag,
                rootNodeSortId: RootNodeSort.Tag,
            }), false),
            // new LeetCodeNode(Object.assign({}, defaultProblem, {
            //     id: Category.Company,
            //     name: Category.Company,
            //     rootNodeSortId: RootNodeSort.Company,
            // }), false),
            new LeetCodeNode(Object.assign({}, defaultProblem, {
                id: Category.Favorite,
                name: Category.Favorite,
                rootNodeSortId: RootNodeSort.Favorite,
            }), false),
            new LeetCodeNode(Object.assign({}, defaultProblem, {
                id: Category.Score,
                name: Category.Score,
                rootNodeSortId: RootNodeSort.Score,
            }), false, this.user_score),
            new LeetCodeNode(Object.assign({}, defaultProblem, {
                id: Category.Choice,
                name: Category.Choice,
                rootNodeSortId: RootNodeSort.Choice,
            }), false),
        ];
        this.searchSet.forEach(element => {
            if (element.type == SearchSetType.Day) {
                const curDate = new Date(element.time * 1000)
                baseNode.push(new LeetCodeNode(Object.assign({}, defaultProblem, {
                    id: element.type,
                    name: "[" + (curDate.getFullYear()) + "-" + (curDate.getMonth() + 1) + "-" + (curDate.getDate()) + "]" + SearchSetTypeName[SearchSetType.Day],
                    input: element.value,
                    isSearchResult: true,
                    rootNodeSortId: RootNodeSort[element.type],
                    todayData: element.todayData
                }), false));
            } else {
                baseNode.push(new LeetCodeNode(Object.assign({}, defaultProblem, {
                    id: element.type,
                    name: SearchSetTypeName[element.type] + element.value,
                    input: element.value,
                    isSearchResult: true,
                    rootNodeSortId: RootNodeSort[element.type],
                }), false));
            }
        });
        baseNode.sort(function (a: LeetCodeNode, b: LeetCodeNode): number {
            if (a.rootNodeSortId < b.rootNodeSortId) {
                return -1;
            } else if (a.rootNodeSortId > b.rootNodeSortId) {
                return 1
            }
            return 0;
        })
        return baseNode;
    }

    public getScoreRangeNodes(rank_range: string): LeetCodeNode[] {
        const sorceNode: LeetCodeNode[] = []
        const rank_r: Array<string> = rank_range.split("-")
        var rank_a = Number(rank_r[0])
        var rank_b = Number(rank_r[1])
        if (rank_a > 0 && rank_b > 0) {
            if (rank_a > rank_b) {
                const rank_c: number = rank_a
                rank_a = rank_b
                rank_b = rank_c
            }

            this.explorerNodeMap.forEach(element => {
                if (!this.canShow(element)) {
                    return;
                }
                if (rank_a <= Number(element.score) && Number(element.score) <= rank_b) {
                    sorceNode.push(element)
                }
            });
        }
        return this.applySortingStrategy(sorceNode);
    }

    public canShow(element: LeetCodeNode) {
        if (shouldHideSolvedProblem() && element.state === ProblemState.AC) {
            return false;
        }
        if (shouldHideScoreProblem(element, element.user_score)) {
            return false;
        }
        return true;
    }

    public getContextNodes(rank_range: string): LeetCodeNode[] {
        const sorceNode: LeetCodeNode[] = []
        const rank_r: Array<string> = rank_range.split("-")
        var rank_a = Number(rank_r[0])
        var rank_b = Number(rank_r[1])
        if (rank_a > 0) {
            this.explorerNodeMap.forEach(element => {
                if (!this.canShow(element)) {
                    return;
                }
                const slu = element.ContestSlug;
                const slu_arr: Array<string> = slu.split("-")
                const slu_id = Number(slu_arr[slu_arr.length - 1]);
                if (rank_b > 0 && rank_a <= slu_id && slu_id <= rank_b) {
                    sorceNode.push(element)
                } else if (rank_a == slu_id) {
                    sorceNode.push(element)
                }
            });
        }
        return this.applySortingStrategy(sorceNode);
    }
    public getDayNodes(element: LeetCodeNode | undefined): LeetCodeNode[] {
        const rank_range: string = element?.input || ""
        const sorceNode: LeetCodeNode[] = []
        if (rank_range) {
            this.explorerNodeMap.forEach(new_node => {
                if (new_node.id == rank_range) {
                    new_node.todayData = element?.todayData
                    sorceNode.push(new_node);
                }
            });
        }
        return this.applySortingStrategy(sorceNode);
    }

    public getAllNodes(): LeetCodeNode[] {
        return this.applySortingStrategy(
            Array.from(this.explorerNodeMap.values()).filter(p => this.canShow(p)),
        );
    }

    public getAllDifficultyNodes(): LeetCodeNode[] {
        const res: LeetCodeNode[] = [];
        res.push(
            new LeetCodeNode(Object.assign({}, defaultProblem, {
                id: `${Category.Difficulty}.Easy`,
                name: "Easy",
            }), false),
            new LeetCodeNode(Object.assign({}, defaultProblem, {
                id: `${Category.Difficulty}.Medium`,
                name: "Medium",
            }), false),
            new LeetCodeNode(Object.assign({}, defaultProblem, {
                id: `${Category.Difficulty}.Hard`,
                name: "Hard",
            }), false),
        );
        this.sortSubCategoryNodes(res, Category.Difficulty);
        return res;
    }

    public getAllScoreNodes(user_score: number): LeetCodeNode[] {
        const res: LeetCodeNode[] = [];
        const score_array: Array<string> = ["3300", "3200", "3100", "3000", "2900", "2800", "2700", "2600", "2500", "2400", "2300", "2200", "2100", "2000", "1900", "1800", "1700", "1600", "1500", "1400", "1300", "1200", "1100"];
        score_array.forEach(element => {
            const temp_num = Number(element);
            const diff = Math.abs(temp_num - user_score)
            if (diff <= 200) {
                res.push(new LeetCodeNode(Object.assign({}, defaultProblem, {
                    id: `${Category.Score}.${element}`,
                    name: `${element}`,
                }), false, user_score))
            }
        })

        this.sortSubCategoryNodes(res, Category.Score);
        return res;
    }

    public getAllChoiceNodes(): LeetCodeNode[] {
        const res: LeetCodeNode[] = [];

        const all_choice = resourcesData.getChoiceData();
        all_choice.forEach(element => {
            res.push(new LeetCodeNode(Object.assign({}, defaultProblem, {
                id: `${Category.Choice}.${element.id}`,
                name: `${element.name}`,
            }), false))
        })
        this.sortSubCategoryNodes(res, Category.Choice);
        return res;
    }

    public getAllCompanyNodes(): LeetCodeNode[] {
        const res: LeetCodeNode[] = [];
        for (const company of this.companySet.values()) {
            res.push(new LeetCodeNode(Object.assign({}, defaultProblem, {
                id: `${Category.Company}.${company}`,
                name: _.startCase(company),
            }), false));
        }
        this.sortSubCategoryNodes(res, Category.Company);
        return res;
    }

    public getAllTagNodes(): LeetCodeNode[] {
        const res: LeetCodeNode[] = [];
        for (const tag of this.tagSet.values()) {
            res.push(new LeetCodeNode(Object.assign({}, defaultProblem, {
                id: `${Category.Tag}.${tag}`,
                name: _.startCase(tag),
            }), false));
        }
        this.sortSubCategoryNodes(res, Category.Tag);
        return res;
    }

    public getNodeById(id: string): LeetCodeNode | undefined {
        return this.explorerNodeMap.get(id);
    }

    public getFavoriteNodes(): LeetCodeNode[] {
        const res: LeetCodeNode[] = [];
        for (const node of this.explorerNodeMap.values()) {
            if (!this.canShow(node)) {
                continue;
            }
            if (node.isFavorite) {
                res.push(node);
            }
        }
        return this.applySortingStrategy(res);
    }

    public getChildrenNodesById(id: string): LeetCodeNode[] {
        // The sub-category node's id is named as {Category.SubName}
        const metaInfo: string[] = id.split(".");
        const res: LeetCodeNode[] = [];

        const choiceQuestionId: Map<number, boolean> = new Map<number, boolean>()
        if (metaInfo[0] == Category.Choice) {
            const all_choice = resourcesData.getChoiceData();
            all_choice.forEach(element => {
                if (element.id == metaInfo[1]) {
                    element.questions.forEach(kk => {
                        choiceQuestionId[kk] = true
                    })
                    return
                }
            })
        }

        for (const node of this.explorerNodeMap.values()) {
            if (!this.canShow(node)) {
                continue;
            }
            switch (metaInfo[0]) {
                case Category.Company:
                    if (node.companies.indexOf(metaInfo[1]) >= 0) {
                        res.push(node);
                    }
                    break;
                case Category.Difficulty:
                    if (node.difficulty === metaInfo[1]) {
                        res.push(node);
                    }
                    break;
                case Category.Tag:
                    if (node.tags.indexOf(metaInfo[1]) >= 0) {
                        res.push(node);
                    }
                    break;
                case Category.Score:
                    if (node.score > "0") {
                        const check_rank = toNumber(metaInfo[1]);
                        const node_rank = toNumber(node.score);
                        if (check_rank <= node_rank && node_rank < check_rank + 100) {
                            res.push(node);
                        }
                    }
                    break;
                case Category.Choice:
                    if (choiceQuestionId[Number(node.qid)]) {
                        res.push(node);
                    }
                default:
                    break;
            }
        }
        return this.applySortingStrategy(res);
    }

    public dispose(): void {
        this.explorerNodeMap.clear();
        this.companySet.clear();
        this.tagSet.clear();
    }

    private sortSubCategoryNodes(subCategoryNodes: LeetCodeNode[], category: Category): void {
        switch (category) {
            case Category.Difficulty:
                subCategoryNodes.sort((a: LeetCodeNode, b: LeetCodeNode): number => {
                    function getValue(input: LeetCodeNode): number {
                        switch (input.name.toLowerCase()) {
                            case "easy":
                                return 1;
                            case "medium":
                                return 2;
                            case "hard":
                                return 3;
                            default:
                                return Number.MAX_SAFE_INTEGER;
                        }
                    }
                    return getValue(a) - getValue(b);
                });
                break;
            case Category.Tag:
            case Category.Company:
                subCategoryNodes.sort((a: LeetCodeNode, b: LeetCodeNode): number => {
                    if (a.name === "Unknown") {
                        return 1;
                    } else if (b.name === "Unknown") {
                        return -1;
                    } else {
                        return Number(a.name > b.name) - Number(a.name < b.name);
                    }
                });
                break;
            default:
                break;
        }
    }

    private applySortingStrategy(nodes: LeetCodeNode[]): LeetCodeNode[] {
        const strategy: SortingStrategy = getSortingStrategy();
        switch (strategy) {
            case SortingStrategy.AcceptanceRateAsc: return nodes.sort((x: LeetCodeNode, y: LeetCodeNode) => Number(x.acceptanceRate) - Number(y.acceptanceRate));
            case SortingStrategy.AcceptanceRateDesc: return nodes.sort((x: LeetCodeNode, y: LeetCodeNode) => Number(y.acceptanceRate) - Number(x.acceptanceRate));
            case SortingStrategy.ScoreAsc: return nodes.sort((x: LeetCodeNode, y: LeetCodeNode) => Number(x.score) - Number(y.score));
            case SortingStrategy.ScoreDesc: return nodes.sort((x: LeetCodeNode, y: LeetCodeNode) => Number(y.score) - Number(x.score));
            case SortingStrategy.IDDesc: return nodes.sort((x: LeetCodeNode, y: LeetCodeNode) => Number(y.id) - Number(x.id));
            default: return nodes;
        }
    }
}

export const explorerNodeManager: ExplorerNodeManager = new ExplorerNodeManager();
