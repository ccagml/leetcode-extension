/*
 * Filename: https://github.com/ccagml/vscode-leetcode-problem-rating/src/childProcessCall/file.ts
 * Path: https://github.com/ccagml/vscode-leetcode-problem-rating
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */


let fs = require('fs');
let os = require('os');
let path = require('path');

let _ = require('underscore');
let mkdirp = require('mkdirp');

export interface IMETA {
  id: string
  fid: string
  lang: string
}

//Object.assign({}, defaultMETA, {})
export const defaultMETA: IMETA = {
  id: "",
  fid: "",
  lang: "",
};

class File {
  public init() {
    _.templateSettings = {
      evaluate: /\{\{(.+?)\}\}/g,
      interpolate: /\$\{(.+?)\}/g
    };
  };

  public isWindows() {
    return process.platform === 'win32';
  };

  public userHomeDir() {
    return process.env.HOME || process.env.USERPROFILE;
  };

  public homeDir() {
    return path.join(this.userHomeDir(), '.lc');
  };

  public appDir() {
    const config = require('./config');
    return path.join(this.homeDir(), config.app || 'leetcode');
  };

  public cacheDir() {
    return path.join(this.appDir(), 'cache');
  };

  public codeDir(dir) {
    return path.join(__dirname, dir || '');
  };

  public cacheFile(k) {
    return path.join(this.cacheDir(), k + '.json');
  };

  public configFile() {
    return path.join(this.homeDir(), 'config.json');
  };

  public listCodeDir(dir) {
    dir = this.codeDir(dir);
    return this.list(dir).map(function (f) {
      const fullpath = path.join(dir, f);
      const ext = path.extname(f);
      const name = path.basename(f, ext);

      let data = null;
      switch (ext) {
        case '.js': data = require(fullpath).pluginObj; break;
        case '.json': data = JSON.parse(file.data(fullpath)); break;
      }
      return { name: name, data: data, file: f };
    });
  };

  public mkdir(fullpath) {
    if (fs.existsSync(fullpath)) return;
    mkdirp.sync(fullpath);
  };

  public exist(fullpath) {
    return fs.existsSync(fullpath);
  };

  public rm(fullpath) {
    return fs.unlinkSync(fullpath);
  };

  public mv(src, dst) {
    return fs.renameSync(src, dst);
  };

  public list(dir) {
    return fs.readdirSync(dir);
  };

  public stat(fullpath) {
    return fs.statSync(fullpath);
  };

  public write(fullpath, data) {
    return fs.writeFileSync(fullpath, data);
  };

  public name(fullpath) {
    return path.basename(fullpath, path.extname(fullpath));
  };

  public data(fullpath) {
    return fs.existsSync(fullpath) ? fs.readFileSync(fullpath).toString() : null;
  };

  public codeData(fullpath) {
    const data = this.data(fullpath);

    if (data === null) {
      return null;
    }

    const lines = data.split(/\r\n|\n|\r/);
    const start = lines.findIndex(x => x.indexOf('@lc code=start') !== -1);
    const end = lines.findIndex(x => x.indexOf('@lc code=end') !== -1);

    if (start !== -1 && end !== -1 && start + 1 <= end) {
      return lines.slice(start + 1, end).join(os.EOL);
    }

    return data;
  };

  public render(tpl, data) {
    const tplfile = path.join(__dirname, "..", "..", "..", "resources", "templates", tpl + '.tpl');
    let result = _.template(this.data(tplfile).replace(/\r\n/g, '\n'))(data);
    if (this.isWindows()) {
      result = result.replace(/\n/g, '\r\n');
    } else {
      result = result.replace(/\r\n/g, '\n');
    }
    return result;
  };

  public fmt(format, data) {
    return _.template(format)(data);
  };

  public metaByName(filename) {
    const m = Object.assign({}, defaultMETA, {});

    m.id = file.name(filename).split('.')[0];


    if (filename.endsWith('.py3') || filename.endsWith('.python3.py'))
      m.lang = 'python3';
    else
      m.lang = require('./helper').extToLang(filename);

    return m;
  };

  public meta(filename) {
    const m = Object.assign({}, defaultMETA, {});


    const line = this.data(filename).split('\n')
      .find(x => x.indexOf(' @lc app=') >= 0) || '';

    // @lc app=leetcode.cn id=剑指 Offer II 116 lang=cpp

    let id_right = line.split('id=')[1];
    let lang_cat = id_right.split('lang=');
    let id = lang_cat[0].trim();
    let lang = lang_cat[1].trim();
    m.id = id;
    m.fid = id;
    m.lang = lang;
    return m;
  };

}

export const file: File = new File();
