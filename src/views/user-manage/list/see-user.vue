<template>
  <div class="see-user">
    <sub-navigation type='back' />
    <el-card>
      <el-row>
        <el-col :span="6">
          <div>
            <el-avatar
              class="avatar"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            ></el-avatar>
            <!-- <img
              src="https://files.authing.co/authing-console/default-user-avatar.png"
            /> -->
            <span style="font-size: 20px">{{ userInfo.number }}</span>
            <span style="font-size: 18x; margin-left: 10px">{{ userInfo.name }}</span>
          </div>
        </el-col>
        <el-col :span="6" :offset="12">
          <el-button style="margin: 0 20px 0 20px;" @click="changePwd">修改密码</el-button>
           <el-dropdown>
             <el-button>操作<el-icon class="el-icon--right"><arrow-down /></el-icon></el-button>
             <template #dropdown>
               <el-dropdown-menu>
                 <el-dropdown-item @click="lockAccount">锁定账号</el-dropdown-item>
                 <el-dropdown-item @click="openInfoDialog">编辑信息</el-dropdown-item>
               </el-dropdown-menu>
             </template>
           </el-dropdown>
        </el-col>
      </el-row>
    </el-card>

    <!-- 弹窗 -->
    <revise-pwd ref="reviseDialog"/>
    <edit-info ref="infoDialog" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, h } from "vue";
import { useRoute } from "vue-router";
import { ArrowDown } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import revisePwd from './components/revise-pwd.vue';
import editInfo from './components/edit-info.vue'

export default defineComponent({
  components: { ArrowDown, revisePwd, editInfo },
  setup() {
    const userInfo = reactive({
      number: "FD-39365",
      name: "林聪",
    });
    
    // 修改密码
    const reviseDialog = ref()
    const changePwd = () => {
      reviseDialog.value.showDialog()
    }
    
    // 编辑信息弹窗
    const infoDialog = ref()
    const openInfoDialog = () => {
      infoDialog.value.showDialog()
    }
    
    // 锁定账号功能
    const lockAccount = () => {
      ElMessageBox({
        message: h('p', null, [
          h('div', null, '确认锁定账号?'),
          h('span', null, '锁定账号后，该用户将无法登录应用'),
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
          type: 'warning',
      }).then(() => {
        console.log(111);
        
      }).catch(() => {
        console.log(222);
      })
    }

    return {
      userInfo,
      reviseDialog,
      infoDialog,

      // 方法
      changePwd,
      lockAccount,
      openInfoDialog
    };
  },
});
</script>

<style lang="scss" scoped>
.see-user {
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 20px;
    line-height: 70px;
  }
}
</style>