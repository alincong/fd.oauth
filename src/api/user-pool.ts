import fetch from '@/plugins/fetch'

// 用户池数据
export function getUserPoolListApi() {
  return fetch({
    url: '/user-pool',
    method: 'GET'
  },{showNotice: false})
}

// 添加用户池
export function postUserPoolApi(data: { name: string }) {
  return fetch({
    url: '/user-pool',
    method: 'POST',
    data
  })
}
