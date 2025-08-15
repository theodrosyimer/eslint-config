import tseslint from 'typescript-eslint'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactNative from 'eslint-plugin-react-native'
import eslintPluginImport from 'eslint-plugin-import'

import {
  baseConfig,
  baseRecommendedConfig,
  baseLanguageOptions,
  baseSettings,
  baseRules,
  baseOverrides,
} from './base.js'

export default tseslint.config(
  baseConfig,
  ...baseRecommendedConfig,
  react.configs.recommended,
  reactHooks.configs.recommended,
  reactNative.configs.all,
  {
    plugins: {
      typescriptEslint,
      react,
      reactNative,
      reactHooks,
      eslintPluginImport,
    },
    languageOptions: {
      ...baseLanguageOptions,
      globals: {
        ...baseLanguageOptions.globals,
        ...reactNative.environments['react-native']['react-native'],
      },
      parserOptions: {
        ...baseLanguageOptions.parserOptions,
        tsconfigRootDir: import.meta.dirname,
        project: ['./tsconfig.eslint.json'],
      },
    },
    env: {
      'react-native/react-native': true,
    },
    settings: {
      ...baseSettings,
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...baseRules,
      '@typescript-eslint/no-floating-promises': [
        'error',
        {
          allowForKnownSafeCalls: [
            {
              from: 'package',
              name: ['preventAutoHideAsync', 'hideAsync'],
              package: 'expo-router',
            },
            { from: 'package', name: 'init', package: 'i18next' },
            { from: 'file', name: 'invalidateQueries' },
          ],
        },
      ],
      '@typescript-eslint/no-require-imports': [
        'error',
        {
          allow: [
            '.*assets/*',
            '@/scripts/*',
            'nativewind/preset',
            'nativewind/theme',
            'nativewind/theme/hairlineWidth',
            'tailwindcss-animate',
            'package.json',
            'path',
            'zod',
            'dotenv',
          ],
        },
      ],
    },
  },
  [
    ...baseOverrides,
    {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      files: ['**/*.tsx', '**/*.jsx'],
      rules: {
        'react/react-in-jsx-scope': 'off',
        'react-native/no-inline-styles': 'warn',
        'react-native/no-raw-text': [
          'warn',
          {
            skip: ['TextInput', 'ThemedText', 'ThemedView', 'ButtonText', 'Button.Text'],
          },
        ],
      },
    },
  ],
)
