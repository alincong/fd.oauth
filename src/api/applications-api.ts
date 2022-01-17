/*
 * @Author: your name
 * @Date: 2022-01-05 10:12:58
 * @LastEditTime: 2022-01-11 16:45:43
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \oauth.fandow.com\src\api\applications-api.ts
 */
import fetch from '@/plugins/fetch'

// 资源组管理-查询分页列表
export function resourceGroup(params?:{pageIndex:number,pageSize:number,type:string}) {
  return fetch({
    url: `/resource-group`,
    method: 'GET',
    params,
  })
}

// 资源组管理-添加资源组
export function addResourceGroup(data:{userPoolId:number,name:string,description?:string,appUrl?:string}) {
  return fetch({
    url: `/resource-group`,
    method: 'POST',
    data
  })
}

// 资源组管理-配置资源组
export function resourceGroupConfig(id:string|number,data) {
  return fetch({
    url: `/resource-group/config/${id}`,
    method: 'PUT',
    data
  })
}

// 资源组管理-获取资源组详情
export function getResourceGroupDetail(id:string|number) {
  return fetch({
    url: `/resource-group/${id}`,
    method: 'GET'
  })
}

// 资源组管理-编辑资源组
export function editResourceGroup(id:string|number,data) {
  return fetch({
    url: `/resource-group/${id}`,
    method: 'PUT',
    data
  })
}

// 资源组管理-删除资源组
export function deleteResourceGroup(id:string|number) {
  return fetch({
    url: `/resource-group/${id}`,
    method: 'DELETE'
  })
}