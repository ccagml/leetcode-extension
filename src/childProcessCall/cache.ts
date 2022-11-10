/*
 * Filename: https://github.com/ccagml/vscode-leetcode-problem-rating/src/childProcessCall/cache.ts
 * Path: https://github.com/ccagml/vscode-leetcode-problem-rating
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */


let path = require('path');

import { file } from "./file";


class Cache {
  public init() {
    file.mkdir(file.cacheDir());
  };

  public deleteAll() {
    this.list().forEach(value => {
      this.del(value.name);
    });
  };

  public get(k) {
    const fullpath = file.cacheFile(k);
    if (!file.exist(fullpath)) return null;

    return JSON.parse(file.data(fullpath));
  };

  public set(k, v) {
    const fullpath = file.cacheFile(k);
    file.write(fullpath, JSON.stringify(v));
    return true;
  };

  public del(k) {
    const fullpath = file.cacheFile(k);
    if (!file.exist(fullpath)) return false;

    file.rm(fullpath);
    return true;
  };

  public list(): Array<any> {
    return file.list(file.cacheDir())
      .filter(x => path.extname(x) === '.json')
      .map(function (filename) {
        const k = path.basename(filename, '.json');
        const stat = file.stat(file.cacheFile(k));
        return {
          name: k,
          size: stat.size,
          mtime: stat.mtime
        };
      });
  };

}

export const cache: Cache = new Cache();
