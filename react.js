import { fixupPluginRules } from '@eslint/compat'
import { defineConfig } from 'eslint/config'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactNative from 'eslint-plugin-react-native'

import {
  baseConfig,
  baseRecommendedConfig,
  baseLanguageOptions,
  baseSettings,
  baseRules,
  baseOverrides,
} from './base.js'

// eslint-plugin-react 7.37.5 and eslint-plugin-react-native 5.0.0 still call
// context methods ESLint 10 removed (getFilename, getSourceCode): 7 of 20 react
// rules and 6 of 7 react-native rules crash without this wrapper.
const fixedReact = fixupPluginRules(react)
const fixedReactNative = fixupPluginRules(reactNative)

export default defineConfig(
  baseConfig,
  ...baseRecommendedConfig,
  {
    ...react.configs.flat.recommended,
    plugins: {
      react: fixedReact,
    },
  },
  reactHooks.configs.flat['recommended-latest'],
  {
    plugins: {
      'react-native': fixedReactNative,
    },
    languageOptions: {
      ...baseLanguageOptions,
      globals: {
        ...baseLanguageOptions.globals,
        ...reactNative.environments['react-native'].globals,
      },
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
            'node:',
            'zod',
            'dotenv',
          ],
        },
      ],
      // eslint-plugin-react-native v5 has no flat config — these replace reactNative.configs.all (all rules default to 2)
      'react-native/no-unused-styles': 'error',
      'react-native/split-platform-components': 'error',
      'react-native/no-inline-styles': 'error',
      'react-native/no-color-literals': 'error',
      'react-native/no-raw-text': 'error',
      'react-native/no-single-element-style-arrays': 'error',
      'react-native/sort-styles': 'error',
    },
  },
  [
    ...baseOverrides,
    {
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
