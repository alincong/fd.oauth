import { defineStore } from 'pinia'
import { login } from '@/api/login'
import { LoginResponse } from '@/api/types/login'
import { setLocalStorage } from '@/utils/storage'

export const useUserInfo = defineStore('user', {
  state: (): LoginResponse => ({
    userId: 0,
    userPoolId: 0,
    resourceGroupId: 0,
    account: '',
    username: '',
    token: '',
    appUrl: '',
  }),
  actions: {
    async getUserInfo(data: UserInfoData) {
      try {
        const resData = await login(data).request()
        Object.keys(resData).forEach(key => this[key] = resData[key])
        setLocalStorage('token', resData.token)
      } catch (error) {}
    }
  }
})

export interface UserInfoData {
  appId: string
  account: string
  password: string
}
