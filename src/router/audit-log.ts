import { RouteRecordRaw } from 'vue-router'

export default {
  path: '/logs',
  component: () => import('@/layout/Index.vue'),
  meta: {
    title: '审计日志'
  },
  children: [
    {
      path: 'user',
      component: () => import('@/views/audit-log/user/Index.vue'),
      meta: {
        title: '用户行为日志'
      }
    },
    {
      path: 'admin',
      component: () => import('@/views/audit-log/admin/Index.vue'),
      meta: {
        title: '管理员操作日志'
      }
    }
  ]
} as RouteRecordRaw
