import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { collectRules } from './collect-rules.js'
import { examples } from './examples/index.js'
import { renderHtml } from './render-html.js'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const output = path.join(repoRoot, 'docs', 'rules', 'index.html')

// Resolving a config needs a path, not a file: no fixture is written here.
const rules = await collectRules(path.join(repoRoot, '.rules-fixture', 'generate'))

mkdirSync(path.dirname(output), { recursive: true })
writeFileSync(output, renderHtml(rules, examples))
console.log(`${path.relative(repoRoot, output)}: ${rules.length} rules`)
