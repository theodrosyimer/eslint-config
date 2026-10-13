// eslint-plugin-react rules.
export default {
  'react/display-name': {
    ext: 'tsx',
    incorrect: `import { memo } from 'react'
import { Text } from 'react-native'

export const Title = memo(({ label }: { label: string }) => <Text>{label}</Text>)
`,
    correct: `import { memo } from 'react'
import { Text } from 'react-native'

export const Title = memo(function Title({ label }: { label: string }) {
  return <Text>{label}</Text>
})
`,
  },

  'react/jsx-key': {
    ext: 'tsx',
    incorrect: `import { Text, View } from 'react-native'

export function Names({ names }: { names: Array<string> }) {
  return <View>{names.map((name) => <Text>{name}</Text>)}</View>
}
`,
    correct: `import { Text, View } from 'react-native'

export function Names({ names }: { names: Array<string> }) {
  return (
    <View>
      {names.map((name) => (
        <Text key={name}>{name}</Text>
      ))}
    </View>
  )
}
`,
  },

  'react/jsx-no-comment-textnodes': {
    ext: 'tsx',
    incorrect: `export function Panel() {
  return <div>// TODO: add content</div>
}
`,
    correct: `export function Panel() {
  return <div>{/* TODO: add content */}</div>
}
`,
  },

  'react/jsx-no-duplicate-props': {
    ext: 'tsx',
    incorrect: `export function Avatar({ url }: { url: string }) {
  return <img src={url} alt="Avatar" alt="Profile picture" />
}
`,
    correct: `export function Avatar({ url }: { url: string }) {
  return <img src={url} alt="Profile picture" />
}
`,
  },

  'react/jsx-no-target-blank': {
    ext: 'tsx',
    incorrect: `export function DocsLink() {
  return (
    <a href="https://example.com/docs" target="_blank" rel="opener">
      <img src="/docs.svg" alt="Docs" />
    </a>
  )
}
`,
    correct: `export function DocsLink() {
  return (
    <a href="https://example.com/docs" target="_blank" rel="noreferrer">
      <img src="/docs.svg" alt="Docs" />
    </a>
  )
}
`,
  },

  'react/jsx-no-undef': {
    ext: 'tsx',
    incorrect: `export function Screen() {
  return <Header />
}
`,
    correct: `import { Header } from './header'

export function Screen() {
  return <Header />
}
`,
    files: {
      'header.tsx': `export function Header() {
  return <header />
}
`,
    },
  },

  'react/jsx-uses-react': {
    skip: 'It never reports: lib/rules/jsx-uses-react.js in eslint-plugin-react 7.37.5 only calls markVariableAsUsed so no-unused-vars stops flagging the React import, and holds no context.report call.',
  },

  'react/jsx-uses-vars': {
    skip: 'It never reports: lib/rules/jsx-uses-vars.js in eslint-plugin-react 7.37.5 only calls markVariableAsUsed so no-unused-vars counts components used in JSX, and holds no context.report call.',
  },

  'react/no-children-prop': {
    ext: 'tsx',
    incorrect: `import { Text } from 'react-native'

export function Label({ value }: { value: string }) {
  return <Text children={value} />
}
`,
    correct: `import { Text } from 'react-native'

export function Label({ value }: { value: string }) {
  return <Text>{value}</Text>
}
`,
  },

  'react/no-danger-with-children': {
    ext: 'tsx',
    incorrect: `export function Article({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }}>Loading</div>
}
`,
    correct: `export function Article({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
`,
  },

  'react/no-deprecated': {
    ext: 'tsx',
    incorrect: `import { Component } from 'react'
import { Text } from 'react-native'

export class Clock extends Component<{ zone: string }> {
  componentWillReceiveProps() {
    this.forceUpdate()
  }

  render() {
    return <Text>{this.props.zone}</Text>
  }
}
`,
    correct: `import { Component } from 'react'
import { Text } from 'react-native'

export class Clock extends Component<{ zone: string }> {
  componentDidUpdate() {
    this.forceUpdate()
  }

  render() {
    return <Text>{this.props.zone}</Text>
  }
}
`,
  },

  'react/no-direct-mutation-state': {
    ext: 'tsx',
    incorrect: `import { Component } from 'react'
import { Pressable, Text } from 'react-native'

export class Counter extends Component<object, { count: number }> {
  state = { count: 0 }

  increment = () => {
    this.state.count = this.state.count + 1
  }

  render() {
    return (
      <Pressable onPress={this.increment}>
        <Text>{this.state.count}</Text>
      </Pressable>
    )
  }
}
`,
    correct: `import { Component } from 'react'
import { Pressable, Text } from 'react-native'

export class Counter extends Component<object, { count: number }> {
  state = { count: 0 }

  increment = () => {
    this.setState(({ count }) => ({ count: count + 1 }))
  }

  render() {
    return (
      <Pressable onPress={this.increment}>
        <Text>{this.state.count}</Text>
      </Pressable>
    )
  }
}
`,
  },

  'react/no-find-dom-node': {
    ext: 'tsx',
    incorrect: `import { Component } from 'react'
import { findDOMNode } from 'react-dom'

export class AutoFocus extends Component {
  componentDidMount() {
    findDOMNode(this)
  }

  render() {
    return <input />
  }
}
`,
    correct: `import { Component, createRef } from 'react'

export class AutoFocus extends Component {
  input = createRef<HTMLInputElement>()

  componentDidMount() {
    this.input.current?.focus()
  }

  render() {
    return <input ref={this.input} />
  }
}
`,
  },

  'react/no-is-mounted': {
    ext: 'tsx',
    incorrect: `import { Component } from 'react'
import { Text } from 'react-native'

export class Status extends Component<object, { online: boolean }> {
  state = { online: false }

  componentDidMount() {
    if (this.isMounted()) {
      this.setState({ online: true })
    }
  }

  render() {
    return <Text>{String(this.state.online)}</Text>
  }
}
`,
    correct: `import { Component } from 'react'
import { Text } from 'react-native'

export class Status extends Component<object, { online: boolean }> {
  state = { online: false }

  componentDidMount() {
    this.setState({ online: true })
  }

  render() {
    return <Text>{String(this.state.online)}</Text>
  }
}
`,
  },

  'react/no-render-return-value': {
    ext: 'tsx',
    incorrect: `import ReactDOM from 'react-dom'

import { App } from './app'

export const app = ReactDOM.render(<App />, document.getElementById('root'))
`,
    correct: `import { createRoot } from 'react-dom/client'

import { App } from './app'

const container = document.getElementById('root')

if (container) {
  createRoot(container).render(<App />)
}
`,
    files: {
      'app.tsx': `export function App() {
  return <main />
}
`,
    },
  },

  'react/no-string-refs': {
    ext: 'tsx',
    incorrect: `import { Component } from 'react'

export class Search extends Component {
  render() {
    return <input ref="search" />
  }
}
`,
    correct: `import { Component, createRef } from 'react'

export class Search extends Component {
  search = createRef<HTMLInputElement>()

  render() {
    return <input ref={this.search} />
  }
}
`,
  },

  'react/no-unescaped-entities': {
    ext: 'tsx',
    incorrect: `import { Text } from 'react-native'

export function Empty() {
  return <Text>You don't have any messages yet.</Text>
}
`,
    correct: `import { Text } from 'react-native'

export function Empty() {
  return <Text>You don&apos;t have any messages yet.</Text>
}
`,
  },

  'react/no-unknown-property': {
    ext: 'tsx',
    incorrect: `export function Field() {
  return <input class="field" type="email" />
}
`,
    correct: `export function Field() {
  return <input className="field" type="email" />
}
`,
  },

  'react/prop-types': {
    ext: 'tsx',
    incorrect: `import { Text } from 'react-native'

export function Greeting({ name }) {
  return <Text>{name}</Text>
}
`,
    correct: `import { Text } from 'react-native'

export function Greeting({ name }: { name: string }) {
  return <Text>{name}</Text>
}
`,
  },

  'react/react-in-jsx-scope': {
    ext: 'js',
    incorrect: `export function SearchBox() {
  return <input type="search" />
}
`,
    correct: `import * as React from 'react'

export function SearchBox() {
  return <input type="search" />
}
`,
  },

  'react/require-render-return': {
    ext: 'tsx',
    incorrect: `import { Component } from 'react'
import { Text } from 'react-native'

export class Banner extends Component {
  render() {
    <Text>Welcome</Text>
  }
}
`,
    correct: `import { Component } from 'react'
import { Text } from 'react-native'

export class Banner extends Component {
  render() {
    return <Text>Welcome</Text>
  }
}
`,
  },
}
