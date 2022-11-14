/*
 * Filename: https://github.com/ccagml/vscode-leetcode-problem-rating/src/model/NodeMOdel.ts
 * Path: https://github.com/ccagml/vscode-leetcode-problem-rating
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */


import { Command, Uri } from "vscode";
import { IProblem, IScoreData, ITodayData, ProblemState, RootNodeSort } from "./Model";

export class NodeModel {
    private _u_score;
    constructor(private data: IProblem, private isProblemNode: boolean = true, userscore: number = 0) {
        this._u_score = userscore;
    }

    public get locked(): boolean {
        return this.data.locked;
    }
    public get name(): string {
        return this.data.name;
    }

    public get state(): ProblemState {

        // 每日一题的修正
        if (this.todayData) {
            const us = this.todayDataUserStatus;
            if (us == "FINISH") {
                return ProblemState.AC;
            } else {
                return ProblemState.Unknown;
            }
        }

        return this.data.state;
    }

    public get id(): string {
        return this.data.id;
    }

    public get passRate(): string {
        return this.data.passRate;
    }

    public get difficulty(): string {
        return this.data.difficulty;
    }

    public get tags(): string[] {
        return this.data.tags;
    }

    public get companies(): string[] {
        return this.data.companies;
    }

    public get isFavorite(): boolean {
        return this.data.isFavorite;
    }

    public get isProblem(): boolean {
        return this.isProblemNode;
    }
    public get rootNodeSortId(): RootNodeSort {
        return this.data.rootNodeSortId;
    }

    public get previewCommand(): Command {
        return {
            title: "Preview Problem",
            command: "leetcode.previewProblem",
            arguments: [this],
        };
    }

    public get acceptanceRate(): number {
        return Number(this.passRate) || 50;
    }

    public get uri(): Uri {
        return Uri.from({
            scheme: "leetcode",
            authority: this.isProblem ? "problems" : "tree-node",
            path: `/${this.id}`, // path must begin with slash /
            query: `difficulty=${this.difficulty}&score=${this.score}&user_score=${this._u_score}`,
        });
    }

    public set set_user_score(s: number) {
        this._u_score = s;
    }

    public get user_score(): number {
        return this._u_score;
    }

    // rank分
    public get score(): string {
        return this.data.scoreData?.score || "0";
    }
    // 周赛名称
    public get ContestID_en(): string {
        return this.data.scoreData?.ContestID_en || "";
    }
    // 周赛第几题
    public get ProblemIndex(): string {
        return this.data.scoreData?.ProblemIndex || "";
    }
    // 周赛名称符号链接
    public get ContestSlug(): string {
        return this.data.scoreData?.ContestSlug || "";
    }
    public get scoreData(): IScoreData | undefined {
        return this.data.scoreData;
    }
    public get isSearchResult(): boolean {
        return this.data.isSearchResult;
    }
    public get input(): string {
        return this.data.input || "";
    }
    // 每日一题的一些信息
    public get todayData(): ITodayData | undefined {
        return this.data.todayData;
    }
    public set todayData(s: ITodayData | undefined) {
        this.data.todayData = s;
    }
    public get todayDataDate(): string {
        return this.data.todayData?.date || "";
    }
    public get todayDataUserStatus(): string {
        return this.data.todayData?.userStatus || "";
    }
    public get qid(): string {
        return this.data.qid || "";
    }
}
