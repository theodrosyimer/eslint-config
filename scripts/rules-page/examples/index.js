import core from './core.js'
import importX from './import-x.js'
import misc from './misc.js'
import react from './react.js'
import reactHooks from './react-hooks.js'
import typescriptEslint from './typescript-eslint.js'

// One entry per enabled rule: { incorrect, correct, ext?, filename?, files? }
// or { skip: '<why no example can be written>' }.
export const examples = {
  ...core,
  ...typescriptEslint,
  ...importX,
  ...react,
  ...reactHooks,
  ...misc,
}
