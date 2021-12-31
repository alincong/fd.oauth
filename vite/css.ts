import { CSSOptions } from 'vite'

export default {
  preprocessorOptions: {
    scss: {
      // additionalData: `@import "element-plus/theme-chalk/src/common/var.scss";` // 使用 elementPlus 全局 scss 变量
    }
  }
} as CSSOptions
