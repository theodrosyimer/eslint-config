// @stylistic, @tanstack/query, react-native and turbo rules.
export default {
  '@stylistic/padding-line-between-statements': {
    incorrect: `export function total(items: Array<number>): number {
  let sum = 0
  for (const item of items) {
    sum += item
  }
  return sum
}
`,
    correct: `export function total(items: Array<number>): number {
  let sum = 0

  for (const item of items) {
    sum += item
  }

  return sum
}
`,
  },

  '@tanstack/query/exhaustive-deps': {
    ext: 'tsx',
    incorrect: `import { useQuery } from '@tanstack/react-query'

export function useTodo(id: string) {
  return useQuery({
    queryKey: ['todo'],
    queryFn: () => fetch(\`/todos/\${id}\`),
  })
}
`,
    correct: `import { useQuery } from '@tanstack/react-query'

export function useTodo(id: string) {
  return useQuery({
    queryKey: ['todo', id],
    queryFn: () => fetch(\`/todos/\${id}\`),
  })
}
`,
  },

  '@tanstack/query/infinite-query-property-order': {
    ext: 'tsx',
    incorrect: `import { useInfiniteQuery } from '@tanstack/react-query'

export function useTodos() {
  return useInfiniteQuery({
    queryKey: ['todos'],
    getNextPageParam: (_last: unknown, pages: Array<unknown>) => pages.length,
    queryFn: ({ pageParam }) => fetch(\`/todos?page=\${pageParam}\`),
    initialPageParam: 0,
  })
}
`,
    correct: `import { useInfiniteQuery } from '@tanstack/react-query'

export function useTodos() {
  return useInfiniteQuery({
    queryKey: ['todos'],
    queryFn: ({ pageParam }) => fetch(\`/todos?page=\${pageParam}\`),
    initialPageParam: 0,
    getNextPageParam: (_last, pages) => pages.length,
  })
}
`,
  },

  '@tanstack/query/mutation-property-order': {
    ext: 'tsx',
    incorrect: `import { useMutation } from '@tanstack/react-query'

export function useSave() {
  return useMutation({
    mutationFn: (name: string) => fetch('/save', { method: 'POST', body: name }),
    onError: () => undefined,
    onMutate: () => undefined,
  })
}
`,
    correct: `import { useMutation } from '@tanstack/react-query'

export function useSave() {
  return useMutation({
    mutationFn: (name: string) => fetch('/save', { method: 'POST', body: name }),
    onMutate: () => undefined,
    onError: () => undefined,
  })
}
`,
  },

  '@tanstack/query/no-rest-destructuring': {
    ext: 'tsx',
    incorrect: `import { useQuery } from '@tanstack/react-query'

export function useTodoStatus() {
  const { data, ...rest } = useQuery({ queryKey: ['todo'], queryFn: () => fetch('/todo') })

  return [data, rest.status]
}
`,
    correct: `import { useQuery } from '@tanstack/react-query'

export function useTodoStatus() {
  const { data, status } = useQuery({ queryKey: ['todo'], queryFn: () => fetch('/todo') })

  return [data, status]
}
`,
  },

  '@tanstack/query/no-unstable-deps': {
    ext: 'tsx',
    incorrect: `import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'

export function useSaveHandler() {
  const mutation = useMutation({ mutationFn: () => fetch('/save') })

  return useCallback(() => {
    mutation.mutate()
  }, [mutation])
}
`,
    correct: `import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'

export function useSaveHandler() {
  const { mutate } = useMutation({ mutationFn: () => fetch('/save') })

  return useCallback(() => {
    mutate()
  }, [mutate])
}
`,
  },

  '@tanstack/query/no-void-query-fn': {
    ext: 'tsx',
    incorrect: `import { useQuery } from '@tanstack/react-query'

export function useLog() {
  return useQuery({
    queryKey: ['log'],
    queryFn: () => {
      console.log('loaded')
    },
  })
}
`,
    correct: `import { useQuery } from '@tanstack/react-query'

export function useLog() {
  return useQuery({
    queryKey: ['log'],
    queryFn: () => fetch('/log'),
  })
}
`,
  },

  '@tanstack/query/stable-query-client': {
    ext: 'tsx',
    incorrect: `import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  const client = new QueryClient()

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
`,
    correct: `import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import type { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient())

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
`,
  },

  'react-native/no-color-literals': {
    ext: 'tsx',
    incorrect: `import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  title: { color: '#ff0000' },
})
`,
    correct: `import { StyleSheet } from 'react-native'

const colors = { primary: '#ff0000' }

export const styles = StyleSheet.create({
  title: { color: colors.primary },
})
`,
  },

  'react-native/no-inline-styles': {
    ext: 'tsx',
    incorrect: `import { Text } from 'react-native'

export function Title() {
  return <Text style={{ fontSize: 24 }}>Title</Text>
}
`,
    correct: `import { StyleSheet, Text } from 'react-native'

const styles = StyleSheet.create({
  title: { fontSize: 24 },
})

export function Title() {
  return <Text style={styles.title}>Title</Text>
}
`,
  },

  'react-native/no-raw-text': {
    ext: 'tsx',
    incorrect: `import { View } from 'react-native'

export function Greeting() {
  return <View>Hello</View>
}
`,
    correct: `import { Text, View } from 'react-native'

export function Greeting() {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  )
}
`,
  },

  'react-native/no-single-element-style-arrays': {
    ext: 'tsx',
    incorrect: `import { StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  box: { flex: 1 },
})

export function Box() {
  return <View style={[styles.box]} />
}
`,
    correct: `import { StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  box: { flex: 1 },
})

export function Box() {
  return <View style={styles.box} />
}
`,
  },

  'react-native/no-unused-styles': {
    ext: 'tsx',
    incorrect: `import { StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  box: { flex: 1 },
  unused: { flex: 2 },
})

export function Box() {
  return <View style={styles.box} />
}
`,
    correct: `import { StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  box: { flex: 1 },
})

export function Box() {
  return <View style={styles.box} />
}
`,
  },

  'react-native/sort-styles': {
    ext: 'tsx',
    incorrect: `import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  title: { margin: 4, fontSize: 24 },
})
`,
    correct: `import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  title: { fontSize: 24, margin: 4 },
})
`,
  },

  'react-native/split-platform-components': {
    filename: 'Spinner.tsx',
    incorrect: `import { ActivityIndicatorIOS, ProgressBarAndroid } from 'react-native'

export const spinners = [ActivityIndicatorIOS, ProgressBarAndroid]
`,
    correct: `import { ActivityIndicator } from 'react-native'

export const spinner = ActivityIndicator
`,
  },

  'turbo/no-undeclared-env-vars': {
    rootFiles: {
      'package.json': '{ "name": "rules-fixture", "private": true }\n',
      'turbo.json': '{ "globalEnv": ["API_URL"], "tasks": { "build": {} } }\n',
    },
    incorrect: `export const secret = process.env['SECRET_KEY']
`,
    correct: `export const apiUrl = process.env['API_URL']
`,
  },
}
