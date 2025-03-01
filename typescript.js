/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  globals: {
    React: true,
    JSX: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-native', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
    // Layer in all the JS Rules
    './.eslintrc.cjs',
  ],
  parserOptions: {
    projectService: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    'react-native/react-native': true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // this is covered by the typescript compiler, so we don't need it
    'no-undef': 'off',
    'no-shadow': 'off', // TS does it
    'space-before-function-paren': 'off',
    'react/prop-types': 'warn',
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    // Note: you must disable the base rule as it can report incorrect errors
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'warn',
      {
        functions: false,
        classes: true,
        variables: true,
        enums: true,
        typedefs: false,
        ignoreTypeReferences: true,
      },
    ],
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
        fixStyle: 'separate-type-imports',
      },
    ],
    'no-unused-vars': 'off',
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
    '@typescript-eslint/no-floating-promises': [
      'error',
      {
        allowForKnownSafeCalls: [
          {
            from: 'package',
            name: 'preventAutoHideAsync',
            package: 'expo-splash-screen',
          },
          { from: 'package', name: 'hideAsync', package: 'expo-splash-screen' },
          { from: 'package', name: 'init', package: 'i18next' },
        ],
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
    '@typescript-eslint/no-require-imports': [
      'error',
      {
        allow: ['.*assets/*'],
      },
    ],
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/no-floating-promises': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-raw-text': [
      'warn',
      {
        skip: ['TextInput', 'ThemedText', 'ThemedView', 'ButtonText', 'Button.Text'],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'always',
        singleQuote: true,
        quoteProps: 'as-needed',
        printWidth: 100,
        tabWidth: 2,
        semi: false,
        endOfLine: 'lf',
        trailingComma: 'all',
      },
    ],
  },
}

module.exports = config
