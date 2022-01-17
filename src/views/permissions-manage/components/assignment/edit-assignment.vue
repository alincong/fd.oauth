<!--
 * @Author: your name
 * @Date: 2021-12-31 15:13:59
 * @LastEditTime: 2022-01-06 16:31:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \oms.fandow.come:\my_work\oauth.fandow.com\src\views\permissions-manage\components\add-authorization.vue
-->
<template>
  <el-drawer 
    :append-to-body="false" 
    :size="720" 
    v-model="drawer" 
    :title="title" 
    :before-close="handleClose"
    direction="rtl" 
  >
    <el-form 
      label-position="top" 
      class="form" 
      ref="formRef" 
      :model="form" 
      :rules="rules" 
      label-width="120px"
    >
      <el-row >
        <el-col :span="24">
          <div style="width: 100%;">
            <span>授权主体</span>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="授权给某个主体（用户、角色、分组、组织机构）"
              placement="top"
            >
              <img class="tab-svg" src="../../../../assets/svg/question.svg" alt="">
            </el-tooltip>
            <el-divider ></el-divider>
          </div>
        </el-col>
        <el-col :span="24">
          <el-form-item label="资源名称" prop="targetType">
            <el-radio-group v-model="form.targetType" @change="targetTypeChange">
              <el-radio label="USER">用户</el-radio>
              <el-radio label="ROLE">角色</el-radio>
              <el-radio label="DEPT">部门</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="被授权主体" prop="targetType">
            <el-select
              v-model="form.targetDataList"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="请输入用户名、手机或邮箱搜索用户"
              :remote-method="targetNameRemoteMethod"
              :loading="targetNameLoading"
              style="width: 100%;"
            >
              <el-option
                v-for="item in authorizedTargetOptions"
                :key="item.targetId"
                :label="item.targetName"
                :value="item.targetId"
              ></el-option>
              
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" >
          <div style="display: flex;justify-content: space-between">
            <div style="line-height: 40px;">
              <span>授权规则</span>
              <el-tooltip
                class="box-item"
                effect="dark"
                content="在授权规则中配置某种「条件」下，允许或拒绝某个「实体」对某个「资源」的指定或所有操作"
                placement="top"
              >
                <img class="tab-svg" src="../../../../assets/svg/question.svg" alt="">
              </el-tooltip>
            </div>
            <el-button @click="addAuthorizationRules" type="text" :icon="Plus">添加授权规则</el-button>
          </div>
          <el-divider ></el-divider>
        </el-col>
        <div v-for="(item, index) in form.resourceDataList" style="width: 100%;">
          <el-col :span="24" class="resource-data-list">
            <div style="display: flex;justify-content: space-between;">
              <el-form-item label="授权作用" prop="allowAccess">
                <el-radio-group v-model="item.allowAccess" @change="allowAccessChange">
                  <el-radio label="YES">允许</el-radio>
                  <el-radio label="NO">拒绝</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-icon 
                v-if="form.resourceDataList.length > 1"
                @click="deleteResourceDataList(index)" 
                style="cursor: pointer;"
              ><close-bold /></el-icon>
            </div>
            <el-form-item 
              label="授权作用" 
              :prop="`resourceDataList.${index}.resourceName`"
              :rules="[{ required: true, message: '请选择资源', trigger: 'blur' }]"
            >
              <el-select
                v-model="item.resourceName"
                filterable
                remote
                reserve-keyword
                :remote-method="targetNameRemoteMethod"
                :loading="targetNameLoading"
                style="width: 100%;"
              >
                <el-option
                  v-for="item in authorizedTargetOptions"
                  :key="item.targetId"
                  :label="item.targetName"
                  :value="item.targetName"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item 
              label="操作"
              :prop="`resourceDataList.${index}.actionLimitType`" 
            >
              <el-radio-group v-model="item.actionLimitType" @change="allowAccessChange">
                <el-radio label="ALL">所有操作</el-radio>
                <el-radio label="SELECTED">待定操作</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item 
              v-if="item.actionLimitType === 'SELECTED'"
              :prop="`resourceDataList.${index}.actionList`"
              :rules="[{ required: true, message: '请选择操作', trigger: 'change' }]"
            >
              <el-select
                v-model="item.actionList"
                filterable
                multiple
                remote
                reserve-keyword
                :remote-method="targetNameRemoteMethod"
                :loading="targetNameLoading"
                style="width: 100%;"
              >
                <el-option
                  v-for="item in authorizedTargetOptions"
                  :key="item.targetId"
                  :label="item.targetName"
                  :value="item.targetName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </div>
      </el-row>
      <div class="addAction">
        <el-button plain @click="addAuthorizationRules" style="width: 100%;">
          <el-icon ><Plus /></el-icon>
          <span >添加授权规则</span>
        </el-button>
      </div>
    </el-form>
    <div class="drawer-footer">
      <el-button type="default" size="small" @click="cancel">取消</el-button>
      <el-button color="#396aff" style="color: white" size="small">{{ confirmText }}</el-button>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
    import { Plus, CloseBold } from '@element-plus/icons-vue'
  import { authorizedTargetList, roleTargetList, deptTargetList } from '@/constants/permissions-manage/Astatic-variable' 
  interface userNameOptionsType {
    targetId?: number,
    targetName?: string,
  }
  interface resourceDataType {
    allowAccess: string,
    resourceId: number | null,
    resourceName: string,
    actionLimitType: string,
    actionList: Array<{
      id: number,
      name: string,
      description: string
    }>
  }
  interface formType {
    targetType: string,
    targetDataList?: Array<{
      targetId?: number,
      targetName: string
    }>,
    resourceDataList: Array<resourceDataType>
  }
  const drawer = ref(false)
  const title = ref()
  const confirmText = ref()
  const openDrawer = (type) => {
    confirmText.value = '确定'
    title.value = '添加授权'
    drawer.value = true
  }

  const form = reactive<formType>({
    targetType: 'USER',
    targetDataList: [],
    resourceDataList: [{
      allowAccess: 'YES',
      resourceId: null,
      resourceName: '',
      actionLimitType: 'ALL',
      actionList: []
    }]
  })
  const rules = reactive({
    targetType: [{ required: true, message: '选择被授权主体类型', trigger: 'change'}]
  })

  const targetTypeChange  = (val: string): void => {

  }
  // 授权作用change事件
  const allowAccessChange = () => {}
  const targetNameLoading = ref<boolean>(false)
  const authorizedTargetOptions = reactive<Array<userNameOptionsType>>(authorizedTargetList)
  const targetNameRemoteMethod = () => {

  }

  // 添加授权规则
  const addAuthorizationRules = ():void => {
    form.resourceDataList.push({
      allowAccess: 'YES',
      resourceId: null,
      resourceName: '',
      actionLimitType: 'ALL',
      actionList: []
    })
  }

  // 删除授权规则
  const deleteResourceDataList = (index: number): void => {
    form.resourceDataList.splice(index, 1)
  }


  // 取消
  const cancel = () => {
    drawer.value = false
  }

  const handleClose = () => {}

  defineExpose({
    openDrawer
  })
</script>

<style lang="scss" scoped>
.form {
  font-size: 14px;
}
:deep(.el-form-item__label) {
  padding: 0;
}
.resource-data-list {
  width:100%; 
  padding: 26px 32px; 
  background-color: #f8f9fb; 
  margin-bottom: 20px;
}
.addAction {
  width: 100%;
  padding: 20px 0;
  .tips {
    color: rgba(0,0,0,.45);
    font-size: 14px;
    line-height: 1.5715;
    margin: -12px 0px 12px;
  }
  :deep(.el-button) {
    border: 1px dashed #d9d9d9;
  }
  :deep(.el-button:hover) {
    border: 1px dashed #618eff;
    color: #618eff;
  }
}
.drawer-footer {
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 10px;
  border-top: 1px solid #f0f0f0;
}
.tab-svg {
  vertical-align: middle;
  margin-left: 5px;
  color: #8c8c8c;
}
</style>