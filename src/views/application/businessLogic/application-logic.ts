/*
 * @Author: your name
 * @Date: 2022-01-06 10:50:15
 * @LastEditTime: 2022-01-12 09:00:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \oauth.fandow.com\src\views\application\listDetail\businessLogic\application-logic.ts
 */

import { ref, reactive, } from 'vue'
import { listRule } from '@/constants/application-manage/Astatic-variable'
import { resourceGroup, addResourceGroup, deleteResourceGroup } from '@/api/applications-api'



export default function useApplication(id) {
  const ruleFormRef = ref(null)
  let dialogVisible = ref(false)
  const rules = reactive(listRule)
  if (id == undefined) {
    id = localStorage.getItem('userPoolId')
  }else {
    localStorage.setItem('userPoolId',id)
  }

  let userPoolId = ref(id)
  // 应用数据
  const listData = reactive({
    count: 0,
    list: [],
    page: 0,
    pageCount: 0,
    perPage: 0,
  })
  let application = reactive({
    name: '',
    description: ''
  })
  getApplicationListHandle()

  /**
   * 获取应用列表
   * @returns list
   */
  function getApplicationListHandle(pageIndex = 1, pageSize = 10): void {
   
    resourceGroup({
      userPoolId: userPoolId.value,
      pageIndex,
      pageSize,
      type: 'APPLICATION'
    }).request().then(res => {
      listData.count = res.count;
      listData.list = res.list;
      listData.page = res.page;
      listData.pageCount = res.pageCount;
      listData.perPage = res.perPage;

    })
  }

  /**
   * 删除应用
   * @param id 
   */
  function deleteResourceGroupHandle(id): void {
    deleteResourceGroup(id)
      .request().then(() => {
        getApplicationListHandle()
      })
  }


  /** 
   * 提交表单 - 添加应用
   * @param ruleFormRef 
   * @returns 
   */
  function submitForm(ruleFormRef) {
    if (!ruleFormRef) return
    ruleFormRef.validate((valid) => {
      if (valid) {
        addResourceGroup({
          userPoolId: userPoolId.value,
          name: application.name,
          description: application.description,
          appUrl: application.description,
        }).request().then(() => {
          dialogVisible.value = false
          getApplicationListHandle()
          ruleFormRef.resetFields()
        })
      } else {
        console.log('error submit!')
        return false
      }
    })
  }

  /**
   * 清除表单 - 添加应用
   * @param formEl 
   * @returns 
   */
  function resetForm(ruleFormRef) {
    if (!ruleFormRef) return
    ruleFormRef.resetFields()
    dialogVisible.value = false
  }

  return {
    ruleFormRef,
    dialogVisible,
    userPoolId,
    listData,
    rules,
    application,

    getApplicationListHandle,
    deleteResourceGroupHandle,
    submitForm,
    resetForm
  }
}






