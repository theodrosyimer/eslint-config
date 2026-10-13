import { fixupPluginRules } from '@eslint/compat'
import pluginQuery from '@tanstack/eslint-plugin-query'
import { defineConfig } from 'eslint/config'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'

import {
  baseConfig,
  baseRecommendedConfig,
  baseLanguageOptions,
  baseSettings,
  baseRules,
  baseOverrides,
} from './base.js'

// Web-only React: the React config without eslint-plugin-react-native, its
// globals, and its Expo / NativeWind allowances; browser globals instead.
// eslint-plugin-react 7.37.5 still calls context methods ESLint 10 removed.
const fixedReact = fixupPluginRules(react)

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
  ...pluginQuery.configs['flat/recommended'],
  {
    languageOptions: {
      ...baseLanguageOptions,
      globals: {
        ...baseLanguageOptions.globals,
        ...globals.browser,
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
            { from: 'package', name: 'init', package: 'i18next' },
            { from: 'file', name: 'invalidateQueries' },
          ],
        },
      ],
      '@typescript-eslint/no-require-imports': [
        'error',
        {
          allow: ['@/scripts/*', 'tailwindcss-animate', 'package.json', 'node:', 'zod', 'dotenv'],
        },
      ],
    },
  },
  [
    ...baseOverrides,
    {
      files: ['**/*.tsx', '**/*.jsx'],
      rules: {
        'react/react-in-jsx-scope': 'off',
      },
    },
  ],
)
