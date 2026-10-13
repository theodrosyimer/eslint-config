import { defineConfig } from 'eslint/config'

import defaultConfig from '../../default.js'
import reactWebConfig from '../../react-web.js'
import reactConfig from '../../react.js'
import { turboAddon } from '../../turbo.js'

// The configs the page documents, in the order its columns show them. A rule's
// examples are linted with the first config that enables it.
export const configs = [
  { id: 'default', label: 'Default', config: defaultConfig },
  { id: 'react', label: 'React', config: reactConfig },
  { id: 'react-web', label: 'React Web', config: reactWebConfig },
  { id: 'turbo', label: 'Turbo addon', config: defineConfig(...defaultConfig, ...turboAddon) },
]
