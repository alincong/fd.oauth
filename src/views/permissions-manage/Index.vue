<!--
 * @Author: your name
 * @Date: 2021-12-28 16:31:30
 * @LastEditTime: 2022-01-06 19:26:32
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \oms.fandow.come:\my_work\oauth.fandow.com\src\views\permissions-manage\Index.vue
-->
<template>
  <div ref="root">
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
                :show-after="300"
              >
                <img style="margin-left: 10px;" src="../../assets/svg/question.svg" alt="">
              </el-tooltip>
            </h3>
            <el-tooltip
                :append-to-body="false"
                effect="dark"
                content="创建权限分组"
                placement="top"
                :show-after="300"
              >
                <el-icon><circle-plus class="add-icon" @click="openEditGroup" /></el-icon>
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
                  <el-dropdown-item @click="showGroupDetail">详情</el-dropdown-item>
                  <el-dropdown-item disabled>编辑</el-dropdown-item>
                  <el-dropdown-item disabled>删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <humble-pagination :total="30" :current-page="currentPage" @change="pageChange"></humble-pagination>
          <!-- <el-pagination hide-on-single-page  :pager-count="3" :small="true" layout="prev, pager, next, slot" :total="100">
            <el-input style="width: 30px;" class="paginattion-input"></el-input>
          </el-pagination> -->
          
        </el-aside>
        <el-main class="main">
          <div class="tabs-header">
            <div class="tabs">
              <div class="tab" v-for="item in tabsTtitleList" :key="item.name" @click="tabClick(item.name)">
                <text :class="{'a-select': item.isClick, 'tab-name':true}">{{ item.label }}</text>
                <el-tooltip
                  effect="dark"
                  :content="item.tip"
                  placement="top"
                  :append-to-body="false"
                  :show-after="300"
                >
                  <img class="tab-svg" src="../../assets/svg/question.svg" alt="">
                </el-tooltip>
              </div>
            </div>
            <div class="add-resource add-icon" @click="openTabsDrawer(tabValue)">
              <el-icon style="vertical-align: middle; margin-right: 10px;"><circle-plus /></el-icon>
              <span>{{ tagMap[tabValue] }}</span>
            </div>
          </div>
          <div class="tabs-content">
            <el-table 
            :data="tableData"
            :row-style="tableRowStyle"
            style="width: 100%"
            >
              <template #empty>
                <div class="table-empty">
                  <img src="@/assets/svg/empty-box-fill.svg" />
                  <div style="">暂无数据</div>
                </div>
              </template>
              <template v-if="tabValue === 'resource'">
                <el-table-column type="selection" />
                <el-table-column prop="name" label="资源名称" />
                <el-table-column prop="type" label="资源" />
                <el-table-column prop="description" label="描述" />
                <el-table-column label="操作" #default="scope">
                  <a class="a-select margin-r-5">编辑</a>
                  <a class="a-delete" @click="tableDelDialogShow">删除</a>
                </el-table-column>
              </template>
              <template v-if="tabValue === 'role'">
                <el-table-column type="selection" />
                <el-table-column prop="role" label="角色Code" />
                <el-table-column prop="desc" label="角色描述" />
                <el-table-column prop="createTime" label="创建时间" />
                <el-table-column label="操作" #default="scope">
                  <a class="a-delete" @click="tableDelDialogShow">删除</a>
                </el-table-column>
              </template>
              <template v-if="tabValue === 'assignment'">
                <el-table-column prop="targetName" label="被授权主体名称" />
                <el-table-column prop="targetType" label="被授权主体类型" />
                <el-table-column label="操作" #default="scope">
                  <a class="a-select margin-r-5" @click="() => functionMap.assignmentDetail()">查看授权</a>
                  <a class="a-select" @click="tableDelDialogShow">取消授权</a>
                </el-table-column>
              </template>
            </el-table>
          </div>
        </el-main>
      </el-container>
    </el-card>
    <!-- 分组抽屉 -->
    <EditGroup ref="editGroupRefs" />
    <!-- 分组详情 -->
    <DetailGroup ref="detailGroupRefs"></DetailGroup>
    <!-- 资源抽屉 -->
    <EditResource ref="editResourceRefs" />
    <!-- 角色抽屉 -->
    <EditRole ref="editRoleRefs"></EditRole>
    <!-- 授权抽屉 -->
    <EditAssignment ref="editAssignmentRefs"></EditAssignment>
    <!-- 授权详情抽屉 -->
    <DetailAssignment ref="detailAssignmentRefs"></DetailAssignment>
    <!-- 删除/取消弹框 -->
    <PermissionsWarningDialog ref="tableWaringDialogRefs" :title="tableDelDialogTitle"></PermissionsWarningDialog>
  </div>
</template>


<script lang="ts" setup>
import { 
  reactive, 
  ref, 
  nextTick, 
  onMounted,
  getCurrentInstance, 
  ComponentInternalInstance,
  useAttrs } from 'vue'
import AnnotationTips from './components/annotation-tips.vue'
import EditGroup from './components/group/edit-group.vue'
import DetailGroup from './components/group/detail-group.vue'
import useCurrentInstance  from '@/hooks/useCurrentInstance'
import EditResource from './components/resource/edit-resource.vue'
import EditRole from './components/role/edit-role.vue'
import EditAssignment from './components/assignment/edit-assignment.vue'
import humblePagination from '@/components/humble-pagination/index.vue'
import PermissionsWarningDialog from './components/permissions-warning-dialog .vue'
import DetailAssignment from './components/assignment/detail-assignment.vue'
import { pageTips,groupTest, tabsTtitleList, roleList, resourceList, assignmentList} from '@/constants/permissions-manage/Astatic-variable'
import { List, QuestionFilled, CirclePlus, Search } from '@element-plus/icons-vue'
const root = ref()
console.log(root, 'root');
let { appContext,  proxy } = useCurrentInstance()
console.log(proxy, 'proxy');


const tagMap = {
  resource: '添加资源',
  role: '添加角色',
  assignment: '添加授权'
}

// 函数映射-因为没有this难搞哦他妈的
const functionMap = {
  // 新建资源
  resource: () => editResourceRefs.value.openDrawer('create'),
  // 新建角色
  role: () => editRoleRefs.value.openDrawer('create'),
  // 新建授权
  assignment: () => editAssignmentRefs.value.openDrawer('create'),
  // 授权详情
  assignmentDetail: () => detailAssignmentRefs.value.openDrawer(),
  // 资源列表
  resourceApi:  () => getResourceList(),
  // 角色列表
  roleApi: () => getRoleList(),
  // 授权列表
  assignmentApi: () => getAssignmentList()
}


// 获取权限分组
const group = reactive(groupTest)
const clickGroupItem = (index) => {
  group.forEach(item => item.isClick = false)
  group[index].isClick = true
}
// 分页跳转
const currentPage = ref()
// 分页跳转
const pageChange = (value) => {
  currentPage.value = value
}

// 分组详情抽屉refs
const detailGroupRefs = ref()
// 分组详情抽屉
const showGroupDetail = () => {
  detailGroupRefs.value.openDrawer()
}

// tabs 选中的选项值
let tabValue = ref('resource')
let tableData = ref()
// tab点击事件
const tabClick = name => {
  console.log(name, 'name');
  // 重置样式
  tabsTtitleList.forEach(item => item.isClick = false)
  // 点击不同tab展示不同内容
  tabsTtitleList.forEach(item => {
    if(item.name === name) {
      item.isClick = true
      nextTick(() => {
        tabValue.value = name
        tableData.value = functionMap[`${name}Api`]()
      })
    } else {
      tabValue.value = ''
    }
  })
}

// table删除/取消dialog弹框的标题
const tableDelDialogTitle = ref()
// dialog的refs
const tableWaringDialogRefs = ref()
const tableDelDialogShow = () => {
  let titleMap = {
    resource: '确定删除该资源？',
    role: '确定删除该角色？',
    assignment: '确认取消授权？'
  }
  tableDelDialogTitle.value = titleMap[tabValue.value]
  tableWaringDialogRefs.value.openDialogVisible()
}
// 表格行样式
const tableRowStyle = () => {
  return { 'height': '68px' }
}

// 分组-子组件
const editGroupRefs = ref()
const openEditGroup = ():void => {
  editGroupRefs.value.openDrawer('create')
}

// tab策略分发
const openTabsDrawer = (name) => {
  functionMap[name]()
}

// tbas-资源（添加/编辑）抽屉子组件
const editResourceRefs = ref()
// 资源列表
const getResourceList = () => {
  return resourceList
}
// tbas-角色（添加/编辑）抽屉子组件
const editRoleRefs = ref()
// 角色列表
const getRoleList = () => {
  return roleList
}
// tbas-授权（添加/编辑）抽屉子组件
const editAssignmentRefs = ref()
// 授权详情refs
const detailAssignmentRefs = ref()
// 授权列表
const getAssignmentList = () => {
  return assignmentList
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
.margin-r-5 {
  // display: inline-block;
  margin-right: 10px;
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
.a-delete {
  color: #ff4e50;
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
      margin: 0 0 16px;
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