import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import { getLocalStorage } from '@/utils/storage'

NProgress.configure({showSpinner: false})

// 获取路由模块映射表
const routeModuleMap = import.meta.globEager('./*.ts')

export const routes: Array<RouteRecordRaw> = [{
  path: '/',
  redirect: '/userpool'
}]

// 注册器
Object.values(routeModuleMap).forEach(item => routes.push(item.default))

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

// 路由跳转拦截
router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = getLocalStorage('token', null)
  if (!token && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

// 路由跳转完成
router.afterEach(() => {
  NProgress.done()
})

/**
 * @description 获取启用 KeepAlive组件名
 * @param list - 路由列表
 * @returns 
 */
const getKeepAliveList = (list: RouteRecordRaw[]) => {
  let keepNameList: string[] = []
  list.forEach((item) => {
    if (typeof item.meta?.keepName === 'string') {
      keepNameList.push(item.meta.keepName)
    }
    if (!!item.children?.length) {
      keepNameList = [ ...keepNameList, ...getKeepAliveList(item.children) ]
    }
  })
  return keepNameList
}

// 启用keepAlive组件列表
export const keepAliveList = getKeepAliveList(routes)

/**
 * 拓展 meta 类型，提供TS更好的推断
 */
declare module 'vue-router' {
  interface RouteMeta {
    title?: string;      // 标题
    keepName?: string;  // 启用keep-alive组件绑定的名字
  }
}
