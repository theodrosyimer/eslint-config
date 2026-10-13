// eslint-plugin-import-x rules.
const math = `export function add(a: number, b: number) {
  return a + b
}

export function multiply(a: number, b: number) {
  return a * b
}
`

const mathWithDefault = `export function add(a: number, b: number) {
  return a + b
}

export default function sum(values: Array<number>) {
  return values.reduce(add, 0)
}
`

export default {
  'import-x/default': {
    files: { 'math.ts': math },
    incorrect: `import math from './math'

export const total = math.add(1, 2)
`,
    correct: `import { add } from './math'

export const total = add(1, 2)
`,
  },

  'import-x/export': {
    incorrect: `export function add(a: number, b: number) {
  return a + b
}

export { add }
`,
    correct: `export function add(a: number, b: number) {
  return a + b
}
`,
  },

  'import-x/namespace': {
    files: { 'math.ts': math },
    incorrect: `import * as math from './math'

export const difference = math.subtract(3, 1)
`,
    correct: `import * as math from './math'

export const product = math.multiply(3, 2)
`,
  },

  'import-x/no-duplicates': {
    files: { 'math.ts': math },
    incorrect: `import { add } from './math'
import { multiply } from './math'

export const result = multiply(add(1, 2), 3)
`,
    correct: `import { add, multiply } from './math'

export const result = multiply(add(1, 2), 3)
`,
  },

  'import-x/no-named-as-default': {
    files: { 'math.ts': mathWithDefault },
    incorrect: `import add from './math'

export const total = add([1, 2, 3])
`,
    correct: `import sum from './math'

export const total = sum([1, 2, 3])
`,
  },

  'import-x/no-named-as-default-member': {
    files: { 'math.ts': mathWithDefault },
    incorrect: `import sum from './math'

export const total = sum.add(1, 2)
`,
    correct: `import { add } from './math'

export const total = add(1, 2)
`,
  },

  'import-x/no-unresolved': {
    files: { 'math.ts': math },
    incorrect: `import { add } from './maths'

export const total = add(1, 2)
`,
    correct: `import { add } from './math'

export const total = add(1, 2)
`,
  },

  'import-x/order': {
    files: { 'math.ts': math },
    incorrect: `import { add } from './math'
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient()
export const total = add(1, 2)
`,
    correct: `import { QueryClient } from '@tanstack/react-query'

import { add } from './math'

export const queryClient = new QueryClient()
export const total = add(1, 2)
`,
  },
}
