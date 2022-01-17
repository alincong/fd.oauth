<template>
  <el-dialog v-model="dialogVisible" title="修改密码" width="50%">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="新密码: " prop="newPassword">
        <el-input
          v-model="formData.newPassword"
          placeholder="请输入"
          style="width: 60%"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码: " prop="password">
        <el-input
          v-model="formData.password"
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
import { revisePwd } from "@/api/user-manage-api";

export default defineComponent({
  setup() {
    const formRef = ref();

    // 弹窗功能
    const dialogVisible = ref(false);
    const userId = ref()
    const showDialog = (id) => {
      userId.value = id
      dialogVisible.value = true;
      formRef.value && formRef.value.resetFields();
    };

    // 两次密码认证，必须定义在formRules前才不会报错
    const validatePwd = (rule, value, callback) => {
      if (formData.password !== formData.newPassword) {
        callback(new Error("两次密码需要一致"));
      }
      callback();
    };
    const pwdLength = (rule, value, callback) => {
      if (formData.newPassword.length < 6 || formData.newPassword.length > 16) {
        callback(new Error("密码长度为6-16"));
      }
      callback();
    };

    // 表单数据
    const formData = reactive({ newPassword: "", password: "" });
    const formRules = reactive({
      newPassword: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
        { validator: pwdLength, trigger: "blur" },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
        { validator: validatePwd, trigger: "blur" },
      ],
    });

    // 提交
    const submitForm = () => {
      formRef.value.validate(async(vaild) => {
        if (!vaild) return;
        try {
          let params = JSON.parse(JSON.stringify(formData))
          delete params.newPassword
          console.log(params);
          const res = await revisePwd(userId.value, params).request()
          dialogVisible.value = false;
        } catch(err) {}
      });
    };

    return {
      formRef,
      dialogVisible,
      formData,
      formRules,

      // 方法
      showDialog,
      submitForm,
    };
  },
});
</script>