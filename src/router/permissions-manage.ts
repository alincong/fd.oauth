import { RouteRecordRaw } from 'vue-router'

export default {
  path: '/permissions',
  component: () => import('@/layout/Index.vue'),
  children: [
    {
      path: '',
      component: () => import('@/views/permissions-manage/Index.vue'),
      meta: {
        keepName: 'permissions',
        title: '权限管理',
      }
    },
  ]
} as RouteRecordRaw
