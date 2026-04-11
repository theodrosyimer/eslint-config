import turboConfig from 'eslint-config-turbo/flat'

export const turboAddon = [
  ...turboConfig,
  {
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
    },
  },
]
