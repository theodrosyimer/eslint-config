import { configs } from './configs.js'
import { exampleFile } from './fixture.js'

const escapeHtml = (text) =>
  text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

const anchor = (ruleId) => ruleId.replaceAll('@', '').replaceAll('/', '-')

const pluginOf = (ruleId) => {
  const slash = ruleId.lastIndexOf('/')

  return slash === -1 ? 'eslint' : ruleId.substring(0, slash)
}

const describeEntry = (entry) => {
  if (entry === undefined || entry.severity === 'off') {
    return '—'
  }

  return entry.severity
}

const severityCell = (byExt) => {
  if (byExt === undefined) {
    return '<td class="sev">—</td>'
  }

  const ts = describeEntry(byExt.ts)
  const tsx = describeEntry(byExt.tsx)
  const text = ts === tsx ? ts : `${ts} <span class="muted">(${tsx} in .tsx)</span>`
  const level = ts === '—' ? tsx : ts

  return `<td class="sev sev-${level === '—' ? 'off' : level}">${text}</td>`
}

const optionsBlock = (rule) => {
  const seen = new Map()

  for (const { id, label } of configs) {
    const options = rule.configs[id]?.ts?.options ?? rule.configs[id]?.tsx?.options ?? []

    if (
      options.length === 0 ||
      describeEntry(rule.configs[id]?.ts ?? rule.configs[id]?.tsx) === '—'
    ) {
      continue
    }

    const json = JSON.stringify(options.length === 1 ? options[0] : options, null, 2)

    seen.set(json, [...(seen.get(json) ?? []), label])
  }

  if (seen.size === 0) {
    return ''
  }

  const blocks = [...seen.entries()].map(
    ([json, labels]) =>
      `<p class="muted">Options (${escapeHtml(labels.join(', '))}):</p><pre><code>${escapeHtml(json)}</code></pre>`,
  )

  return `<details class="options"><summary>Options set by this config</summary>${blocks.join('')}</details>`
}

const codePanel = (example, variant) => {
  const extras = Object.entries(example.files ?? {}).map(
    ([name, content]) =>
      `<p class="file">${escapeHtml(name)}</p><pre><code>${escapeHtml(content)}</code></pre>`,
  )
  const roots = Object.entries(example.rootFiles ?? {}).map(
    ([name, content]) =>
      `<p class="file">${escapeHtml(name)} (project root)</p><pre><code>${escapeHtml(content)}</code></pre>`,
  )

  return [
    `<p class="file">${escapeHtml(exampleFile(example))}</p>`,
    `<pre class="${variant}"><code>${escapeHtml(example[variant])}</code></pre>`,
    ...extras,
    ...roots,
  ].join('')
}

const examplesBlock = (rule, example) => {
  if (example === undefined) {
    return '<p class="muted">No example.</p>'
  }

  if (example.skip !== undefined) {
    return `<p class="muted">No example: ${escapeHtml(example.skip)}</p>`
  }

  const id = anchor(rule.id)

  return `<div class="tabs">
<div role="tablist" aria-label="Examples for ${escapeHtml(rule.id)}">
<button role="tab" id="${id}-tab-correct" aria-controls="${id}-correct" aria-selected="true">✅ Correct</button>
<button role="tab" id="${id}-tab-incorrect" aria-controls="${id}-incorrect" aria-selected="false" tabindex="-1">❌ Incorrect</button>
</div>
<div role="tabpanel" id="${id}-correct" aria-labelledby="${id}-tab-correct">${codePanel(example, 'correct')}</div>
<div role="tabpanel" id="${id}-incorrect" aria-labelledby="${id}-tab-incorrect" hidden>${codePanel(example, 'incorrect')}</div>
</div>`
}

const ruleCard = (rule, example) => {
  const url = rule.meta.docs?.url
  const title =
    url === undefined
      ? escapeHtml(rule.id)
      : `<a href="${escapeHtml(url)}">${escapeHtml(rule.id)}</a>`
  const description = rule.meta.docs?.description ?? ''
  const fixable =
    rule.meta.fixable === undefined
      ? '<span class="badge">Not auto-fixable</span>'
      : '<span class="badge fix">🔧 Auto-fixable</span>'
  const suggestions =
    rule.meta.hasSuggestions === true ? '<span class="badge sug">💡 Suggestions</span>' : ''
  const header = configs.map(({ label }) => `<th>${escapeHtml(label)}</th>`).join('')
  const cells = configs.map(({ id }) => severityCell(rule.configs[id])).join('')
  const search = `${rule.id} ${description}`.toLowerCase()

  return `<article class="rule" id="${anchor(rule.id)}" data-search="${escapeHtml(search)}">
<h3>${title}</h3>
<p>${escapeHtml(description)}</p>
<p>${fixable}${suggestions}</p>
<table><thead><tr>${header}</tr></thead><tbody><tr>${cells}</tr></tbody></table>
${optionsBlock(rule)}
${examplesBlock(rule, example)}
</article>`
}

const style = `
:root { color-scheme: light dark; --bg: #fff; --fg: #1b1f24; --muted: #59636e; --line: #d1d9e0; --card: #f6f8fa; --good: #1a7f37; --bad: #cf222e; --warn: #9a6700; --accent: #0969da; }
@media (prefers-color-scheme: dark) { :root { --bg: #0d1117; --fg: #e6edf3; --muted: #9198a1; --line: #3d444d; --card: #151b23; --good: #3fb950; --bad: #f85149; --warn: #d29922; --accent: #4493f8; } }
* { box-sizing: border-box; }
body { margin: 0; font: 15px/1.5 system-ui, sans-serif; background: var(--bg); color: var(--fg); }
main { max-width: 980px; margin: 0 auto; padding: 24px 16px 64px; }
a { color: var(--accent); }
header input { width: 100%; padding: 8px 12px; font: inherit; color: inherit; background: var(--card); border: 1px solid var(--line); border-radius: 6px; }
nav { display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0 24px; }
nav a { padding: 2px 10px; border: 1px solid var(--line); border-radius: 999px; text-decoration: none; }
h2 { margin-top: 40px; border-bottom: 1px solid var(--line); padding-bottom: 4px; }
.rule { background: var(--card); border: 1px solid var(--line); border-radius: 8px; padding: 12px 16px; margin: 16px 0; }
.rule h3 { margin: 0 0 4px; font-family: ui-monospace, monospace; font-size: 16px; }
.muted { color: var(--muted); }
.badge { display: inline-block; font-size: 13px; padding: 1px 8px; margin-right: 6px; border: 1px solid var(--line); border-radius: 999px; }
.badge.fix { border-color: var(--good); color: var(--good); }
.badge.sug { border-color: var(--warn); color: var(--warn); }
table { border-collapse: collapse; margin: 8px 0; font-size: 14px; }
th, td { border: 1px solid var(--line); padding: 2px 10px; text-align: left; }
.sev-error { color: var(--bad); font-weight: 600; }
.sev-warn { color: var(--warn); font-weight: 600; }
.sev-off { color: var(--muted); }
pre { margin: 4px 0 12px; padding: 10px 12px; overflow-x: auto; background: var(--bg); border: 1px solid var(--line); border-left-width: 4px; border-radius: 6px; font-size: 13px; }
pre.correct { border-left-color: var(--good); }
pre.incorrect { border-left-color: var(--bad); }
.file { margin: 8px 0 0; font-family: ui-monospace, monospace; font-size: 12px; color: var(--muted); }
[role="tablist"] { display: flex; gap: 4px; margin-top: 8px; }
[role="tab"] { font: inherit; padding: 4px 12px; color: inherit; background: transparent; border: 1px solid var(--line); border-radius: 6px 6px 0 0; cursor: pointer; }
[role="tab"][aria-selected="true"] { background: var(--bg); font-weight: 600; }
details.options { margin: 4px 0; }
`

const script = `
document.addEventListener('click', (event) => {
  const tab = event.target.closest('[role="tab"]')
  if (tab === null) return
  const list = tab.parentElement
  for (const other of list.querySelectorAll('[role="tab"]')) {
    const selected = other === tab
    other.setAttribute('aria-selected', String(selected))
    other.tabIndex = selected ? 0 : -1
    document.getElementById(other.getAttribute('aria-controls')).hidden = !selected
  }
})
document.getElementById('search').addEventListener('input', (event) => {
  const query = event.target.value.trim().toLowerCase()
  for (const rule of document.querySelectorAll('.rule')) {
    rule.hidden = query !== '' && !rule.dataset.search.includes(query)
  }
})
`

// Renders the whole page. The output depends only on the rules, their
// metadata and the examples — no date, no package version — so CI can
// regenerate it on every run and commit only when a rule actually changed.
export function renderHtml(rules, examples) {
  const groups = new Map()

  for (const rule of rules) {
    const plugin = pluginOf(rule.id)

    groups.set(plugin, [...(groups.get(plugin) ?? []), rule])
  }

  const plugins = [...groups.keys()].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
  const fixable = rules.filter((rule) => rule.meta.fixable !== undefined).length
  const nav = plugins
    .map(
      (plugin) =>
        `<a href="#plugin-${anchor(plugin)}">${escapeHtml(plugin)} (${groups.get(plugin).length})</a>`,
    )
    .join('')
  const sections = plugins
    .map(
      (plugin) =>
        `<section><h2 id="plugin-${anchor(plugin)}">${escapeHtml(plugin)}</h2>\n${groups
          .get(plugin)
          .map((rule) => ruleCard(rule, examples[rule.id]))
          .join('\n')}</section>`,
    )
    .join('\n')

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>@thyi/eslint-config — rules</title>
<style>${style}</style>
</head>
<body>
<main>
<header>
<h1>@thyi/eslint-config — rules</h1>
<p class="muted">${rules.length} rules enabled across the configs, ${fixable} auto-fixable. Generated from the configs themselves; every example is linted in CI with the config shown.</p>
<input id="search" type="search" placeholder="Filter rules by name or description" aria-label="Filter rules">
</header>
<nav aria-label="Plugins">${nav}</nav>
${sections}
</main>
<script>${script}</script>
</body>
</html>
`
}
