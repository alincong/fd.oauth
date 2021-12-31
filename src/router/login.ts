import { RouteRecordRaw } from 'vue-router'

export default {
  path: '/login',
  name: 'Login',
  component: () => import('@/layout/Login.vue'),
  children: [
    {
      path: '',
      component: () => import('@/views/login/Index.vue')
    }
  ]
} as RouteRecordRaw
