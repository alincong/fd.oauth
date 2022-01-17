<!--
 * @Author: your name
 * @Date: 2022-01-04 10:00:46
 * @LastEditTime: 2022-01-11 18:06:09
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \oauth.fandow.com\src\views\application\pagination\index.vue
-->
<template>
  <el-pagination
    v-model:currentPage="pageIndex"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="dataTotal"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  ></el-pagination>
</template>

<script lang="ts" setup>
import { ref, reactive,watch } from 'vue'
interface PagesParams {
  pageSize: number, pageIndex: number, pageType: string
}
// 采用ts专有声明，有默认值
let props = withDefaults(defineProps<{
  total: number
  pageSizes?: Array<number>
}>(), {
  pageSizes: () => [10, 20, 30, 40, 50]
})
/*ts专有*/
const emit = defineEmits<{
  (e: 'pageClick', pages: PagesParams): void
}>()
let pageSizes = reactive(props.pageSizes); // 分页展示数量
let dataTotal = ref(0) // 总数据量
let pageSize = ref(props.pageSizes[0]) // 每页展示10条数据
let pageIndex = ref(1) // 当前第几页

watch(
  ()=>props.total
  ,(newVal)=>{
  dataTotal.value = newVal
})

// 切换每页展示多少条数据
function handleSizeChange(val) {
  pageSize.value = val
  emit('pageClick', {
    pageSize: val,
    pageIndex: pageIndex.value,
    pageType: 'pageSize'
  })
}
// 第几页
function handleCurrentChange(val) {
  pageIndex.value = val
  emit('pageClick', {
    pageSize: pageSize.value,
    pageIndex: val,
    pageType: 'pageIndex'
  })
}
</script>