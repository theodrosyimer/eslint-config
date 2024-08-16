import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["build/*", "dist/*", "coverage/*", "output/*", "lib/*"],
}, ...compat.extends(
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "./.eslintrc.cjs",
), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            React: true,
            JSX: true,
        },

        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            project: "./tsconfig.json",
        },
    },

    rules: {
        "no-undef": "off",
        "no-shadow": "off",
        "space-before-function-paren": "off",
        "react/prop-types": "warn",
        "@typescript-eslint/array-type": "off",
        "@typescript-eslint/consistent-type-definitions": "off",
        "no-use-before-define": "off",

        "@typescript-eslint/no-use-before-define": ["warn", {
            functions: false,
            classes: true,
            variables: true,
            enums: true,
            typedefs: false,
            ignoreTypeReferences: true,
        }],

        "@typescript-eslint/consistent-type-imports": ["warn", {
            prefer: "type-imports",
            fixStyle: "inline-type-imports",
        }],

        "no-unused-vars": "off",

        "@typescript-eslint/no-unused-vars": ["warn", {
            argsIgnorePattern: "^_",
            ignoreRestSiblings: true,
        }],

        "@typescript-eslint/require-await": "off",

        "@typescript-eslint/no-misused-promises": ["error", {
            checksVoidReturn: {
                attributes: false,
            },
        }],

        "@typescript-eslint/comma-dangle": ["off"],
        "@typescript-eslint/no-explicit-any": "off",
        "no-redeclare": "off",

        "@typescript-eslint/no-redeclare": ["warn", {
            ignoreDeclarationMerge: true,
        }],

        "@typescript-eslint/no-unnecessary-condition": "error",
        "@typescript-eslint/no-floating-promises": "off",

        "prettier/prettier": ["error", {
            arrowParens: "always",
            singleQuote: true,
            quoteProps: "as-needed",
            printWidth: 80,
            tabWidth: 2,
            semi: false,
            endOfLine: "lf",
            trailingComma: "all",
        }],
    },
}];