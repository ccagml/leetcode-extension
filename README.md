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

# 概要设计

- 在 VS Code 中解决 Leetcode 问题
- Leetcode 只提供了简单、中等、困难的难度区分。题目与题目之间难度差别很大，因此需要客观的分数对题目难度进行打分
- 增加中文官方的每日一题
- 修复 tag 分类错误
- 增加精选分类
- 增加剑指 Offer、面试金典相关内容
- 增加一键提交全部题目测试用例功能
- 尝试不需要额外安装 node 环境,使用 vscode 自带的 node 版本
- 从[zerotrac.github.io](https://zerotrac.github.io/leetcode_problem_rating/data.json)获取数据进行缓存,数据更新时,可以尝试使用 deleteAllCache,重新获取数据
- [新增区块测试用例](#区块测试用例)
- [新增搬砖功能(重复练习?)](#搬砖功能的说明)
- [状态栏增加简易计时器](#状态栏增加简易计时器)
- [新增一个 remark 功能](#新增在工作目录存放数据)
- [新增题目自定义分类](#新增在工作目录存放数据)
- [简易判断答案不同的地方](#插件配置项)

# 关于本项目

- [项目地址:https://github.com/ccagml/vscode-leetcode-problem-rating/](https://github.com/ccagml/vscode-leetcode-problem-rating/)
- [报告问题](https://github.com/ccagml/vscode-leetcode-problem-rating/issues)
- [疑难解答](https://github.com/LeetCode-OpenSource/vscode-leetcode/wiki/%E7%96%91%E9%9A%BE%E8%A7%A3%E7%AD%94)
- [常见问题](https://github.com/LeetCode-OpenSource/vscode-leetcode/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98)
- 趁着现在只有<img src="https://img.shields.io/github/stars/ccagml/vscode-leetcode-problem-rating" alt="">提交一个 PR 就能成为项目元老了

## 快速开始

![quickstart](https://www.ccagml.com/wp-content/uploads/2022/10/quickstart.gif)

## tag 分类

![tag](https://www.ccagml.com/wp-content/uploads/2022/10/tag.gif)

## 查询功能

![search](https://www.ccagml.com/wp-content/uploads/2022/10/search.gif)

## 区块测试用例

### 例子(cpp 文件为例)

```
// @lcpr case=start
// "PAYPALISHIRINGGGG"\n3\n
// @lcpr case=end
```

### 说明

- 以 @lcpr case=start 开头
- 第二行存放原本手动填写测试用例
- 以 @lcpr case=end 结尾

### 一键提交的用例去重

- 简单的比较这些用例字符串是否相同

## 状态栏增加简易计时器

- 查看一个题目时会开始计时,提交一个题目通过后会停止计时

<!-- ## TODO 看到一些可能会用得上的功能

- (完成) 在文件里面插入一些测试用例?
- (完成) 不是中文站点,直接隐藏账号密码登录的方式
- 默认的工作目录修改 不再是.leetcode(不改了)
- (完成)想做一个可以根据计算下次回顾本题的功能?
- (需要在设置的工作目录中存放多个文件?)
- (完成) Test 按钮应该不在需要 case 和 allcase 只要留下输入的功能
- 备忘录功能(数据直接放设置的工作目录?用 github 同步?)
- 获取提交历史(直接找官方的提交数据)
- 提交答案与期望答案不同的地方?
- (完成)做题目计时
- 还没出分前周赛题目显示 未评分(需要官网获取最新几期的题目编号) -->

## 搬砖功能的说明

### 功能设想

- 重复做 x 天之前的题目(正确提交后 x 天再做本题)
- 重复练习可以提高水平?(待定验证)
- 有什么学习方法可以与我交流,这个方法我也不知道有没有用

### 新增在工作目录存放数据

- 目录说明

  > workspace/ 工作目录
  >
  > > .lcpr_data/ 存数据
  > >
  > > > bricks.json
  > >
  > > > remark 备注数据
  > > >
  > > > > qid 备注 remark 数据
  > >
  > > > group.json

### bricks.json 存放格式

```
{
   version: 1,
   all_bricks: {
     [qid]: {
        submit_time: [], // 上次提交的时间
        type: 1, // 类型
     },
   },
 };

```

### group.json 存放格式

```
{
    "version": 1,
    "all_group": [
        {
            "name": "www",  // 分类名称
            "time": 1669791273308, // 分类编号
            "qid_list": [   // 该分类的题目qid
                "1000229",
                "1000231"
            ]
        }
    ]
}
```

## 运行条件

- [VS Code 1.57.0+](https://code.visualstudio.com/)
- [Node.js 10+](https://nodejs.org)
  > 注意：请确保`Node`在`PATH`环境变量中。您也可以通过设定 `leetcode.nodePath` 选项来指定 `Node.js` 可执行文件的路径。

## 插件配置项

| 配置项名称<font color=red>显示红色为与官方配置有不同的地方</font>     | 描述                                                                                                                                                                                                                                                                                                          | 默认值                                                           |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| <font color=red>leetcode-problem-rating.hideSolved</font>             | 指定是否要隐藏已解决的问题                                                                                                                                                                                                                                                                                    | `false`                                                          |
| <font color=red>leetcode-problem-rating.showLocked` </font>           | 指定是否显示付费题目，只有付费账户才可以打开付费题目                                                                                                                                                                                                                                                          | `false`                                                          |
| <font color=red>leetcode-problem-rating.defaultLanguage</font>        | 指定答题时使用的默认语言，可选语言有：`bash`, `c`, `cpp`, `csharp`, `golang`, `java`, `javascript`, `kotlin`, `mysql`, `php`, `python`,`python3`,`ruby`, `rust`, `scala`, `swift`, `typescript`                                                                                                               | `N/A`                                                            |
| <font color=red>leetcode-problem-rating.useWsl</font>                 | 指定是否启用 WSL                                                                                                                                                                                                                                                                                              | `false`                                                          |
| <font color=red>leetcode-problem-rating.endpoint</font>               | 指定使用的终端，可用终端有：`leetcode`, `leetcode-cn`                                                                                                                                                                                                                                                         | <font color=red>leetcode.cn</font>                               |
| <font color=red>leetcode-problem-rating.workspaceFolder</font>        | 指定保存文件的工作区目录                                                                                                                                                                                                                                                                                      | `""`                                                             |
| <font color=red>leetcode-problem-rating.filePath</font>               | 指定生成题目文件的相对文件夹路径名和文件名。点击查看[更多详细用法](https://github.com/LeetCode-OpenSource/vscode-leetcode/wiki/%E8%87%AA%E5%AE%9A%E4%B9%89%E9%A2%98%E7%9B%AE%E6%96%87%E4%BB%B6%E7%9A%84%E7%9B%B8%E5%AF%B9%E6%96%87%E4%BB%B6%E5%A4%B9%E8%B7%AF%E5%BE%84%E5%92%8C%E6%96%87%E4%BB%B6%E5%90%8D)。 |                                                                  |
| <font color=red>leetcode-problem-rating.enableStatusBar</font>        | 指定是否在 VS Code 下方显示插件状态栏。 <font color=red>增加周赛分数据</font>                                                                                                                                                                                                                                 | `true`                                                           |
| <font color=red>leetcode-problem-rating.editor.shortcuts</font>       | 指定在编辑器内所自定义的快捷方式。可用的快捷方式有: `submit`, `test`, `star`, `solution`, `description`, <font color=red>case</font>, <font color=red>allcase</font> 。                                                                                                                                       | <font color=red>["submit, case, allcase, test, solution"]</font> |
| <font color=red>leetcode-problem-rating.enableSideMode</font>         | 指定在解决一道题时，是否将`问题预览`、`高票答案`与`提交结果`窗口集中在编辑器的第二栏。                                                                                                                                                                                                                        | `true`                                                           |
| <font color=red>leetcode-problem-rating.nodePath</font>               | 指定 `Node.js` 可执行文件的路径。如：C:\Program Files\nodejs\node.exe                                                                                                                                                                                                                                         | `node`                                                           |
| <font color=red>leetcode-problem-rating.showCommentDescription</font> | 指定是否要在注释中显示题干。                                                                                                                                                                                                                                                                                  | `false`                                                          |
| <font color=red>leetcode-problem-rating.useEndpointTranslation</font> | 是否显示翻译版本内容。                                                                                                                                                                                                                                                                                        | `true`                                                           |
| <font color=red>leetcode-problem-rating.sortStrategy</font>           | 排序的选项。<font color=red>Acceptance Rate (Ascending):通过率递增 Acceptance Rate (Descending):通过率递减 Score (Ascending):分数递增 Score (Descending):分数递减</font>                                                                                                                                      | <font color=red>None</font>                                      |
| <font color=red>leetcode-problem-rating.pickOneByRankRangeMin</font>  | 随机一题的最小浮动,随机一题最低分(你的竞赛分+本配置)。                                                                                                                                                                                                                                                        | <font color=red>50</font>                                        |
| <font color=red>leetcode-problem-rating.pickOneByRankRangeMax</font>  | 随机一题的最大浮动,随机一题最高分(你的竞赛分+本配置)。                                                                                                                                                                                                                                                        | <font color=red>150</font>                                       |
| <font color=red>leetcode-problem-rating.hideScore</font>              | 隐藏分数相关的题目。Score:隐藏有分数的题目, NoScore:隐藏没有分数的题目, ScoreRange:隐藏分数范围外的题目                                                                                                                                                                                                       | <font color=red>None</font>                                      |
| <font color=red>leetcode-problem-rating.useVscodeNode</font>          | 默认情况下使用 VsCode 自带 Node 环境,不需要额外安装 Node 环境                                                                                                                                                                                                                                                 | <font color=red>true</font>                                      |
| <font color=red>leetcode-problem-rating.answerDiffColor</font>        | 答案不同的地方上色                                                                                                                                                                                                                                                                                            | <font color=red>false</font>                                     |

## 更新日志

请参考[更新日志](https://github.com/ccagml/vscode-leetcode-problem-rating/CHANGELOG.md)

## 鸣谢

- 本插件基于[LeetCode-OpenSource](https://github.com/LeetCode-OpenSource)的[vscode-leetcode](https://github.com/LeetCode-OpenSource/vscode-leetcode/)
- 题目分数数据基于[zerotrac](https://github.com/zerotrac)的[leetcode_problem_rating](https://github.com/zerotrac/leetcode_problem_rating/)每周的更新
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

### node 版本

```
    v16.17.0
```

### npm 版本

```
    8.15.0
```

### 更新指令

```
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```

### 安装 node 依赖

```
    npm install
```

### 编译 ts 生成 js

```
    sudo apt install node-typescript
    tsc
```

### 打包生成 vscode 插件

#### 安装 vsce

```
    sudo npm i vsce -g
```

#### 执行打包

```
    vsce package
```

-->
