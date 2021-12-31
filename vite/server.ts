import { ServerOptions } from 'vite'


export function createServer(env: Record<string, any>, isBuild: boolean) {
  return {
    port: 8080,
    open: true,
    cors: true,
    proxy: {
      '/api': {
        target: env.VITE_APP_API_BASEURL,
        changeOrigin: !isBuild && env.VITE_OPEN_PROXY,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  } as ServerOptions
}
