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
    'arrow-body-style': ['error', 'as-needed'],
    'consistent-return': 'off',
    'func-names': ['error', 'as-needed', { generators: 'never' }],
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
    'no-alert': 'off',
    'no-async-promise-executor': 'error',
    'no-await-in-loop': 'error',
    'no-console': 'off',
    'no-debugger': 'off',
    'no-empty-function': ['error',{ allow: ['constructors'] }],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-plusplus': 'off',
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
    'no-return-assign': ['error', 'except-parens'],
    'no-unused-vars': [
      'error',
      {
        args: 'none',
        ignoreRestSiblings: true,
        argsIgnorePattern: 'res|next|^err',
      },
    ],

    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'no-shadow': [
      'error',
      {
        hoist: 'never',
        allow: ['resolve', 'reject', 'done', 'next', 'err', 'error'],
      },
    ],
    'no-useless-constructor': 'off',
    'no-undef': 'off',
    'no-underscore-dangle': 'off',
    'no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true },
    ],
    'no-var': 'error',
    // 'no-unused-expressions': [
    //   'error',
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
      'error',
      {
        ObjectExpression: 'always',
        ObjectPattern: { multiline: true },
        ImportDeclaration: 'never',
        ExportDeclaration: { multiline: true, minProperties: 3 },
      },
    ],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: false,
      },
    ],
    radix: ["error", "as-needed"],
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
    'babel/camelcase': 'error',
    // 'babel/new-cap': 1,
    'babel/no-invalid-this': 'error',
    'babel/object-curly-spacing': 'off',
    'babel/semi': 'off',
    'babel/valid-typeof': 'off',
    'import/prefer-default-export': 'off',
    import: 'off',
    'import/extensions': 'off',
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
  },
}
