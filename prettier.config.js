/**
 * @see https://prettier.io/docs/configuration
 * @type {import('prettier').Config}
 * @see https://github.com/kurttheviking/prettier-plugin-pkg
 */
const config = {
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'lf',
  experimentalTernaries: false,
  jsxSingleQuote: true,
  printWidth: 100,
  proseWrap: 'preserve',
  semi: false,
  singleAttributePerLine: false,
  singleQuote: true,
  trailingComma: 'all',
  plugins: ['prettier-plugin-pkg'],
}

export default config
