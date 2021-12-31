<template>
  <div class="sub-navigation">
    <!-- 面包屑模式 -->
    <template v-if="type === 'breadcrumb'">
      <el-breadcrumb>
        <template v-for="(item, index) in breadcrumb">
          <el-breadcrumb-item>
            <span class="el-breadcrumb__inner is-link" @click="toPage(item, index)">{{ pageTitle[item] }}</span>
          </el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </template>

    <template v-if="type === 'back'">
      <el-button class="sub-navigation__back" type="text" @click="goBack">
        <el-icon><back /></el-icon>
        <span>返回</span>
      </el-button>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { Back } from '@element-plus/icons-vue'
import pageTitle from '@/constants/page-titles'

// 路由对象
const router = useRouter()
const route = useRoute()

const props = defineProps({
  // 副导航类型： 面包屑/breadcrumb（默认） 返回/back
  type: {
    type: String,
    default: 'breadcrumb',
    validator: (val: string) => ['breadcrumb', 'back'].includes(val)
  },
  // 自定义激活方法，不定义则走默认激活方法
  definedTo: {
    type: Function,
    default: null,
  }
})

// 获取面包屑
const breadcrumb = [ ...new Set(route.matched.map(item => item.path)) ]

/**
 * @description 跳转函数，如自定义激活方法不会做默认事件跳转页面
 */
const toPage = (path: string, index: number) => {
  if (index === breadcrumb.length - 1) return false
  props.definedTo instanceof Function ? props.definedTo(path) : router.push(path)
}

/**
 * @description 返回函数，如自定义激活方法不会做默认事件返回
 */
const goBack = () => {
  props.definedTo instanceof Function ? props.definedTo() : router.back()
}

</script>

<style lang="scss" scoped>
.sub-navigation {
  margin-bottom: 12px;
  &__back {
    color: var(--el-text-color-regular);
    &:hover {
      color: var(--el-text-color-primary);
    }
  }
}
</style>
