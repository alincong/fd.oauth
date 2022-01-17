<template>
  <div class="admin-log">
    <!-- 页面标题 -->
    <page-title title="管理员日志">
      <template #icon>
        <el-icon><avatar /></el-icon>
      </template>
    </page-title>

    <!-- 日志列表 -->
    <el-card class="card-log">
      <template #header>
        <el-row justify="space-between">
          <el-row align="middle">管理员日志</el-row>
          <!-- 搜索 -->
          <search-box v-model="requestData.extraVal" placeholder="用户名 / 用户ID / IP" />
        </el-row>
      </template>

      <!-- 主内容 -->
      <div class="card-log__content">
        <!-- 筛选条件 -->
        <el-row justify="space-between" style="margin-bottom: 16px;">
          <!-- 选择器 -->
          <el-space class="content-header__selector">
            <!-- 事件类型 -->
            <el-select v-model="requestData.eventType">
              <template #prefix>
                <span style="margin-right: 8px;">事件类型</span>
              </template>
              <el-option 
                v-for="item in eventTypeOptions"
                :value="item.value"
                :label="item.label"
                :key="item.value">
              </el-option>
            </el-select>

            <!-- 资源名称 -->
            <el-select v-model="requestData.resourceName">
              <template #prefix>
                <span style="margin-right: 8px;">资源名称</span>
              </template>
              <el-option 
                v-for="item in resourceNameOptions"
                :value="item.value"
                :label="item.label"
                :key="item.value">
              </el-option>
            </el-select>

            <!-- 刷新按钮 -->
            <el-button>
              <el-icon><refresh-right /></el-icon>
            </el-button>
          </el-space>

          <!-- 日期 -->
          <el-date-picker
            v-model="requestData.date"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-row>
        
        <!-- 表格 -->
        <el-table current-row-key="id">
          <el-table-column prop="type" label="事件类型" :min-width="120" />
          <el-table-column prop="detail" label="事件详情" :min-width="200" />
          <el-table-column prop="user" label="用户" :min-width="150" />
          <el-table-column prop="ip" label="IP" :min-width="150" />
          <el-table-column prop="app" label="应用" :min-width="150" />
          <el-table-column prop="date" label="时间" :min-width="150" />
          <el-table-column prop="res" label="结果" :min-width="100" />

          <!-- 无数据 -->
          <template #empty>
            <el-empty description="暂无数据"></el-empty>
          </template>
        </el-table>

        <!-- 分页 -->
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import PageTitle from '@/components/page-title/Index.vue'
import SearchBox from '@/components/search/Index.vue'
import { Search, RefreshRight, Avatar } from '@element-plus/icons-vue'

// 请求参数
const requestData = reactive({
  // 事件类型
  eventType: 'all',
  // 资源名称
  resourceName: 'all',
  // 日期
  date: [],
  // 额外参数
  extraVal: '',
})

// 事件类型选项
const eventTypeOptions = reactive([
  { value: 'all', label: '全部操作' },
])

// 资源名称选项
const resourceNameOptions = reactive([
  { value: 'all', label: '全部资源' },
])

</script>

<style lang="scss" scoped>
</style>