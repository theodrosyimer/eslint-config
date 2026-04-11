import { defineConfig } from 'eslint/config'

import {
  baseConfig,
  baseRecommendedConfig,
  baseLanguageOptions,
  baseSettings,
  baseRules,
  baseOverrides,
} from './base.js'

export default defineConfig(
  baseConfig,
  ...baseRecommendedConfig,
  {
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
