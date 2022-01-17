<!--
 * @Author: your name
 * @Date: 2021-12-31 10:43:42
 * @LastEditTime: 2022-01-06 17:14:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \oms.fandow.come:\my_work\oauth.fandow.com\src\views\permissions-manage\components\create-group.vue
-->
<template>
  <el-drawer 
    :append-to-body="false" 
    v-model="drawer" 
    :title="title" 
    direction="rtl" 
    :before-close="handleClose"
  >
    <el-form ref="formRef" :model="form" label-width="150px">
      <el-form-item 
        label="分组名称" 
        prop="name"
        :rules="[{ required: true, message: '请输入分组名称', trigger: 'blur' }]"
      >
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item 
        label="分组唯一标识符" 
        prop="code"
        :rules="[{ required: true, message: '请输入分组ID', trigger: 'blur' }]"
      >
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item 
        label="分组描述" 
        prop="description">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
    </el-form>
    <div class="drawer-footer">
      <el-button type="default" size="small" @click="cancel">取消</el-button>
      <el-button color="#396aff" style="color: white" size="small">{{ confirmText }}</el-button>
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

  // 取消
  const cancel = () => {
    drawer.value = false
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
