<template>
  <div class="application">
    <!-- head区域 -->
    <el-card>
      <el-row :gutter="30">
        <el-col :span="21">
          <div class="info">
            <el-icon style="width:36px;height:36px">
              <Grid style="width:100%;height:100%;color:#396aff" />
            </el-icon>
            <span class="title">应用</span>
          </div>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="() => dialogVisibleHandle('open')">添加应用</el-button>
        </el-col>
      </el-row>
    </el-card>
    <div class="application_list">
      <listItem
        v-for="item in listData.list"
        :key="item.id"
        :item="item"
        @deleteClick="() => deleteResourceGroupHandle(item.id)"
      />
    </div>
    <!-- 分页 -->
    <div class="demo-pagination-block">
      <pagination :total="listData.count" @pageClick="pageClickHandle"></pagination>
    </div>
    <!-- to 属性就是目标位置 -->
    <teleport to="body">
      <el-dialog
        v-model="dialogVisible"
        title="创建自建应用"
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
          <el-form-item label="应用名称" prop="name">
            <el-input v-model="application.name" placeholder="输入应用名称"></el-input>
          </el-form-item>
          <el-form-item label="应用描述" prop="description">
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
import { Grid } from "@element-plus/icons-vue";
import listItem from "./components/listItem.vue";
import pagination from './pagination/index.vue';
import { useRoute } from 'vue-router'
import useApplication from './businessLogic/application-logic'

let route = new useRoute()

let {
  rules,
  listData,
  application,
  ruleFormRef,
  dialogVisible,

  resetForm,
  submitForm,
  getApplicationListHandle,
  deleteResourceGroupHandle
} = useApplication(route.query.id)

/**
 * 打开配置弹出窗
 */
function dialogVisibleHandle(type) {
  dialogVisible.value = type == 'open' ? true  :false
}



// 分页事件
function pageClickHandle(params) {
  getApplicationListHandle(params.pageIndex, params.pageSize)
}


</script>

<style lang='scss' scoped>
.application {
  margin: 0 auto;
  height: 100%;
  width: 1150px;
  .info {
    line-height: 40px;
    display: flex;
    align-items: center;
    .icon {
      font-size: 24px;
      vertical-align: sub;
    }
    .title {
      font-size: 22px;
      margin-left: 20px;
    }
  }

  .application_list {
    margin-top: 20px;
  }
}
</style>