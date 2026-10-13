// ESLint's built-in (core) rules.
export default {
  eqeqeq: {
    incorrect: `export function isAdmin(role: string): boolean {
  return role == 'admin'
}
`,
    correct: `export function isAdmin(role: string): boolean {
  return role === 'admin'
}
`,
  },

  'for-direction': {
    incorrect: `export function countdown(): Array<number> {
  const steps: Array<number> = []

  for (let i = 10; i > 0; i++) {
    steps.push(i)
  }

  return steps
}
`,
    correct: `export function countdown(): Array<number> {
  const steps: Array<number> = []

  for (let i = 10; i > 0; i--) {
    steps.push(i)
  }

  return steps
}
`,
  },

  'no-async-promise-executor': {
    incorrect: `export const config = new Promise<Response>(async (resolve) => {
  resolve(await fetch('/config.json'))
})
`,
    correct: `export const config = fetch('/config.json')
`,
  },

  'no-case-declarations': {
    incorrect: `export function label(kind: 'a' | 'b'): string {
  switch (kind) {
    case 'a':
      const text = 'Alpha'

      return text
    case 'b':
      return 'Beta'
  }
}
`,
    correct: `export function label(kind: 'a' | 'b'): string {
  switch (kind) {
    case 'a': {
      const text = 'Alpha'

      return text
    }
    case 'b':
      return 'Beta'
  }
}
`,
  },

  'no-compare-neg-zero': {
    incorrect: `export function isNegativeZero(value: number): boolean {
  return value === -0
}
`,
    correct: `export function isNegativeZero(value: number): boolean {
  return Object.is(value, -0)
}
`,
  },

  'no-cond-assign': {
    incorrect: `export function firstMatch(pattern: RegExp, text: string): string {
  let match: RegExpExecArray | null = null

  if (match = pattern.exec(text)) {
    return match[0]
  }

  return ''
}
`,
    correct: `export function firstMatch(pattern: RegExp, text: string): string {
  const match = pattern.exec(text)

  if (match !== null) {
    return match[0]
  }

  return ''
}
`,
  },

  'no-constant-binary-expression': {
    incorrect: `export function total(price: number, tax?: number): number {
  return price + tax ?? 0
}
`,
    correct: `export function total(price: number, tax?: number): number {
  return price + (tax ?? 0)
}
`,
  },

  'no-constant-condition': {
    incorrect: `export function greet(name: string): string {
  if (true) {
    return \`Hello, \${name}\`
  }

  return name
}
`,
    correct: `export function greet(name: string): string {
  return \`Hello, \${name}\`
}
`,
  },

  'no-control-regex': {
    incorrect: `export const separator = /\\x1f/
`,
    correct: `export const separator = /\\t/
`,
  },

  'no-debugger': {
    incorrect: `export function parse(input: string): number {
  debugger

  return Number(input)
}
`,
    correct: `export function parse(input: string): number {
  return Number(input)
}
`,
  },

  'no-delete-var': {
    incorrect: `let cache = {}

delete cache
`,
    correct: `export let cache = {}

cache = {}
`,
  },

  'no-dupe-else-if': {
    incorrect: `export function size(width: number): string {
  if (width < 600) {
    return 'small'
  } else if (width < 600) {
    return 'medium'
  }

  return 'large'
}
`,
    correct: `export function size(width: number): string {
  if (width < 600) {
    return 'small'
  } else if (width < 1200) {
    return 'medium'
  }

  return 'large'
}
`,
  },

  'no-duplicate-case': {
    incorrect: `export function status(code: number): string {
  switch (code) {
    case 200:
      return 'ok'
    case 200:
      return 'created'
    default:
      return 'error'
  }
}
`,
    correct: `export function status(code: number): string {
  switch (code) {
    case 200:
      return 'ok'
    case 201:
      return 'created'
    default:
      return 'error'
  }
}
`,
  },

  'no-empty': {
    incorrect: `export function parse(text: string): unknown {
  try {
    return JSON.parse(text)
  } catch {}

  return undefined
}
`,
    correct: `export function parse(text: string): unknown {
  try {
    return JSON.parse(text)
  } catch {
    // Malformed input is treated as no value
  }

  return undefined
}
`,
  },

  'no-empty-character-class': {
    incorrect: `export const word = /^\\w+[]$/
`,
    correct: `export const word = /^\\w+[a-z]$/
`,
  },

  'no-empty-pattern': {
    incorrect: `export function render({}: { title: string }): string {
  return 'page'
}
`,
    correct: `export function render({ title }: { title: string }): string {
  return title
}
`,
  },

  'no-empty-static-block': {
    incorrect: `export class Registry {
  static {}
}
`,
    correct: `export class Registry {
  static entries = new Map<string, string>()

  static {
    Registry.entries.set('default', 'main')
  }

  get(key: string): string | undefined {
    return Registry.entries.get(key)
  }
}
`,
  },

  'no-ex-assign': {
    incorrect: `export function load(read: () => string): string {
  try {
    return read()
  } catch (error) {
    error = new Error('load failed')
    throw error
  }
}
`,
    correct: `export function load(read: () => string): string {
  try {
    return read()
  } catch (error) {
    throw new Error('load failed', { cause: error })
  }
}
`,
  },

  'no-extra-boolean-cast': {
    incorrect: `export function label(name: string): string {
  if (!!name) {
    return name
  }

  return 'anonymous'
}
`,
    correct: `export function label(name: string): string {
  if (name) {
    return name
  }

  return 'anonymous'
}
`,
  },

  'no-fallthrough': {
    incorrect: `export function weight(size: 's' | 'm'): number {
  let total = 0

  switch (size) {
    case 's':
      total += 1
    case 'm':
      total += 2
  }

  return total
}
`,
    correct: `export function weight(size: 's' | 'm'): number {
  let total = 0

  switch (size) {
    case 's':
      total += 1
      break
    case 'm':
      total += 2
  }

  return total
}
`,
  },

  'no-global-assign': {
    incorrect: `export function reset(): void {
  undefined = 0
}
`,
    correct: `export function reset(): undefined {
  return undefined
}
`,
  },

  'no-invalid-regexp': {
    incorrect: `export const tag = new RegExp('<[a-z')
`,
    correct: `export const tag = new RegExp('<[a-z]+>')
`,
  },

  'no-irregular-whitespace': {
    incorrect: `export const total = 1 + 2
`,
    correct: `export const total = 1 + 2
`,
  },

  'no-loss-of-precision': {
    incorrect: `export const maxId = 9007199254740993
`,
    correct: `export const maxId = 9007199254740993n
`,
  },

  'no-misleading-character-class': {
    incorrect: `export const thumbsUp = /^[👍]$/
`,
    correct: `export const thumbsUp = /^[👍]$/u
`,
  },

  'no-nonoctal-decimal-escape': {
    skip: "TypeScript 6's parser rejects \\8 and \\9 escapes in every file, .js and .cjs included (\"Escape sequence '\\8' is not allowed\"), so the rule never sees a violating program.",
  },

  'no-octal': {
    skip: 'TypeScript 6\'s parser rejects legacy octal literals in every file, .js and .cjs included ("Octal literals are not allowed"), so the rule never sees a violating program.',
  },

  'no-prototype-builtins': {
    incorrect: `export function hasName(record: object): boolean {
  return record.hasOwnProperty('name')
}
`,
    correct: `export function hasName(record: object): boolean {
  return Object.hasOwn(record, 'name')
}
`,
  },

  'no-regex-spaces': {
    incorrect: `export const pair = /key   value/
`,
    correct: `export const pair = /key {3}value/
`,
  },

  'no-self-assign': {
    incorrect: `export function rename(user: { name: string }, name: string): void {
  user.name = user.name
}
`,
    correct: `export function rename(user: { name: string }, name: string): void {
  user.name = name
}
`,
  },

  'no-shadow-restricted-names': {
    incorrect: `export function fallback(value?: string): string {
  const undefined = ''

  return value ?? undefined
}
`,
    correct: `export function fallback(value?: string): string {
  const empty = ''

  return value ?? empty
}
`,
  },

  'no-sparse-arrays': {
    incorrect: `export const sizes = ['small', , 'large']
`,
    correct: `export const sizes = ['small', 'medium', 'large']
`,
  },

  'no-unassigned-vars': {
    incorrect: `export function greeting(): string {
  let name: string | undefined

  return \`Hello, \${name ?? 'guest'}\`
}
`,
    correct: `export function greeting(user?: string): string {
  const name = user

  return \`Hello, \${name ?? 'guest'}\`
}
`,
  },

  'no-unsafe-finally': {
    incorrect: `export function read(load: () => string): string {
  try {
    return load()
  } finally {
    return 'fallback'
  }
}
`,
    correct: `export function read(load: () => string): string {
  try {
    return load()
  } finally {
    console.info('read attempted')
  }
}
`,
  },

  'no-unsafe-optional-chaining': {
    incorrect: `export function city(user?: { address: { city: string } }): string {
  const { city } = user?.address

  return city
}
`,
    correct: `export function city(user?: { address: { city: string } }): string {
  return user?.address.city ?? 'unknown'
}
`,
  },

  'no-unused-labels': {
    incorrect: `export function sum(values: Array<number>): number {
  let total = 0

  loop: for (const value of values) {
    total += value
  }

  return total
}
`,
    correct: `export function sum(values: Array<number>): number {
  let total = 0

  for (const value of values) {
    total += value
  }

  return total
}
`,
  },

  'no-unused-private-class-members': {
    incorrect: `export class Counter {
  #count = 0
  #step = 1

  increment(): number {
    this.#count += 1

    return this.#count
  }
}
`,
    correct: `export class Counter {
  #count = 0
  #step = 1

  increment(): number {
    this.#count += this.#step

    return this.#count
  }
}
`,
  },

  'no-use-before-define': {
    incorrect: `export const total = price * 2

const price = 10
`,
    correct: `const price = 10

export const total = price * 2
`,
  },

  'no-useless-assignment': {
    incorrect: `export function label(count: number): string {
  let text = 'none'
  text = count > 1 ? 'many' : 'one'

  return text
}
`,
    correct: `export function label(count: number): string {
  const text = count > 1 ? 'many' : 'one'

  return text
}
`,
  },

  'no-useless-backreference': {
    incorrect: `export const quoted = /\\1(['"]).*/
`,
    correct: `export const quoted = /(['"]).*\\1/
`,
  },

  'no-useless-catch': {
    incorrect: `export function parse(text: string): unknown {
  try {
    return JSON.parse(text)
  } catch (error) {
    throw error
  }
}
`,
    correct: `export function parse(text: string): unknown {
  return JSON.parse(text)
}
`,
  },

  'no-useless-escape': {
    incorrect: `export const hashtag = '\\#release'
`,
    correct: `export const hashtag = '#release'
`,
  },

  'no-var': {
    incorrect: `var retries = 3

export { retries }
`,
    correct: `const retries = 3

export { retries }
`,
  },

  'prefer-const': {
    incorrect: `export function double(value: number): number {
  let result = value * 2

  return result
}
`,
    correct: `export function double(value: number): number {
  const result = value * 2

  return result
}
`,
  },

  'prefer-rest-params': {
    incorrect: `export function joinAll(): string {
  return Array.from(arguments).join(',')
}
`,
    correct: `export function joinAll(...parts: Array<string>): string {
  return parts.join(',')
}
`,
  },

  'prefer-spread': {
    incorrect: `export function largest(values: Array<number>): number {
  return Math.max.apply(Math, values)
}
`,
    correct: `export function largest(values: Array<number>): number {
  return Math.max(...values)
}
`,
  },

  'preserve-caught-error': {
    incorrect: `export function parse(text: string): unknown {
  try {
    return JSON.parse(text)
  } catch (error) {
    throw new Error('Invalid JSON')
  }
}
`,
    correct: `export function parse(text: string): unknown {
  try {
    return JSON.parse(text)
  } catch (error) {
    throw new Error('Invalid JSON', { cause: error })
  }
}
`,
  },

  'require-yield': {
    incorrect: `export function* ids(): Generator<number> {
  return 1
}
`,
    correct: `export function* ids(): Generator<number> {
  yield 1
}
`,
  },

  'sort-imports': {
    incorrect: `import { useMemo, useEffect } from 'react'

export const hooks = [useMemo, useEffect]
`,
    correct: `import { useEffect, useMemo } from 'react'

export const hooks = [useEffect, useMemo]
`,
  },

  'use-isnan': {
    incorrect: `export function isInvalid(value: number): boolean {
  return value === NaN
}
`,
    correct: `export function isInvalid(value: number): boolean {
  return Number.isNaN(value)
}
`,
  },

  'valid-typeof': {
    incorrect: `export function isText(value: unknown): boolean {
  return typeof value === 'strnig'
}
`,
    correct: `export function isText(value: unknown): boolean {
  return typeof value === 'string'
}
`,
  },
}
