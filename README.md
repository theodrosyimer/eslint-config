# eslint-config

- [What it does](#what-it-does)
- [Install](#install)
- [Settings](#settings)
  - [Prettier Rules](#prettier-rules)
- [With TypeScript](#with-typescript)
- [With VS Code](#with-vs-code)
- [With WSL](#with-wsl)

Based on: [wesbos/eslint-config-wesbos: No-Sweat™ Eslint and Prettier Setup - with or without VS Code](https://github.com/wesbos/eslint-config-wesbos).

## What it does

- Lints JavaScript and TypeScript based on the latest standards
- Fixes issues and formatting errors with Prettier
- Lints + Fixes inside of html script tags
- Lints + Fixes React via eslint-config-airbnb
- You can see all the [rules here](https://github.com/theodrosyimer/eslint-config/blob/main/.eslintrc.js) - these generally abide by the code written in my courses. You are very welcome to overwrite any of these settings, or just fork the entire thing to create your own.

## Install

It's recommended you install this once per every project. ESLint used to have global configs, but no longer.

<!-- TODO: Make an updated Youtube video -->

1. If you don't already have a `package.json` file, create one with `npm init -y`.

2. Then we need to install this config

```
npm install @thyi/eslint-config
```

4. We need to put our eslint settings in a file in the root of your project. I prefer to use our existing `package.json`, and add an `eslintConfig` property. You can also create a new `.eslintrc` or `.eslintrc.js` file that lives where package.json does:

**in package.json**, add this anywhere top level. Like right under your "scripts" object.

```json
"eslintConfig": {
  "extends": ["@thyi/eslint-config"]
}
```

Or put this in a `.eslintrc` file

```json
{
  "extends": ["@thyi/eslint-config"]
}
```

5. You can add two scripts to your package.json to lint and/or fix:

```json
"scripts": {
  "lint": "eslint .",
  "lint:fix": "eslint . --fix"
},
```

6. Now you can manually lint your code by running `npm run lint` and fix all fixable issues with `npm run lint:fix`. You probably want your editor to do this though.

## Settings

If you'd like to overwrite eslint or prettier settings, you can add the rules in your `.eslintrc` file. The [ESLint rules](https://eslint.org/docs/rules/) go directly under `"rules"`.

```js
{
  "extends": [
    "@thyi/eslint-config"
  ],
  "rules": {
    "no-console": 2,
  }
}
```

### Prettier Rules

There are only 2 prettier rules included in my config - `singleQuote: true` and `endOfLine: 'auto'`.

If you want custom [prettier options](https://prettier.io/docs/en/options.html), it's recommended to create a `.prettierrc` file in your root directory like so:

```js
{
  "singleQuote": true,
  "endOfLine": "auto",
  "tabWidth": 4
}
```

You can also put this in your EsLint config as a rule like so:

```json
{
  "extends": ["@thyi/eslint-config"],
  "rules": {
    ... any eslint rules here
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "endOfLine": "auto",
        "tabWidth": 4
      },
    ],
  }
}
```

Note if you are switching to double quotes, you'll also need to add this eslint rule, or they will fight to the death!

```js
quotes: ["error", "double"];
```

## With TypeScript

For TypeScript projects, use `@thyi/typescript`.

```json
{
  "extends": ["@thyi/typescript"]
}
```

TypeScript users will also need a `tsconfig.json` file in their project. An empty object (`{}`) will do if you don't have one!

## With VS Code

You should read this entire thing. Serious!

Once you have done one, or both, of the above installs. You probably want your editor to lint and fix for you. Here are the instructions for VS Code:

1. Install the [ESLint package](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
2. Now we need to setup some VS Code settings via `Code/File` → `Preferences` → `Settings`. It's easier to enter these settings while editing the `settings.json` file, so click the Open (Open Settings) icon in the top right corner:

```js
// These are all my auto-save configs
"editor.formatOnSave": true,
// turn it off for JS and JSX, we will do this via eslint
"[javascript][javascriptreact][typescript][typescriptreact]": {
  "editor.formatOnSave": false
},
// tell the ESLint plugin to run on save
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
},
```

After attempting to lint your file for the first time, you may need to click on 'ESLint' in the bottom right and select 'Allow Everywhere' in the alert window.

Finally you'll usually need to restart VS code. They say you don't need to, but it's never worked for me until I restart.

## With WSL

It should work as above.
