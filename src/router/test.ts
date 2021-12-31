import { RouteRecordRaw } from 'vue-router'

export default {
  path: '/test',
  component: () => import('@/layout/Index.vue'),
  children: [
    {
      path: '',
      component: () => import('@/views/test/Index.vue'),
      meta: {
        keepName: 'test',
        title: '测试',
      },
      children: [
        {
          path: ':id',
          component: () => import('@/views/test/Index.vue'),
          meta: {
            title: '测试详情'
          }
        }
      ]
    },
    
  ],
} as RouteRecordRaw
