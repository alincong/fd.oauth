<template>
  <div class="header">
    <!-- 管理员 -->
    <template v-if="identity === 'admin'">
      <!-- 左侧详情栏 -->
      <el-row class="left">
        <!-- logo -->
        <div class="logo" @click="handleToUserPool">
          <img src="@/assets/logo.png" alt="凡岛logo">
        </div>

        <template v-if="!hiddenControler">
          <!-- 分割线 -->
          <el-divider class="left-divider" direction="vertical"/>

          <!-- 控制面板 -->
          <el-dropdown class="control-plane" :trigger="trigger">
            <div>
              <div class="control-plane__title">
                <span>用户管理</span>
                <el-icon>
                  <ArrowDown />
                </el-icon>
              </div>
              <span class="control-plane__description">用户池</span>
            </div>
            
            <template #dropdown>
              <el-dropdown-menu style="width: 200px;">
                <!-- <el-dropdown-item>设置</el-dropdown-item> -->
                <!-- <el-dropdown-item>邀请管理员</el-dropdown-item> -->
                <el-dropdown-item>应用面板</el-dropdown-item>
                <!-- <el-dropdown-item divided>创建用户池</el-dropdown-item> -->
                <!-- <el-dropdown-item disabled>切换用户池</el-dropdown-item> -->
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-row>

      <!-- 右侧用户栏 -->
      <el-row class="right">
        <!-- 应用面板图标 -->
        <div class="application" v-if="!hiddenControler">
          <el-tooltip placement="bottom" content="进入应用面板">
            <el-icon>
              <Menu></Menu>
            </el-icon>
          </el-tooltip>
        </div>

        <!-- 头像 -->
        <el-dropdown class="avatar" :trigger="trigger">
          <el-avatar>
            <template v-if="userInfo.avatar">
              <img :src="userInfo.avatar" />
            </template>
            <template v-else>
              <span>{{ identity }}</span>
            </template>
          </el-avatar>

          <template #dropdown>
            <el-dropdown-menu style="width: 120px;">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>反馈处理</el-dropdown-item>
              <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-row>
    </template>

    <!-- 普通用户 -->
    <template v-else>
      <el-row class="left">
        <div class="logo">
          <img src="@/assets/logo.png" alt="凡岛logo">
        </div>

        <template v-if="!hiddenControler">
          <el-divider class="left-divider" direction="vertical"/>

          <div class="control-plane__title text">用户管理</div>
        </template>
      </el-row>

      <el-row class="right">
        <el-dropdown class="avatar" :trigger="trigger">
          <el-avatar>
            <template v-if="userInfo.avatar">
              <img :src="userInfo.avatar" />
            </template>
            <template v-else>
              <span>{{ identity }}</span>
            </template>
          </el-avatar>

          <template #dropdown>
            <el-dropdown-menu style="width: 120px;">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-row>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router'
import { ArrowDown, Menu } from '@element-plus/icons-vue'
// props
const props = defineProps({
  // 使用者身份，ammin/管理员  user/普通用户
  identity: {
    type: String,
    default: 'admin',
    validator: (val: string) => ['admin', 'user'].includes(val)
  },
  hiddenControler: {
    type: Boolean,
    default: false,
  }
})

// router
const router = useRouter()

// 用户信息
const userInfo = reactive({
  avatar: '',
})

// 触发面板方式
const trigger = 'click'

// 单击logo
const handleToUserPool = () => {
  router.push('/userpool')
}

// 退出
const handleLogout = () => {
  window.localStorage.removeItem('token')
  router.push('/login')
}

</script>

<style lang="scss" scoped>
.header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  & > .el-row {
    height: 45px;
  }
  .left {
    .logo {
      width: 45px;
      display: flex;
      align-items: center;
      cursor: pointer;
      img {
        width: 42px;
        height: 42px;
      }
    }
    &-divider {
      height: 24px;
      margin: 10px 20px;
    }
    .control-plane {
      height: 100%;
      cursor: pointer;
      &__title {
        font-size: 18px;
        line-height: 1.5;
        &.text {
          line-height: 45px;
        }
        .el-icon {
          margin-left: 8px;
        }
      }
      &__description {
        font-size: 10px;
        color: #9dabce;
      }
    }
  }
  .right {
    & > div {
      margin-left: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .application {
      width: 20px;
      font-size: 20px;
      cursor: pointer;
      color: #606266;
    }
    .avatar {
      width: 45px;
      cursor: pointer;
    }
  }
}
</style>
