import { RouteRecordRaw } from 'vue-router'

export default {
  path: '/user',
  component: () => import('@/layout/Index.vue'),
  meta: {
    title: '用户管理'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/user-manage/list/Index.vue'),
      meta: {
        title: '用户列表'
      },
    },
    {
      path: 'see-user',
      component: () => import('@/views/user-manage/list/see-user.vue'),
      meta: {
        title: '编辑用户'
      },
    },
    {
      path: 'org',
      component: () => import('@/views/user-manage/organization/Index.vue'),
      meta: {
        title: '组织架构'
      },
    },
  ]
} as RouteRecordRaw
