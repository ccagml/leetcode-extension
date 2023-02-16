/*
 * Filename: https://github.com/ccagml/leetcode-extension/src/utils/NlsUtils.ts
 * Path: https://github.com/ccagml/leetcode-extension
 * Created Date: Wednesday, February 15th 2023, 10:20:55 am
 * Author: ccagml
 *
 * Copyright (c) 2023 ccagml . All rights reserved
 */

// import * as vscode from "vscode";
// import * as nls from "vscode-nls";
class NlsUtils {
  // 初始化
  localize: any;
  public init() {
    // this.localize = nls.config({ locale: vscode.env.language })();
  }

  get(): string {
    return "";
  }
}

export const nlsUtils: NlsUtils = new NlsUtils();
