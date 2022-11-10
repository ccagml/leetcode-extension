
// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import { customCodeLensProvider } from "../codelens/CustomCodeLensProvider";
import { NodeModel } from "../model/NodeModel";
import { treeDataService } from "../service/TreeDataService";
import { executeService } from "../service/ExecuteService";
import { isStarShortcut } from "../utils/configUtils";
import { DialogType, promptForOpenOutputChannel } from "../utils/uiUtils";

export async function addFavorite(node: NodeModel): Promise<void> {
    try {
        await executeService.toggleFavorite(node, true);
        await treeDataService.refresh();
        if (isStarShortcut()) {
            customCodeLensProvider.refresh();
        }
    } catch (error) {
        await promptForOpenOutputChannel("Failed to add the problem to favorite. Please open the output channel for details.", DialogType.error);
    }
}

export async function removeFavorite(node: NodeModel): Promise<void> {
    try {
        await executeService.toggleFavorite(node, false);
        await treeDataService.refresh();
        if (isStarShortcut()) {
            customCodeLensProvider.refresh();
        }
    } catch (error) {
        await promptForOpenOutputChannel("Failed to remove the problem from favorite. Please open the output channel for details.", DialogType.error);
    }
}
