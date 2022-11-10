/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/controller/FileButtonController.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */


import { ConfigurationChangeEvent, Disposable, languages, workspace } from "vscode";
import { fileButtonService, FileButtonService } from "../service/FileButtonService";

class FileButtonController implements Disposable {
    private internalProvider: FileButtonService;
    private registeredProvider: Disposable | undefined;
    private configurationChangeListener: Disposable;

    constructor() {
        this.internalProvider = fileButtonService;

        this.configurationChangeListener = workspace.onDidChangeConfiguration((event: ConfigurationChangeEvent) => {
            if (event.affectsConfiguration("leetcode-problem-rating.editor.shortcuts")) {
                this.internalProvider.refresh();
            }
        }, this);

        this.registeredProvider = languages.registerCodeLensProvider({ scheme: "file" }, this.internalProvider);
    }

    public dispose(): void {
        if (this.registeredProvider) {
            this.registeredProvider.dispose();
        }
        this.configurationChangeListener.dispose();
    }
}

export const fileButtonController: FileButtonController = new FileButtonController();
