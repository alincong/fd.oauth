<!--
 * @Author: your name
 * @Date: 2021-12-31 15:13:59
 * @LastEditTime: 2022-01-06 10:31:36
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \oms.fandow.come:\my_work\oauth.fandow.com\src\views\permissions-manage\components\add-authorization.vue
-->
<template>
  <el-drawer :append-to-body="false" v-model="drawer" :title="title" direction="rtl" :before-close="handleClose">
    <el-form label-position="top" class="form" ref="formRef" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="角色Code" prop="code">
        <el-input v-model="form.code" placeholder="admin"></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="form.description" placeholder="系统管理员"></el-input>
      </el-form-item>
    </el-form>
    <div class="drawer-footer">
      <el-button type="default" size="small" @click="cancel">取消</el-button>
      <el-button color="#396aff" style="color: white" size="small">{{ confirmText }}</el-button>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  interface editRoleFormType {
    code: string,
    description?: string
  }
  const drawer = ref(false)
  const title = ref()
  const confirmText = ref()
  const openDrawer = (type) => {
    confirmText.value = '保存'
    title.value = '创建角色'
    drawer.value = true
  }

  const form = reactive<editRoleFormType>({
    code: '',
    description: ''
  })
  const rules = reactive({
    code: [{ required: true, message: '请输入角色Code', trigger: 'blur' }]
  })
  // 取消
  const cancel = () => {
    drawer.value = false
  }

  const handleClose = () => {}

  defineExpose({
    openDrawer
  })
</script>

<style lang="scss" scoped>

:deep(.el-form-item__label) {
  padding: 0;
}
.drawer-footer {
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 10px;
  border-top: 1px solid #f0f0f0;
}

</style>