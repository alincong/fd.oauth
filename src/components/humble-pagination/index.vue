<!--
 * @Author: your name
 * @Date: 2022-01-04 10:43:17
 * @LastEditTime: 2022-01-05 18:41:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \oms.fandow.come:\my_work\oauth.fandow.com\src\components\humble-pagination\index.vue
-->
<template>
  <ul>
    <li>
      <button 
        @click="clickPageIcon('last')" 
        :disabled="leftDisabled" 
        :class="{'not-allow': leftDisabled}"
      >
        <el-icon :size="14">
          <arrow-left />
        </el-icon>
      </button>
    </li>
    <li>
      <el-input 
        ref="inputRef"
        class="jump-input"
        v-model="nowPage"
        type="number"
        @change="changePage"
        @input="inputChange"
        ></el-input>
      &nbsp;&nbsp;/&nbsp;&nbsp;{{ props.total }}
    </li>
    <li>
      <button 
        @click="clickPageIcon('next')" 
        :disabled="rightDisabled" 
        :class="{'not-allow': rightDisabled}"
      >
        <el-icon :size="14">
          <arrow-right />
        </el-icon>
      </button>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { 
  ref,
  defineEmits,
  defineProps,
watch
} from 'vue'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
interface propsType {
  total: number,
  currentPage: number
}
const props = withDefaults(defineProps<propsType>(), {
  currentPage: 1
})

const emit = defineEmits(['change'])
// refs
const inputRef = ref()

// input 值
const nowPage = ref(props.currentPage)

// 去往指定页事件
const changePage = (val) => {
  emit('change', Number(val))
  // 用户回车时触发失焦
  inputRef.value.blur()
  
}

/**
 * input 值发生改变时触发
 * 这里主要是限制区间
 */
const inputChange = (value) => {
  value < 1 && (nowPage.value = 1)
  value > props.total && (nowPage.value = props.total)
}

// 左右icon点击事件
const clickPageIcon = (type: string): void => {
  type === 'last' ? nowPage.value -= 1 : nowPage.value += 1
}

// 左边禁用
const leftDisabled = ref<boolean>(true)
const rightDisabled = ref<boolean>(false)

// 监听当前页
watch(nowPage, (newVal, oldVal) => {
  newVal <= 1 ? leftDisabled.value = true : leftDisabled.value = false
  newVal >= props.total ? rightDisabled.value = true : rightDisabled.value = false
})

</script>

<style lang="scss" scoped>
  ul {
    display: flex;
    justify-content: center;
    padding: 0 0px;
  }
  li {
    line-height: 40px;
  }
  button {
    line-height: 24px;
    background: transparent;
    border-color: transparent;
    cursor: pointer;
  }
  button {
    line-height: 24px;
    background: transparent;
    border-color: transparent;
    cursor: pointer;
  }
  .not-allow {
    cursor: not-allowed;
  }
  .jump-input {
    display: inline-block;
    width: 50px;
  }
  :deep(.el-input__inner) {
    height: 24px;
    line-height: 24px;
    padding: 2px;
    text-align: center;
  }
</style>