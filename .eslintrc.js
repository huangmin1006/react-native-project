module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    // 数组的 map、filter、sort 等方法，回调函数必须有返回值
    'array-callback-return': 2,

    // 句末分号
    semi: [0, 'always'],

    // 禁止对变量使用 delete 关键字，删除对象的属性不受限制
    'no-delete-var': 2,

    // switch 语句必须包含 default
    'default-case': 2,

    // 禁止使用 var
    'no-var': 'error',

    // 禁止使用常量作为判断条件
    'no-constant-condition': [2, {checkLoops: false}],

    // 在定义变量之前禁止使用变量
    // 'no-use-before-define': ['error', {functions: true, classes: true}],

    // 禁止对 const 定义重新赋值
    'no-const-assign': 2,

    // 禁止 debugger 语句，提醒开发者，上线时要去掉
    'no-debugger': 'error',

    // 样式只能用变量
    'react-native/no-inline-styles': 0,

    // 没有子组件的组件可以自动闭合，以避免不必要的额外闭合标签
    'react/self-closing-comp': [
      0,
      {
        component: true,
        html: true,
      },
    ],

    // 优先使用 interface 而不是 type
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
  },
  overrides: [
    {
      // 启用专门针对TypeScript文件的规则
      files: ['*.ts', '*.tsx'],
      rules: {
        // 优先使用 interface 而不是 type
        '@typescript-eslint/consistent-type-definitions': [
          'error',
          'interface',
        ],

        // 明确函数返回类型
        // '@typescript-eslint/explicit-function-return-type': [
        //   'error',
        //   {allowTypedFunctionExpressions: true},
        // ],

        // 禁止声明空接口
        '@typescript-eslint/no-empty-interface': ['error'],

        // 禁止使用任何类型
        // '@typescript-eslint/no-explicit-any': 2,

        // 禁止空函数
        '@typescript-eslint/no-empty-function': 2,

        // 禁止使用未使用的变量
        // '@typescript-eslint/no-unused-vars': 2,

        // 在定义变量之前禁止使用变量
        '@typescript-eslint/no-use-before-define': ['error'],
      },
    },
  ],
};
