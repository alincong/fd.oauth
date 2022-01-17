<!--
 * @Author: your name
 * @Date: 2021-12-31 15:13:59
 * @LastEditTime: 2022-01-06 16:51:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \oms.fandow.come:\my_work\oauth.fandow.com\src\views\permissions-manage\components\add-authorization.vue
-->
<template>
  <el-drawer 
    :append-to-body="false" 
    :size="720" 
    v-model="drawer" 
    title="授权详情" 
    :before-close="handleClose"
    direction="rtl" 
  >
    <el-form 
      class="form" 
      ref="formRef" 
      :model="form" 
      label-position="left"
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
          <el-form-item label="被授权主体：">
            <el-tag type="success" effect="dark" size="small">啊洗吧</el-tag>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="被授权主体：">
            <el-tag type="info" size="small">西内</el-tag>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" >
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
          <el-divider ></el-divider>
        </el-col>
        <div v-for="(item, index) in form.resourceDataList" style="width: 100%;">
          <el-col :span="24" class="resource-data-list">
            <el-form-item label="授权作用：">
              <el-tag type="danger" size="small">八嘎呀路</el-tag>
            </el-form-item>
            <el-form-item label="资源：">
              <el-button type="text">555</el-button>
            </el-form-item>
            <el-form-item label="操作：">
              <el-tag type="info" size="small">*</el-tag>
            </el-form-item>
          </el-col>
        </div>
      </el-row>
    </el-form>
    <div class="drawer-footer">
      <el-button type="default" size="small" @click="cancel">取消</el-button>
      <el-button color="#396aff" style="color: white" size="small" @click="editAssignment">编辑</el-button>
    </div>
  </el-drawer>
    <!-- 授权抽屉 -->
    <EditAssignment ref="editAssignmentRefs"></EditAssignment>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
import EditAssignment from './edit-assignment.vue'
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
  const openDrawer = (type) => {
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

  // tbas-授权（添加/编辑）抽屉子组件
  const editAssignmentRefs = ref()
  // 去编辑页
  const editAssignment = () => {
    editAssignmentRefs.value.openDrawer('create')
    cancel()
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