/*
 * Filename: https://github.com/ccagml/leetcode_vsc/src/utils/NlsUtils.ts
 * Path: https://github.com/ccagml/leetcode_vsc
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
