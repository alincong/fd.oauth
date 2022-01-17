### 页面标题组件
### 插槽
  ### icon -> 图标
  ### title -> 标题
  ### description -> 描述/简介
  ### extra -> 右侧额外区域
### 属性
  ### title: string -> 标题
  ### description: string -> 描述/简介

<template>
  <el-card class="page-title">
    <div class="wrapper">
      <div class="icon">
        <slot name="icon"></slot>
      </div>
      <div class="content">
        <div class="content__title">
          <slot name="title">{{ $props.title }}</slot>
        </div>
        <div class="content__description" v-if="!!$slots.description || !!$props.description">
          <slot name="description">{{ $props.description }}</slot>
        </div>
      </div>
      <div class="extra" :style="{ maxWidth: `${$props.controlWidth}px` }">
        <slot name="extra"></slot>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
defineProps({
  controlWidth: {
    type: Number,
    default: 320,
  },
  title: String,
  description: String,
})

</script>

<style lang="scss" scoped>
.page-title {
  margin-bottom: 24px;
  .wrapper {
    height: 72px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .icon {
      width: 72px;
      height: 72px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: var(--el-border-radius-base);
      background-color: var(--el-color-primary-light-9);
      font-size: 32px;
      color: var(--el-color-primary);
    }
    .content {
      height: 100%;
      padding-left: 24px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1 1;
      &__title {
        flex: 1 1;
        display: flex;
        align-items: center;
        font-size: 24px;
      }
      &__description {
        flex: 1 1;
        display: flex;
        align-items: center;
        font-size: var(--el-font-size-base);
        color: var(--el-text-color-secondary);
      }
    }
  }
}
</style>