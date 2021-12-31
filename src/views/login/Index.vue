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
          :validate-on-rule-change="false"
        >
          <el-form-item prop="username">
            <el-input
              v-model="formModel.username"
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
            <el-button
              class="btn-submit"
              type="primary"
              :loading="loginBtnLoading"
              @click="handleLogin"
            >
              <span>登录</span>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Avatar, Lock } from '@element-plus/icons-vue'
import { useStore } from '@/store'
import { setLocalStorage } from '@/utils/storage'
// router
const router = useRouter()

// vuex
const store = useStore()

// 表单Ref
const formRef = ref()
// 表单数据
const formModel = reactive({
  username: '',
  password: '',
})
// 表单规则
const formRules = reactive({
  username: [{required: true, message: '该选项不能为空', trigger: 'blur'}],
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
        const data = JSON.parse(JSON.stringify(formModel))
        await store.dispatch('user/getUserInfo', data)
        loginBtnLoading.value = false
      } catch (error) {
        loginBtnLoading.value = false
      }
      router.push('/')
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
    .btn-submit {
      width: 100%;
    }
  }
}
</style>
