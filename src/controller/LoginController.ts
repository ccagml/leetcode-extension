/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/controller/LoginController.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
 * Created Date: Thursday, November 10th 2022, 3:06:12 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import * as cp from "child_process";
import * as wsl from "../utils/wslUtils";
import { executeService } from "../service/ExecuteService";

import { IQuickItemEx, loginArgsMapping, UserStatus } from "../model/Model";
import { createEnvOption } from "../utils/cliUtils";
import { DialogType, promptForOpenOutputChannel } from "../utils/uiUtils";
import { logOutput } from "../utils/logOutput";
import { eventService } from "../service/EventService";
import { window } from "vscode";
import { statusBarService } from "../service/StatusBarService";

// 登录
class LoginContorller {
    constructor() { }

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
        const choice: IQuickItemEx<string> | undefined = await window.showQuickPick(picks);
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

                const leetCodeBinaryPath: string = await executeService.getLeetCodeBinaryPath();

                var childProc: cp.ChildProcess;

                if (wsl.useVscodeNode()) {
                    childProc = cp.fork(await executeService.getLeetCodeBinaryPath(), ["user", commandArg], {
                        silent: true,
                        env: createEnvOption(),
                    });
                } else {
                    if (wsl.useWsl()) {
                        childProc = cp.spawn("wsl", [executeService.node, leetCodeBinaryPath, "user", commandArg], { shell: true })
                    } else {
                        childProc = cp.spawn(executeService.node, [leetCodeBinaryPath, "user", commandArg], {
                            shell: true,
                            env: createEnvOption(),
                        });
                    }

                }

                childProc.stdout?.on("data", async (data: string | Buffer) => {
                    data = data.toString();
                    // vscode.window.showInformationMessage(`cc login msg ${data}.`);
                    logOutput.append(data);
                    if (data.includes("twoFactorCode")) {
                        const twoFactor: string | undefined = await window.showInputBox({
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

                childProc.stderr?.on("data", (data: string | Buffer) => logOutput.append(data.toString()));

                childProc.on("error", reject);
                const name: string | undefined = await window.showInputBox({
                    prompt: "Enter username or E-mail.",
                    ignoreFocusOut: true,
                    validateInput: (s: string): string | undefined => s && s.trim() ? undefined : "The input must not be empty",
                });
                if (!name) {
                    childProc.kill();
                    return resolve(undefined);
                }
                childProc.stdin?.write(`${name}\n`);
                const pwd: string | undefined = await window.showInputBox({
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
                window.showInformationMessage(`Successfully ${inMessage}.`);
                eventService.emit("statusChanged", UserStatus.SignedIn, userName);
            }
        } catch (error) {
            promptForOpenOutputChannel(`Failed to ${inMessage}. Please open the output channel for details`, DialogType.error);
        }

    }

    public async signOut(): Promise<void> {
        try {
            await executeService.signOut();
            window.showInformationMessage("Successfully signed out.");
            eventService.emit("statusChanged", UserStatus.SignedOut, undefined);
        } catch (error) {
        }
    }

    public async getLoginStatus() {
        return await statusBarService.getLoginStatus()
    }
}

export const loginContorller: LoginContorller = new LoginContorller();
