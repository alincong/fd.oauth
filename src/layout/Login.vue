<template>
  <el-container class="login-layout">
    <el-header></el-header>
    <el-main>
      <router-view />
    </el-main>
    <el-footer>
      <div class="footer-box">Powered By Fandow</div>
    </el-footer>
  </el-container>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.login-layout {
  height: 100vh;
  .el-main {
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    .footer-box {
      width: 440px;
      font-size: var(--el-font-size-base);
      color: var(--el-text-color-secondary);
      text-align: center;
    }
  }
}
</style>
