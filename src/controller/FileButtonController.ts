/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/controller/FileButtonController.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */


import { ConfigurationChangeEvent, Disposable, languages, workspace } from "vscode";
import { fileButtonService } from "../service/FileButtonService";
// 文件按钮的控制器
class FileButtonController implements Disposable {

    private registeredProvider: Disposable | undefined;
    private configurationChangeListener: Disposable;

    constructor() {
        this.configurationChangeListener = workspace.onDidChangeConfiguration((event: ConfigurationChangeEvent) => {
            if (event.affectsConfiguration("leetcode-problem-rating.editor.shortcuts")) {
                fileButtonService.refresh();
            }
        }, this);

        this.registeredProvider = languages.registerCodeLensProvider({ scheme: "file" }, fileButtonService);
    }

    public dispose(): void {
        if (this.registeredProvider) {
            this.registeredProvider.dispose();
        }
        this.configurationChangeListener.dispose();
    }
}

export const fileButtonController: FileButtonController = new FileButtonController();
