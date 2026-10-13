// @typescript-eslint rules.
export default {
  '@typescript-eslint/adjacent-overload-signatures': {
    incorrect: `export declare class Formatter {
  format(value: string): string
  reset(): void
  format(value: number): string
}
`,
    correct: `export declare class Formatter {
  format(value: string): string
  format(value: number): string
  reset(): void
}
`,
  },

  '@typescript-eslint/array-type': {
    incorrect: `export const ids: number[] = [1, 2, 3]
`,
    correct: `export const ids: Array<number> = [1, 2, 3]
`,
  },

  '@typescript-eslint/await-thenable': {
    incorrect: `const getName = (): string => 'Ada'

export async function greet(): Promise<string> {
  const name = await getName()

  return \`Hello \${name}\`
}
`,
    correct: `const getName = (): string => 'Ada'

export function greet(): string {
  const name = getName()

  return \`Hello \${name}\`
}
`,
  },

  '@typescript-eslint/ban-ts-comment': {
    incorrect: `// @ts-ignore
export const port: number = process.env['PORT']
`,
    correct: `// @ts-expect-error -- the deploy script guarantees PORT is numeric
export const port: number = process.env['PORT']
`,
  },

  '@typescript-eslint/ban-tslint-comment': {
    incorrect: `// tslint:disable-next-line:no-console
export const log = (message: string): void => console.log(message)
`,
    correct: `export const log = (message: string): void => console.log(message)
`,
  },

  '@typescript-eslint/class-literal-property-style': {
    incorrect: `export class Mailer {
  get from(): string {
    return 'noreply@example.com'
  }
}
`,
    correct: `export class Mailer {
  readonly from = 'noreply@example.com'
}
`,
  },

  '@typescript-eslint/consistent-generic-constructors': {
    incorrect: `export const cache: Map<string, number> = new Map()
`,
    correct: `export const cache = new Map<string, number>()
`,
  },

  '@typescript-eslint/consistent-indexed-object-style': {
    incorrect: `export type Scores = { [player: string]: number }
`,
    correct: `export type Scores = Record<string, number>
`,
  },

  '@typescript-eslint/consistent-type-assertions': {
    incorrect: `type User = { name: string }

export const user = { name: 'Ada' } as User
`,
    correct: `type User = { name: string }

export const user = { name: 'Ada' } satisfies User
`,
  },

  '@typescript-eslint/method-signature-style': {
    incorrect: `export interface Logger {
  log(message: string): void
}
`,
    correct: `export interface Logger {
  log: (message: string) => void
}
`,
  },

  '@typescript-eslint/no-array-constructor': {
    incorrect: `export const levels = new Array(1, 2, 3)
`,
    correct: `export const levels = [1, 2, 3]
`,
  },

  '@typescript-eslint/no-array-delete': {
    incorrect: `export function removeFirst(items: Array<string>): void {
  delete items[0]
}
`,
    correct: `export function removeFirst(items: Array<string>): void {
  items.splice(0, 1)
}
`,
  },

  '@typescript-eslint/no-base-to-string': {
    incorrect: `const options = { retries: 3 }

export const label = String(options)
`,
    correct: `const options = { retries: 3 }

export const label = JSON.stringify(options)
`,
  },

  '@typescript-eslint/no-confusing-non-null-assertion': {
    incorrect: `export function isAdmin(role: string | undefined): boolean {
  return role! == 'admin'
}
`,
    correct: `export function isAdmin(role: string | undefined): boolean {
  return role === 'admin'
}
`,
  },

  '@typescript-eslint/no-duplicate-enum-values': {
    incorrect: `export enum Status {
  Active = 'active',
  Archived = 'active',
}
`,
    correct: `export enum Status {
  Active = 'active',
  Archived = 'archived',
}
`,
  },

  '@typescript-eslint/no-duplicate-type-constituents': {
    incorrect: `export type Status = 'open' | 'closed' | 'open'
`,
    correct: `export type Status = 'open' | 'closed'
`,
  },

  '@typescript-eslint/no-empty-function': {
    incorrect: `export function onClose(): void {}
`,
    correct: `export function onClose(): void {
  // Nothing to release: the dialog holds no resources.
}
`,
  },

  '@typescript-eslint/no-empty-object-type': {
    incorrect: `type UserProps = { name: string }

export interface AdminProps extends UserProps {}
`,
    correct: `type UserProps = { name: string }

export type AdminProps = UserProps
`,
  },

  '@typescript-eslint/no-explicit-any': {
    incorrect: `export function isString(value: any): boolean {
  return typeof value === 'string'
}
`,
    correct: `export function isString(value: unknown): boolean {
  return typeof value === 'string'
}
`,
  },

  '@typescript-eslint/no-extra-non-null-assertion': {
    incorrect: `export function nameOf(user: { name: string } | undefined): string {
  return user!!.name
}
`,
    correct: `export function nameOf(user: { name: string } | undefined): string | undefined {
  return user?.name
}
`,
  },

  '@typescript-eslint/no-extraneous-class': {
    incorrect: `export class Price {
  static withTax(amount: number): number {
    return amount * 1.2
  }
}
`,
    correct: `export function withTax(amount: number): number {
  return amount * 1.2
}
`,
  },

  '@typescript-eslint/no-floating-promises': {
    incorrect: `const save = (): Promise<Response> => fetch('/save', { method: 'POST' })

export function submit(): void {
  save()
}
`,
    correct: `const save = (): Promise<Response> => fetch('/save', { method: 'POST' })

export async function submit(): Promise<void> {
  await save()
}
`,
  },

  '@typescript-eslint/no-for-in-array': {
    incorrect: `export function total(prices: Array<number>): number {
  let sum = 0

  for (const index in prices) {
    sum += prices[Number(index)] ?? 0
  }

  return sum
}
`,
    correct: `export function total(prices: Array<number>): number {
  let sum = 0

  for (const price of prices) {
    sum += price
  }

  return sum
}
`,
  },

  '@typescript-eslint/no-implied-eval': {
    incorrect: `export function refresh(): void {
  setTimeout('location.reload()', 1000)
}
`,
    correct: `export function refresh(): void {
  setTimeout(() => location.reload(), 1000)
}
`,
  },

  '@typescript-eslint/no-inferrable-types': {
    incorrect: `export const retries: number = 3
`,
    correct: `export const retries = 3
`,
  },

  '@typescript-eslint/no-misused-new': {
    incorrect: `export declare class Point {
  new (x: number, y: number): Point
  distanceTo(other: Point): number
}
`,
    correct: `export declare class Point {
  constructor(x: number, y: number)
  distanceTo(other: Point): number
}
`,
  },

  '@typescript-eslint/no-misused-promises': {
    incorrect: `const isAllowed = async (): Promise<boolean> => (await fetch('/allowed')).ok

export function access(): string {
  if (isAllowed()) {
    return 'granted'
  }

  return 'denied'
}
`,
    correct: `const isAllowed = async (): Promise<boolean> => (await fetch('/allowed')).ok

export async function access(): Promise<string> {
  if (await isAllowed()) {
    return 'granted'
  }

  return 'denied'
}
`,
  },

  '@typescript-eslint/no-namespace': {
    incorrect: `export namespace Units {
  export const toCelsius = (fahrenheit: number): number => ((fahrenheit - 32) * 5) / 9
}
`,
    correct: `export const toCelsius = (fahrenheit: number): number => ((fahrenheit - 32) * 5) / 9
`,
  },

  '@typescript-eslint/no-non-null-asserted-nullish-coalescing': {
    incorrect: `type User = { nickname?: string }

export const display = (user: User): string => user.nickname! ?? 'Anonymous'
`,
    correct: `type User = { nickname?: string }

export const display = (user: User): string => user.nickname ?? 'Anonymous'
`,
  },

  '@typescript-eslint/no-non-null-asserted-optional-chain': {
    incorrect: `type User = { address?: { city: string } }

export function cityOf(user: User): string {
  return user.address?.city!
}
`,
    correct: `type User = { address?: { city: string } }

export function cityOf(user: User): string | undefined {
  return user.address?.city
}
`,
  },

  '@typescript-eslint/no-non-null-assertion': {
    incorrect: `export function priceOf(prices: Map<string, number>, id: string): number {
  return prices.get(id)!
}
`,
    correct: `export function priceOf(prices: Map<string, number>, id: string): number {
  return prices.get(id) ?? 0
}
`,
  },

  '@typescript-eslint/no-redundant-type-constituents': {
    incorrect: `export type Role = 'admin' | 'editor' | string
`,
    correct: `export type Role = 'admin' | 'editor'
`,
  },

  '@typescript-eslint/no-require-imports': {
    incorrect: `const fs = require('fs')

export const read = (file: string): string => fs.readFileSync(file, 'utf8')
`,
    correct: `import { readFileSync } from 'node:fs'

export const read = (file: string): string => readFileSync(file, 'utf8')
`,
  },

  '@typescript-eslint/no-this-alias': {
    incorrect: `export class Counter {
  count = 0

  start(): void {
    const self = this

    setInterval(function () {
      self.count += 1
    }, 1000)
  }
}
`,
    correct: `export class Counter {
  count = 0

  start(): void {
    setInterval(() => {
      this.count += 1
    }, 1000)
  }
}
`,
  },

  '@typescript-eslint/no-unnecessary-condition': {
    incorrect: `export function label(name: string): string {
  return name ?? 'Anonymous'
}
`,
    correct: `export function label(name: string | undefined): string {
  return name ?? 'Anonymous'
}
`,
  },

  '@typescript-eslint/no-unnecessary-type-assertion': {
    incorrect: `export function length(text: string): number {
  return (text as string).length
}
`,
    correct: `export function length(text: string): number {
  return text.length
}
`,
  },

  '@typescript-eslint/no-unnecessary-type-constraint': {
    incorrect: `export function identity<T extends unknown>(value: T): T {
  return value
}
`,
    correct: `export function identity<T>(value: T): T {
  return value
}
`,
  },

  '@typescript-eslint/no-unsafe-argument': {
    incorrect: `declare function rename(name: string): void

export function handle(body: string): void {
  rename(JSON.parse(body))
}
`,
    correct: `declare function rename(name: string): void

export function handle(body: string): void {
  const name: unknown = JSON.parse(body)

  if (typeof name === 'string') {
    rename(name)
  }
}
`,
  },

  '@typescript-eslint/no-unsafe-assignment': {
    incorrect: `export function readConfig(raw: string): void {
  const config = JSON.parse(raw)

  console.log(config)
}
`,
    correct: `export function readConfig(raw: string): void {
  const config: unknown = JSON.parse(raw)

  console.log(config)
}
`,
  },

  '@typescript-eslint/no-unsafe-call': {
    incorrect: `export function run(plugin: any): void {
  plugin.start()
}
`,
    correct: `type Plugin = { start: () => void }

export function run(plugin: Plugin): void {
  plugin.start()
}
`,
  },

  '@typescript-eslint/no-unsafe-declaration-merging': {
    incorrect: `export interface User {
  name: string
}

export class User {
  id = 1
}
`,
    correct: `export interface Named {
  name: string
}

export class User implements Named {
  id = 1
  name = 'Ada'
}
`,
  },

  '@typescript-eslint/no-unsafe-enum-comparison': {
    incorrect: `export enum Status {
  Active = 'active',
  Inactive = 'inactive',
}

export const isActive = (status: Status): boolean => status === 'active'
`,
    correct: `export enum Status {
  Active = 'active',
  Inactive = 'inactive',
}

export const isActive = (status: Status): boolean => status === Status.Active
`,
  },

  '@typescript-eslint/no-unsafe-function-type': {
    incorrect: `export function onReady(callback: Function): void {
  callback()
}
`,
    correct: `export function onReady(callback: () => void): void {
  callback()
}
`,
  },

  '@typescript-eslint/no-unsafe-member-access': {
    incorrect: `export function readName(raw: string): unknown {
  return JSON.parse(raw).name
}
`,
    correct: `export function readName(raw: string): unknown {
  const data: unknown = JSON.parse(raw)

  if (typeof data === 'object' && data !== null && 'name' in data) {
    return data.name
  }

  return undefined
}
`,
  },

  '@typescript-eslint/no-unsafe-return': {
    incorrect: `export function parse(raw: string) {
  return JSON.parse(raw)
}
`,
    correct: `export function parse(raw: string): unknown {
  return JSON.parse(raw)
}
`,
  },

  '@typescript-eslint/no-unsafe-unary-minus': {
    incorrect: `export const negate = (amount: string): number => -amount
`,
    correct: `export const negate = (amount: string): number => -Number(amount)
`,
  },

  '@typescript-eslint/no-unused-expressions': {
    incorrect: `export function boot(isReady: boolean, start: () => void): void {
  isReady && start()
}
`,
    correct: `export function boot(isReady: boolean, start: () => void): void {
  if (isReady) {
    start()
  }
}
`,
  },

  '@typescript-eslint/no-unused-vars': {
    incorrect: `import { readFile, writeFile } from 'node:fs/promises'

export const load = (file: string): Promise<string> => readFile(file, 'utf8')
`,
    correct: `import { readFile } from 'node:fs/promises'

export const load = (file: string): Promise<string> => readFile(file, 'utf8')
`,
  },

  '@typescript-eslint/no-wrapper-object-types': {
    incorrect: `export type User = { name: String; age: Number }
`,
    correct: `export type User = { name: string; age: number }
`,
  },

  '@typescript-eslint/non-nullable-type-assertion-style': {
    incorrect: `export function shout(name: string | undefined): string {
  return (name as string).toUpperCase()
}
`,
    correct: `export function shout(name: string | undefined): string {
  return (name ?? '').toUpperCase()
}
`,
  },

  '@typescript-eslint/only-throw-error': {
    incorrect: `export function assertFound(found: boolean): void {
  if (!found) {
    throw 'Not found'
  }
}
`,
    correct: `export function assertFound(found: boolean): void {
  if (!found) {
    throw new Error('Not found')
  }
}
`,
  },

  '@typescript-eslint/prefer-as-const': {
    incorrect: `export const shape = { kind: 'circle' as 'circle', radius: 2 }
`,
    correct: `export const shape = { kind: 'circle' as const, radius: 2 }
`,
  },

  '@typescript-eslint/prefer-find': {
    incorrect: `type User = { id: string }

export const findUser = (users: Array<User>, id: string): User | undefined =>
  users.filter((user) => user.id === id)[0]
`,
    correct: `type User = { id: string }

export const findUser = (users: Array<User>, id: string): User | undefined =>
  users.find((user) => user.id === id)
`,
  },

  '@typescript-eslint/prefer-for-of': {
    incorrect: `export function total(prices: Array<number>): number {
  let sum = 0

  for (let index = 0; index < prices.length; index++) {
    sum += prices[index] ?? 0
  }

  return sum
}
`,
    correct: `export function total(prices: Array<number>): number {
  let sum = 0

  for (const price of prices) {
    sum += price
  }

  return sum
}
`,
  },

  '@typescript-eslint/prefer-function-type': {
    incorrect: `export interface Handler {
  (event: Event): void
}
`,
    correct: `export type Handler = (event: Event) => void
`,
  },

  '@typescript-eslint/prefer-includes': {
    incorrect: `export const hasTag = (tags: Array<string>, tag: string): boolean => tags.indexOf(tag) !== -1
`,
    correct: `export const hasTag = (tags: Array<string>, tag: string): boolean => tags.includes(tag)
`,
  },

  '@typescript-eslint/prefer-namespace-keyword': {
    filename: 'analytics.d.ts',
    incorrect: `declare module Analytics {
  function track(event: string): void
}
`,
    correct: `declare namespace Analytics {
  function track(event: string): void
}
`,
  },

  '@typescript-eslint/prefer-nullish-coalescing': {
    incorrect: `export function display(name: string | undefined): string {
  return name || 'Anonymous'
}
`,
    correct: `export function display(name: string | undefined): string {
  return name ?? 'Anonymous'
}
`,
  },

  '@typescript-eslint/prefer-optional-chain': {
    incorrect: `type User = { address?: { city?: string } }

export const cityOf = (user: User | undefined): string | undefined =>
  user && user.address && user.address.city
`,
    correct: `type User = { address?: { city?: string } }

export const cityOf = (user: User | undefined): string | undefined => user?.address?.city
`,
  },

  '@typescript-eslint/prefer-promise-reject-errors': {
    incorrect: `export const timeout = (): Promise<never> => Promise.reject('Request timed out')
`,
    correct: `export const timeout = (): Promise<never> => Promise.reject(new Error('Request timed out'))
`,
  },

  '@typescript-eslint/prefer-regexp-exec': {
    incorrect: `export const firstNumber = (text: string): RegExpMatchArray | null => text.match(/\\d+/)
`,
    correct: `export const firstNumber = (text: string): RegExpExecArray | null => /\\d+/.exec(text)
`,
  },

  '@typescript-eslint/prefer-string-starts-ends-with': {
    incorrect: `export const isSecure = (url: string): boolean => url.indexOf('https://') === 0
`,
    correct: `export const isSecure = (url: string): boolean => url.startsWith('https://')
`,
  },

  '@typescript-eslint/restrict-plus-operands': {
    incorrect: `export const describe = (tags: Array<string>): string => 'Tags: ' + tags
`,
    correct: `export const describe = (tags: Array<string>): string => 'Tags: ' + tags.join(', ')
`,
  },

  '@typescript-eslint/restrict-template-expressions': {
    incorrect: `export const describe = (tags: Array<string>): string => \`Tags: \${tags}\`
`,
    correct: `export const describe = (tags: Array<string>): string => \`Tags: \${tags.join(', ')}\`
`,
  },

  '@typescript-eslint/triple-slash-reference': {
    files: {
      'config.ts': `export type Config = { debug: boolean }
`,
    },
    incorrect: `/// <reference path="./config.ts" />
export const debug = false
`,
    correct: `import type { Config } from './config'

export const config: Config = { debug: false }
`,
  },

  '@typescript-eslint/unbound-method': {
    incorrect: `class Greeter {
  prefix = 'Hello'

  greet(name: string): string {
    return \`\${this.prefix} \${name}\`
  }
}

export const greet = new Greeter().greet
`,
    correct: `class Greeter {
  prefix = 'Hello'

  greet(name: string): string {
    return \`\${this.prefix} \${name}\`
  }
}

const greeter = new Greeter()

export const greet = (name: string): string => greeter.greet(name)
`,
  },
}
