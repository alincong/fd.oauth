import { RouteRecordRaw } from 'vue-router'

export default {
  path: '/application',
  component: () => import('@/layout/Index.vue'),
  children: [
    {
      path: '',
      name: 'Application',
      component: () => import('@/views/application/Index.vue'),
      meta: {
        title: '应用'
      }
    }
  ]
} as RouteRecordRaw
