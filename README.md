# @thyi/eslint-config

> **A comprehensive, modern ESLint configuration for JavaScript and TypeScript projects with React support**

[![npm version](https://img.shields.io/npm/v/@thyi/eslint-config.svg)](https://www.npmjs.com/package/@thyi/eslint-config)
[![npm downloads](https://img.shields.io/npm/dm/@thyi/eslint-config.svg)](https://www.npmjs.com/package/@thyi/eslint-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

- [✨ Features](#-features)
- [📋 What's Included](#-whats-included)
  - [**Default Configuration**](#default-configuration)
  - [**React Configuration** (React/React Native)](#react-configuration-reactreact-native)
  - [**Turbo Addon** (Turborepo Monorepos)](#turbo-addon-turborepo-monorepos)
- [🚀 Quick Start](#-quick-start)
  - [Installation](#installation)
  - [Configuration](#configuration)
    - [1. **Default (Node.js) Configuration**](#1-default-nodejs-configuration)
    - [2. **React Configuration**](#2-react-configuration)
    - [3. **Turbo Addon**](#3-turbo-addon)
  - [When to Use Which Configuration?](#when-to-use-which-configuration)
  - [TypeScript Support](#typescript-support)
  - [Package.json Scripts](#packagejson-scripts)
- [⚙️ Configuration](#️-configuration)
  - [Custom Rules Override](#custom-rules-override)
  - [Adding Browser Globals (Web React Apps)](#adding-browser-globals-web-react-apps)
  - [Disabling Warnings-Only Mode](#disabling-warnings-only-mode)
  - [Environment-Specific Overrides](#environment-specific-overrides)
  - [File Ignoring](#file-ignoring)
- [🎨 Prettier Integration](#-prettier-integration)
  - [Setting up Prettier](#setting-up-prettier)
  - [Recommended Workflow](#recommended-workflow)
- [🔧 IDE Integration](#-ide-integration)
  - [VS Code Setup](#vs-code-setup)
  - [Other IDEs](#other-ides)
- [📚 Rule Categories](#-rule-categories)
  - [Core JavaScript Rules](#core-javascript-rules)
  - [TypeScript Rules](#typescript-rules)
  - [React Rules](#react-rules)
  - [React Native Rules](#react-native-rules)
- [🚨 Common Issues](#-common-issues)
  - [Flat Config Not Recognized](#flat-config-not-recognized)
  - [TypeScript Parsing Errors](#typescript-parsing-errors)
  - [Import Resolution Issues](#import-resolution-issues)
  - [Files Not Covered by tsconfig](#files-not-covered-by-tsconfig)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🔗 Related Projects](#-related-projects)

## ✨ Features

- **🔧 Zero-config setup** - Works out of the box with sensible defaults
- **⚡ Modern ESLint Flat Config** - Uses the latest ESLint configuration format
- **🎯 Dual configurations** - Separate configs for Node.js and React/React Native projects
- **📱 React & React Native** - Full support for React applications and React Native projects
- **🔷 TypeScript-first** - Comprehensive TypeScript support with type-aware linting
- **🎨 Prettier-compatible** - Disables ESLint rules that conflict with Prettier
- **📦 Import organization** - Automatic import sorting and grouping with TypeScript support
- **⚠️ Warnings-only** - All ESLint issues show as warnings (yellow) so they don't blend with real errors (red) in your editor
- **🏗️ Turborepo support** - Optional config for monorepos with `eslint-config-turbo`

## 📋 What's Included

This package provides two configurations and a composable addon:

### **Default Configuration**

- **ESLint Core Rules** - Latest JavaScript/ES2022+ standards
- **TypeScript** - Type-aware linting with `@typescript-eslint`
- **Node.js Globals** - Built-in Node.js globals (Jest globals scoped to test files)
- **Import Management** - Organized imports with `eslint-plugin-import` and `eslint-import-resolver-typescript`
- **Prettier-compatible** - Disables ESLint rules that conflict with Prettier
- **Performance** - Rules optimized for modern JavaScript engines

### **React Configuration** (React/React Native)

- **Everything from Default** - Plus React-specific features
- **React Rules** - JSX, hooks, and React best practices
- **React Native** - Platform-specific rules and optimizations
- **React Hooks** - Comprehensive hooks linting
- **React Native Globals** - Mobile-specific globals and APIs

### **Turbo Addon** (Turborepo Monorepos)

- **Composable** - Layer on top of any config (Default or React)
- **Turbo Rules** - Undeclared environment variable detection
- **Monorepo-aware** - Works with Turborepo's caching and task pipeline

## 🚀 Quick Start

### Installation

```bash
pnpm add -D @thyi/eslint-config
```

```bash
npm install --save-dev @thyi/eslint-config
```

```bash
yarn add --dev @thyi/eslint-config
```

```bash
bun add --dev @thyi/eslint-config
```

### Configuration

#### 1. **Default (Node.js) Configuration**

For **Node.js projects**, backend APIs, CLI tools, or any non-React JavaScript/TypeScript project:

```js
// eslint.config.js
import config from '@thyi/eslint-config'

export default config
```

#### 2. **React Configuration**

For **React applications**, React Native projects, or any project using React:

```js
// eslint.config.js
import config from '@thyi/eslint-config/react'

export default config
```

#### 3. **Turbo Addon**

For **Turborepo monorepos** — layer the turbo addon on top of any config. Every package in the monorepo composes it with its base config:

```js
// Node.js package in monorepo
import { defineConfig } from 'eslint/config'
import config from '@thyi/eslint-config'
import { turboAddon } from '@thyi/eslint-config/turbo'

export default defineConfig(...config, ...turboAddon)
```

```js
// React package in monorepo
import { defineConfig } from 'eslint/config'
import config from '@thyi/eslint-config/react'
import { turboAddon } from '@thyi/eslint-config/turbo'

export default defineConfig(...config, ...turboAddon)
```

### When to Use Which Configuration?

| Project Type            | Where to use                | Example                                                  |
| ----------------------- | --------------------------- | -------------------------------------------------------- |
| **Node.js APIs**        | Default                     | `import config from '@thyi/eslint-config'`               |
| **CLI Tools**           | Default                     | `import config from '@thyi/eslint-config'`               |
| **Backend Services**    | Default                     | `import config from '@thyi/eslint-config'`               |
| **Browser Libraries**   | Default                     | `import config from '@thyi/eslint-config'`               |
| **Vanilla JS/TS Apps**  | Default                     | `import config from '@thyi/eslint-config'`               |
| **Build Tools/Scripts** | Default                     | `import config from '@thyi/eslint-config'`               |
| **React Web Apps**      | React                       | `import config from '@thyi/eslint-config/react'`         |
| **Next.js Apps**        | React                       | `import config from '@thyi/eslint-config/react'`         |
| **React Native Apps**   | React                       | `import config from '@thyi/eslint-config/react'`         |
| **Expo Apps**           | React                       | `import config from '@thyi/eslint-config/react'`         |
| **Turborepo Monorepos** | Default/React + Turbo addon | `import { turboAddon } from '@thyi/eslint-config/turbo'` |

**Simple rule**: Use **React config** for React projects, **Default config** for everything else. Add **Turbo addon** in Turborepo monorepos.

### TypeScript Support

Both configurations include full TypeScript support. You **must** have a `tsconfig.json` file in your project root. Requires TypeScript v6 or higher.

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

### Package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "lint:fix": "eslint . --fix",
    "lint:check": "eslint . --max-warnings 0"
  }
}
```

## ⚙️ Configuration

### Custom Rules Override

To override or extend rules:

```js
// For Non-React projects
import { defineConfig } from 'eslint/config'
import baseConfig from '@thyi/eslint-config'

export default defineConfig(...baseConfig, {
  rules: {
    // Override specific rules
    'no-console': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
  },
})
```

```js
// For React projects
import { defineConfig } from 'eslint/config'
import baseConfig from '@thyi/eslint-config/react'

export default defineConfig(...baseConfig, {
  rules: {
    // Override specific rules
    'no-console': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    'react-native/no-inline-styles': 'off',
  },
})
```

### Adding Browser Globals (Web React Apps)

The React config includes Node.js and React Native globals by default. For web-only React apps (Vite, CRA), add browser globals:

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

Globals merge additively — no existing globals are lost.

### Disabling Warnings-Only Mode

This config uses `eslint-plugin-only-warn` to report all ESLint issues as warnings (yellow) so they're visually distinct from real TypeScript/build errors (red) in your editor. CI still catches everything via `--max-warnings 0`. To disable this and restore errors:

```js
import { defineConfig } from 'eslint/config'
import baseConfig from '@thyi/eslint-config'

export default defineConfig(...baseConfig, {
  plugins: {
    'only-warn': null,
  },
})
```

### Environment-Specific Overrides

The configuration includes intelligent overrides for different file types:

- **React files** (`.tsx`, `.jsx`) - React-specific rules enabled
- **Test files** (`*.test.*`, `*.spec.*`) - Relaxed rules for testing
- **JavaScript files** (`.js`, `.cjs`, `.mjs`) - TypeScript rules disabled

### File Ignoring

The configuration automatically ignores common build directories and files:

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
- `eslint.config.*`
- `babel.config.js`
- `metro.config.js`

## 🎨 Prettier Integration

This ESLint configuration is **Prettier-friendly** but doesn't enforce Prettier formatting rules. Instead, it:

- **Disables conflicting rules** - Uses `eslint-config-prettier` to turn off ESLint rules that conflict with Prettier
- **Lets you control formatting** - You configure Prettier separately according to your preferences
- **Avoids rule conflicts** - No fighting between ESLint and Prettier over formatting

### Setting up Prettier

Use any Prettier configuration format (`.prettierrc.js`, `prettier.config.js`, etc.) in your project root with your preferred settings:

```json
{
  "arrowParens": "always",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "semi": false,
  "endOfLine": "lf",
  "trailingComma": "all",
  ...otherPrettierOptions
}
```

### Recommended Workflow

1. **ESLint handles code quality** - Logic errors, unused variables, React rules, etc.
2. **Prettier handles formatting** - Indentation, line breaks, quotes, etc.
3. **No conflicts** - This config ensures they work together seamlessly

This approach gives you maximum flexibility while avoiding the performance overhead of running Prettier through ESLint.

## 🔧 IDE Integration

### VS Code Setup

1. Install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

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

### Other IDEs

- **WebStorm**: ESLint support is built-in, just ensure flat config is enabled
- **Vim/Neovim**: Use `ale` or `nvim-lspconfig` with ESLint language server
- **Emacs**: Use `flycheck-eslint` with flat config support

## 📚 Rule Categories

### Core JavaScript Rules

- **Code Quality**: Prevents common bugs and anti-patterns
- **Modern Syntax**: Encourages ES2022+ features
- **Performance**: Rules that improve runtime performance
- **Readability**: Consistent code structure and naming

### TypeScript Rules

- **Type Safety**: Strict type checking and null safety
- **Modern TypeScript**: Latest TypeScript features and patterns
- **Performance**: Type-aware optimizations
- **Import Management**: Module resolution and import organization

### React Rules

- **Hooks**: Comprehensive React Hooks linting
- **JSX**: JSX-specific rules and accessibility
- **Performance**: React performance optimizations
- **Modern Patterns**: Latest React patterns and best practices

### React Native Rules

- **Platform APIs**: React Native specific validations
- **Performance**: Mobile-specific optimizations
- **Styling**: StyleSheet and styling best practices

## 🚨 Common Issues

### Flat Config Not Recognized

Ensure you're using ESLint v9 or higher and your config file is named `eslint.config.js`.

### TypeScript Parsing Errors

Make sure your `tsconfig.json` is valid and includes all TypeScript files you want to lint.

### Import Resolution Issues

The config includes TypeScript and Node.js import resolvers. For custom path mapping, update your `tsconfig.json` with proper `paths` configuration.

### Files Not Covered by tsconfig

This config uses `projectService` which automatically finds the nearest `tsconfig.json` for each file. If you have files outside any tsconfig (e.g., config files), you can configure `allowDefaultProject`:

```js
import { defineConfig } from 'eslint/config'
import baseConfig from '@thyi/eslint-config'

export default defineConfig(...baseConfig, {
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ['*.config.js', '*.config.ts'],
      },
    },
  },
})
```

## 🤝 Contributing

Issues and pull requests are welcome! Please ensure your contributions:

- Follow the existing code style
- Include appropriate tests
- Update documentation as needed
- Follow semantic versioning for changes

## 📄 License

MIT © [Theodros Yimer](https://github.com/theodrosyimer)

## 🔗 Related Projects

- [ESLint](https://eslint.org/) - Pluggable JavaScript linter
- [Prettier](https://prettier.io/) - Opinionated code formatter
- [TypeScript ESLint](https://typescript-eslint.io/) - TypeScript support for ESLint
- [React ESLint Plugin](https://github.com/jsx-eslint/eslint-plugin-react) - React specific linting rules
