module.exports = {
  globals: {
    React: true,
    JSX: true,
  },
  // then add some extra good stuff for Typescript
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses rules from `@typescript-eslint/eslint-plugin`,
    // 'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    // Layer in all the JS Rules
    './.eslintrc.js',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  // Then we add our own custom typescript rules
  rules: {
    'react/prop-types': 1,
    // This allows us to use async function on addEventListener(). Discussion: https://twitter.com/wesbos/status/1337074242161172486
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],
    '@typescript-eslint/comma-dangle': ['off'],
    '@typescript-eslint/no-explicit-any': 'off',
    'no-redeclare': 'off',
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': [1, { ignoreRestSiblings: true }],
    '@typescript-eslint/no-redeclare': [
      'warn',
      {
        ignoreDeclarationMerge: true,
      },
    ],
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowBoolean: true,
        allowNullish: true,
        allowAny: true,
      },
    ],
    '@typescript-eslint/no-use-before-define': 'warn',
    // this is covered by the typescript compiler, so we don't need it
    'no-undef': 'off',
    'no-shadow': 'off', // TS does it
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'always',
        singleQuote: true,
        quoteProps: 'as-needed',
        printWidth: 80,
        tabWidth: 2,
        semi: false,
        endOfLine: 'lf',
        trailingComma: 'all',
      },
    ],
  },
}
