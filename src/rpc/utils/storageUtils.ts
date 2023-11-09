/*
 * Filename: https://github.com/ccagml/leetcode-extension/src/rpc/storageUtils.ts
 * Path: https://github.com/ccagml/leetcode-extension
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
  writeCase: Array<any>;
}

//Object.assign({}, defaultMETA, {})
export const defaultMETA: IMETA = {
  id: "",
  fid: "",
  lang: "",
  writeCase: [],
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
    this.mkdir(this.homeDir());
    this.initCache();
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
    const config = require("./configUtils");
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
          mtimeMs: stat.mtimeMs,
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
    return fs.existsSync(fullpath) ? fs.readFileSync(fullpath).toString() : null;
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

  /**
   * name
   */
  public getAllCase(a_desc) {
    let new_desc = a_desc.replace(/<\/sup>/gm, "").replace(/<sup>/gm, "^");
    new_desc = require("he").decode(require("cheerio").load(new_desc).root().text());
    // NOTE: wordwrap internally uses '\n' as EOL, so here we have to
    // remove all '\r' in the raw string.
    new_desc = new_desc.replace(/\r\n/g, "\n").replace(/^ /gm, "");
    let input = require("wordwrap")(120)(new_desc).split("\n");
    let temp_test: Array<any> = [];
    let start_flag = false;
    let temp_collect = "";
    for (let all_input = 0; all_input < input.length; all_input++) {
      const element = input[all_input];
      let check_input_1 = element.indexOf("输入：");
      let check_input_2 = element.indexOf("输入:");
      let check_input_3 = element.indexOf("Input:");
      if (check_input_1 != -1 || check_input_2 != -1 || check_input_3 != -1) {
        if (check_input_1 != -1) {
          temp_collect += element.substring(check_input_1 + 3);
        } else if (check_input_2 != -1) {
          temp_collect += element.substring(check_input_2 + 3);
        } else if (check_input_3 != -1) {
          temp_collect += element.substring(check_input_3 + 6);
        }

        start_flag = true;
        continue;
      }

      let check_index_1 = element.indexOf("输出：");
      let check_index_2 = element.indexOf("输出:");
      let check_index_3 = element.indexOf("Output:");
      if (check_index_1 != -1 || check_index_2 != -1 || check_index_3 != -1) {
        start_flag = false;
      }
      if (start_flag) {
        temp_collect += element;
      } else {
        if (temp_collect.length > 0) {
          let new_ele = temp_collect;
          let temp_case: Array<any> = [];
          let wait_cur = "";
          let no_need_flag = false;

          // 1040题的输入不标准 没有 x = aaa
          if (temp_collect.indexOf("=") == -1) {
            temp_case.push(temp_collect.trim());
          } else {
            // 解析 x = aaa, y = bbb 之类的输入参数
            for (let index = new_ele.length - 1; index >= 0; index--) {
              if (no_need_flag) {
                if (new_ele[index] == ",") {
                  no_need_flag = false;
                }
              } else {
                if (new_ele[index] == "=") {
                  temp_case.push(wait_cur.trim());
                  no_need_flag = true;
                  wait_cur = "";
                } else {
                  wait_cur = new_ele[index] + wait_cur;
                }
              }
            }
          }

          let new_temp_case: Array<any> = [];
          for (let tci = temp_case.length - 1; tci >= 0; tci--) {
            new_temp_case.push(temp_case[tci]);
          }
          temp_test.push(new_temp_case);
          temp_collect = "";
        }
      }
    }

    return temp_test;
  }

  // 加载输出模板数据
  public render(tpl, data) {
    const tplfile = path.join(__dirname, "..", "..", "..", "..", "resources", "templates", tpl + ".tpl");
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

  // 去掉头尾的\n
  public deleteWriteCaseHeadENDn(testCase) {
    // if (testCase.length < 3) {
    //   return testCase;
    // }
    let start = 0;
    let end = testCase.length - 1;
    let flag = false;
    while (start < end - 1 && testCase[start] == "\n") {
      start++;
      flag = true;
    }
    while (end >= 1 && testCase[end] == "\n") {
      end--;
      flag = true;
    }
    if (flag) {
      return testCase.substring(start, end + 1);
    }
    return testCase;
  }

  // 去除测试用例前的注释符号, 测试用例 可能有某些语言的注释符号, 例如 844题的#
  // 有些题目的用例是空格如125题
  public fix_lineContent(lineContent) {
    let cut_pos = 0;
    for (let left = 0; left < lineContent.length; left++) {
      if (lineContent[left] == "#") {
        continue;
      }
      if (lineContent[left] == "/" && lineContent[left + 1] == "/") {
        left++;
        continue;
      }
      if (lineContent[left] == "-" && lineContent[left + 1] == "-") {
        left++;
        continue;
      }
      if (lineContent[left] == " ") {
        continue;
      }
      cut_pos = left;
      break;
    }
    return lineContent.substring(cut_pos).replace(/\s+$/g, "");
  }

  public meta(filename) {
    const m = Object.assign({}, defaultMETA, {});

    let file_info = this.getData(filename).split("\n");

    let temp_test: Array<any> = [];
    let caseFlag: boolean = false;
    let curCase = "";

    for (let all_input = 0; all_input < file_info.length; all_input++) {
      const lineContent = file_info[all_input];
      if (caseFlag && lineContent.indexOf("@lcpr case=end") < 0) {
        curCase += this.fix_lineContent(lineContent).replace(/\\n/g, "\n");
      }
      // 收集所有用例
      if (lineContent.indexOf("@lcpr case=start") >= 0) {
        caseFlag = true;
      }
      if (caseFlag && lineContent.indexOf("@lcpr case=end") >= 0) {
        temp_test.push(this.deleteWriteCaseHeadENDn(curCase));
        curCase = "";
        caseFlag = false;
      }
      if (lineContent.indexOf(" @lc app=") >= 0) {
        // @lc app=leetcode.cn id=剑指 Offer II 116 lang=cpp
        let id_right = lineContent.split("id=")[1];
        let lang_cat = id_right.split("lang=");
        let id = lang_cat[0].trim();
        let lang = lang_cat[1].trim();
        m.id = id;
        m.fid = id;
        m.lang = lang;
      }
      m.writeCase = temp_test;
    }
    return m;
  }
}

export const storageUtils: StorageUtils = new StorageUtils();
