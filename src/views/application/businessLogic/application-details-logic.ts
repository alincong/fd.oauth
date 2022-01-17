/*
 * @Author: your name
 * @Date: 2022-01-06 09:58:05
 * @LastEditTime: 2022-01-12 15:03:26
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \oauth.fandow.com\src\views\application\listDetail\businessLogic\popup-logic.ts
 */
import { ref, reactive,toRefs } from 'vue'
import { listRule,timeTypeOptions } from '@/constants/application-manage/Astatic-variable'
import { getResourceGroupDetail, resourceGroupConfig, editResourceGroup } from '@/api/applications-api'

export default function useApplicationDetail() {
  let timeVal = ref(0)
  let appliItem = ref({})

  let ruleFormRef = ref()
  let configruleFormRef = ref()
  let dialogVisible = ref(false)
  let rules = reactive(listRule)
  let resources = reactive({
    appUrl:'',
    tokenExpireTime:'',
  })
  let timeType = reactive(timeTypeOptions)
  /**
   * 应用详情信息
   */
  let applicationDetail = ref({
    id: 0,
    name: '',
    description: "",
    appId: "",
    appUrl: '',
    tokenExpireTime: 0,
  })

  // 弹出窗
  let application = reactive({
    name: '',
    description: ''
  })

  // tab选项卡
  const tabsList = reactive([{
    id: 0,
    label: '应用配置',
    name: 'applicationConfig',
  }])

  /** 
   * 提交表单
   * @param ruleFormRef 
   * @returns 
   */
  function submitForm(ruleFormRef) {
    if (!ruleFormRef) return
    ruleFormRef.validate((valid) => {
      if (valid) {
        editResourceGroup(appliItem.value.id, {
          name: application.name,
          description: application.description,
          userPoolId: appliItem.value.userPoolId
        }).request()
          .then(res => {
            if (res.includes('成功')) {
              getResourceGroupDetailHandle(appliItem.value.id)
              dialogVisible.value = false
            }
          })
        ruleFormRef.resetFields()
      } else {
        return false
      }
    })
  }

  /**
   * 
   * @param ruleFormRef 
   * @returns 
   */
  function resetForm(ruleFormRef) {
    if (!ruleFormRef) return
    ruleFormRef.resetFields()
    application.description = ''
    dialogVisible.value = false
  }


  /**
   * 资源组管理-获取资源组详情
   * @param id 
   */
  function getResourceGroupDetailHandle(id) {
    getResourceGroupDetail(id).request().then(res => {
      appliItem.value = res
    })
  }

  /**
   * 资源组管理-配置资源组
   * @param id 
   * @returns 
   */
  function setResourceGroupConfigHandle(ruleFormRef,id) {
    const {appUrl,tokenExpireTime} = toRefs(resources)
    console.log(`ruleFormRef,id`, ruleFormRef,id)
    return new Promise(resolve => {
      if (!ruleFormRef) return false
      ruleFormRef.validate(valid=>{
        if (valid) {
          resourceGroupConfig(id, {
            appUrl:appUrl.value,
            tokenExpireTime:tokenExpireTime.value
          }).request().then(res => {
            resolve(res)
          })
        } else {
          return false
        }
      })
      
    })
  }

  return {
    timeVal,
    appliItem,
    ruleFormRef,
    configruleFormRef,
    dialogVisible,
    applicationDetail,
    application,
    tabsList,
    rules,
    resources,
    timeType,

    submitForm,
    resetForm,
    getResourceGroupDetailHandle,
    setResourceGroupConfigHandle,
  }
}
