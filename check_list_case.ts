// const fs = require("fs");
// const path = require("path");

// // 指定要遍历的目录路径
// const directoryPath = "./src";

// // 递归遍历目录并获取所有.ts文件
// function getTsFiles(dir) {
//   const files = fs.readdirSync(dir);
//   const tsFiles: any = [];

//   files.forEach((file) => {
//     const filePath = path.join(dir, file);
//     const stat = fs.statSync(filePath);

//     if (stat.isDirectory()) {
//       tsFiles.push(...getTsFiles(filePath)); // 递归处理子目录
//     } else if (file.endsWith(".ts")) {
//       tsFiles.push(filePath);
//     }
//   });

//   return tsFiles;
// }

// const tsFiles = getTsFiles(directoryPath);

// console.log("所有.ts文件：", tsFiles);
const fs = require("fs");
const path = require("path");

// 指定要遍历的目录路径
const directoryPath = "./src";

// 递归遍历目录并获取所有.ts文件
function getTsFiles(dir) {
  const files = fs.readdirSync(dir);
  const tsFiles: any = [];

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      tsFiles.push(...getTsFiles(filePath)); // 递归处理子目录
    } else if (file.endsWith(".ts")) {
      tsFiles.push(filePath);
    }
  });

  return tsFiles;
}

// 读取文件内容并查找listNotificationInterests函数
function findListNotificationInterestsContent(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const regex = /listNotificationInterests\(\): string\[\] {\s*return\s*\[([\s\S]*?)\s*\];/m;
  const matches = fileContent.match(regex);

  if (matches && matches[1]) {
    // 获取返回内容
    const content = matches[1]
      .replace(/['"]+/g, "") // 去除引号
      .split(",") // 分割成数组
      .map((item) => item.trim()); // 移除空白字符

    return content;
  }

  return null;
}

const tsFiles = getTsFiles(directoryPath);

// 读取文件内容并查找listNotificationInterests函数
function findListContent(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf8");
  // 匹配 handleNotification 函数
  const handleNotificationRegex = /async\s+handleNotification\s*\(.*\)\s*{([\s\S]*?)}/;
  const handleNotificationMatches = handleNotificationRegex.exec(fileContent);

  if (handleNotificationMatches && handleNotificationMatches[1]) {
    const handleNotificationContent = handleNotificationMatches[1];

    let caseRegex = /case\s+.*?:([\s\S]*?)(?=case\s+|$)/g;
    let caseMatches = handleNotificationContent.match(caseRegex);
    let new_result: any = [];
    if (caseMatches) {
      caseMatches.forEach(function (caseMatch) {
        let trimmedCaseMatch = caseMatch.match(/case\s+(.*?):([\s\S]*)/);
        if (trimmedCaseMatch) {
          new_result.push(trimmedCaseMatch[1]);
        }

        // if (trimmedCaseMatch && !content.includes(trimmedCaseMatch[1])) {
        //   console.log(filePath, "没有:", trimmedCaseMatch[1], "\n");
        // }
      });
    }
    return new_result;
  }
}

tsFiles.forEach((filePath) => {
  const all_listen = findListNotificationInterestsContent(filePath);
  let all_case = findListContent(filePath);
  if (all_case) {
    all_case.forEach((element) => {
      if (!all_listen.includes(element)) {
        console.log(filePath, "没有:", element, "\n");
      }
    });
  }
});
