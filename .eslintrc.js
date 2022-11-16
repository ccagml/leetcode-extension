module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    // 'project': './tsconfig.json',
  },
  plugins: ["@typescript-eslint"],

  /**
   * 规则写法
   * 1、'quotes': 0; -- 0关闭，1警告，2错误
   * 2、'quotes': 'off';  -- off关闭，warn警告，error错误
   * 3、'quotes': ['error', 'single'];   'error'是提示类型，'single'是参数。参数不止一个的时候写成{}
   */
  rules: {
    // 是否检查变量已申明但未使用：警告。
    "@typescript-eslint/no-unused-vars": ["warn"],
    // 强制单引号：开启，自动修正
    quotes: 0,
    // 强制分号：js 关闭，ts 强制分号。
    semi: ["off"],
    // 'semi': ['off'],
    // 定义变量时自动类型推断：关闭
    "@typescript-eslint/no-inferrable-types": ["off"],
    // 强制const：关闭
    "prefer-const": ["off"],
    // 不允许空函数：关闭
    "@typescript-eslint/no-empty-function": ["off"],
    // 禁止特定类型：关闭。  PS：如果打开 Function 类型会报错
    "@typescript-eslint/ban-types": ["off"],
    // 禁止多余的分号：关闭。  PS：打开后，某些大括号结束加分号会报错
    "@typescript-eslint/no-extra-semi": ["off"],
    // 检查函数是否有返回值：警告。   PS：有些老代码没有返回值，历史包袱重，暂时不强制报错
    "@typescript-eslint/explicit-module-boundary-types": ["warn"],
    // 禁止给变量赋值为 this：关闭。
    "@typescript-eslint/no-this-alias": ["off"],
    // 禁止使用 requires：关闭。
    "@typescript-eslint/no-var-requires": ["off"],
    // 检测无法访问的代码：关闭。   PS：有时候需要用 return 注释掉后面的代码
    "no-unreachable": ["off"],
    /**
     * 是否可以直接调用对象方法：关闭。
     * PS：暂时关闭。目前写法：myObject.hasOwnProperty('name') ,推荐写法：Object.prototype.hasOwnProperty.call(foo, "bar")
     */
    "no-prototype-builtins": ["off"],
    // 是否允许函数内定义函数：关闭。
    "no-inner-declarations": ["off"],
    // 不允许判断条件写死：关闭。       PS：打开后，if(false){} 这种判断语句会报错
    "no-constant-condition": ["off"],
    // get 和 set 是否必须放在一起：关闭。
    "@typescript-eslint/adjacent-overload-signatures": ["off"],
    "no-async-promise-executor": ["off"],
  },
  // 如果有 js 和 ts 需要分开指定的规则，就 js 写 rules 里，ts 写 overrides 里
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ["*.ts", "*.tsx"],
      rules: {
        // 强制分号：开启，自动修正
        semi: ["error", "always"],
        // '@typescript-eslint/explicit-module-boundary-types': ['error']
      },
    },
  ],
  // 定义全局变量
  globals: {
    Global: true,
  },
};
