import fetch from '@/plugins/fetch'

// 登录
export function login(data: { username: string, password: string}) {
  return fetch({
    url: `v1/login/sign-in`,
    method: 'POST',
    data
  }, 
  {
    errorMessage: '登录失败',
    successMessage: '登录成功'
  })
}
