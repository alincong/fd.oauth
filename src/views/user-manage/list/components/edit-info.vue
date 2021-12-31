<template>
  <el-dialog v-model="dialogVisible" title="编辑信息" width="50%">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="工号: " prop="number">
        <el-input
          v-model="formData.number"
          placeholder="请输入"
          style="width: 60%"
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名: " prop="name">
        <el-input
          v-model="formData.name"
          placeholder="请输入"
          style="width: 60%"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
  setup() {
    const formRef = ref()

    // 弹窗功能
    const dialogVisible = ref(false);
    const showDialog = () => {
      dialogVisible.value = true;
      formRef.value && formRef.value.resetFields()
    };

    // 表单数据
    const formData = reactive({});
    const formRules = reactive({
      number: [
        {
          required: true,
          message: "请输入工号",
          trigger: "blur",
        },
      ],
      name: [
        {
          required: true,
          message: "请输入姓名",
          trigger: "blur",
        },
      ],
    });

    // 提交
    const submitForm = () => {
      formRef.value.validate((vaild) => {
        if(!vaild) return;

        console.log(formData)
      })
    }

    return {
      formRef,
      dialogVisible,
      formData,
      formRules,

      // 方法
      showDialog,
      submitForm
    };
  },
});
</script>