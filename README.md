# @thyi/eslint-config

> **A comprehensive, modern ESLint configuration for JavaScript and TypeScript projects with React support**

[![npm version](https://img.shields.io/npm/v/@thyi/eslint-config.svg)](https://www.npmjs.com/package/@thyi/eslint-config)
[![npm downloads](https://img.shields.io/npm/dm/@thyi/eslint-config.svg)](https://www.npmjs.com/package/@thyi/eslint-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- **🔧 Zero-config setup** - Works out of the box with sensible defaults
- **⚡ Modern ESLint Flat Config** - Uses the latest ESLint configuration format
- **📱 React & React Native** - Full support for React applications and React Native projects
- **🔷 TypeScript-first** - Comprehensive TypeScript support with type-aware linting
- **🎨 Prettier integration** - Seamless code formatting with Prettier
- **📦 Import organization** - Automatic import sorting and grouping
- **🚀 Performance optimized** - Minimal overhead with intelligent rule selection

## 📋 What's Included

This configuration includes opinionated settings for:

- **ESLint Core Rules** - Latest JavaScript/ES2022+ standards
- **TypeScript** - Type-aware linting with `@typescript-eslint`
- **React** - JSX, hooks, and React best practices
- **React Native** - Platform-specific rules and optimizations
- **Import Management** - Organized imports with `eslint-plugin-import`
- **Code Formatting** - Prettier integration with consistent styling
- **Performance** - Rules optimized for modern JavaScript engines

## 🚀 Quick Start

### Installation

```bash
# npm
npm install --save-dev @thyi/eslint-config

# pnpm (recommended)
pnpm add -D @thyi/eslint-config

# yarn
yarn add --dev @thyi/eslint-config
```

### Basic JavaScript/React Setup

Create an `eslint.config.js` file in your project root:

```js
import config from '@thyi/eslint-config'

export default config
```

### TypeScript Setup

For TypeScript projects, ensure you have a `tsconfig.json` file, then use the same configuration:

```js
import config from '@thyi/eslint-config'

export default config
```

The configuration automatically detects TypeScript files and applies appropriate rules.

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

To override or extend rules, modify your `eslint.config.js`:

```js
import baseConfig from '@thyi/eslint-config'

export default [
  ...baseConfig,
  {
    rules: {
      // Override specific rules
      'no-console': 'error',
      '@typescript-eslint/no-unused-vars': 'error',

      // Disable rules you don't want
      'react-native/no-inline-styles': 'off'
    }
  }
]
```

### TypeScript Project Configuration

Ensure your `tsconfig.json` is properly configured:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022"],
    "module": "ESNext",
    "moduleResolution": "node",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Environment-Specific Overrides

The configuration includes intelligent overrides for different file types:

- **React files** (`.tsx`, `.jsx`) - React-specific rules enabled
- **Test files** (`*.test.*`, `*.spec.*`) - Relaxed rules for testing
- **JavaScript files** (`.js`, `.cjs`, `.mjs`) - TypeScript rules disabled

### File Ignoring

The configuration automatically ignores common build directories:

- `.expo/`
- `.next/`
- `build/`
- `dist/`
- `node_modules/`
- `babel.config.js`
- `metro.config.js`

## 🎨 Prettier Integration

This ESLint configuration is **Prettier-friendly** but doesn't enforce Prettier formatting rules. Instead, it:

- **Disables conflicting rules** - Uses `eslint-config-prettier` to turn off ESLint rules that conflict with Prettier
- **Lets you control formatting** - You configure Prettier separately according to your preferences
- **Avoids rule conflicts** - No fighting between ESLint and Prettier over formatting

### Setting up Prettier

Create a `.prettierrc` file in your project root with your preferred settings:

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

Or use any other Prettier configuration format (`.prettierrc.js`, `prettier.config.js`, etc.).

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
