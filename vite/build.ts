import { BuildOptions } from 'vite'

export function build(env: Record<string, any>) {
  return {
    sourcemap: env.VITE_BUILD_SOURCEMAP,
    terserOptions: {
      compress: {
        drop_console: env.VITE_DROP_CONSOLE
      }
    }
  } as BuildOptions
}
