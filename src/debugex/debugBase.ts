export interface IDebug {
  execute(filePath: string, testString: string, language: string, port: number): Promise<string | undefined>;
}

export class DebugBase implements IDebug {
  constructor() {}
  public async execute(
    filePath: string,
    testString: string,
    language: string,
    port: number
  ): Promise<string | undefined> {
    throw new Error(`Method not implemented. ${filePath}, ${testString}, ${language}, ${port}`);
  }
}
