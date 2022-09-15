// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import * as _ from "lodash";
import { toNumber } from "lodash";
import { Disposable } from "vscode";
import * as list from "../commands/list";
import { getSortingStrategy } from "../commands/plugin";
import { Category, defaultProblem, ProblemState, SortingStrategy } from "../shared";
import { shouldHideSolvedProblem } from "../utils/settingUtils";
import { LeetCodeNode } from "./LeetCodeNode";

class ExplorerNodeManager implements Disposable {
    private explorerNodeMap: Map<string, LeetCodeNode> = new Map<string, LeetCodeNode>();
    private companySet: Set<string> = new Set<string>();
    private tagSet: Set<string> = new Set<string>();

    public async refreshCache(): Promise<void> {
        this.dispose();
        const shouldHideSolved: boolean = shouldHideSolvedProblem();
        for (const problem of await list.listProblems()) {
            if (shouldHideSolved && problem.state === ProblemState.AC) {
                continue;
            }
            this.explorerNodeMap.set(problem.id, new LeetCodeNode(problem));
            for (const company of problem.companies) {
                this.companySet.add(company);
            }
            for (const tag of problem.tags) {
                this.tagSet.add(tag);
            }
        }
    }

    public getRootNodes(): LeetCodeNode[] {
        return [
            new LeetCodeNode(Object.assign({}, defaultProblem, {
                id: Category.All,
                name: Category.All,
            }), false),
            new LeetCodeNode(Object.assign({}, defaultProblem, {
                id: Category.Difficulty,
                name: Category.Difficulty,
            }), false),
            new LeetCodeNode(Object.assign({}, defaultProblem, {
                id: Category.Tag,
                name: Category.Tag,
            }), false),
            new LeetCodeNode(Object.assign({}, defaultProblem, {
                id: Category.Company,
                name: Category.Company,
            }), false),
            new LeetCodeNode(Object.assign({}, defaultProblem, {
                id: Category.Favorite,
                name: Category.Favorite,
            }), false),
            new LeetCodeNode(Object.assign({}, defaultProblem, {
                id: Category.Score,
                name: Category.Score,
            }), false),
        ];
    }

    public getAllNodes(): LeetCodeNode[] {
        return this.applySortingStrategy(
            Array.from(this.explorerNodeMap.values()),
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

    public getAllScoreNodes(): LeetCodeNode[] {
        const res: LeetCodeNode[] = [];
        res.push(
            new LeetCodeNode(Object.assign({}, defaultProblem, {
                id: `${Category.Score}.2300`,
                name: "2300",
            }), false),
            new LeetCodeNode(Object.assign({}, defaultProblem, {
                id: `${Category.Score}.2200`,
                name: "2200",
            }), false),
            new LeetCodeNode(Object.assign({}, defaultProblem, {
                id: `${Category.Score}.2100`,
                name: "2100",
            }), false),
            new LeetCodeNode(Object.assign({}, defaultProblem, {
                id: `${Category.Score}.2000`,
                name: "2000",
            }), false),
            new LeetCodeNode(Object.assign({}, defaultProblem, {
                id: `${Category.Score}.1900`,
                name: "1900",
            }), false),
            new LeetCodeNode(Object.assign({}, defaultProblem, {
                id: `${Category.Score}.1800`,
                name: "1800",
            }), false),
            new LeetCodeNode(Object.assign({}, defaultProblem, {
                id: `${Category.Score}.1700`,
                name: "1700",
            }), false),
            new LeetCodeNode(Object.assign({}, defaultProblem, {
                id: `${Category.Score}.1600`,
                name: "1600",
            }), false),
            new LeetCodeNode(Object.assign({}, defaultProblem, {
                id: `${Category.Score}.1500`,
                name: "1500",
            }), false),
            new LeetCodeNode(Object.assign({}, defaultProblem, {
                id: `${Category.Score}.1400`,
                name: "1400",
            }), false),
            new LeetCodeNode(Object.assign({}, defaultProblem, {
                id: `${Category.Score}.1300`,
                name: "1300",
            }), false),
            new LeetCodeNode(Object.assign({}, defaultProblem, {
                id: `${Category.Score}.1200`,
                name: "1200",
            }), false),
            new LeetCodeNode(Object.assign({}, defaultProblem, {
                id: `${Category.Score}.1100`,
                name: "1100",
            }), false),
        );
        this.sortSubCategoryNodes(res, Category.Score);
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
        for (const node of this.explorerNodeMap.values()) {
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
                        let m: Map<Number, Array<number>> = new Map<Number, Array<number>>;
                        m.set(2300, [2300, 9999]);
                        m.set(2200, [2200, 2300]);
                        m.set(2100, [2100, 2200]);
                        m.set(2000, [2000, 2100]);
                        m.set(1900, [1900, 2000]);
                        m.set(1800, [1800, 1900]);
                        m.set(1700, [1700, 1800]);
                        m.set(1600, [1600, 1700]);
                        m.set(1500, [1500, 1600]);
                        m.set(1400, [1400, 1500]);
                        m.set(1300, [1300, 1400]);
                        m.set(1200, [1200, 1300]);
                        m.set(1100, [1, 1200]);
                        const v: Array<number> | undefined = m.get(check_rank)
                        if (v != undefined && v[0] <= node_rank && node_rank < v[1]) {
                            res.push(node);
                        }
                    }
                    break;
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
            default: return nodes;
        }
    }
}

export const explorerNodeManager: ExplorerNodeManager = new ExplorerNodeManager();
