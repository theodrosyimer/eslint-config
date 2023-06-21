// This is a patch so that eslint will load the plugins as dependencies. Otherwise we can to install EVERYTHING in th root project
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  extends: ['airbnb-base', 'prettier', 'plugin:react/recommended'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 'latest',
    ecmaFeatures: {
      impliedStrict: true,
      classes: true,
    },
    babelOptions: { presets: ['@babel/preset-react'] },
    sourceType: 'module',
  },

  env: {
    browser: true,
    es2022: true,
    node: true,
    jest: true,
    jquery: true,
  },
  plugins: ['html', 'prettier', 'babel', 'react', 'react-hooks', 'jsx-a11y'],
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
        printWidth: 80,
        tabWidth: 2,
        semi: false,
        endOfLine: 'lf',
        trailingComma: 'es5',
      },
    ],
    camelcase: ['warn', { ignoreDestructuring: false }],
    'arrow-body-style': ['error', 'as-needed'],
    'consistent-return': 'off',
    'func-names': ['error', 'as-needed', { generators: 'never' }],
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
    'no-alert': 'off',
    'no-async-promise-executor': 'error',
    'no-await-in-loop': 'error',
    'no-console': 'off',
    'no-debugger': 'off',
    'no-empty-function': ['error', { allow: ['constructors'] }],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-plusplus': 'off',
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'no-return-assign': ['error', 'except-parens'],
    'no-unused-vars': [
      'warn',
      {
        args: 'none',
        ignoreRestSiblings: true,
        argsIgnorePattern: 'res|next|^err',
      },
    ],

    'no-param-reassign': ['error', { props: false }],
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
      {
        functions: false,
        classes: true,
        variables: true,
      },
    ],
    'no-var': 'error',
    // 'no-unused-expressions': [
    //   'error',
    //   {
    //     'allowTaggedTemplates': true
    //   }
    // ],
    'prefer-const': ['error', { destructuring: 'all' }],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          multiline: true,
          minProperties: 2,
        },
        ObjectPattern: { multiline: true },
        ImportDeclaration: { multiline: true },
        ExportDeclaration: {
          multiline: true,
          minProperties: 3,
        },
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
    radix: ['error', 'as-needed'],
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
    'spaced-comment': ['error', 'always', { block: { markers: ['?', '?.'] } }],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'ignore',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'babel/no-invalid-this': 'error',
    'import/prefer-default-export': 'off',
    import: 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/webpack.*.js', '**/*.test.js', '**/*.spec.js'] },
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
    // 'react/jsx-filename-extension': 0,
    'react/display-name': 1,
    'react/no-array-index-key': 0,
    'react/react-in-jsx-scope': 0,
    'react/prefer-stateless-function': 0,
    'react/forbid-prop-types': 0,
    'react/prop-types': 0,
    'react/no-unescaped-entities': 0,
    'react/function-component-definition': 0,
    'jsx-a11y/accessible-emoji': 0,
    'jsx-a11y/label-has-associated-control': ['error', { assert: 'either' }],
    'react/require-default-props': 0,
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx', '.mdx', '.ejs'] },
    ],
    'jsx-a11y/href-no-hash': 'off',
    'jsx-a11y/anchor-is-valid': ['warn', { aspects: ['invalidHref'] }],
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 1,
    '@typescript-eslint/comma-dangle': ['off'],
    'react/jsx-props-no-spreading': 'off',
  },
}
