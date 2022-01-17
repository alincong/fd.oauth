<!--
 * @Author: your name
 * @Date: 2021-12-31 15:13:59
 * @LastEditTime: 2022-01-06 16:32:24
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \oms.fandow.come:\my_work\oauth.fandow.com\src\views\permissions-manage\components\add-authorization.vue
-->
<template>
  <el-drawer 
    :size="720" 
    :append-to-body="false" 
    v-model="drawer" 
    :title="title" 
    direction="rtl" 
    :before-close="handleClose"
  >
    <annotation-tips :content="drawerResourceTips"></annotation-tips>
    <el-form 
      label-position="top" 
      class="form" 
      ref="formRef" 
      :model="form" 
      :rules="rules" 
      label-width="120px"
    >
      <el-form-item label="资源名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入资源名称，填写一个名词， 例如：order"></el-input>
      </el-form-item>
      <el-form-item label="资源" prop="type">
        <el-radio-group v-model="form.type" @change="formTypeChange">
          <el-radio label="DATA">数据</el-radio>
          <el-radio label="API">API</el-radio>
          <el-radio label="MENU">菜单</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="资源描述">
        <el-input v-model="form.description" placeholder="请输入资源描述"></el-input>
      </el-form-item>
      <el-form-item>
        <template #label>
          <span>操作类型</span>
          <el-tooltip
            effect="dark"
            content="为资源定义操作，请在输入框填写一个动词，例如：read。每一项都是 资源:操作 的形式。"
            placement="right"
            :append-to-body="false"
            :show-after="300"
            style="position: relative;"
          >
            <img class="tab-svg" src="../../../../assets/svg/question.svg" alt="">
          </el-tooltip>
        </template>
        <template v-for="(item, index) in form.actionDataList" :key="index">
          <el-form-item 
            class="margin-15" 
            :prop="`actionDataList.${index}.name`" 
            :rules="[{ required: true, message: '请输入操作名称', trigger: 'blur' }]"
          >
            <el-input v-model="item.name" placeholder="动作，例如read">
              <template #prepend>{{ form.name }}：</template>
            </el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input 
              v-model="item.description"
              style="width: 85%;margin-right: 10px;" 
              placeholder="描述信息，例如：读取订单信息"
            />
            <el-icon @click="removeActionData(item, index)" class="remove"><Remove /></el-icon>
          </el-form-item>
          <el-divider v-if="form.actionDataList.length"></el-divider>
          <el-input class="none-calss" v-model="item.type"/>
        </template>
      </el-form-item>
      <div class="addAction">
        <div class="tips">举例：订单列表模型，这里可以定义订单的添加，查看等操作。你可以授权某位操作人只能查看订单列表，而不能创建订单</div>
        <el-button plain @click="addAction">
          <el-icon ><Plus /></el-icon>
          <span >添加Action（操作类型）</span>
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
  import AnnotationTips from '../annotation-tips.vue'
  import { drawerResourceTips } from '@/constants/permissions-manage/Astatic-variable'
  import { Remove, Plus } from '@element-plus/icons-vue'
  interface actionDataListType  {
    name: string,
    type: string,
    description: string,
  }
  interface formType {
    name: string,
    type: string,
    description: string,
    actionDataList: Array<actionDataListType>
  }
  const drawer = ref(false)
  const title = ref()
  const confirmText = ref()
  const rules = reactive({
    name: [{ required: true, message: '请输入资源名称，填写一个名词，例如：order', trigger: 'blur'}],
    type: [{ required: true, message: '请选择资源类型', trigger: 'change'}]
  })
  const form = reactive<formType>({
    name: '',
    type: 'DATA',
    description: '',
    actionDataList: [
      
    ]
  })
  // 资源change事件
  const formTypeChange = (value: string): void => {
    console.log(value, 'value');
    
  }
  const removeActionData = (item: object, index: number): void => {
    form.actionDataList.splice(index, 1)
  }
  // 添加Action
  const addAction = (): void => {
    form.actionDataList.push({
      name: '',
      type: '',
      description: ''
    })
  }
  const openDrawer = (type) => {
    confirmText.value = '保存'
    title.value = '创建资源'
    drawer.value = true
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
:deep(.el-form-item__label) {
  padding: 0;
}
.remove {
  cursor: pointer;
}
.addAction {
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
.margin-15 {
  margin: 15px 0;
}
.none-calss {
  display: none;
}
.drawer-footer {
  width: 100%;
  position: absolute;
  text-align: right;
  bottom: 0;
  right: 0;
  padding: 10px;
  border-top: 1px solid #f0f0f0;
}
.form {
  margin-top: 20px;
}
.tab-svg {
  vertical-align: middle;
  margin-left: 5px;
  color: #8c8c8c;
}
</style>
