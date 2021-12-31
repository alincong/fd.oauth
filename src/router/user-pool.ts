import { RouteRecordRaw } from 'vue-router'

export default {
  path: '/userpool',
  component: () => import('@/layout/Entry.vue'),
  children: [
    {
      path: '',
      name: 'UserPool',
      component: () => import('@/views/user-pool/Index.vue'),
      meta: {
        title: '用户池'
      }
    },
  ],
} as RouteRecordRaw
