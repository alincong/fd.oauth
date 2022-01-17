### 搜索/文本框 组件
### 属性
 ### modelValue  -> 可以使用v-model绑定搜索框的值
 ### text        -> 展示文本
 ### placeholder -> 搜索框提示语
### 事件
 ### input  -> 文本框变化时触发
 ### change -> 使用回车/失焦时触发
 ### blur   -> 失焦时触发
 ### clear  -> 清空文本时触发

<template>
  <div class="search">
    <template v-if="isFoucs || !!modelValue">
      <el-input 
        ref="inputRef"
        clearable
        v-model="currentVal"
        :prefix-icon="Search"
        :placeholder="$props.placeholder"
        @input="handleInput"
        @change="handleChange"
        @blur="handleBlur"
        @clear="handleClear"
      />
    </template>
    <template v-else>
      <div class="search-text__blur" @click="handleFoucs">
        <el-icon><search /></el-icon>
        <span>{{ $props.text }}</span>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'

const props = defineProps({
  text: {
    type: String,
    default: '搜索'
  },
  placeholder: {
    type: String,
    default: '请输入'
  },
  modelValue: {
    required: true,
    type: String,
    default: ''
  }
})

// 自定义事件
const emit = defineEmits(['change', 'input', 'blur', 'clear', 'update:modelValue'])

// 是否选中
let isFoucs = ref(false)

// 激活
const handleFoucs = () => {
  isFoucs.value = true
  nextTick(() => inputRef.value.focus())
}

// 文本框ref实例
const inputRef = ref()

// input值
const currentVal = ref('')

watch(
  () => props.modelValue,
  newVal => currentVal.value = newVal,
  {
    immediate: true,
  }
)

// 失焦
const handleBlur = (eve: Event) => {
  emit('blur', eve)
  if (currentVal.value) return void 0;
  isFoucs.value = false
}

// 失焦或者按下回车变化
const handleChange = (val: string) => {
  emit('change', val)
}

// 文本输入
const handleInput = (val: string) => {
  emit('update:modelValue', val)
  emit('input', val)
}

// 清除内容
const handleClear = () => {
  isFoucs.value = false
  emit('clear')
}
</script>

<style lang="scss" scoped>
.search {
  font-size: var(--el-font-size-base);
  &-text {
    &__blur {
      height: 32px;
      padding: 5px;
      display: flex;
      align-items: center;
      cursor: pointer;
      color: var(--el-text-color-regular);
      &:hover {
        background-color: var(--el-border-color-light);
        border-radius: var(--el-border-radius-base);
      }
      .el-icon {
        margin: 2px 2px 0 0;
      }
    }
  }
}
</style>
