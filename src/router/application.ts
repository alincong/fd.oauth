/*
 * @Author: your name
 * @Date: 2021-12-30 16:48:14
 * @LastEditTime: 2022-01-10 09:59:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \oauth.fandow.com\src\router\application.ts
 */
import { RouteRecordRaw } from 'vue-router'

export default {
  path: '/application',
  component: () => import('@/layout/Index.vue'),
  children: [
    {
      path: '',
      component: () => import('@/views/application/Index.vue'),
      name: 'application',
      meta: {
        title: '应用列表'
      }
    },{
      path: 'applicationItem',
      name: 'applicationItem',
      component: () => import('@/views/application/listDetail/index.vue'),
      meta: {
        title: '应用详情'
      },
    }
  ]
} as RouteRecordRaw
