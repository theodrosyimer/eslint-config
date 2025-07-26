import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import typescriptEslint from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactNative from "eslint-plugin-react-native"
import globals from "globals"
import eslintConfigPrettier from "eslint-config-prettier/flat"
import eslintPluginImport from "eslint-plugin-import"

export default tseslint.config(
  {
    ignores: [
      ".expo",
      ".next",
      "build",
      "dist",
      "coverage",
      "html",
      "**/node_modules",
      "babel.config.js",
      "metro.config.js",
    ],
  },
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  react.configs.recommended,
  reactHooks.configs.recommended,
  reactNative.configs.all,
  eslintPluginImport.flatConfigs.recommended,
  eslintConfigPrettier,
  {
    plugins: {
      typescriptEslint,
      react,
      reactNative,
      reactHooks,
      eslintPluginImport,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
        ...reactNative.environments["react-native"]["react-native"],
      },
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.js", "*.cjs", "*.mjs"],
        },
        tsconfigRootDir: import.meta.dirname,
        project: ["./tsconfig.eslint.json"],
      },
    },
    env: {
      "react-native/react-native": true,
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
    rules: {
      eqeqeq: [
        "error",
        "always",
        {
          null: "ignore",
        },
      ],
      "no-await-in-loop": "off",
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-extraneous-class": "warn",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/no-floating-promises": [
        "error",
        {
          allowForKnownSafeCalls: [
            {
              from: "package",
              name: ["preventAutoHideAsync", "hideAsync"],
              package: "expo-splash-screen",
            },
            { from: "package", name: "init", package: "i18next" },
            { from: "file", name: "invalidateQueries" },
          ],
        },
      ],
      "@typescript-eslint/no-require-imports": [
        "error",
        {
          allow: [
            ".*assets/*",
            "nativewind/preset",
            "nativewind/theme",
            "nativewind/theme/hairlineWidth",
            "tailwindcss-animate",
            "package.json",
            "path",
            "zod",
            "dotenv",
          ],
        },
        {
          allowModules: ["@scripts/*"],
        },
      ],
      "@typescript-eslint/require-await": "off",
      "sort-imports": [
        "error",
        {
          ignoreDeclarationSort: true,
        },
      ],
      "import/order": [
        "error",
        {
          groups: [
            ["builtin"], // Native Node.js modules like `fs`, `path`
            ["external"], // External packages like `react` or `expo-router`
            ["internal"], // Internal libraries (e.g., `@modules/shared/providers/auth`)
            ["parent", "sibling", "index"], // All local files
          ],
          pathGroups: [
            {
              pattern: "$**",
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    // React-specific overrides
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    files: ["**/*.tsx", "**/*.jsx"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "react-native/no-inline-styles": "warn",
      "react-native/no-raw-text": [
        "warn",
        {
          skip: ["TextInput", "ThemedText", "ThemedView", "ButtonText", "Button.Text"],
        },
      ],
    },
  },
  {
    // Test-specific overrides
    files: ["tests/**/*.ts", "**/*spec.ts", "**/*test.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "max-lines-per-function": "off", // Tests can be longer
      "max-nested-callbacks": "off", // describe/it nesting
    },
  },
  {
    // JavaScript-specific overrides
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    rules: {
      ...tseslint.configs.disableTypeChecked,
    },
  },
)
