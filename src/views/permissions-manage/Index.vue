<!--
 * @Author: your name
 * @Date: 2021-12-28 16:31:30
 * @LastEditTime: 2021-12-30 17:22:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \oms.fandow.come:\my_work\oauth.fandow.com\src\views\permissions-manage\Index.vue
-->
<template>
  <div>
    <div>
      <div class="title">
        <div style="font-size:24px;">权限管理</div>
      </div>
      <annotation-tips :content="pageTips"></annotation-tips>
    </div>
    <el-card class="box-card">
      <el-container>
        <el-aside class="side">
          <div class="side-header">
            <h3>
              <el-icon style="margin-right: 7px; font-size: 18px;"><List /></el-icon>
              <span>权限分组</span>
              <el-tooltip
                :append-to-body="false"
                effect="dark"
                content="权限分组可以理解为独立的命名空间，各权限分组之间同名的资源和角色不会冲突"
                placement="top"
              >
                <img style="margin-left: 10px;" src="../../assets/svg/question.svg" alt="">
              </el-tooltip>
            </h3>
            <el-tooltip
                :append-to-body="false"
                effect="dark"
                content="创建权限分组"
                placement="top"
              >
                <el-icon><circle-plus class="add-icon" /></el-icon>
            </el-tooltip>
          </div>
          <div class="search-btn">
            <el-input
              placeholder="搜索分组名"
              :suffix-icon="Search"
            />
          </div>
          <div 
            v-for="(item, index) in group" 
            :key="item.name" 
            :class="{'group-select': item.isClick, 'group': true}"
            @click="clickGroupItem(index)"
          >
            <a href="javascript:void(0)" :class="[item.isClick ? 'a-select' : 'a-color']">{{ item.name }}</a>
            <el-dropdown class="group-dropdown">
              <div style="width: 14px;height: 14px;">
                <img style="width: 100%;" src="../../assets/svg/more_android_light.svg" alt="">
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>详情</el-dropdown-item>
                  <el-dropdown-item disabled>编辑</el-dropdown-item>
                  <el-dropdown-item disabled>删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <el-pagination hide-on-single-page :pager-count="3" :small="true" layout="prev, pager, next, slot" :total="100">
            <el-input style="width: 30px;" class="paginattion-input"></el-input>
          </el-pagination>
        </el-aside>
        <el-main class="main">
          <div class="tabs-header">
            <div class="tabs">
              <div class="tab" v-for="(item, index) in tabsTtitleList" :key="item.name" @click="tabClick(item.name, index)">
                <text :class="{'a-select': item.isClick, 'tab-name':true}">{{ item.label }}</text>
                <el-tooltip
                  effect="dark"
                  :content="item.tip"
                  placement="top"
                  :append-to-body="false"
                >
                  <img class="tab-svg" src="../../assets/svg/question.svg" alt="">
                </el-tooltip>
              </div>
            </div>
            <div class="add-resource add-icon">
              <el-icon style="vertical-align: middle; margin-right: 10px;"><circle-plus /></el-icon>
              <span>添加授权</span>
            </div>
          </div>
          <div class="tabs-content">
            <el-table :data="tableData" style="width: 100%">
              <template #empty>
                <div class="table-empty">
                  <img src="../../assets/svg/empty box-fill.svg" />
                  <div style="">暂无数据</div>
                </div>
              </template>
              <template v-if="tabValue === 'roleManagement'">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="role" label="角色Code" width="180" />
                <el-table-column prop="desc" label="角色描述" width="180" />
                <el-table-column prop="createTime" label="创建时间" width="180" />
                <el-table-column prop="edit" label="操作" width="180" />
              </template>
            </el-table>
          </div>
        </el-main>
      </el-container>
    </el-card>
  </div>
</template>


<script lang="ts" setup>
import { reactive, ref, nextTick } from 'vue'
import AnnotationTips from './components/annotation-tips.vue'
import { pageTips,groupTest, tabsTtitleList, roleData} from '@/constants/permissions-manage/Astatic-variable'
import { List, QuestionFilled, CirclePlus, Search } from '@element-plus/icons-vue'

// 获取权限分组
const group = reactive(groupTest)
const clickGroupItem = (index) => {
  group.forEach(item => item.isClick = false)
  group[index].isClick = true
}

// tabs 选中
let tabValue = ref()
let tableData = ref()
// tab点击事件
const tabClick = (name, index) => {
  tabsTtitleList.forEach(item => item.isClick = false)
  tabsTtitleList[index].isClick = true
  if(name === 'roleManagement') {
    tabValue.value = name
    nextTick(() => {
      tableData.value = roleData
    })
  } else {
    tabValue.value = undefined
  }
}

</script>

<style lang="scss" scoped>
:deep(.el-pagination__jump) {
  margin-left: 0;
}
:deep(.el-card__body) {
  padding: 0;
}

:deep(.el-popper) {
  max-width: 230px;
  font-size: 13px;
  line-height: 1.4;
}

.table-empty {
  width: 100%;
  height: 160px;
  padding: 16px;
  position: relative;
  margin-top: 50px;
  div {
    position: absolute;
    top: 60px;
    right: 185px;
  }
}

// 分页input样式
.paginattion-input {
  :deep(.el-input__inner) {
    padding: 0;
  }
}
.group-select {
  background-color: #f0f6ff;
}

.a-color {
  color: #484848;
}

.a-select {
  color: #396aff;
}

.group:hover {
  background-color: #f0f0f0;
  a {
    color: #396aff;
  }
}
.group {
  cursor: pointer;
  height: 50px;
  box-sizing: border-box;
  border-radius: 4px;
  padding-left: 25px;
  padding-right: 6px;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  font-size: 14px;
  color: #484848;
  line-height: 50px;
}
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }
  .box-card {
    display: flex;
    background: #fff;
    box-shadow: 0 0 10px 0 #f0f0f0;
    border-radius: 4px;
    margin-top: 24px;
    flex: 1 1;
  }
  .side {
    box-sizing: border-box;
    width: 260px;
    border-right: 1px solid #eee;
    padding: 20px;
    height: 100%;
    .side-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 13px;
      h3 {
        color: #333;
        font-size: 18px;
        display: flex;
        align-items: center;
        margin: 0;
        font-weight: 400;
      }
    }
  }
  .add-icon {
    cursor: pointer;
    color: rgb(9, 106, 255);
  }
  .search-btn {
    margin-bottom: 20px;
  }
  .main {
    padding: 14px 24px;
    flex: 1 1;
    width: 840px;
    .tabs-header {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      color: rgba(0,0,0,.85);
      font-size: 14px;
      font-variant: tabular-nums;
      line-height: 1.5715;
      list-style: none;
      font-feature-settings: "tnum","tnum";
      display: flex;
      justify-content: space-between;
      overflow: hidden;
    }
    .tabs {
      display: flex;
      .tab {
        font-weight: 500;
        margin-right: 40px;
        .tab-name:hover {
          color: #7a9cff;
          cursor: pointer;
        }
        :deep(.el-popper) {
          max-width: 300px;
        }
        .tab-svg {
          margin-left: 5px;
          vertical-align: middle;
        }
      }
    }
  }
  .group-dropdown {
    position: relative;
    top: 35%;
  }
  .add-source {
  }
</style>