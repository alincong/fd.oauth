import { Component } from 'vue'
import { Avatar, Grid, Lock, List, Bicycle } from '@element-plus/icons-vue'
import pageTitle from '@/constants/page-titles'

const menus: MenuRecord[] = [
  {
    title: '应用',
    route: '/application',
    icon: Grid,
  },
  {
    title: '用户管理',
    route: '/user',
    icon: Avatar,
    children: [
      {
        title: '用户列表',
        route: '/user/list',
        // path: '/user/list/index',
      },
      {
        title: '组织架构',
        route: '/user/org',
        // path: '/user/org/index'
      }
    ]
  },
  {
    title: '权限管理',
    route: '/permissions',
    // path: '/permissions/index',
    icon: Lock,
  },
  {
    title: '审计日志',
    route: '/logs',
    icon: List,
    children: [
      {
        title: '用户行为日志',
        route: '/logs/user',
        // path: '/logs/user/index',
      },
      {
        title: '管理员操作日志',
        route: '/logs/admin',
        // path: '/logs/admin/index',
      }
    ]
  },
  {
    title: '测试',
    route: '/test',
    // path: '/test/index',
    icon: Bicycle,
  },
];

/**
 * @description 设置标题
 * @param list - 菜单
 */
const setMenuTitle = (list: MenuRecord[]) => {
  list.forEach(item => {
    item.title = pageTitle[item.route]
    !!item.children?.length && setMenuTitle(item.children)
  })
  return list
}

export default setMenuTitle(menus)

export interface MenuRecord {
  route: string;  // 路由路径
  title?: string;  // 标题
  icon?: Component;  // 图标
  path?: string;   // 菜单权限 - 后端返回
  children?: MenuRecord[]; // 有子菜单
}
