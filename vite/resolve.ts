import { resolve } from 'path'
import { ResolveOptions } from 'vite'

export default {
  alias: {
    '@': resolve(__dirname, '../src')
  }
} as ResolveOptions
