// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import * as cp from "child_process";
import { EventEmitter } from "events";
import * as vscode from "vscode";
import { leetCodeChannel } from "./leetCodeChannel";
import { leetCodeExecutor } from "./leetCodeExecutor";
import { IQuickItemEx, loginArgsMapping, UserStatus, userContestRanKingBase, userContestRankingObj } from "./shared";
import { createEnvOption } from "./utils/cpUtils";
import { DialogType, promptForOpenOutputChannel } from "./utils/uiUtils";
import * as wsl from "./utils/wslUtils";
import { explorerNodeManager } from "./explorer/explorerNodeManager";

class LeetCodeManager extends EventEmitter {
    private currentUser: string | undefined;
    private userStatus: UserStatus;
    // private readonly successRegex: RegExp = /(?:.*)Successfully .*login as (.*)/i;
    // private readonly failRegex: RegExp = /.*\[ERROR\].*/i;
    private currentUserContestInfo: userContestRanKingBase;

    constructor() {
        super();
        this.currentUser = undefined;
        this.userStatus = UserStatus.SignedOut;
    }

    public async insertCurrentUserContestInfo(tt: userContestRanKingBase) {
        this.currentUserContestInfo = tt;
        await explorerNodeManager.update_user_score(tt.rating);
    }
    public async getLoginStatus(): Promise<void> {
        try {
            const result: string = await leetCodeExecutor.getUserInfo();
            this.currentUser = this.tryParseUserName(result);
            this.userStatus = UserStatus.SignedIn;
            if (this.currentUser == undefined) {
                this.userStatus = UserStatus.SignedOut;
            }
        } catch (error) {
            this.currentUser = undefined;
            this.userStatus = UserStatus.SignedOut;
        } finally {
            this.emit("statusChanged");
        }
    }

    public async signIn(): Promise<void> {
        const picks: Array<IQuickItemEx<string>> = [];
        picks.push(
            {
                label: "LeetCode Account",
                detail: "Use LeetCode account to login (US endpoint is not supported)",
                value: "LeetCode",
            },
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
            },
        );
        const choice: IQuickItemEx<string> | undefined = await vscode.window.showQuickPick(picks);
        if (!choice) {
            return;
        }
        const loginMethod: string = choice.value;
        const commandArg: string | undefined = loginArgsMapping.get(loginMethod);
        if (!commandArg) {
            throw new Error(`The login method "${loginMethod}" is not supported.`);
        }
        const isByCookie: boolean = loginMethod === "Cookie";
        const inMessage: string = isByCookie ? "sign in by cookie" : "sign in";
        try {
            const userName: string | undefined = await new Promise(async (resolve: (res: string | undefined) => void, reject: (e: Error) => void): Promise<void> => {

                const leetCodeBinaryPath: string = await leetCodeExecutor.getLeetCodeBinaryPath();

                var childProc: cp.ChildProcess;
                if (wsl.useWsl()) {
                    childProc = cp.spawn("wsl", [leetCodeExecutor.node, leetCodeBinaryPath, "user", commandArg], { shell: true })
                } else {
                    childProc = cp.spawn(leetCodeExecutor.node, [leetCodeBinaryPath, "user", commandArg], {
                        shell: true,
                        env: createEnvOption(),
                    });
                }
                childProc.stdout?.on("data", async (data: string | Buffer) => {
                    data = data.toString();
                    // vscode.window.showInformationMessage(`cc login msg ${data}.`);
                    leetCodeChannel.append(data);
                    if (data.includes("twoFactorCode")) {
                        const twoFactor: string | undefined = await vscode.window.showInputBox({
                            prompt: "Enter two-factor code.",
                            ignoreFocusOut: true,
                            validateInput: (s: string): string | undefined => s && s.trim() ? undefined : "The input must not be empty",
                        });
                        if (!twoFactor) {
                            childProc.kill();
                            return resolve(undefined);
                        }
                        childProc.stdin?.write(`${twoFactor}\n`);
                    }

                    var successMatch;
                    try {
                        successMatch = JSON.parse(data);
                    } catch (e) {
                        successMatch = {};
                    }
                    if (successMatch.code == 100) {
                        childProc.stdin?.end();
                        return resolve(successMatch.user_name);
                    } else if (successMatch.code < 0) {
                        childProc.stdin?.end();
                        return reject(new Error(successMatch.msg));
                    }
                });

                childProc.stderr?.on("data", (data: string | Buffer) => leetCodeChannel.append(data.toString()));

                childProc.on("error", reject);
                const name: string | undefined = await vscode.window.showInputBox({
                    prompt: "Enter username or E-mail.",
                    ignoreFocusOut: true,
                    validateInput: (s: string): string | undefined => s && s.trim() ? undefined : "The input must not be empty",
                });
                if (!name) {
                    childProc.kill();
                    return resolve(undefined);
                }
                childProc.stdin?.write(`${name}\n`);
                const pwd: string | undefined = await vscode.window.showInputBox({
                    prompt: isByCookie ? "Enter cookie" : "Enter password.",
                    password: true,
                    ignoreFocusOut: true,
                    validateInput: (s: string): string | undefined => s ? undefined : isByCookie ? "Cookie must not be empty" : "Password must not be empty",
                });
                if (!pwd) {
                    childProc.kill();
                    return resolve(undefined);
                }
                childProc.stdin?.write(`${pwd}\n`);
            });
            if (userName) {
                vscode.window.showInformationMessage(`Successfully ${inMessage}.`);
                this.currentUser = userName;
                this.userStatus = UserStatus.SignedIn;
                this.emit("statusChanged");
            }
        } catch (error) {
            promptForOpenOutputChannel(`Failed to ${inMessage}. Please open the output channel for details`, DialogType.error);
        }

    }

    public async signOut(): Promise<void> {
        try {
            await leetCodeExecutor.signOut();
            vscode.window.showInformationMessage("Successfully signed out.");
            this.currentUser = undefined;
            this.userStatus = UserStatus.SignedOut;
            this.currentUserContestInfo = Object.assign({}, userContestRankingObj, {})
            this.emit("statusChanged");
        } catch (error) {
            // swallow the error when sign out.
        }
    }

    public getStatus(): UserStatus {
        return this.userStatus;
    }

    // 获取竞赛分
    public getUserContestScore(): number {
        if (this.currentUserContestInfo.rating > 0) {
            return this.currentUserContestInfo.rating
        }
        return 0;
    }

    public getUserContestInfo(): userContestRanKingBase | undefined {
        return this.currentUserContestInfo;
    }

    public getUser(): string | undefined {
        return this.currentUser;
    }

    private tryParseUserName(output: string): string | undefined {
        var successMatch;
        try {
            successMatch = JSON.parse(output);
        } catch (e) {
            successMatch = {};
        }
        if (successMatch.code == 100) {
            return successMatch.user_name;
        }
        return undefined;
    }
}

export const leetCodeManager: LeetCodeManager = new LeetCodeManager();
