# @thyi/eslint-config

> **An opinionated ESLint flat config for TypeScript and JavaScript projects, with React / React Native and Turborepo support**

[![npm version](https://img.shields.io/npm/v/@thyi/eslint-config.svg)](https://www.npmjs.com/package/@thyi/eslint-config)
[![npm downloads](https://img.shields.io/npm/dm/@thyi/eslint-config.svg)](https://www.npmjs.com/package/@thyi/eslint-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

- [✨ Features](#-features)
- [📋 What's Included](#-whats-included)
- [🚀 Quick Start](#-quick-start)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [When to Use Which Configuration?](#when-to-use-which-configuration)
  - [TypeScript Setup](#typescript-setup)
  - [Package.json Scripts](#packagejson-scripts)
- [📚 Rules Reference](#-rules-reference)
  - [Shared Rules (Default and React)](#shared-rules-default-and-react)
  - [Default-Only Rules](#default-only-rules)
  - [React-Only Rules](#react-only-rules)
  - [Turbo Addon Rules](#turbo-addon-rules)
  - [File-Specific Overrides](#file-specific-overrides)
  - [Ignored Files](#ignored-files)
  - [Import Resolution](#import-resolution)
- [⚙️ Customization](#️-customization)
  - [Overriding Rules](#overriding-rules)
  - [Adding Browser Globals (Web React Apps)](#adding-browser-globals-web-react-apps)
  - [Files Not Covered by tsconfig](#files-not-covered-by-tsconfig)
- [🎨 Prettier Integration](#-prettier-integration)
- [🔧 VS Code Setup](#-vs-code-setup)
- [🚨 Common Issues](#-common-issues)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features

- **⚡ ESLint flat config** - Ready-made `eslint.config.js` arrays built with `defineConfig`
- **🔷 Type-aware TypeScript linting** - `typescript-eslint` `recommendedTypeChecked` + `stylisticTypeChecked`, using `projectService`
- **🛡️ Strict type-safety rules** - Bans `any`, non-null assertions (`!`) and type assertions (`as`, except `as const`)
- **📦 Import ordering** - Grouped, alphabetized imports with `eslint-plugin-import-x` (auto-fixable)
- **📐 Blank-line rules** - Blank lines before `if`, `for`, `return` and block-like statements, none before `case`/`default` (auto-fixable)
- **📱 React & React Native** - React, React Hooks and React Native rules in a separate entry point
- **🏗️ Turborepo addon** - Detects environment variables not declared in `turbo.json`
- **🎨 Prettier-compatible** - Turns off ESLint rules that conflict with Prettier

## 📋 What's Included

The package has three entry points:

| Import                      | Export               | Contents                                                            |
| --------------------------- | -------------------- | ------------------------------------------------------------------- |
| `@thyi/eslint-config`       | default              | Default config: JavaScript + TypeScript, Node.js globals            |
| `@thyi/eslint-config/react` | default              | Everything in the default config + React, React Hooks, React Native |
| `@thyi/eslint-config/turbo` | `turboAddon` (named) | Turborepo rules, to compose with either config above                |

Both configs are built from:

- `@eslint/js` `recommended`
- `typescript-eslint` `recommendedTypeChecked` and `stylisticTypeChecked`
- `eslint-plugin-import-x` `recommended`, `typescript`, `react` and `react-native` presets
- `eslint-config-prettier`
- `@stylistic/eslint-plugin` (for `padding-line-between-statements` only)

The React config adds:

- `eslint-plugin-react` `recommended` (React version auto-detected)
- `eslint-plugin-react-hooks` `recommended-latest` (`rules-of-hooks`: error, `exhaustive-deps`: warn)
- All 7 `eslint-plugin-react-native` rules, plus React Native globals (`__DEV__`, `window`, `fetch`, …)

## 🚀 Quick Start

### Requirements

From `package.json`:

| Dependency | Version                                      |
| ---------- | -------------------------------------------- |
| Node.js    | `>=24.14.1`                                  |
| ESLint     | `^9.35.0` (ESLint 10 is outside the range)   |
| TypeScript | `^6.0.3` (TypeScript 7 is outside the range) |
| Prettier   | `^3.8.1`                                     |

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

#### 1. Default Configuration

For Node.js projects, backend APIs, CLI tools, or any project without React:

```js
// eslint.config.js
import config from '@thyi/eslint-config'

export default config
```

#### 2. React Configuration

For React, React Native and Expo projects:

```js
// eslint.config.js
import config from '@thyi/eslint-config/react'

export default config
```

#### 3. Turbo Addon

For Turborepo monorepos, add the addon after the config you use:

```js
// Node.js package in a monorepo
import { defineConfig } from 'eslint/config'
import config from '@thyi/eslint-config'
import { turboAddon } from '@thyi/eslint-config/turbo'

export default defineConfig(...config, ...turboAddon)
```

```js
// React package in a monorepo
import { defineConfig } from 'eslint/config'
import config from '@thyi/eslint-config/react'
import { turboAddon } from '@thyi/eslint-config/turbo'

export default defineConfig(...config, ...turboAddon)
```

The root entry also exposes all three as named exports:

```js
import { defaultConfig, reactConfig, turboAddon } from '@thyi/eslint-config'
```

### When to Use Which Configuration?

| Project Type            | Config                      | Import                                                   |
| ----------------------- | --------------------------- | -------------------------------------------------------- |
| Node.js APIs / services | Default                     | `import config from '@thyi/eslint-config'`               |
| CLI tools / scripts     | Default                     | `import config from '@thyi/eslint-config'`               |
| Libraries without React | Default                     | `import config from '@thyi/eslint-config'`               |
| React web apps          | React                       | `import config from '@thyi/eslint-config/react'`         |
| React Native / Expo     | React                       | `import config from '@thyi/eslint-config/react'`         |
| Turborepo monorepos     | Default/React + Turbo addon | `import { turboAddon } from '@thyi/eslint-config/turbo'` |

Use the **React config** for React projects and the **Default config** for everything else. Add the **Turbo addon** in Turborepo monorepos.

> The React config enables React Native rules (`react-native/*`) and globals for every file. In a web-only React app you may want to turn some of them off (see [Overriding Rules](#overriding-rules)).

### TypeScript Setup

Both configs use `@typescript-eslint/parser` with `projectService`, which finds the nearest `tsconfig.json` for each linted file. Every TypeScript file you lint must be covered by a tsconfig. Root-level `*.config.js`, `*.config.ts` and `*.config.mjs` files are allowed without one (see [Files Not Covered by tsconfig](#files-not-covered-by-tsconfig)).

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

`noPropertyAccessFromIndexSignature` matters here: the config turns `dot-notation` off so ESLint does not contradict that compiler option (see [Shared Rules](#shared-rules-default-and-react)).

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

## 📚 Rules Reference

These tables list the rules this package sets on top of the presets above.

### Shared Rules (Default and React)

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

### Default-Only Rules

| Rule                                      | Setting                                                                |
| ----------------------------------------- | ---------------------------------------------------------------------- |
| `@typescript-eslint/no-floating-promises` | error; calls to `invalidateQueries` are allowed                        |
| `@typescript-eslint/no-require-imports`   | error; allowed: `package.json`, `path`, `zod`, `dotenv`, `@/scripts/*` |

### React-Only Rules

| Rule                                          | Setting                                                                                                                                                                                 |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@typescript-eslint/no-floating-promises`     | error; allowed: `preventAutoHideAsync` and `hideAsync` from `expo-router`, `init` from `i18next`, and `invalidateQueries`                                                               |
| `@typescript-eslint/no-require-imports`       | error; allowed: `.*assets/*`, `@/scripts/*`, `nativewind/preset`, `nativewind/theme`, `nativewind/theme/hairlineWidth`, `tailwindcss-animate`, `package.json`, `node:`, `zod`, `dotenv` |
| `react-native/no-unused-styles`               | error                                                                                                                                                                                   |
| `react-native/split-platform-components`      | error                                                                                                                                                                                   |
| `react-native/no-inline-styles`               | error (warn in `.tsx`/`.jsx`)                                                                                                                                                           |
| `react-native/no-color-literals`              | error                                                                                                                                                                                   |
| `react-native/no-raw-text`                    | error (warn in `.tsx`/`.jsx`, where `TextInput`, `ThemedText`, `ThemedView`, `ButtonText` and `Button.Text` are skipped)                                                                |
| `react-native/no-single-element-style-arrays` | error                                                                                                                                                                                   |
| `react-native/sort-styles`                    | error                                                                                                                                                                                   |
| `react/react-in-jsx-scope`                    | off in `.tsx`/`.jsx`                                                                                                                                                                    |

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

### Adding Browser Globals (Web React Apps)

The React config defines Node.js and React Native globals. For web-only React apps (for example Vite), add browser globals:

```js
import { defineConfig } from 'eslint/config'
import baseConfig from '@thyi/eslint-config/react'
import globals from 'globals'

export default defineConfig(...baseConfig, {
  languageOptions: {
    globals: {
      ...globals.browser,
    },
  },
})
```

Flat config merges `globals` objects, so the existing globals are kept.

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

## 🚨 Common Issues

### Flat Config Not Recognized

Use ESLint `^9.35.0` and name your config file `eslint.config.js` (or `.mjs` / `.cjs`).

### TypeScript Parsing Errors

Make sure every TypeScript file you lint is included by a `tsconfig.json` (`include`, `files`, or a project reference). See [Files Not Covered by tsconfig](#files-not-covered-by-tsconfig).

### Import Resolution Issues

For path aliases, declare them in `tsconfig.json` `paths`; the TypeScript resolver reads them. Aliases starting with `@/`, `#/`, `~/`, `@docker/` or `@scripts/` are grouped as internal imports by `import-x/order`.

### Rules Report Errors, Not Warnings

Earlier versions used `eslint-plugin-only-warn` to turn every error into a warning. It is disabled since v2.13.1: rules now report at the severity listed in the [Rules Reference](#-rules-reference).

## 🤝 Contributing

Issues and pull requests are welcome. Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/): `CHANGELOG.md` and releases are generated from them with `release-it` and `@release-it/conventional-changelog`.

## 📄 License

MIT © [Theodros Yimer](https://github.com/theodrosyimer)
