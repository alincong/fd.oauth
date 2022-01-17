import { ServerOptions } from 'vite'

export function createServer(env: Record<string, any>) {
  return {
    port: 3000,
    open: true,
    cors: true,
    proxy: {
      '/api': {
        target: env.VITE_APP_API_BASEURL,
        changeOrigin: env.VITE_OPEN_PROXY,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  } as ServerOptions
}
