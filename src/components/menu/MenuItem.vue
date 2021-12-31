<template>
  <!-- 二级菜单 -->
  <template v-if="!data.children">
    <el-menu-item :index="data.route">
      <el-icon v-if="!!data.icon" :style="{ fontSize: `${iconSize}px` }">
        <component :is="data.icon" />
      </el-icon>
      <span>{{ data.title }}</span>
    </el-menu-item>
  </template>

  <!-- 单级菜单 -->
  <template v-else>
    <template v-if="data.children.length">
      <el-sub-menu :index="data.route">
        <template #title>
          <el-icon v-if="!!data.icon" :style="{ fontSize: `${iconSize}px` }">
            <component :is="data.icon" />
          </el-icon>
          <span>{{ data.title }}</span>
        </template>
        <template v-for="item in data.children">
          <menu-item :data="item" />
        </template>
      </el-sub-menu>
    </template>
  </template>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { MenuRecord } from '@/plugins/menus'

defineProps({
  data: {
    required: true,
    type: Object as PropType<MenuRecord>,
  },
})

const iconSize = 16
</script>
