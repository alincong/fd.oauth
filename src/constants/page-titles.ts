import { RouteRecordRaw } from 'vue-router'
import { routes } from '@/router'

// 页面标题映射表
const PAGE_TITLE: { [key: string]: string } = {}

/**
 * @description 根据路由字典自动获取页面标题，如未定义标题，则为 `未定义页面`
 * @param list - 路由字典
 * @param prefix - 前缀
 */
const getPageTitle = (list: RouteRecordRaw[], prefix: string = '') => {
  list.forEach(item => {
    const { meta, path, children } = item
    const key = path[0] === '/' ? path : `${prefix}/${path}`.replace(/\/$/, '')
    PAGE_TITLE[key] = (meta?.title || '未定义页面') as string
    !!children?.length && getPageTitle(children, key)
  })
  return PAGE_TITLE
}

export default getPageTitle(routes)
