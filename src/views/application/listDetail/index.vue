
<template>
  <div class="listDetail">
    <!-- head区域 -->
    <el-card class="list_header">
      <el-row :gutter="30">
        <el-col :span="24">
          <div class="info">
            <el-icon style="width:72px;height:72px">
              <Grid style="width:100%;height:100%;color:#396aff" />
            </el-icon>
            <div class="info_right">
              <div class="titleWrap">
                <h2 class="title">{{ appliItem.name }}</h2>
                <el-icon
                  style="width:20px;height:20px;cursor: pointer;"
                  @click="() => dialogVisibleHandle('open')"
                >
                  <edit style="width:100%;height:100%" />
                </el-icon>
              </div>
              <div class="appid_wrap">
                <span class="appid">APP ID：</span>
                <span class="appidText">{{ appliItem.appId }}</span>
                <el-icon style="margin:0 10px" @click="copyHandle(appliItem.appId)">
                  <document-copy />
                </el-icon>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-tabs v-model="tabsComName" @tab-click="handleClick">
        <el-tab-pane :label="item.label" :name="item.name" v-for="item in tabsList" :key="item.id"></el-tab-pane>
      </el-tabs>
    </el-card>
    <component :is="tabsName" :appliItem="appliItem"></component>
    <!-- to 属性就是目标位置 -->
    <teleport to="body">
      <el-dialog
        v-model="dialogVisible"
        title="应用信息"
        width="40%"
        :before-close="() => dialogVisibleHandle('close')"
      >
        <el-form
          ref="ruleFormRef"
          :model="application"
          :rules="rules"
          label-position="top"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="应用名" prop="name">
            <el-input v-model="application.name" placeholder="输入应用名称"></el-input>
          </el-form-item>
          <el-form-item label="应用描述">
            <el-input v-model="application.description" placeholder="请输入应用描述"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="resetForm(ruleFormRef)">取消</el-button>
            <el-button type="primary" @click="submitForm(ruleFormRef)">创建</el-button>
          </span>
        </template>
      </el-dialog>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, markRaw } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from "element-plus";
import useClipboard from 'vue-clipboard3'
import applicationConfig from './applicationConfig.vue'
import { Edit, DocumentCopy, Grid } from "@element-plus/icons-vue";
import { listRule } from '@/constants/application-manage/Astatic-variable'
import useApplicationDetail from '../businessLogic/application-details-logic'
let {
  tabsList,
  ruleFormRef,
  dialogVisible,
  application,
  appliItem,

  resetForm,
  submitForm,
  getResourceGroupDetailHandle,
} = useApplicationDetail()
// 获取资源组详情
const route = useRoute()
appliItem.value = route.query
const rules = reactive(listRule)
// markRaw将数据定义为不被监听 - 当前标签页
let tabsComName = ref('applicationConfig')
let tabsName = markRaw(applicationConfig)


getResourceGroupDetailHandle(appliItem.value.id)


// 切换tab选项卡
function handleClick(val) { }

// 编辑引用 - 弹出窗
function dialogVisibleHandle(type) {
  if (type == 'open') {
    application.name = appliItem.value.name
    application.description = appliItem.value.description
    dialogVisible.value = true
  } else if (type == 'close') {
    dialogVisible.value = false

  }
}


//复制文本
async function copyHandle(Msg) {
  const { toClipboard } = useClipboard()
  try {
    //复制
    await toClipboard(Msg)
    ElMessage({
      message: '复制成功',
      type: 'success',
      duration: 1000
    })
  } catch (e) {
    //复制失败
    console.error(e)
  }
}
</script>

<style lang="scss" scoped>
$color: "#396aff!important";
.list_header {
  margin-bottom: 10px;
}
.info {
  display: flex;
  align-items: center;
  line-height: 40px;

  .info_right {
    display: flex;
    flex-direction: column;
    margin-left: 25px;
    .titleWrap {
      display: flex;
      align-items: center;
      .title {
        font-size: 24px;
        color: #333;
        line-height: 1;
        margin-right: 10px;
      }
    }
  }
  .icons {
    width: 80px;
    height: 80px;
    font-size: 24px;
    vertical-align: sub;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .appid_wrap {
    color: #9fabcb;
    display: flex;
    font-weight: 400;
    font-size: 16px;
    align-items: center;
    cursor: pointer;
  }
}
</style>