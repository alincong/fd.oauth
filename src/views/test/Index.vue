<template>
  <div>
    <sub-navigation />
    <div>token: {{ user.token }}</div>
    <el-input v-model="user.token" />
    <el-button @click="getUserInfo">pinia</el-button>
    <el-button @click="changeUsrInfo">changePinia</el-button>
    <el-button @click="getGroup">请求</el-button>
  </div>
  
</template>

<script lang="ts">
// 在此处定义name, 开启 keep-alive
export default { name: 'test' }
</script>

<script lang="ts" setup>
import { useUserInfo } from '@/store/user-info'
import { resourceGroup } from '@/api/applications-api'

const user = useUserInfo()

const getUserInfo = () => {
  user.getUserInfo({username: 'FD-0001', password: '123456'})
}

const changeUsrInfo = () => {
  user.token = (Math.random() * 100).toString()
}

// 请求
const getGroup = async () => {
  const res = await resourceGroup().request()
  console.log(res, 'res')
}

</script>

<style lang="scss" scoped>
</style>