<template>
  <div class="login">
    <el-card>
      <div class="header">
        <div class="logo">
          <img src="@/assets/logo.png" alt="">
        </div>
        <div class="title">统一认证权限平台</div>
        <div></div>
      </div>
      <div class="main">
        <el-form
          ref="formRef"
          :model="formModel"
          :rules="formRules"
        >
          <el-form-item prop="account">
            <el-input
              v-model="formModel.account"
              :prefix-icon="Avatar"
              placeholder="请输入账号"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="formModel.password"
              type="password"
              placeholder="请输入登录密码"
              :prefix-icon="Lock"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="loginBtnLoading" @click="handleLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Avatar, Lock } from '@element-plus/icons-vue'
import { useUserInfo, UserInfoData } from '@/store/user-info'

// 路由对象
const router = useRouter()
const routes = useRoute()

// pinia
const userInfoStore = useUserInfo()

// 表单Ref
const formRef = ref()

// 表单数据
const formModel = reactive<UserInfoData>({
  appId: '61cdb35c9381172531682082',
  account: '',
  password: '',
})

// 表单规则
const formRules = reactive({
  account: [{required: true, message: '该选项不能为空', trigger: 'blur'}],
  password: [{required: true, message: '该选项不能为空', trigger: 'blur'}],
})

// 登录按钮 loading
const loginBtnLoading = ref(false)
// 登录
const handleLogin = () => {
  formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        loginBtnLoading.value = true
        const data = JSON.parse(JSON.stringify(formModel)) as UserInfoData
        await userInfoStore.getUserInfo(data)
        router.push('/')
      } catch (error) {
      }
      loginBtnLoading.value = false
    }
  })
}

</script>

<style lang="scss" scoped>
.login {
  width: 440px;
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    .logo {
      width: 50px;
      height: 50px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      font-size: var(--el-font-size-extra-large);
      margin: 12px 0 24px;
    }
  }
  .main {
    .el-form {
      .el-button {
        width: 100%;
      }
    }
  }
}
</style>
