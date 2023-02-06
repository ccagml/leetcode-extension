import * as vscode from "vscode";

export interface IDebug {
  execute(
    document: vscode.TextDocument,
    filePath: string,
    testString: string,
    language: string,
    port: number
  ): Promise<string | undefined>;
}

export class DebugBase implements IDebug {
  constructor() {}
  public async execute(
    document: vscode.TextDocument,
    filePath: string,
    testString: string,
    language: string,
    port: number
  ): Promise<string | undefined> {
    throw new Error(`Method not implemented. ${document} ${filePath}, ${testString}, ${language}, ${port}`);
  }
}
