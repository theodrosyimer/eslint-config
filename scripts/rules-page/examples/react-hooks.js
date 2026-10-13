// eslint-plugin-react-hooks rules, most of them React Compiler diagnostics.
export default {
  'react-hooks/config': {
    skip: "Reports only React Compiler configuration errors from the rule's own options (eslint-plugin-react-hooks 7.1.1 builds them from `context.options[0]`, which this config never sets) or a mismatching `moduleTypeProvider`, whose built-in default names every hook consistently, so no source code can trigger it.",
  },

  'react-hooks/error-boundaries': {
    ext: 'tsx',
    incorrect: `import { Text } from 'react-native'

import { Chart } from './chart'

export function Dashboard({ points }: { points: Array<number> }) {
  try {
    return <Chart points={points} />
  } catch {
    return <Text>The chart failed to render.</Text>
  }
}
`,
    correct: `import { Chart } from './chart'
import { ErrorBoundary } from './error-boundary'

export function Dashboard({ points }: { points: Array<number> }) {
  return (
    <ErrorBoundary>
      <Chart points={points} />
    </ErrorBoundary>
  )
}
`,
    files: {
      'chart.tsx': `import { Text } from 'react-native'

export function Chart({ points }: { points: Array<number> }) {
  return <Text>{points.join(', ')}</Text>
}
`,
      'error-boundary.tsx': `import { Component, type ReactNode } from 'react'
import { Text } from 'react-native'

type Props = { children: ReactNode }

type State = { failed: boolean }

export class ErrorBoundary extends Component<Props, State> {
  state = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  render() {
    if (this.state.failed) {
      return <Text>The chart failed to render.</Text>
    }

    return this.props.children
  }
}
`,
    },
  },

  'react-hooks/exhaustive-deps': {
    ext: 'tsx',
    incorrect: `import { useCallback } from 'react'

export function useSave(id: string, save: (id: string) => void) {
  return useCallback(() => save(id), [])
}
`,
    correct: `import { useCallback } from 'react'

export function useSave(id: string, save: (id: string) => void) {
  return useCallback(() => save(id), [id, save])
}
`,
  },

  'react-hooks/gating': {
    skip: "Reports only malformed `use memo if(...)` dynamic gating directives, which eslint-plugin-react-hooks 7.1.1 parses only when the compiler's `dynamicGating` option is set (its default is `null` and `findDirectivesDynamicGating` returns early), and this config passes the rule no options.",
  },

  'react-hooks/globals': {
    ext: 'tsx',
    incorrect: `import { Text } from 'react-native'

let renderCount = 0

export function Counter() {
  renderCount += 1

  return <Text>{renderCount}</Text>
}
`,
    correct: `import { useEffect } from 'react'
import { Text } from 'react-native'

let renderCount = 0

export function Counter() {
  useEffect(() => {
    renderCount += 1
    console.info(\`Rendered \${renderCount} times\`)
  })

  return <Text>Counted after render</Text>
}
`,
  },

  'react-hooks/immutability': {
    ext: 'tsx',
    incorrect: `import { Text } from 'react-native'

export function Profile({ user }: { user: { name: string } }) {
  user.name = user.name.trim()

  return <Text>{user.name}</Text>
}
`,
    correct: `import { Text } from 'react-native'

export function Profile({ user }: { user: { name: string } }) {
  const name = user.name.trim()

  return <Text>{name}</Text>
}
`,
  },

  'react-hooks/incompatible-library': {
    ext: 'tsx',
    incorrect: `import { useForm } from 'react-hook-form'
import { Text } from 'react-native'

export function Greeting() {
  const { watch } = useForm<{ name: string }>()
  const name = watch('name')

  return <Text>{name}</Text>
}
`,
    correct: `import { useForm, useWatch } from 'react-hook-form'
import { Text } from 'react-native'

export function Greeting() {
  const { control } = useForm<{ name: string }>()
  const name = useWatch({ control, name: 'name' })

  return <Text>{name}</Text>
}
`,
  },

  'react-hooks/preserve-manual-memoization': {
    ext: 'tsx',
    incorrect: `import { useContext, useMemo } from 'react'
import { Text } from 'react-native'

import { UserContext } from './user-context'

export function TagCount({ tags }: { tags: Array<string> }) {
  const hidden = ['archived']
  const user = useContext(UserContext)

  hidden.push(user.mutedTag)

  const visible = useMemo(() => tags.filter((tag) => !hidden.includes(tag)), [tags, hidden])

  return <Text>{visible.length}</Text>
}
`,
    correct: `import { useContext, useMemo } from 'react'
import { Text } from 'react-native'

import { UserContext } from './user-context'

export function TagCount({ tags }: { tags: Array<string> }) {
  const user = useContext(UserContext)

  const visible = useMemo(() => {
    const hidden = ['archived', user.mutedTag]

    return tags.filter((tag) => !hidden.includes(tag))
  }, [tags, user.mutedTag])

  return <Text>{visible.length}</Text>
}
`,
    files: {
      'user-context.ts': `import { createContext } from 'react'

export const UserContext = createContext({ mutedTag: 'spam' })
`,
    },
  },

  'react-hooks/purity': {
    ext: 'tsx',
    incorrect: `import { Text } from 'react-native'

export function Clock() {
  const now = Date.now()

  return <Text>{now}</Text>
}
`,
    correct: `import { useState } from 'react'
import { Text } from 'react-native'

export function Clock() {
  const [now] = useState(() => Date.now())

  return <Text>{now}</Text>
}
`,
  },

  'react-hooks/refs': {
    ext: 'tsx',
    incorrect: `import { useRef } from 'react'
import { Text } from 'react-native'

export function Renders() {
  const count = useRef(0)

  count.current += 1

  return <Text>{count.current}</Text>
}
`,
    correct: `import { useEffect, useRef } from 'react'

export function useRenderCount() {
  const count = useRef(0)

  useEffect(() => {
    count.current += 1
  })

  return count
}
`,
  },

  'react-hooks/rules-of-hooks': {
    ext: 'tsx',
    incorrect: `import { useState } from 'react'

export function useDraft(enabled: boolean) {
  if (!enabled) {
    return ''
  }

  const [draft] = useState('')

  return draft
}
`,
    correct: `import { useState } from 'react'

export function useDraft(enabled: boolean) {
  const [draft] = useState('')

  if (!enabled) {
    return ''
  }

  return draft
}
`,
  },

  'react-hooks/set-state-in-effect': {
    ext: 'tsx',
    incorrect: `import { useEffect, useState } from 'react'

export function useFullName(first: string, last: string) {
  const [fullName, setFullName] = useState('')

  useEffect(() => {
    setFullName(\`\${first} \${last}\`)
  }, [first, last])

  return fullName
}
`,
    correct: `export function useFullName(first: string, last: string) {
  return \`\${first} \${last}\`
}
`,
  },

  'react-hooks/set-state-in-render': {
    ext: 'tsx',
    incorrect: `import { useState } from 'react'
import { Text } from 'react-native'

export function Total({ price }: { price: number }) {
  const [total, setTotal] = useState(0)

  setTotal(price * 1.2)

  return <Text>{total}</Text>
}
`,
    correct: `import { Text } from 'react-native'

export function Total({ price }: { price: number }) {
  const total = price * 1.2

  return <Text>{total}</Text>
}
`,
  },

  'react-hooks/static-components': {
    ext: 'tsx',
    incorrect: `import { Text, View } from 'react-native'

export function Card({ title }: { title: string }) {
  const Header = () => <Text>{title}</Text>

  return (
    <View>
      <Header />
    </View>
  )
}
`,
    correct: `import { Text, View } from 'react-native'

const Header = ({ title }: { title: string }) => <Text>{title}</Text>

export function Card({ title }: { title: string }) {
  return (
    <View>
      <Header title={title} />
    </View>
  )
}
`,
  },

  'react-hooks/unsupported-syntax': {
    ext: 'tsx',
    incorrect: `import { Text } from 'react-native'

export function Settings({ raw }: { raw: string }) {
  const settings: unknown = eval(\`(\${raw})\`)

  return <Text>{String(settings)}</Text>
}
`,
    correct: `import { Text } from 'react-native'

export function Settings({ raw }: { raw: string }) {
  const settings: unknown = JSON.parse(raw)

  return <Text>{String(settings)}</Text>
}
`,
  },

  'react-hooks/use-memo': {
    ext: 'tsx',
    incorrect: `import { useMemo } from 'react'

export function useProfile(url: string) {
  return useMemo(async () => fetch(url), [url])
}
`,
    correct: `import { useMemo } from 'react'

export function useProfile(url: string) {
  return useMemo(() => fetch(url), [url])
}
`,
  },

  'react-hooks/void-use-memo': {
    ext: 'tsx',
    incorrect: `import { useMemo } from 'react'

export function useLogged(value: string) {
  useMemo(() => {
    console.info(value)
  }, [value])
}
`,
    correct: `import { useEffect } from 'react'

export function useLogged(value: string) {
  useEffect(() => {
    console.info(value)
  }, [value])
}
`,
  },
}
