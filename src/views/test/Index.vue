<template>
  <div>
    <sub-navigation />

    测试页...
    <el-input v-model="val" />

    val: {{ val }}


    <el-button @click="getUser">请求</el-button>
    <el-button @click="cancelUser">取消</el-button>
    <el-button @click="setLocal">设置存储</el-button>
    <el-button @click="getLocal">获取存储</el-button>
  </div>
  
</template>

<script lang="ts">
// 在此处定义name, 开启 keep-alive
export default { name: 'test' }
</script>

<script lang="ts" setup>
import { ref, onActivated } from 'vue'
import fetch from '@/plugins/fetch'
import { getLocalStorage, setLocalStorage } from '@/utils/storage'


const val = ref('')

onActivated(() => {
  console.log('test - onActivated')
})

const active = (path) => {
  // console.log('active', path)
}

const setLocal = () => {
  setLocalStorage('test', 123, true, 10)
}

const getLocal = () => {
  const data = getLocalStorage<string>('test', null, true)
  console.log(data, 'data')
}

let cancel: unknown = null

// const login = axios.create({
//   baseURL: `http://api-offlinetest.fandow.com`,
//   cancelToken: new axios.CancelToken(function(c) {
//     cancel = c 
//   })
// })

// const handleCancel = () => {
//   if (typeof cancel === 'function') {
//     console.log('cancel')
//     cancel()
//   }
// }


// const request = async () => {
//   let res = await login({
//     url: `/v1/login/sign-in`,
//     method: 'POST',
//     data: { username: 'FD-0001', password: '123456'},
//   })
//   console.log(res)
// }



const fetchData = {
  username: 'FD-0001',
  password: '123456'
}

const getUserAPI = (data) => {
  return fetch({
    url: `/v1/login/sign-in`,
    method: 'POST',
    // url: `/v1/user/menu`,
    // method: 'GET',
    // cancelToken: new axios.CancelToken(function(c) {
    //   cancel = c
    // }),
    data
  })
}

let res = {} as any
let getUser = async () => {
  res = getUserAPI(fetchData)
  try {
    const response = await res.request()
    console.log('response', response)
    
  } catch (error) {
    // console.log('error', error)
  }
}

let cancelUser = () => {
  (<Function>res.cancel)()
  // (<Function>cancel)()
}

// getUser()

// cancel instanceof Function && cancel()

</script>

<style lang="scss" scoped>
</style>