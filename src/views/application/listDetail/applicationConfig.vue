
<template>
  <!-- 配置信息 -->
  <el-card class="expiration_time">
    <template #header>
      <div class="header_wrap">
        <div class="card-header">
          <h3 style="font-size: 16px;">配置信息</h3>
        </div>
        <div class="save" @click="setResourceGroupConfigHandle(configruleFormRef,appliItem.id)">
          <el-icon style="margin:0 5px">
            <tickets />
          </el-icon>
          <span>保存</span>
        </div>
      </div>
    </template>
    <el-form ref="configruleFormRef" :model="resources" :rules="rules" label-width="150px">
      <el-form-item label="登录回调 URL：" prop="appUrl">
        <el-row>
          <el-col :span="16">
            <el-input
              v-model="resources.appUrl"
              :rows="2"
              type="textarea"
              placeholder="请输入登录回调 URL"
            />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="授权码过期时间：" prop="tokenExpireTime">
        <el-row class="rowWrap">
          <el-col :span="16" class="inputWrap">
            <el-row class="inputContainer">
              <el-col :span="21">
                <el-input-number
                  :min="0"
                  size="small"
                  style="width:100%"
                  v-model="resources.tokenExpireTime"
                  controls-position="right"
                  class="inputNumber"
                ></el-input-number>
              </el-col>
              <el-col :span="3">
                <el-select v-model="timeVal" placeholder="Select" size="small">
                  <el-option
                    v-for="time in timeType"
                    :key="time.value"
                    :label="time.label"
                    :value="time.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <div class="tipsText">兑换 token 的授权码过期时间（建议 600 秒），若在有效期内未使用，则导致所有身份或资源凭证无法兑换，最终无法进行登录。</div>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import { Tickets } from "@element-plus/icons-vue";

import useApplicationDetail from '../businessLogic/application-details-logic'
let { setResourceGroupConfigHandle, rules, resources, timeType, timeVal,configruleFormRef } = useApplicationDetail()
const props = defineProps<{
  appliItem
}>()


// 监听响应式对象 - 通过一个函数返回要监听的属性
watch(
  () => props.appliItem,
  (newVal) => {
    resources.appUrl = newVal.appUrl
    resources.tokenExpireTime = newVal.tokenExpireTime
  })


</script>

<style lang="scss" scoped>
// 配置信息
.expiration_time {
  .AppSecret {
    white-space: normal;
    height: auto;
    min-height: 32px;
    color: #9fabcb;
    position: relative;
    display: inline-flex;
    align-items: center;
    height: 32px;
    font-size: 14px;
  }
  .header_wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .save {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #396aff;
      cursor: pointer;
    }
  }
  .rowWrap {
    margin: 25px 0;
  }

  .inputWrap {
    display: flex;
    flex-direction: column;
    .tipsText {
      font-size: 13px;
    }
    .inputContainer {
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  }
}

::v-deep(.el-input-number.is-controls-right .el-input__inner) {
  text-align: left;
  border: none;
  border-right: 1px solid #ccc;
  border-radius: 0px;
}
::v-deep(.el-select .el-input .el-input__inner) {
  border: none;
}
</style>