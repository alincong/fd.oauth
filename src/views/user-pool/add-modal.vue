<template>
  <div>
    <el-dialog v-model="dialogFormVisible" title="新建用户池" :width="800" @close="handleCancel">
      <el-form :model="form" :rules="rules" ref="ruleForm" style="margin-bottom: 20px;">
        <el-form-item label="用户池名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入用户池名称" size="medium"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel" size="medium">取消</el-button>
          <el-button type="primary" :loading="loading" @click="handleCommit" size="medium">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import type { UnwrapRef } from 'vue';
import { ElMessage } from 'element-plus'
import { postUserPoolApi } from '@/api/user-pool';

interface FormState {
  name: string;
}

export default defineComponent({
  setup(props, {emit}) {
    // 弹窗开关
    let dialogFormVisible = ref<boolean>(false)
    // 打开弹窗
    const showModal = () => {
      dialogFormVisible.value = true
      loading.value = false
      form.name = ''
    }

    // 表单ref
    const ruleForm = ref();
    // 表单规则
    const rules = {
      name: [{ required: true, message: '该选项不能为空', trigger: 'blur' }],
    }
    // 表单字段
    let form: UnwrapRef<FormState> = reactive({
      name: ''
    })

    // 取消
    const handleCancel = () => {
      dialogFormVisible.value = false
      ruleForm.value.resetFields();
    };

    // 确认
    let loading = ref<boolean>(false)
    const handleCommit = () => {
      ruleForm.value.validate()
        .then(async () => {
          try {
            loading.value = true
            const res = await postUserPoolApi(form).request()
            console.log(res);
            loading.value = false
            handleCancel()
            emit('getUserPoolList')
          } catch (error) {
            loading.value = false
          }
        })
        .catch(error => {
          ElMessage({
            message: '请输入用户池名称！',
            type: 'warning',
          })
				});
    }

    return {
      dialogFormVisible,
      form,
      rules,
      loading,
      ruleForm,

      showModal,
      handleCommit,
      handleCancel,
    }
  },
})
</script>
<style lang="scss" scoped>
:deep(.el-form-item) {
  display: inline;
}
</style>
