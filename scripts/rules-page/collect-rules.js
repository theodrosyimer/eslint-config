import path from 'node:path'

import { ESLint } from 'eslint'
import { builtinRules } from 'eslint/use-at-your-own-risk'

import { configs } from './configs.js'

const severityName = ['off', 'warn', 'error']

const toEntry = (value) => {
  const [level, ...options] = Array.isArray(value) ? value : [value]
  const severity = typeof level === 'number' ? severityName[level] : level

  return { severity, options }
}

const splitRuleId = (ruleId) => {
  const slash = ruleId.lastIndexOf('/')

  if (slash === -1) {
    return { plugin: '', name: ruleId }
  }

  return { plugin: ruleId.substring(0, slash), name: ruleId.substring(slash + 1) }
}

const findMeta = (plugins, ruleId) => {
  const { plugin, name } = splitRuleId(ruleId)

  if (plugin === '') {
    return builtinRules.get(name)?.meta ?? {}
  }

  return plugins[plugin]?.rules?.[name]?.meta ?? {}
}

// Every rule enabled in at least one config, with its severity and options per
// config (for a .ts and a .tsx file) and the facts its own metadata states.
export async function collectRules(fixtureDir) {
  const rules = new Map()

  for (const { id, config } of configs) {
    const eslint = new ESLint({ cwd: fixtureDir, overrideConfigFile: true, overrideConfig: config })

    for (const ext of ['ts', 'tsx']) {
      const resolved = await eslint.calculateConfigForFile(path.join(fixtureDir, `probe.${ext}`))

      for (const [ruleId, value] of Object.entries(resolved.rules ?? {})) {
        const entry = toEntry(value)

        if (entry.severity === 'off' && !rules.has(ruleId)) {
          continue
        }

        const rule = rules.get(ruleId) ?? {
          id: ruleId,
          meta: findMeta(resolved.plugins ?? {}, ruleId),
          configs: {},
        }

        rule.configs[id] = { ...rule.configs[id], [ext]: entry }
        rules.set(ruleId, rule)
      }
    }
  }

  const enabled = [...rules.values()].filter((rule) =>
    Object.values(rule.configs).some((byExt) =>
      Object.values(byExt).some((entry) => entry.severity !== 'off'),
    ),
  )

  // Code-unit order: the page is diffed by CI, so its order must not depend on
  // the runtime's collation data.
  return enabled.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
}
