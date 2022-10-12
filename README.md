<p align="center">
  <a href="https://github.com/ccagml/vscode-leetcode-problem-rating/actions/workflows/release.yml">
    <img src="https://img.shields.io/github/workflow/status/ccagml/vscode-leetcode-problem-rating/release?style=flat-square" alt="">
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=ccagml.vscode-leetcode-problem-rating">
    <img src="https://img.shields.io/visual-studio-marketplace/d/ccagml.vscode-leetcode-problem-rating.svg?style=flat-square" alt="">
  </a>
  <a href="https://github.com/ccagml/vscode-leetcode-problem-rating/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/ccagml/vscode-leetcode-problem-rating" alt="">
  </a>
</p>

# 概要设计(Outline design)
- 在 VS Code 中解决 Leetcode 问题
- Leetcode 只提供了简单、中等、困难的难度区分。题目与题目之间难度差别很大，因此需要客观的分数对题目难度进行打分
- 增加中文官方的每日一题
- 修复tag分类错误
- 增加精选分类
- 增加剑指Offer、面试金典相关内容
- 增加一键提交全部题目测试用例功能

# 项目地址(project address)
- https://github.com/ccagml/vscode-leetcode-problem-rating/
# 报告问题(report problem)
- https://github.com/ccagml/vscode-leetcode-problem-rating/issues

# 项目依赖(project dependencies)
## vscode插件(vscode plugin)
- https://github.com/LeetCode-OpenSource/vscode-leetcode/
## 题目难度分(Difficulty score)
- https://github.com/zerotrac/leetcode_problem_rating/

# 新增内容(new content)
- 在基础插件上增加了难度分的显示、查询、筛选操作
- Added difficulty score display, query, and filter operations to the basic plug-in


<!-- ## 编译插件的相关信息
### 系统信息
```
PRETTY_NAME="Ubuntu 22.04 LTS"
NAME="Ubuntu"
VERSION_ID="22.04"
VERSION="22.04 (Jammy Jellyfish)"
VERSION_CODENAME=jammy
ID=ubuntu
ID_LIKE=debian
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
UBUNTU_CODENAME=jammy
```

### node版本
```
    v16.17.0
```
### npm版本
```
    8.15.0
```
### 更新指令
```
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```

### 安装node依赖
```
    npm install
```
### 编译ts生成js
```
    tsc
```

### 打包生成vscode插件
#### 安装vsce
```
    sudo npm i vsce -g
```
#### 执行打包
```
    vsce package
```

 -->
