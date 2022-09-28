# 概要设计(Outline design)
- Leetcode 只提供了简单、中等、困难的难度区分。题目与题目之间难度差别很大，因此需要客观的分数对题目难度进行打分
- Leetcode only provides easy, medium, and hard difficulty distinctions. Difficulty varies greatly from subject to subject, so objective scores are required to rate the difficulty of the subject
# 项目地址(project address)
- https://github.com/ccagml/vscode-leetcode-problem-rating/
# 项目依赖(project dependencies)
## vscode插件(vscode plugin)
- https://github.com/LeetCode-OpenSource/vscode-leetcode/
## 题目难度分(Difficulty score)
- https://github.com/zerotrac/leetcode_problem_rating/

# 新增内容(new content)
- 在基础插件上增加了难度分的显示、查询、筛选操作
- Added difficulty score display, query, and filter operations to the basic plug-in

# 更新内容(update)

## version 1.0.10
- tag数据修复
- 去除company分类

## version 1.0.9
- github提醒依赖安全更新

## version 1.0.8
- 增加精选合集分类
- 增加剑指、杯赛题目
- 每日一题

## version 1.0.7
- 更新分数数据

## version 1.0.6
- 随机一题根据竞赛分范围来获取

## version 1.0.5
- 获取每日一题
- 如果有竞赛分会根据竞赛分显示 绿、蓝、紫、黄、红

## version 1.0.4
- 修改padLevel错误
- 自动化提交到市场

## version 1.0.3
- 题目颜色显示

## version 1.0.2
- 设置相关内容

## version 1.0.1
- 设置相关内容

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
