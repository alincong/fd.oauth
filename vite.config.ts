import vue from '@vitejs/plugin-vue'
import { ConfigEnv, loadEnv } from 'vite'
import { parseEnv } from './vite/util'
import resolve from './vite/resolve'
import css from './vite/css'
import { createServer } from './vite/server'
import { build } from './vite/build'
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv) => {
  const isBuild = command === 'build' // 是否为 `build` 指令
  const env = parseEnv(loadEnv(mode, process.cwd())) // 当前环境变量

  return {
    plugins: [vue()],
    resolve,
    css,
    server: createServer(env, isBuild),
    build: build(env),
  }
}
