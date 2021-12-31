<template>
  <el-menu v-model:default-active="currentPath" router >
    <template v-for="item in menuList">
      <menu-item :data="item" />
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import menus, { MenuRecord } from '@/plugins/menus'
import MenuItem from './MenuItem.vue'

const route = useRoute();

// 当前选中菜单
const currentPath = computed(() => route.path)

/* mock - menuList */
const menuListKey = [
  '/overview/index',
  '/logs/user/index',
  '/logs/admin/index',
  '/user/org/index',
  '/user/list/index',
  '/user/group/index',
  '/permissions/index',
  '/test/index',
];
/* mock - menuList */

/**
 * @description 过滤有权限的菜单项
 * @param list - 原菜单
 * @param keyList - 菜单权限
 */
const filterMenu = (list: MenuRecord[], pathList: string[]) => {
  return list.filter(item => {
    if (item.children?.length) {
      item.children = filterMenu(item.children, pathList)
    }
    return item.path ? pathList.includes(item.path) : true;
  })
}
const menuList = filterMenu(menus, menuListKey)
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: 0;
}
</style>
