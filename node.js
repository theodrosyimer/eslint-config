import tseslint from 'typescript-eslint'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
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
  {
    plugins: {
      typescriptEslint,
      eslintPluginImport,
    },
    languageOptions: {
      ...baseLanguageOptions,
      parserOptions: {
        ...baseLanguageOptions.parserOptions,
        tsconfigRootDir: import.meta.dirname,
        project: ['./tsconfig.eslint.json'],
      },
    },
    settings: baseSettings,
    rules: {
      ...baseRules,
      '@typescript-eslint/no-floating-promises': [
        'error',
        {
          allowForKnownSafeCalls: [{ from: 'file', name: 'invalidateQueries' }],
        },
      ],
      '@typescript-eslint/no-require-imports': [
        'error',
        {
          allow: ['package.json', 'path', 'zod', 'dotenv', '@/scripts/*'],
        },
      ],
    },
  },
  ...baseOverrides,
)
