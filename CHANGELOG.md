# version 3.1.2

- 重构 filebutton 代码, 减少代码耦合

# version 3.1.1

- 重构 log 输出 和 remark 代码, 减少代码耦合

# version 2.19.19

- win10 上 python3 调试 sys.argv 会忽略空字符串参数

# version 2.19.18

- 使用新的 mvc 代码结构修改 statusBar 相关内容
- 增加自动引入 includeTemplates 设置选项,默认引入

# version 2.19.17

- 更新基础的分数数据 data.json
- 增加一个分类 根据周赛的题目顺序分类

# version 2.19.16

- 不知道什么原因,有些账号登录后得到的登录信息会没有用户名,导致认为登录失败

# version 2.19.15

- 修改登录错误 invalid password? 提示
- 要是用浏览器在力扣官网登录账号还没过期, 插件的登录会被拒绝,使得登录失败,看起来是官方的机制?(在浏览器上把账号退出,应该就能登录了)

# version 2.19.14

- 在 ID 含有空格的题目对应的文件中，点击 Description 按钮时，无法识别题目 ID

## version 2.19.13

- 增加重试上次测试用例按钮 retest

## version 2.19.12

- 配置 filePath 文件名 ${name} ${camelcasename} ${pascalcasename} ${kebabcasename} ${kebab-case-name} ${snakecasename} ${snake_case_name} 原本参数使用英文名
- 配置 filePath 文件名 增加 ${cn_name} ${cnname} 如果有中文名称的话,使用中文名称

## version 2.19.11

- 生成区域调试参数后尝试直接发起调试

## version 2.19.10

- workspaceFolder 可以尝试从环境变量中读取数据
- 例如/home/${USERNAME}/leetcode, 现在会尝试从系统环境变量读取 USERNAME 对应的值
- 例如环境变量中 USERNAME 是 ccagml,那么就会是/home/ccagml/leetcode

## version 2.19.9

- 146 题非 Solution 类时 cpp 调试报错

## version 2.19.8

- 新增尊享 100 分类

## version 2.19.7

- 随机一题可以指定 tag 分类

## version 2.19.6

- 获取题目错误,则不生成文件

## version 2.19.5

- 子进程执行路径

## version 2.19.4

- 增加 计时器 配置是否开启

## version 2.19.3

- 修复某些情况下, allcase 没解析成功,如 1040 题

## version 2.19.2

- 修复某些情况下调用 allcase 报错,如 1017 题

## version 2.19.1

- 区域调试参数,等到使用的时候才生成
- 部分题目配置调试区后还是无法调试问题

## version 2.18.1

- 增加周赛场次信息展示

## version 2.17.8

- 替换中文题解中的 textit

## version 2.17.7

- filepath 格式可以保存在工作区,避免每次新环境还要配文件名

## version 2.17.6

- 最新的题通过后没有百分比运行信息

## version 2.17.5

- 修复 c++ 调试 断点问题

## version 2.17.4

- 多语言配置缺少 main.contributes.commands.lcpr.simpleDebug.title

## version 2.17.3

- 修改插件显示的 README

## version 2.17.2

- 修改插件显示的 README

## version 2.17.1

- 增加调试需要参数快速选择按钮

## version 2.16.1

- 增加中英文多语言的配置

## version 2.15.5

- 更改错误答案上色默认选项

## version 2.15.4

- 模板错了

## version 2.15.3

- 原插件不能调试的题目,增加区域调试参数

## version 2.15.2

- 有些题目不能 debug 的提示

## version 2.15.1

- 参考 wangtao0101/vscode-debug-leetcode 添加 debug

## version 2.14.2

- BWC96 & WC328 & WC329 数据

## version 2.14.1

- 尝试增加语言本地化

## version 2.13.4

- US 站一些报错

## version 2.13.3

- 修改 README.md

## version 2.13.2

- 增加打开 app 清空题目缓存配置(默认关闭),避免题目缓存数据不同步

## version 2.13.1

- 题解显示 katex 数学公式

## version 2.12.3

- hideScore 配置变化时刷新题目列表

## version 2.12.2

- 修复 使用${tag}作为文件夹名称不生效
- 更新 README.md

## version 2.12.1

- 配置 filePath 文件名 增加 ${yyyymmdd}格式
- 配置 filePath 文件名 增加 ${timestamp}格式

## version 2.11.16

- 修正提交结果页面耗时显示

## version 2.11.15

- 修复 测试用例块 过滤注释符号的方式

## version 2.11.14

- 修正状态栏计时器文字显示

## version 2.11.13

- 缩短项目名

## version 2.11.12

- 提交通过结果显示耗时

## version 2.11.11

- BWC95 & WC327 数据

## version 2.11.10

- 尝试修复获取不到用户名的情况

## version 2.11.9

- 修复 2.11.8 登录错误

## version 2.11.8

- 修复 可能有人会没有收藏列表数据,导致不能登录,不知道为什么会没有数据

## version 2.11.7

- 修复流水线图标

## version 2.11.6

- 增加 WC326 数据
- 修复 获取题目列表时，异常弹出语言选择框问题
- 修复 文件创建顺序

## version 2.11.5

- BWC94 & WC324 & WC325 数据

## version 2.11.4

- BWC93 & WC323 数据

## version 2.11.3

- 优化请求分数数据超时时间为 2 秒钟

## version 2.11.2

- 不再出现 tooltip 显示错误

## version 2.11.1

- 今天搬到增加 tips 显示下次时间

## version 2.10.7

- 中文题解获取错误

## version 2.10.6

- 更新工作流

## version 2.10.5

- bricks.json 格式化

## version 2.10.4

- 更新 action

## version 2.10.3

- 上锁题目显示问题

## version 2.10.2

- WC322 数据

## version 2.10.1

- 隐藏测试 api 选项

## version 2.9.1

- 增加中文题解
- 删除多余依赖包引用

## version 2.8.1

- 插入头文件,解决避免都是红色波浪线语法提示

## version 2.7.3

- 某些情况下颜色对比显示错误

## version 2.7.2

- BWC92 & WC321 数据

## version 2.7.1

- 答案不同地方简易上色

## version 2.6.3

- 今天搬砖增加添加到自定义分类选项

## version 2.6.2

- 屏蔽测试 api 选项

## version 2.6.1

- 新增题目自定义分类

## version 2.5.1

- 今日提交的分类,方便设置下次回顾时间

## version 2.4.1

- 简易 remark 功能, 用于回忆思考过程? 后续需要用这个数据生成文章

## version 2.3.2

- WC320 数据

## version 2.3.1

- 状态栏增加简单的计时器

## version 2.2.4

- 优化说明简介
- BWC91 & WC318 & WC319 数据

## version 2.2.3

- 优化说明简介

## version 2.2.2

- 更新搜索显示名字

## version 2.2.1

- 优化登录提示
- 新增工地功能

## version 2.1.1

- 修复切换账号时竞赛分显示问题

## version 2.1.0

- 重构工厂模式、责任链模式
- 去除多余模块
- 增加所有测试用例单个提交的按钮,可以自己填写测试用例
- 修改部分题目一键用例问题

## version 2.0.0

- 重构
- 现在会从[zerotrac.github.io](https://zerotrac.github.io/leetcode_problem_rating/data.json)获取数据进行缓存
- 登录选择优化

## version 1.1.10

- 更新数据

## version 1.1.9

- BWC90 & WC317 数据

## version 1.1.8

- WC316 数据

## version 1.1.7

- Windows 环境使用 VsCode 自带 node 环境,测试用例解析问题

## version 1.1.6

- 尝试不需要安装 node 环境

## version 1.1.5

- 修复 PreView Problem 题目元数据显示出错

## version 1.1.4

- BWC89 & WC315 数据

## version 1.1.3

- 修复每日一题隔天刷新问题

## version 1.1.2

- 去除多余客户端代码

## version 1.1.1

- 重新写原本的客户端
- 减少许多多余的包引用

## version 1.0.24

- 增加 314 期数据

## version 1.0.23

- 修复 README.md 中 GIF 无法显示

## version 1.0.22

- 修复排序错误
- 增加 README.md 说明

## version 1.0.21

- 修复提交全部用例问题

## version 1.0.20

- 增加单次用例提交,全部用例提交的功能

## version 1.0.19

- 修复获取题解报错

## version 1.0.18

- 增加更新状态栏的周赛数据显示

## version 1.0.17

- 更新 312、313、双周 88 期

## version 1.0.16

- 修复测试用例字符串问题
- 每日一题提交后更新状态

## version 1.0.15

- 更换 icon 使得看起来不起眼

## version 1.0.14

- 安装插件检测
- github 问题报告模板

## version 1.0.13

- 修复测试提交功能

## version 1.0.12

- 修复检出题目与标题对不上问题

## version 1.0.11

- 可以根据分数隐藏题目的设置
- 清除所有缓存功能
- 默认登录中国站

## version 1.0.10

- tag 数据修复
- 去除 company 分类

## version 1.0.9

- github 提醒依赖安全更新

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

- 修改 padLevel 错误
- 自动化提交到市场

## version 1.0.3

- 题目颜色显示

## version 1.0.2

- 设置相关内容

## version 1.0.1

- 设置相关内容
