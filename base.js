import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import tsParser from '@typescript-eslint/parser'
import globals from 'globals'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import eslintPluginImport from 'eslint-plugin-import'

export const baseConfig = {
  ignores: [
    '.expo',
    '.next',
    'build',
    'dist',
    'coverage',
    'html',
    '**/node_modules',
    'babel.config.js',
    'metro.config.js',
  ],
}

export const baseLanguageOptions = {
  globals: {
    ...globals.node,
    ...globals.jest,
  },
  parser: tsParser,
  ecmaVersion: 'latest',
  sourceType: 'module',
  parserOptions: {},
}

export const baseSettings = {
  'import/resolver': {
    typescript: true,
    node: true,
  },
}

export const baseRules = {
  eqeqeq: [
    'error',
    'always',
    {
      null: 'ignore',
    },
  ],
  'no-await-in-loop': 'off',
  '@typescript-eslint/array-type': 'off',
  '@typescript-eslint/consistent-type-definitions': 'off',
  '@typescript-eslint/consistent-type-imports': [
    'error',
    {
      prefer: 'type-imports',
      fixStyle: 'separate-type-imports',
    },
  ],
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-extraneous-class': [
    'warn',
    {
      allowEmpty: true,
    },
  ],
  '@typescript-eslint/no-misused-promises': [
    'error',
    {
      checksVoidReturn: {
        attributes: false,
      },
    },
  ],
  '@typescript-eslint/no-unnecessary-condition': 'error',
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    },
  ],
  '@typescript-eslint/no-unsafe-argument': 'warn',
  '@typescript-eslint/require-await': 'off',
  'sort-imports': [
    'error',
    {
      ignoreDeclarationSort: true,
    },
  ],
  'import/order': [
    'error',
    {
      groups: [['builtin'], ['external'], ['internal'], ['parent', 'sibling', 'index']],
      pathGroups: [
        {
          pattern: '@/**',
          group: 'internal',
          position: 'after',
        },
      ],
      pathGroupsExcludedImportTypes: ['builtin'],
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
    },
  ],
}

export const baseOverrides = [
  {
    // Test-specific overrides
    files: ['tests/**/*.ts', '**/*spec.ts', '**/*test.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      'max-lines-per-function': 'off',
      'max-nested-callbacks': 'off',
    },
  },
  {
    // JavaScript-specific overrides
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    rules: {
      ...tseslint.configs.disableTypeChecked.rules,
    },
  },
]

export const baseRecommendedConfig = [
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  eslintPluginImport.flatConfigs.recommended,
  eslintConfigPrettier,
]
