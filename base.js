import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import tsParser from '@typescript-eslint/parser'
import globals from 'globals'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import eslintPluginImport from 'eslint-plugin-import'
import onlyWarn from 'eslint-plugin-only-warn'

export const baseConfig = {
  ignores: [
    '**/*.json',
    '**/dist/**',
    '**/node_modules/**',
    '**/coverage/**',
    '**/build/**',
    '**/output/**',
    '**/lib/**',
    '**/html/**',
    '**/.turbo/**',
    '**/.expo/**',
    '**/.next/**',
    'eslint.config.*',
    'babel.config.js',
    'metro.config.js',
  ],
}

export const baseLanguageOptions = {
  globals: {
    ...globals.node,
  },
  parser: tsParser,
  ecmaVersion: 'latest',
  sourceType: 'module',
  parserOptions: {
    projectService: true,
  },
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
  'no-use-before-define': ['error', { functions: false }],
  'preserve-caught-error': [
    'error',
    {
      requireCatchParameter: true,
    },
  ],
  '@typescript-eslint/array-type': 'off',
  '@typescript-eslint/consistent-type-definitions': 'off',
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
  // The non-null assertion `!` is banned, along with the three ways round it.
  // `!` asserts something no test can fail on: it silences the checker at one
  // expression and leaves nothing behind that would notice when the assumption
  // stops holding. Every case has an alternative that keeps the check — narrow
  // it, guard it where the guard is reachable, or carry the value instead of
  // reaching back for it.
  //
  // Two of these are the real gap: `no-non-null-assertion` and
  // `-asserted-nullish-coalescing` ship in typescript-eslint's `strict` preset,
  // and baseRecommendedConfig extends recommendedTypeChecked + stylisticTypeChecked,
  // which do not include them. The other two already arrive via `recommended`
  // and are pinned here so a preset reshuffle cannot silently drop them.
  // None of the four need type information, so they cost nothing.
  '@typescript-eslint/no-non-null-assertion': 'error',
  '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
  '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
  '@typescript-eslint/no-extra-non-null-assertion': 'error',
  // Same family, same reason: `as` re-labels a value without checking it.
  // `stylisticTypeChecked` already enables this rule, but with the default
  // `assertionStyle: 'as'`, which only picks a SYNTAX. 'never' is what actually
  // bans it. `as const` is unaffected — the rule always permits const
  // assertions — so `satisfies` + `as const` idioms keep working.
  // The interop exception lives in baseOverrides below, by path.
  '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
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
        {
          pattern: '#/**',
          group: 'internal',
          position: 'after',
        },
        {
          pattern: '~/**',
          group: 'internal',
          position: 'after',
        },
        {
          pattern: '@docker/**',
          group: 'internal',
          position: 'after',
        },
        {
          pattern: '@scripts/**',
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
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
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
  {
    // Third-party interop — the one place `as` is allowed.
    //
    // The exception is SEMANTIC ("this value crosses a boundary we do not own"),
    // and a path can only approximate it. This covers the hexagonal layout where
    // adapters, repositories and mappers live; anywhere else, the escape is an
    // inline disable carrying a reason, which is greppable and reviewable in a
    // way a whole exempt directory is not.
    //
    // Deliberately NOT extended to tests: a cast in a test is usually a fixture
    // that should be typed, not interop.
    files: ['**/infrastructure/**/*.ts', '**/infrastructure/**/*.tsx'],
    rules: {
      '@typescript-eslint/consistent-type-assertions': 'off',
    },
  },
]

export const baseRecommendedConfig = [
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  eslintPluginImport.flatConfigs.recommended,
  eslintConfigPrettier,
  {
    plugins: {
      'only-warn': onlyWarn,
    },
  },
]
