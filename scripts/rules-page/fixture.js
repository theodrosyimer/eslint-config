import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'

// Type-aware rules need real files under a tsconfig. The fixture lives inside
// the repository so TypeScript resolves @types/react from its node_modules.
const tsconfig = {
  compilerOptions: {
    target: 'es2024',
    lib: ['es2024', 'dom'],
    module: 'esnext',
    moduleResolution: 'bundler',
    jsx: 'react-jsx',
    strict: true,
    noEmit: true,
    skipLibCheck: true,
    noUncheckedIndexedAccess: true,
    noPropertyAccessFromIndexSignature: true,
    exactOptionalPropertyTypes: true,
    verbatimModuleSyntax: false,
    allowJs: true,
    // TypeScript 6 no longer loads every @types package by default.
    types: ['node'],
  },
  include: ['**/*'],
}

export const slug = (ruleId) => ruleId.replaceAll('@', '').replaceAll('/', '__')

export const exampleFile = (example) => example.filename ?? `example.${example.ext ?? 'ts'}`

export function createFixture(root) {
  rmSync(root, { recursive: true, force: true })
  mkdirSync(root, { recursive: true })
  writeFileSync(path.join(root, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2))

  return root
}

// Writes <root>/<rule slug>/<variant>/<file>, plus the example's extra files,
// and returns the path of the main file.
export function writeVariant(root, ruleId, variant, example) {
  const dir = path.join(root, slug(ruleId), variant)
  const main = path.join(dir, exampleFile(example))

  mkdirSync(path.dirname(main), { recursive: true })
  writeFileSync(main, example[variant])

  for (const [name, content] of Object.entries(example.files ?? {})) {
    const extra = path.join(dir, name)

    mkdirSync(path.dirname(extra), { recursive: true })
    writeFileSync(extra, content)
  }

  return main
}

// Files some rules only look for at the linting root (turbo reads turbo.json
// from the working directory). Two examples may not claim the same name.
export function writeRootFiles(root, ruleId, example, claimed) {
  for (const [name, content] of Object.entries(example.rootFiles ?? {})) {
    if (claimed.has(name)) {
      throw new Error(`${ruleId}: root file ${name} is already written by ${claimed.get(name)}`)
    }

    claimed.set(name, ruleId)
    writeFileSync(path.join(root, name), content)
  }
}
