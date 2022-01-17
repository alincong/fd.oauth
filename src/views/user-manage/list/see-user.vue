<template>
  <div class="see-user">
    <sub-navigation type="back" />
    <el-card>
      <el-row>
        <el-col :span="6">
          <div>
            <el-avatar
              class="avatar"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            ></el-avatar>
            <span style="font-size: 20px">{{ userInfo.account }}</span>
            <span style="font-size: 18x; margin-left: 10px">{{
              userInfo.username
            }}</span>
          </div>
        </el-col>
        <el-col :span="6" :offset="12">
          <el-button style="margin: 0 20px 0 20px" @click="changePwd"
            >修改密码</el-button
          >
          <el-dropdown>
            <el-button
              >操作<el-icon class="el-icon--right"><arrow-down /></el-icon
            ></el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="lockAccount">{{
                  userInfo.status === "NORMAL" ? "锁定账号" : "解锁账号"
                }}</el-dropdown-item>
                <el-dropdown-item @click="openInfoDialog"
                  >编辑信息</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-card>

    <!-- 弹窗 -->
    <revise-pwd ref="reviseDialog" />
    <edit-info ref="infoDialog" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, h, onMounted } from "vue";
import { useRoute } from "vue-router";
import { ArrowDown } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import revisePwd from "./components/revise-pwd.vue";
import editInfo from "./components/edit-info.vue";
import { userDetails, lockUser, unlockUser} from "@/api/user-manage-api";

interface UserInfo {
  account: string;
  username: string;
  [props: string]: any;
}

export default defineComponent({
  components: { ArrowDown, revisePwd, editInfo },
  setup() {
    const route = useRoute();
    let userInfo = ref<UserInfo>({
      account: "",
      username: "",
      status: "",
    });

    // --------------------------------生命周期--------------------------------
    onMounted(() => {
      getUserDetails();
    });

    // --------------------------------交互--------------------------------
    const getUserDetails = async() => {
      try {
        const res = await userDetails(route.query.id).request() as UserInfo
        userInfo.value = res
      } catch(err) {}
    };

    // 修改密码
    const reviseDialog = ref();
    const changePwd = () => {
      reviseDialog.value.showDialog(route.query.id);
    };

    // 编辑信息弹窗
    const infoDialog = ref();
    const openInfoDialog = () => {
      infoDialog.value.showDialog();
    };

    // 锁定账号功能
    const lockAccount = () => {
      ElMessageBox({
        message: h("p", null, [
          h(
            "div",
            null,
            userInfo.value.status === "NORMAL" ? "确认锁定账号?" : "确认要解锁该账号?"
          ),
          h(
            "span",
            null,
            userInfo.value.status === "NORMAL"
              ? "锁定账号后，该用户将无法登录应用"
              : "解锁账号后，该用户可以登录应用"
          ),
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // console.log(userInfo.value.status);
          let requestFn = userInfo.value.status === "NORMAL" ? lockUser : unlockUser
          requestFn(route.query.id).request()
          getUserDetails()
        })
        .catch(() => {
          
        });
    };

    return {
      userInfo,
      reviseDialog,
      infoDialog,

      // 方法
      changePwd,
      lockAccount,
      openInfoDialog,
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