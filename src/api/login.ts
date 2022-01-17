import fetch from '@/plugins/fetch'
import { LoginResponse } from './types/login'

// 登录
export function login(data: any) {
  return fetch<LoginResponse>({
    url: `/auth/login`,
    method: 'POST',
    data
  },
  {
    errorMessage: '登录失败',
    successMessage: '登录成功'
  })
}
