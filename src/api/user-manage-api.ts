import fetch from '@/plugins/fetch'

// 用户管理-用户列表
export function getUserList(params?: { pageIndex: number, pageSize: number, searchText: string }) {
  return fetch({
    url: `/user`,
    method: 'GET',
    params,
  },{
    showNotice: false
  })
}

// 用户管理-获取用户详情
export function userDetails(id: number ) {
  return fetch({
    url: `/user/${id}`,
    method: 'GET',
  },{
    showNotice: false
  })
}

// 用户管理-锁定用户
export function lockUser(id: number ) {
  return fetch({
    url: `/user/lock/${id}`,
    method: 'PATCH',
  },{
    showNotice: false
  })
}

// 用户管理-解锁用户
export function unlockUser(id: number ) {
  return fetch({
    url: `/user/unlock/${id}`,
    method: 'PATCH',
  },{
    showNotice: false
  })
}

// 用户管理-修改密码
export function revisePwd(id: number, data:{password: string} ) {
  return fetch({
    url: `/user/password/${id}`,
    method: 'PATCH',
    data
  },{
    showNotice: false
  })
}

// 组织架构-级联树
export function deptTreeData() {
  return fetch({
    url: `/dept/tree`,
    method: 'GET',
  },{
    showNotice: false
  })
}

// 组织架构-用户列表
interface UserList {
  id: number,
  sort: string,
  showAll?: boolean,
  pageIndex?: number,
  pageSize?: number
}
export function deptUserList(params: UserList) {
  return fetch({
    url: `/dept/user`,
    method: 'GET',
    params
  },{
    showNotice: false
  })
}

// 组织架构-搜索部门
export function deptSearch(params: {name: string}) {
  return fetch({
    url: `/dept/search`,
    method: 'GET',
    params
  },{
    showNotice: false
  })
}