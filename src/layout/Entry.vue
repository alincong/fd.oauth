<template>
  <div class="entry">
    <el-container class="container">
      <!-- 头部 -->
      <el-header class="container-header">
        <the-header identity="admin" hidden-controler />
      </el-header>

      <el-main class="container-main">
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
  </div>
</template>

<script lang="ts" setup>
import TheHeader from '@/components/header/Index.vue'
import { keepAliveList } from '@/router'
</script>

<style lang="scss" scoped>
.entry {
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
      .content {
        overflow: auto;
        &-box {
          width: 1250px;
          margin: 0 auto;
        }
      }
    }
  }
}
</style>

