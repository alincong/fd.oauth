<template>
  <!-- 国际化组件 -->
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const locale = zhCn
</script>

<style lang="scss">
@import url("@/styles/common.scss");
</style>
