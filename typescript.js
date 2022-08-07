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
    // This allows us to use async function on addEventListener(). Discussion: https://twitter.com/wesbos/status/1337074242161172486
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    'no-redeclare': 'off',
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
        trailingComma: 'es5',
      },
    ],
  },
}
