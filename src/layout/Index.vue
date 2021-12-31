<template>
  <div class="root">
    <el-container class="container">
      <!-- 头部 -->
      <el-header class="container-header">
        <the-header identity="admin" />
      </el-header>

      <!-- 主视图 -->
      <el-container class="container-main">
        <!-- 侧边栏 -->
        <el-aside width="246px" class="aside">
          <div class="aside-box">
            <the-menu />
          </div>
        </el-aside>

        <!-- 内容区域 -->
        <el-main class="content">
          <div class="content-box">
            <router-view v-slot="{ Component }">
              <transition name="main" mode="out-in" appear>
                <keep-alive :include="keepAliveList">
                  <component :is="Component" />
                </keep-alive>
              </transition>
            </router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script lang="ts" setup>
import TheMenu from '@/components/menu/Index.vue'
import TheHeader from '@/components/header/Index.vue'
import { keepAliveList } from '@/router'
</script>

<style lang="scss" scoped>
.root {
  .container {
    height: 100%;
    min-width: 1000px;
    &-header {
      text-align: right;
      font-size: 12px;
      border-bottom: 1px solid #e6e6e6;
    }
    &-main {
      overflow: hidden;
      .aside {
        height: 100%;
        overflow: hidden auto;
        border-right: 1px solid #e6e6e6;
      }
      .content {
        overflow: auto;
        &-box {
          width: 1100px;
          margin: 0 auto;
        }
      }
    }
  }
}
</style>
