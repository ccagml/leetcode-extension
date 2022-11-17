/*
 * Filename: https://github.com/ccagml/vscode-leetcode-problem-rating/src/RemoteCall/storageUtils.ts
 * Path: https://github.com/ccagml/vscode-leetcode-problem-rating
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

let fs = require("fs");
let os = require("os");
let path = require("path");

let _ = require("underscore");
let mkdirp = require("mkdirp");

export interface IMETA {
  id: string;
  fid: string;
  lang: string;
}

//Object.assign({}, defaultMETA, {})
export const defaultMETA: IMETA = {
  id: "",
  fid: "",
  lang: "",
};

class StorageUtils {
  public storageFileInfo = {
    bash: {
      ext: ".sh",
      start: "#",
      line: "#",
      end: "#",
      singleLine: "#",
    },
    c: {
      ext: ".c",
      start: "/*",
      line: " *",
      end: " */",
      singleLine: "//",
    },
    cpp: {
      ext: ".cpp",
      start: "/*",
      line: " *",
      end: " */",
      singleLine: "//",
    },
    csharp: {
      ext: ".cs",
      start: "/*",
      line: " *",
      end: " */",
      singleLine: "//",
    },
    golang: {
      ext: ".go",
      start: "/*",
      line: " *",
      end: " */",
      singleLine: "//",
    },
    java: {
      ext: ".java",
      start: "/*",
      line: " *",
      end: " */",
      singleLine: "//",
    },
    javascript: {
      ext: ".js",
      start: "/*",
      line: " *",
      end: " */",
      singleLine: "//",
    },
    kotlin: {
      ext: ".kt",
      start: "/*",
      line: " *",
      end: " */",
      singleLine: "//",
    },
    mysql: {
      ext: ".sql",
      start: "--",
      line: "--",
      end: "--",
      singleLine: "--",
    },
    php: {
      ext: ".php",
      start: "/*",
      line: " *",
      end: " */",
      singleLine: "//",
    },
    python: {
      ext: ".py",
      start: "#",
      line: "#",
      end: "#",
      singleLine: "#",
    },
    python3: {
      ext: ".py",
      start: "#",
      line: "#",
      end: "#",
      singleLine: "#",
    },
    ruby: {
      ext: ".rb",
      start: "#",
      line: "#",
      end: "#",
      singleLine: "#",
    },
    rust: {
      ext: ".rs",
      start: "/*",
      line: " *",
      end: " */",
      singleLine: "//",
    },
    scala: {
      ext: ".scala",
      start: "/*",
      line: " *",
      end: " */",
      singleLine: "//",
    },
    swift: {
      ext: ".swift",
      start: "/*",
      line: " *",
      end: " */",
      singleLine: "//",
    },
    typescript: {
      ext: ".ts",
      start: "/*",
      line: " *",
      end: " */",
      singleLine: "//",
    },
  };

  getFileExtByLanguage(lang) {
    const res = this.storageFileInfo[lang];
    return res ? res.ext : ".raw";
  }

  getCommentStyleByLanguage(lang) {
    const res = this.storageFileInfo[lang];
    return res;
  }

  public init() {
    _.templateSettings = {
      evaluate: /\{\{(.+?)\}\}/g,
      interpolate: /\$\{(.+?)\}/g,
    };
    this.mkdir(this.homeDir());
  }

  public isWindows() {
    return process.platform === "win32";
  }

  public userHomeDir() {
    return process.env.HOME || process.env.USERPROFILE;
  }

  public homeDir() {
    return path.join(this.userHomeDir(), ".lcpr");
  }

  public appDir() {
    const config = require("./config");
    return path.join(this.homeDir(), config.app || "leetcode");
  }

  // 缓存目录
  public cacheDir() {
    return path.join(this.appDir(), "cache");
  }

  // 代码目录
  public codeDir(dir) {
    return path.join(__dirname, dir || "");
  }

  // 缓存目录文件
  public cacheFile(k) {
    return path.join(this.cacheDir(), k + ".json");
  }

  // public configFile() {
  //   return path.join(this.homeDir(), 'config.json');
  // };

  // 插件代码目录
  public listCodeDir(dir) {
    dir = this.codeDir(dir);
    let that = this;
    return this.list(dir).map(function (f) {
      const fullpath = path.join(dir, f);
      const ext = path.extname(f);
      const name = path.basename(f, ext);

      let data = null;
      switch (ext) {
        case ".js":
          data = require(fullpath).pluginObj;
          break;
        case ".json":
          data = JSON.parse(that.getData(fullpath));
          break;
      }
      return { name: name, data: data, file: f };
    });
  }

  public initCache() {
    this.mkdir(this.cacheDir());
  }
  public deleteAllCache() {
    this.listCache().forEach((value) => {
      this.delCache(value.name);
    });
  }

  public getCache(k) {
    const fullpath = this.cacheFile(k);
    if (!this.exist(fullpath)) return null;

    return JSON.parse(this.getData(fullpath));
  }

  public setCache(k, v) {
    const fullpath = this.cacheFile(k);
    this.write(fullpath, JSON.stringify(v));
    return true;
  }

  public delCache(k) {
    const fullpath = this.cacheFile(k);
    if (!this.exist(fullpath)) return false;

    this.rm(fullpath);
    return true;
  }

  public listCache(): Array<any> {
    let that = this;
    return this.list(this.cacheDir())
      .filter((x) => path.extname(x) === ".json")
      .map(function (filename) {
        const k = path.basename(filename, ".json");
        const stat = that.stat(that.cacheFile(k));
        return {
          name: k,
          size: stat.size,
          mtime: stat.mtime,
        };
      });
  }

  public mkdir(fullpath) {
    if (fs.existsSync(fullpath)) return;
    mkdirp.sync(fullpath);
  }

  public exist(fullpath) {
    return fs.existsSync(fullpath);
  }

  public rm(fullpath) {
    return fs.unlinkSync(fullpath);
  }

  public mv(src, dst) {
    return fs.renameSync(src, dst);
  }

  public list(dir) {
    return fs.readdirSync(dir);
  }

  public stat(fullpath) {
    return fs.statSync(fullpath);
  }

  public write(fullpath, data) {
    return fs.writeFileSync(fullpath, data);
  }

  public name(fullpath) {
    return path.basename(fullpath, path.extname(fullpath));
  }

  public getData(fullpath) {
    return fs.existsSync(fullpath)
      ? fs.readFileSync(fullpath).toString()
      : null;
  }

  // 获取要提交测试的数据
  public codeData(fullpath) {
    const data = this.getData(fullpath);

    if (data === null) {
      return null;
    }

    const lines = data.split(/\r\n|\n|\r/);
    const start = lines.findIndex((x) => x.indexOf("@lc code=start") !== -1);
    const end = lines.findIndex((x) => x.indexOf("@lc code=end") !== -1);

    if (start !== -1 && end !== -1 && start + 1 <= end) {
      return lines.slice(start + 1, end).join(os.EOL);
    }

    return data;
  }

  // 加载输出模板数据
  public render(tpl, data) {
    const tplfile = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "resources",
      "templates",
      tpl + ".tpl"
    );
    let result = _.template(this.getData(tplfile).replace(/\r\n/g, "\n"))(data);
    if (this.isWindows()) {
      result = result.replace(/\n/g, "\r\n");
    } else {
      result = result.replace(/\r\n/g, "\n");
    }
    return result;
  }

  public fmt(format, data) {
    return _.template(format)(data);
  }

  public meta(filename) {
    const m = Object.assign({}, defaultMETA, {});
    const line =
      this.getData(filename)
        .split("\n")
        .find((x) => x.indexOf(" @lc app=") >= 0) || "";
    // @lc app=leetcode.cn id=剑指 Offer II 116 lang=cpp
    let id_right = line.split("id=")[1];
    let lang_cat = id_right.split("lang=");
    let id = lang_cat[0].trim();
    let lang = lang_cat[1].trim();
    m.id = id;
    m.fid = id;
    m.lang = lang;
    return m;
  }
}

export const storageUtils: StorageUtils = new StorageUtils();
