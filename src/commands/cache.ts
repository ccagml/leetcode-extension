// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import { executeService } from "../service/ExecuteService";
import { DialogType, promptForOpenOutputChannel } from "../utils/uiUtils";

export async function deleteCache(): Promise<void> {
    try {
        await executeService.deleteCache();
    } catch (error) {
        await promptForOpenOutputChannel("Failed to delete cache. Please open the output channel for details.", DialogType.error);
    }
}
