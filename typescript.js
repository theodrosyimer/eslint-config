/** @type {import("eslint").Linter.Config} */
const config = {
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
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    // Layer in all the JS Rules
    './.eslintrc.cjs',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  // Then we add our own custom typescript rules
  rules: {
    // this is covered by the typescript compiler, so we don't need it
    'no-undef': 'off',
    'no-shadow': 'off', // TS does it
    'space-before-function-paren': 'off',
    'react/prop-types': 'warn',
    // These opinionated rules are enabled in stylistic-type-checked above.
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',

    '@typescript-eslint/no-use-before-define': 'warn',
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/require-await': 'off',
    // This allows us to use async function on addEventListener(). Discussion: https://twitter.com/wesbos/status/1337074242161172486
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: { attributes: false },
      },
    ],
    '@typescript-eslint/comma-dangle': ['off'],
    '@typescript-eslint/no-explicit-any': 'off',
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': [
      'warn',
      {
        ignoreDeclarationMerge: true,
      },
    ],
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/no-floating-promises': 'off',
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

module.exports = config
