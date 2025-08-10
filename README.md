# @thyi/eslint-config

> **A comprehensive, modern ESLint configuration for JavaScript and TypeScript projects with React support**

[![npm version](https://img.shields.io/npm/v/@thyi/eslint-config.svg)](https://www.npmjs.com/package/@thyi/eslint-config)
[![npm downloads](https://img.shields.io/npm/dm/@thyi/eslint-config.svg)](https://www.npmjs.com/package/@thyi/eslint-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- **🔧 Zero-config setup** - Works out of the box with sensible defaults
- **⚡ Modern ESLint Flat Config** - Uses the latest ESLint configuration format
- **🎯 Dual configurations** - Separate configs for Node.js and React/React Native projects
- **📱 React & React Native** - Full support for React applications and React Native projects
- **🔷 TypeScript-first** - Comprehensive TypeScript support with type-aware linting
- **🎨 Prettier integration** - Seamless code formatting with Prettier
- **📦 Import organization** - Automatic import sorting and grouping with TypeScript support
- **🚀 Performance optimized** - Minimal overhead with intelligent rule selection

## 📋 What's Included

This package provides two specialized configurations:

### **Default Configuration**
- **ESLint Core Rules** - Latest JavaScript/ES2022+ standards
- **TypeScript** - Type-aware linting with `@typescript-eslint`
- **Node.js Globals** - Built-in Node.js and Jest globals
- **Import Management** - Organized imports with `eslint-plugin-import` and `eslint-import-resolver-typescript`
- **Code Formatting** - Prettier integration with consistent styling
- **Performance** - Rules optimized for modern JavaScript engines

### **React Configuration** (React/React Native)
- **Everything from Default** - Plus React-specific features
- **React Rules** - JSX, hooks, and React best practices
- **React Native** - Platform-specific rules and optimizations
- **React Hooks** - Comprehensive hooks linting
- **React Native Globals** - Mobile-specific globals and APIs

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

### When to Use Which Configuration?

| Project Type | Use | Example |
|-------------|-----|---------|
| **Node.js APIs** | Default | `import config from '@thyi/eslint-config'` |
| **CLI Tools** | Default | `import config from '@thyi/eslint-config'` |
| **Backend Services** | Default | `import config from '@thyi/eslint-config'` |
| **Browser Libraries** | Default | `import config from '@thyi/eslint-config'` |
| **Vanilla JS/TS Apps** | Default | `import config from '@thyi/eslint-config'` |
| **Build Tools/Scripts** | Default | `import config from '@thyi/eslint-config'` |
| **React Web Apps** | React | `import config from '@thyi/eslint-config/react'` |
| **Next.js Apps** | React | `import config from '@thyi/eslint-config/react'` |
| **React Native Apps** | React | `import config from '@thyi/eslint-config/react'` |
| **Expo Apps** | React | `import config from '@thyi/eslint-config/react'` |

**Simple rule**: Use **React config** for React projects, **Default config** for everything else.

### TypeScript Support

Both configurations include full TypeScript support. You **must** have a `tsconfig.json` file in your project root:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022"],
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "allowJs": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": [
    "src/**/*",
    "tests/**/*",
    "*.config.js",
    "*.config.ts"
  ],
  "exclude": ["node_modules", "dist"]
}
```

### Package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "lint": "eslint .",
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
import baseConfig from '@thyi/eslint-config'

export default [
  ...baseConfig,
  {
    rules: {
      // Override specific rules
      'no-console': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
    }
  }
]
```

```js
// For React projects
import baseConfig from '@thyi/eslint-config/react'

export default [
  ...baseConfig,
  {
    rules: {
      // Override specific rules
      'no-console': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      'react-native/no-inline-styles': 'off'
    }
  }
]
```

### Environment-Specific Overrides

The configuration includes intelligent overrides for different file types:

- **React files** (`.tsx`, `.jsx`) - React-specific rules enabled
- **Test files** (`*.test.*`, `*.spec.*`) - Relaxed rules for testing
- **JavaScript files** (`.js`, `.cjs`, `.mjs`) - TypeScript rules disabled

### File Ignoring

The configuration automatically ignores common build directories and files:

- `.expo/`
- `.next/`
- `build/`
- `dist/`
- `coverage/`
- `html/`
- `node_modules/`
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
  "trailingComma": "all"
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
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[javascript][javascriptreact][typescript][typescriptreact]": {
    "editor.formatOnSave": false
  },
  "eslint.useFlatConfig": true
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
- **Import Management**: Type-only imports and module resolution

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

Ensure you're using ESLint v8.21.0 or higher and your config file is named `eslint.config.js`.

### TypeScript Parsing Errors

Make sure your `tsconfig.json` is valid and includes all TypeScript files you want to lint.

### Import Resolution Issues

The config includes TypeScript and Node.js import resolvers. For custom path mapping, update your `tsconfig.json` with proper `paths` configuration.

### Performance Issues

For large projects, consider using `projectService` in your TypeScript parser options or implementing incremental linting.

### "Project service not found" Errors

**Using JavaScript config files** (`eslint.config.js`, `vite.config.js`, etc.):

Ensure your `tsconfig.json` includes JavaScript files and has `allowJs: true`:

```json
{
  "compilerOptions": {
    "allowJs": true,
    // ... other options
  },
  "include": [
    "src/**/*",
    "tests/**/*",
    "*.config.js",        // Include config files
    "*.config.ts"         // Include TypeScript config files too
  ]
}
```

**Alternative**: Create a dedicated `tsconfig.eslint.json` that extends your main config:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "allowJs": true
  },
  "include": [
    "src/**/*",
    "tests/**/*",
    "eslint.config.js",
    "vite.config.js",
    "*.config.js"
  ]
}
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
