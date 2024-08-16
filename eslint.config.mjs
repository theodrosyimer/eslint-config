import html from "eslint-plugin-html";
import prettier from "eslint-plugin-prettier";
import babel from "eslint-plugin-babel";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import { fixupPluginRules } from "@eslint/compat";
import globals from "globals";
import babelParser from "@babel/eslint-parser";
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
}, ...compat.extends("airbnb-base", "prettier", "plugin:react/recommended"), {
    plugins: {
        html,
        prettier,
        babel,
        react,
        "react-hooks": fixupPluginRules(reactHooks),
        "jsx-a11y": jsxA11Y,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
            ...globals.jest,
            ...globals.jquery,
        },

        parser: babelParser,
        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            requireConfigFile: false,

            ecmaFeatures: {
                impliedStrict: true,
                classes: true,
            },

            babelOptions: {
                presets: ["@babel/preset-react"],
            },
        },
    },

    settings: {
        "html/indent": "+2",
        "html/report-bad-indent": "error",

        react: {
            version: "detect",
        },
    },

    rules: {
        "prettier/prettier": ["error", {
            arrowParens: "avoid",
            singleQuote: true,
            quoteProps: "as-needed",
            printWidth: 80,
            tabWidth: 2,
            semi: false,
            endOfLine: "lf",
            trailingComma: "all",
        }],

        camelcase: ["warn", {
            ignoreDestructuring: false,
        }],

        "arrow-body-style": ["error", "as-needed"],
        "consistent-return": "off",

        "func-names": ["error", "as-needed", {
            generators: "never",
        }],

        "no-alert": "off",
        "no-async-promise-executor": "error",
        "no-await-in-loop": "error",
        "no-console": "off",
        "no-debugger": "off",

        "no-empty-function": ["error", {
            allow: ["constructors"],
        }],

        "no-multiple-empty-lines": ["error", {
            max: 1,
        }],

        "no-plusplus": "off",
        "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"],
        "no-return-assign": ["error", "except-parens"],

        "no-unused-vars": ["warn", {
            args: "none",
            ignoreRestSiblings: true,
            argsIgnorePattern: "res|next|^err",
        }],

        "no-param-reassign": ["error", {
            props: false,
        }],

        "no-shadow": ["error", {
            hoist: "never",
            allow: ["resolve", "reject", "done", "next", "err", "error"],
            ignoreOnInitialization: true,
        }],

        "no-useless-constructor": "off",
        "no-undef": "off",
        "no-underscore-dangle": "off",

        "no-use-before-define": ["error", {
            functions: false,
            classes: true,
            variables: true,
        }],

        "no-var": "error",

        "no-unused-expressions": ["warn", {
            allowTaggedTemplates: true,
        }],

        "prefer-const": ["error", {
            destructuring: "all",
        }],

        radix: ["error", "as-needed"],

        "sort-imports": ["error", {
            ignoreCase: false,
            ignoreDeclarationSort: true,
            ignoreMemberSort: true,
            memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
            allowSeparatedGroups: true,
        }],

        "spaced-comment": ["error", "always", {
            block: {
                markers: ["?", "?."],
            },
        }],

        "space-before-function-paren": ["error", {
            anonymous: "ignore",
            named: "never",
            asyncArrow: "always",
        }],

        "babel/no-invalid-this": "error",
        "import/prefer-default-export": "off",
        import: "off",
        "import/extensions": "off",

        "import/no-extraneous-dependencies": ["error", {
            devDependencies: [
                "test.{ts,tsx,js,jsx}",
                "test-*.{ts,tsx,js,jsx}",
                "**/*{.,_}{test,spec}.{ts,tsx,js,jsx}",
                "**/jest.config.{ts,js}",
                "**/jest.setup.{ts,js}",
                "**/*.stories.*",
                "**/.storybook/**/*.*",
            ],
        }],

        "import/no-unresolved": "off",

        "import/order": ["error", {
            "newlines-between": "always",
            groups: [["builtin", "external"], ["internal", "parent", "sibling", "index"]],

            alphabetize: {
                order: "ignore",
                caseInsensitive: false,
            },
        }],

        "react/display-name": 1,
        "react/no-array-index-key": 0,
        "react/react-in-jsx-scope": 0,
        "react/prefer-stateless-function": 0,
        "react/forbid-prop-types": 0,
        "react/prop-types": 0,
        "react/no-unescaped-entities": 0,
        "react/function-component-definition": 0,
        "jsx-a11y/accessible-emoji": 0,

        "jsx-a11y/label-has-associated-control": ["error", {
            assert: "either",
        }],

        "react/require-default-props": 0,

        "react/jsx-filename-extension": [1, {
            extensions: [".js", ".jsx", ".ts", ".tsx", ".mdx", ".ejs"],
        }],

        "jsx-a11y/href-no-hash": "off",

        "jsx-a11y/anchor-is-valid": ["warn", {
            aspects: ["invalidHref"],
        }],

        "react-hooks/rules-of-hooks": 2,
        "react-hooks/exhaustive-deps": 1,
        "react/jsx-props-no-spreading": "off",
    },
}];