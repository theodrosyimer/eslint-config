import { rmSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { ESLint } from 'eslint'

import { collectRules } from './collect-rules.js'
import { configs } from './configs.js'
import { examples } from './examples/index.js'
import { createFixture, writeRootFiles, writeVariant } from './fixture.js'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

// `only` is a rule-id prefix, or 'core' for ESLint's built-in rules.
const matches = (ruleId, only) =>
  only === undefined || (only === 'core' ? !ruleId.includes('/') : ruleId.startsWith(only))

const isEnabledIn = (rule, configId) =>
  Object.values(rule.configs[configId] ?? {}).some((entry) => entry.severity !== 'off')

// The config a rule's examples are linted with: the first one enabling it.
export const homeConfig = (rule) => configs.find(({ id }) => isEnabledIn(rule, id))

// Lints every example with its home config. An incorrect example must report
// its rule, a correct one must not, and neither may fail to parse.
export async function checkExamples({ only } = {}) {
  const fixtureDir = createFixture(path.join(repoRoot, '.rules-fixture', `check-${process.pid}`))
  const rules = await collectRules(fixtureDir)
  const selected = rules.filter((rule) => matches(rule.id, only))
  const enabledIds = new Set(rules.map((rule) => rule.id))
  const failures = []
  const notes = []

  for (const rule of selected) {
    if (examples[rule.id] === undefined) {
      failures.push(`${rule.id}: no example and no skip reason`)
    }
  }

  for (const id of Object.keys(examples)) {
    if (!enabledIds.has(id) && matches(id, only)) {
      failures.push(`${id}: has an example but is not enabled in any config`)
    }
  }

  const byConfig = new Map()
  const claimed = new Map()

  for (const rule of selected) {
    const example = examples[rule.id]

    if (example === undefined || example.skip !== undefined) {
      continue
    }

    writeRootFiles(fixtureDir, rule.id, example, claimed)

    const home = homeConfig(rule)
    const jobs = byConfig.get(home.id) ?? { home, files: [] }

    for (const variant of ['incorrect', 'correct']) {
      jobs.files.push({
        ruleId: rule.id,
        variant,
        file: writeVariant(fixtureDir, rule.id, variant, example),
      })
    }

    byConfig.set(home.id, jobs)
  }

  let checked = 0

  for (const { home, files } of byConfig.values()) {
    const eslint = new ESLint({
      cwd: fixtureDir,
      overrideConfigFile: true,
      overrideConfig: home.config,
    })
    const results = await eslint.lintFiles(files.map(({ file }) => file))
    const byFile = new Map(results.map((result) => [result.filePath, result.messages]))

    for (const { ruleId, variant, file } of files) {
      const messages = byFile.get(file) ?? []
      const fatal = messages.find((message) => message.fatal === true)
      const hits = messages.filter((message) => message.ruleId === ruleId)

      checked += 1

      if (fatal !== undefined) {
        failures.push(`${ruleId} (${variant}): parse error: ${fatal.message}`)
        continue
      }

      if (variant === 'incorrect' && hits.length === 0) {
        failures.push(`${ruleId} (incorrect): the rule reports nothing [${home.id}]`)
      }

      if (variant === 'correct') {
        const others = [
          ...new Set(
            messages
              .filter((message) => message.ruleId !== ruleId)
              .map((message) => message.ruleId),
          ),
        ]

        if (others.length > 0) {
          notes.push(`${ruleId} (correct): also reported by ${others.join(', ')}`)
        }
      }

      if (variant === 'correct' && hits.length > 0) {
        failures.push(
          `${ruleId} (correct): the rule reports "${hits[0].message.split('\n')[0]}" [${home.id}]`,
        )
      }
    }
  }

  return { rules: selected.length, checked, failures, notes, fixtureDir }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const onlyIndex = process.argv.indexOf('--only')
  const only = onlyIndex === -1 ? undefined : process.argv[onlyIndex + 1]
  const { rules, checked, failures, notes, fixtureDir } = await checkExamples(
    only === undefined ? {} : { only },
  )

  rmSync(fixtureDir, { recursive: true, force: true })

  if (process.argv.includes('--verbose')) {
    for (const note of notes) {
      console.log(`NOTE  ${note}`)
    }
  }

  for (const failure of failures) {
    console.log(`FAIL  ${failure}`)
  }

  console.log(`${rules} rules, ${checked} example files linted, ${failures.length} failures`)
  process.exitCode = failures.length === 0 ? 0 : 1
}
