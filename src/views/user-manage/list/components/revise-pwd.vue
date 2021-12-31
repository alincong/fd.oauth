<template>
  <el-dialog v-model="dialogVisible" title="修改密码" width="50%">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="新密码: " prop="pwd">
        <el-input
          v-model="formData.pwd"
          placeholder="请输入"
          style="width: 60%"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码: " prop="pwds">
        <el-input
          v-model="formData.pwds"
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

    // 两次密码认证，必须定义在formRules前才不会报错
    const validatePass = (rule, value, callback) => {
      if (formData.pwds !== formData.pwd) {
        callback(new Error('两次密码需要一致'))
      }
      callback()
    }

    // 表单数据
    const formData = reactive({pwd: '', pwds: ''});
    const formRules = reactive({
      pwd: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
      ],
      pwds: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
        { validator: validatePass, trigger: 'blur' }
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