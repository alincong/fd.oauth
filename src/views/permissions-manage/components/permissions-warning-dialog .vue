<!--
 * @Author: your name
 * @Date: 2022-01-06 15:31:22
 * @LastEditTime: 2022-01-06 16:10:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \oms.fandow.come:\my_work\oauth.fandow.com\src\views\permissions-manage\components\delete-modal.vue
-->
<template>
  <el-dialog
    v-model="dialogVisible"
    width="20%"
    :before-close="handleClose"
  >
    
    <template #title>
      <div style="font-size: 22px;">
        <el-icon color="#faad14" style="vertical-align: middle;"><warning /></el-icon>
        <span style="font-size: 16px;margin-left: 10px;">{{ props.title }}</span>
      </div>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>0
  import { ref } from 'vue'
  import { Warning } from '@element-plus/icons-vue'
  interface propsType {
  title: string,

}
  const props = withDefaults(defineProps<propsType>(), {
    title: '确定删除该资源？'
  })
  const dialogVisible = ref<boolean>(false)
  const handleClose = () => {

  }

  const openDialogVisible = () => {
    dialogVisible.value = true
  }

  defineExpose({
    openDialogVisible
  })
</script>

<style lang="scss" scoped>

</style>