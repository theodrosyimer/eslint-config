# @thyi/eslint-config

> **An opinionated ESLint flat config for TypeScript and JavaScript projects, with React / React Native and Turborepo support**

[![npm version](https://img.shields.io/npm/v/@thyi/eslint-config.svg)](https://www.npmjs.com/package/@thyi/eslint-config)
[![npm downloads](https://img.shields.io/npm/dm/@thyi/eslint-config.svg)](https://www.npmjs.com/package/@thyi/eslint-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

- [✨ Features](#-features)
- [🚀 Quick Start](#-quick-start)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Entry Points](#entry-points)
  - [TypeScript Setup](#typescript-setup)
  - [Package.json Scripts](#packagejson-scripts)
- [🔧 VS Code Setup](#-vs-code-setup)
- [🎨 Prettier Integration](#-prettier-integration)
- [🔄 Upgrading from v2 (ESLint 9)](#-upgrading-from-v2-eslint-9)
- [📋 What's Included](#-whats-included)
  - [What Each Config Contains](#what-each-config-contains)
- [📚 Rules Reference](#-rules-reference)
  - [Rules Page](#rules-page)
  - [Shared Rules (All Configs)](#shared-rules-all-configs)
  - [Rules That Differ per Config](#rules-that-differ-per-config)
  - [React Native Rules (React Config Only)](#react-native-rules-react-config-only)
  - [TanStack Query Rules (React and React Web)](#tanstack-query-rules-react-and-react-web)
  - [Turbo Addon Rules](#turbo-addon-rules)
  - [File-Specific Overrides](#file-specific-overrides)
  - [Ignored Files](#ignored-files)
  - [Import Resolution](#import-resolution)
- [⚙️ Customization](#️-customization)
  - [Overriding Rules](#overriding-rules)
  - [Files Not Covered by tsconfig](#files-not-covered-by-tsconfig)
- [🚨 Common Issues](#-common-issues)
  - [Flat Config Not Recognized](#flat-config-not-recognized)
  - [Wrong Config Used in a Monorepo](#wrong-config-used-in-a-monorepo)
  - [TypeScript Parsing Errors](#typescript-parsing-errors)
  - [Import Resolution Issues](#import-resolution-issues)
  - [Rules Report Errors, Not Warnings](#rules-report-errors-not-warnings)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features

- **⚡ ESLint flat config** - Ready-made `eslint.config.js` arrays built with `defineConfig`
- **🔷 Type-aware TypeScript linting** - `typescript-eslint` `recommendedTypeChecked` + `stylisticTypeChecked`, using `projectService`
- **🛡️ Strict type-safety rules** - Bans `any`, non-null assertions (`!`) and type assertions (`as`, except `as const`)
- **📦 Import ordering** - Grouped, alphabetized imports with `eslint-plugin-import-x` (auto-fixable)
- **📐 Blank-line rules** - Blank lines before `if`, `for`, `return` and block-like statements, none before `case`/`default` (auto-fixable)
- **📱 React & React Native** - `/react` for React Native / Expo, `/react-web` for web-only React; both with React, React Hooks and TanStack Query rules
- **🏗️ Turborepo addon** - Detects environment variables not declared in `turbo.json`
- **🎨 Prettier-compatible** - Turns off ESLint rules that conflict with Prettier

## 🚀 Quick Start

### Requirements

From `package.json`:

| Dependency | Version                                                                              |
| ---------- | ------------------------------------------------------------------------------------ |
| Node.js    | `>=24.14.1`                                                                          |
| ESLint     | `^10.0.0`                                                                            |
| TypeScript | `>=6.0.3 <6.1.0` (the range `typescript-eslint` accepts; TypeScript 7 is outside it) |
| Prettier   | `^3.8.1`                                                                             |

### Installation

Install the package together with its peer dependencies:

```bash
pnpm add -D @thyi/eslint-config eslint typescript prettier
```

```bash
npm install --save-dev @thyi/eslint-config eslint typescript prettier
```

```bash
yarn add --dev @thyi/eslint-config eslint typescript prettier
```

```bash
bun add --dev @thyi/eslint-config eslint typescript prettier
```

### Configuration

| Project                 | `eslint.config.js`                                                             |
| ----------------------- | ------------------------------------------------------------------------------ |
| Node.js / CLI / library | `import config from '@thyi/eslint-config'` + `export default config`           |
| React Native / Expo     | `import config from '@thyi/eslint-config/react'` + `export default config`     |
| Web-only React          | `import config from '@thyi/eslint-config/react-web'` + `export default config` |

```js
// eslint.config.js — Node.js / CLI / library
import config from '@thyi/eslint-config'

export default config
```

```js
// eslint.config.js — React Native / Expo
import config from '@thyi/eslint-config/react'

export default config
```

```js
// eslint.config.js — web-only React
import config from '@thyi/eslint-config/react-web'

export default config
```

```js
// eslint.config.js — any of the above in a Turborepo package: add turboAddon last
import { defineConfig } from 'eslint/config'
import config from '@thyi/eslint-config/react-web'
import { turboAddon } from '@thyi/eslint-config/turbo'

export default defineConfig(...config, ...turboAddon)
```

```js
// named exports from the root entry
import { defaultConfig, reactConfig, reactWebConfig, turboAddon } from '@thyi/eslint-config'
```

### Entry Points

| Import                          | Export                   | Use for                                     |
| ------------------------------- | ------------------------ | ------------------------------------------- |
| `@thyi/eslint-config`           | default                  | Node.js, CLI tools, libraries without React |
| `@thyi/eslint-config/react`     | default                  | React Native, Expo                          |
| `@thyi/eslint-config/react-web` | default                  | Web-only React (Vite, Next.js, …)           |
| `@thyi/eslint-config/turbo`     | `turboAddon` (named)     | Add-on for any config above, in Turborepo   |
| `@thyi/eslint-config`           | `defaultConfig` (named)  | Same as `@thyi/eslint-config`               |
| `@thyi/eslint-config`           | `reactConfig` (named)    | Same as `@thyi/eslint-config/react`         |
| `@thyi/eslint-config`           | `reactWebConfig` (named) | Same as `@thyi/eslint-config/react-web`     |
| `@thyi/eslint-config`           | `turboAddon` (named)     | Same as `@thyi/eslint-config/turbo`         |

### TypeScript Setup

All configs use `@typescript-eslint/parser` with `projectService`, which finds the nearest `tsconfig.json` for each linted file. Every TypeScript file you lint must be covered by a tsconfig. Root-level `*.config.js`, `*.config.ts` and `*.config.mjs` files are allowed without one (see [Files Not Covered by tsconfig](#files-not-covered-by-tsconfig)).

Example `tsconfig.json`:

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "target": "es2024",
    "module": "esnext",
    "moduleResolution": "bundler",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "declaration": true,
    "declarationMap": true,
    "esModuleInterop": true,
    "incremental": false,
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "removeComments": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "useDefineForClassFields": true,
    "useUnknownInCatchVariables": true,
    "exactOptionalPropertyTypes": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitOverride": true
  }
}
```

`noPropertyAccessFromIndexSignature` matters here: the config turns `dot-notation` off so ESLint does not contradict that compiler option (see [Shared Rules](#shared-rules-all-configs)).

### Package.json Scripts

```json
{
  "scripts": {
    "lint:fix": "eslint . --fix",
    "lint:check": "eslint . --max-warnings 0"
  }
}
```

Most rules report as errors. A few report as warnings (listed below), so use `--max-warnings 0` if CI should fail on those too.

## 🔧 VS Code Setup

1. Install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (and the Prettier extension if you format with it).
2. Add these settings to your VS Code `settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

## 🎨 Prettier Integration

This config does not run Prettier. It includes `eslint-config-prettier`, which turns off the ESLint rules that conflict with Prettier, so the two tools can run side by side:

1. **ESLint** checks code quality (types, unused variables, imports, React rules).
2. **Prettier** formats (indentation, line breaks, quotes).

Configure Prettier in your own project, for example:

```json
{
  "arrowParens": "always",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "semi": false,
  "endOfLine": "lf",
  "trailingComma": "all"
}
```

## 🔄 Upgrading from v2 (ESLint 9)

| Change                                                                              | Effect                                                            |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| ESLint `^10.0.0` required                                                           | Upgrade `eslint` with this package                                |
| `@eslint/js` 10 `recommended` adds `no-unassigned-vars` and `no-useless-assignment` | New errors possible (`preserve-caught-error` was already enabled) |
| `eslint-plugin-react-hooks` 7: `recommended-latest` grows from 2 to 17 rules        | New React Compiler errors possible in React projects              |
| `@tanstack/eslint-plugin-query` added to the React config                           | New errors possible in code using TanStack Query                  |
| `/* eslint-env */` comments                                                         | Reported as errors by ESLint 10: remove them                      |

## 📋 What's Included

### What Each Config Contains

| Content                                                                                         | Default | React | React Web |
| ----------------------------------------------------------------------------------------------- | :-----: | :---: | :-------: |
| `@eslint/js` `recommended`                                                                      |   ✅    |  ✅   |    ✅     |
| `typescript-eslint` `recommendedTypeChecked` + `stylisticTypeChecked`                           |   ✅    |  ✅   |    ✅     |
| `eslint-plugin-import-x` `recommended`, `typescript`, `react`, `react-native` presets           |   ✅    |  ✅   |    ✅     |
| `eslint-config-prettier`                                                                        |   ✅    |  ✅   |    ✅     |
| `@stylistic/eslint-plugin` (`padding-line-between-statements` only)                             |   ✅    |  ✅   |    ✅     |
| [Shared rules](#shared-rules-all-configs)                                                       |   ✅    |  ✅   |    ✅     |
| Node.js globals                                                                                 |   ✅    |  ✅   |    ✅     |
| `eslint-plugin-react` `recommended` (React version auto-detected)                               |   ❌    |  ✅   |    ✅     |
| `eslint-plugin-react-hooks` `flat['recommended-latest']` (17 rules, incl. React Compiler rules) |   ❌    |  ✅   |    ✅     |
| `@tanstack/eslint-plugin-query` `flat/recommended`                                              |   ❌    |  ✅   |    ✅     |
| All 7 `eslint-plugin-react-native` rules                                                        |   ❌    |  ✅   |    ❌     |
| React Native globals (`__DEV__`, …)                                                             |   ❌    |  ✅   |    ❌     |
| Browser globals (`globals.browser`)                                                             |   ❌    |  ❌   |    ✅     |

| Note                                                | Detail                                                                                                   |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `eslint-plugin-react`, `eslint-plugin-react-native` | Wrapped with `fixupPluginRules` from `@eslint/compat`: both still call context methods ESLint 10 removed |
| React Native globals                                | Include `window` and `fetch`, so the React config does not need browser globals for those                |

## 📚 Rules Reference

### Rules Page

Every enabled rule (all presets included), with ✅ Correct / ❌ Incorrect examples, auto-fix status and severity per config: [`docs/rules/index.html`](docs/rules/index.html).

> **Note:** the page is not published anywhere. Clone the repository and open `docs/rules/index.html` in a browser (GitHub shows the file as source code).

| Question                      | Answer                                                                                          |
| ----------------------------- | ----------------------------------------------------------------------------------------------- |
| What does it list?            | Every rule enabled in Default, React, React Web or the Turbo addon, read from the configs       |
| Where do the examples live?   | `scripts/rules-page/examples/*.js`, one entry per rule                                          |
| What proves an example right? | `pnpm run rules:check`: incorrect must trigger its rule, correct must not, with the real config |
| When does CI check examples?  | Every push and pull request (`NPM Package CI`); a failing example blocks the release            |
| When is the page regenerated? | After every `Release and Publish` run (`Rules Page` workflow)                                   |
| When is it committed?         | Only when the generated file changed (same rules → byte-identical page → no commit)             |
| Is it published to npm?       | No: `package.json` `files` lists only the config files                                          |

The tables below list the rules this package sets on top of the presets above.

### Shared Rules (All Configs)

| Rule                                                         | Setting                                                                                                         |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `eqeqeq`                                                     | error, `always`, except comparisons with `null`                                                                 |
| `no-await-in-loop`                                           | off                                                                                                             |
| `no-use-before-define`                                       | error, function declarations allowed                                                                            |
| `preserve-caught-error`                                      | error, `requireCatchParameter: true`                                                                            |
| `dot-notation`, `@typescript-eslint/dot-notation`            | off (index-signature access is left to `noPropertyAccessFromIndexSignature`)                                    |
| `sort-imports`                                               | error, only members inside one import are sorted (`ignoreDeclarationSort`)                                      |
| `import-x/order`                                             | error, see below                                                                                                |
| `@stylistic/padding-line-between-statements`                 | error: blank line before `for`, `return`, `if` and block-like statements; no blank line before `case`/`default` |
| `@typescript-eslint/no-explicit-any`                         | error                                                                                                           |
| `@typescript-eslint/no-non-null-assertion`                   | error                                                                                                           |
| `@typescript-eslint/no-non-null-asserted-nullish-coalescing` | error                                                                                                           |
| `@typescript-eslint/no-non-null-asserted-optional-chain`     | error                                                                                                           |
| `@typescript-eslint/no-extra-non-null-assertion`             | error                                                                                                           |
| `@typescript-eslint/consistent-type-assertions`              | error, `assertionStyle: 'never'` (`as const` is still allowed)                                                  |
| `@typescript-eslint/no-unnecessary-condition`                | error                                                                                                           |
| `@typescript-eslint/array-type`                              | error, `generic` (`Array<string>`, not `string[]`)                                                              |
| `@typescript-eslint/method-signature-style`                  | error (property style: `foo: () => void`)                                                                       |
| `@typescript-eslint/consistent-type-definitions`             | off (`type` and `interface` both allowed)                                                                       |
| `@typescript-eslint/no-unused-vars`                          | error, names starting with `_` ignored (arguments and variables)                                                |
| `@typescript-eslint/no-misused-promises`                     | error, async functions allowed in JSX attributes (`checksVoidReturn.attributes: false`)                         |
| `@typescript-eslint/no-extraneous-class`                     | warn, empty classes allowed                                                                                     |
| `@typescript-eslint/no-unsafe-argument`                      | warn                                                                                                            |
| `@typescript-eslint/require-await`                           | off                                                                                                             |

`import-x/order` sorts imports into these groups, separated by a blank line and alphabetized (case-insensitive) inside each group:

1. Node.js built-ins
2. External packages
3. Internal imports, including the path aliases `@/**`, `#/**`, `~/**`, `@docker/**` and `@scripts/**`
4. Parent, sibling and index imports

### Rules That Differ per Config

| Rule                                      | Default                                                                | React                                                                                                                                                                                   | React Web                                                                                      |
| ----------------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `@typescript-eslint/no-floating-promises` | error; allowed: `invalidateQueries`                                    | error; allowed: `preventAutoHideAsync` + `hideAsync` (`expo-router`), `init` (`i18next`), `invalidateQueries`                                                                           | error; allowed: `init` (`i18next`), `invalidateQueries`                                        |
| `@typescript-eslint/no-require-imports`   | error; allowed: `package.json`, `path`, `zod`, `dotenv`, `@/scripts/*` | error; allowed: `.*assets/*`, `@/scripts/*`, `nativewind/preset`, `nativewind/theme`, `nativewind/theme/hairlineWidth`, `tailwindcss-animate`, `package.json`, `node:`, `zod`, `dotenv` | error; allowed: `@/scripts/*`, `tailwindcss-animate`, `package.json`, `node:`, `zod`, `dotenv` |
| `react/react-in-jsx-scope`                | —                                                                      | off in `.tsx`/`.jsx`                                                                                                                                                                    | off in `.tsx`/`.jsx`                                                                           |

### React Native Rules (React Config Only)

| Rule                                          | Setting                                                                                                                  |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `react-native/no-unused-styles`               | error                                                                                                                    |
| `react-native/split-platform-components`      | error                                                                                                                    |
| `react-native/no-inline-styles`               | error (warn in `.tsx`/`.jsx`)                                                                                            |
| `react-native/no-color-literals`              | error                                                                                                                    |
| `react-native/no-raw-text`                    | error (warn in `.tsx`/`.jsx`, where `TextInput`, `ThemedText`, `ThemedView`, `ButtonText` and `Button.Text` are skipped) |
| `react-native/no-single-element-style-arrays` | error                                                                                                                    |
| `react-native/sort-styles`                    | error                                                                                                                    |

### TanStack Query Rules (React and React Web)

`@tanstack/eslint-plugin-query` `flat/recommended`, unchanged:

| Rule                                            | Setting |
| ----------------------------------------------- | ------- |
| `@tanstack/query/exhaustive-deps`               | error   |
| `@tanstack/query/stable-query-client`           | error   |
| `@tanstack/query/no-unstable-deps`              | error   |
| `@tanstack/query/infinite-query-property-order` | error   |
| `@tanstack/query/no-void-query-fn`              | error   |
| `@tanstack/query/mutation-property-order`       | error   |
| `@tanstack/query/no-rest-destructuring`         | warn    |

### Turbo Addon Rules

| Rule                           | Setting                                                   |
| ------------------------------ | --------------------------------------------------------- |
| `turbo/no-undeclared-env-vars` | warn (lowered from `error` in `eslint-config-turbo/flat`) |

### File-Specific Overrides

| Files                                                     | Changes                                                                                                                                                                              |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `tests/**/*.ts`, `**/*spec.ts`, `**/*test.ts`             | Jest globals added; `no-explicit-any` lowered to warn; `no-unsafe-argument`, `no-unsafe-assignment`, `no-unsafe-member-access`, `max-lines-per-function`, `max-nested-callbacks` off |
| `**/*.js`, `**/*.cjs`, `**/*.mjs`                         | Type-aware rules off (`disableTypeChecked`); `import-x` recommended rules re-applied                                                                                                 |
| `**/infrastructure/**/*.ts`, `**/infrastructure/**/*.tsx` | `@typescript-eslint/consistent-type-assertions` off (`as` allowed for third-party interop)                                                                                           |

> The test override matches only `.ts` files: `*.test.tsx` and `*.spec.tsx` get neither the Jest globals nor the relaxed rules. Outside the test files, no Jest globals are defined.

### Ignored Files

- `**/*.json`
- `**/dist/**`
- `**/node_modules/**`
- `**/coverage/**`
- `**/build/**`
- `**/output/**`
- `**/lib/**`
- `**/html/**`
- `**/.turbo/**`
- `**/.expo/**`
- `**/.next/**`
- `**/.stryker-tmp/**`
- `**/reports/**`
- `eslint.config.*`
- `babel.config.js`
- `metro.config.js`

### Import Resolution

The `import-x` resolver uses `eslint-import-resolver-typescript` (which reads your tsconfig `paths`) and the Node.js resolver.

The TypeScript resolver checks the `@repo/source` export condition first, before the usual conditions (`types`, `import`, `require`, `node`, `default`, …). In a monorepo whose packages declare a `@repo/source` condition in `exports`, imports resolve to the TypeScript sources instead of the built (often gitignored) `dist/`. In repos that do not declare it, the condition has no effect.

## ⚙️ Customization

### Overriding Rules

```js
// Default config
import { defineConfig } from 'eslint/config'
import baseConfig from '@thyi/eslint-config'

export default defineConfig(...baseConfig, {
  rules: {
    'no-console': 'error',
    '@typescript-eslint/array-type': ['error', { default: 'array' }],
  },
})
```

```js
// React config
import { defineConfig } from 'eslint/config'
import baseConfig from '@thyi/eslint-config/react'

export default defineConfig(...baseConfig, {
  rules: {
    'no-console': 'error',
    'react-native/no-inline-styles': 'off',
  },
})
```

### Files Not Covered by tsconfig

`projectService` already allows root-level `*.config.js`, `*.config.ts` and `*.config.mjs` files that are not in any tsconfig. To allow other files, set `allowDefaultProject` yourself. Your list replaces the default list, so keep its entries:

```js
import { defineConfig } from 'eslint/config'
import baseConfig from '@thyi/eslint-config'

export default defineConfig(...baseConfig, {
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ['*.config.js', '*.config.ts', '*.config.mjs', 'scripts/*.ts'],
      },
    },
  },
})
```

## 🚨 Common Issues

### Flat Config Not Recognized

Use ESLint `^10.0.0` and name your config file `eslint.config.js` (or `.mjs` / `.cjs`).

### Wrong Config Used in a Monorepo

ESLint 10 looks up `eslint.config.*` starting from each linted file's directory, then upward. A package with its own `eslint.config.js` uses that file, wherever you run `eslint` from. To force one file, pass `--config path/to/eslint.config.js`.

### TypeScript Parsing Errors

Make sure every TypeScript file you lint is included by a `tsconfig.json` (`include`, `files`, or a project reference). See [Files Not Covered by tsconfig](#files-not-covered-by-tsconfig).

### Import Resolution Issues

For path aliases, declare them in `tsconfig.json` `paths`; the TypeScript resolver reads them. Aliases starting with `@/`, `#/`, `~/`, `@docker/` or `@scripts/` are grouped as internal imports by `import-x/order`.

### Rules Report Errors, Not Warnings

Earlier versions used `eslint-plugin-only-warn` to turn every error into a warning. It is disabled since v2.13.1: rules now report at the severity listed in the [Rules Reference](#-rules-reference).

## 🤝 Contributing

Issues and pull requests are welcome. Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/): `CHANGELOG.md` and releases are generated from them with `release-it` and `@release-it/conventional-changelog`.

| Task                                     | Command / file                                                      |
| ---------------------------------------- | ------------------------------------------------------------------- |
| Check every rules-page example           | `pnpm run rules:check`                                              |
| Check one plugin's examples              | `node scripts/rules-page/check-examples.js --only react-hooks`      |
| Check ESLint's built-in rules only       | `node scripts/rules-page/check-examples.js --only core`             |
| List other rules a correct example trips | add `--verbose`                                                     |
| Regenerate the page locally              | `pnpm run rules:generate` → `docs/rules/index.html`                 |
| Add an example for a newly enabled rule  | `scripts/rules-page/examples/<plugin>.js`: `{ incorrect, correct }` |
| Rule that cannot be shown                | `{ skip: '<why>' }` in the same file                                |

| Example field | Meaning                                                     |
| ------------- | ----------------------------------------------------------- |
| `incorrect`   | Code the rule must report                                   |
| `correct`     | Code the rule must not report                               |
| `ext`         | File extension (default `ts`)                               |
| `filename`    | Whole file name (for rules that read it)                    |
| `files`       | Extra files next to both examples (e.g. a module to import) |
| `rootFiles`   | Files at the fixture root (e.g. `turbo.json`)               |
| `skip`        | Reason no example can exist; replaces `incorrect`/`correct` |

## 📄 License

MIT © [Theodros Yimer](https://github.com/theodrosyimer)
