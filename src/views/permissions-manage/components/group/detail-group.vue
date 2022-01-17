<!--
 * @Author: your name
 * @Date: 2021-12-31 10:43:42
 * @LastEditTime: 2022-01-06 17:24:26
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \oms.fandow.come:\my_work\oauth.fandow.com\src\views\permissions-manage\components\create-group.vue
-->
<template>
  <el-drawer 
    :append-to-body="false" 
    v-model="drawer" 
    title="权限分组详情" 
    direction="rtl" 
    :before-close="handleClose"
  >
    <el-form 
      ref="formRef" 
      :model="form" 
      label-width="150px"
      label-position="left"
    >
      <el-form-item label="分组名称：">
        <span>哟我哟哟哦</span>
      </el-form-item>
      <el-form-item label="分组&nbsp;&nbsp;&nbsp;ID：">
        <span>DL 订单</span>
      </el-form-item>
      <el-form-item label="分组描述：" >
        <span>66666</span>
      </el-form-item>
      <el-form-item label="绑定应用：" >
        <span>66666</span>
      </el-form-item>
    </el-form>
    <div class="drawer-footer">
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
  // 抽屉开关
  let drawer = ref(false)
  watch(drawer, (newVal, oldVal) => {
    // 重置表单
    if(newVal === false) formRef.value.resetFields()
    
  })
  let title = ref()
  // 表单对象
  const form = reactive({
    name: '',
    code: '',
    description: ''
  })
  // 表单refs
  const formRef = ref()

  const handleClose = () => {
    drawer.value = false
  }

  const confirmText = ref()
  // 打开抽屉
  const openDrawer = (type) => {
    confirmText.value = '创建'
    title.value = '新建分组'
    drawer.value = true
  }

  defineExpose({
    openDrawer
  })

</script>

<style lang="scss" scoped>
.drawer-footer {
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 10px;
  border-top: 1px solid #f0f0f0;
}
</style>
