module.exports = {
  extends: ['airbnb-base', 'prettier'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 'latest',
    ecmaFeatures: {
      impliedStrict: true,
      classes: true,
    },
    sourceType: 'module',
  },

  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
    shelljs: true,
    applescript: true,
  },
  plugins: ['html', 'prettier', 'babel'],
  settings: {
    'html/indent': '+2',
    'html/report-bad-indent': 'error',
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'avoid',
        singleQuote: true,
        quoteProps: 'as-needed',
        printWidth: 90,
        tabWidth: 2,
        semi: false,
        endOfLine: 'lf',
        trailingComma: 'es5',
      },
    ],
    'arrow-body-style': [2, 'as-needed'],
    'consistent-return': 0,
    'func-names': [2, 'as-needed', { generators: 'never' }],
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
    'no-alert': 0,
    'no-async-promise-executor': 2,
    'no-await-in-loop': 0,
    'no-console': 0,
    'no-debugger': 0,
    'no-empty-function': ['error',{allow: ['constructors']}],
    'no-multiple-empty-lines': ['error',{max: 1}],
    'no-plusplus': 0,
    'no-restricted-syntax': [2, 'ForInStatement', 'LabeledStatement', 'WithStatement'],
    'no-return-assign': ['error', 'except-parens'],
    'no-unused-vars': [
      1,
      {
        args: 'none',
        ignoreRestSiblings: true,
        argsIgnorePattern: 'res|next|^err',
      },
    ],

    'no-param-reassign': [
      2,
      {
        props: false,
      },
    ],
    'no-shadow': [
      2,
      {
        hoist: 'never',
        allow: ['resolve', 'reject', 'done', 'next', 'err', 'error'],
      },
    ],
    'no-useless-constructor': 'off',
    'no-undef': 0,
    'no-underscore-dangle': 0,
    'no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true },
    ],
    'no-var': 'error',
    // 'no-unused-expressions': [
    //   2,
    //   {
    //     'allowTaggedTemplates': true
    //   }
    // ],
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
      },
    ],
    'object-curly-newline': [
      2,
      {
        multiline: true,
        consistent: true,
        minProperties: 5,
      },
    ],
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: false,
      },
    ],
    radix: 0,
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: true,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: true,
      },
    ],
    'spaced-comment': [
      'error',
      'always',
      {
        block: {
          markers: ['?', '?.'],
        },
      },
    ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'ignore',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'babel/camelcase': 1,
    // 'babel/new-cap': 1,
    'babel/no-invalid-this': 1,
    'babel/object-curly-spacing': 0,
    'babel/semi': 0,
    'babel/valid-typeof': 0,
    // 'babel/no-unused-expressions': [
    //   1,
    //   {
    //     allowTaggedTemplates: true,
    //   },
    // ],
    // 'babel/quotes': [
    //   2,
    //   'single',
    //   {
    //     avoidEscape: true,
    //     allowTemplateLiterals: true,
    //   },
    // ],
    'import/prefer-default-export': 0,
    import: 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/webpack.*.js', '**/*.test.js', '**/*.spec.js'],
      },
    ],
    'import/no-unresolved': 'off',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [
          ['builtin', 'external'],
          ['internal', 'parent', 'sibling', 'index'],
        ],
        alphabetize: {
          order: 'ignore',
          caseInsensitive: false,
        },
      },
    ],
    '@typescript-eslint/comma-dangle': ['off'],
  },
}
