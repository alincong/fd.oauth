<template>
  <div class="usesr">
    <!-- head区域 -->
    <el-card>
      <el-row :gutter="30">
        <el-col :span="21">
          <div class="info">
            <el-icon><Avatar /></el-icon>
            <span class="title">用户列表</span>
          </div>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="openCreateDialog">创建用户</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 搜索区域 -->
    <div class="query">
      <el-row :gutter="35">
        <el-col :span="8">
          <el-input
            v-model="queryValue"
            clearable 
            @clear='clearValue'
            placeholder="请输入用户名称 / 用户工号"
          />
        </el-col>
        <el-col :span="6">
          <el-button @click="queryUser">查询</el-button>
        </el-col>
        <el-col :span="3" :offset="7">
          <el-button type="text" class="delete" v-show="selectedArray.length" @click="deleteUser('select')">删除</el-button>
          <span class="selectAll">全选</span>
          <el-checkbox v-model="checkAll" @change="handleCheckAllChange" style="vertical-align: middle"></el-checkbox>
        </el-col>
      </el-row>
    </div>

    <!-- 列表区域 -->
    <div class="user-list">
      <div v-for="item in userList" :key="item.id">
        <div class="item">
          <el-checkbox v-model="item.isCheck" @change="handleCheckItemChange"></el-checkbox>
          <div class="user-name">
            <el-avatar
              class="avatar"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            ></el-avatar>
            <el-button type="text" @click="goToEdit(item.id)">{{ item.userName }}</el-button>
          </div>
          <div class="user-number">
            <div class="item-title">工号</div>
            <div>{{ item.userNumber }}</div>
          </div>
          <div class="operation">
            <el-button type="text" @click="goToEdit(item.id)">查看</el-button>
            <span class="divide">|</span>
            <el-button type="text" class="delete" @click="deleteUser('list',item.id)">删除</el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 创建用户弹窗 -->
    <create-user ref="dialog" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { Avatar } from "@element-plus/icons-vue";
import createUser from "./components/create-user.vue";
import user from "@/store/user";

interface UserItem {
  id: number,
  isCheck: boolean,
  userName: string,
  userNumber: string,
  [props: string]: any
}

export default defineComponent({
  components: { Avatar, createUser },
  setup() {
    const router = useRouter();
    let userList = reactive<UserItem[]>([
      {
        id: 1,
        isCheck: false,
        userName: "web前端",
        userNumber: "FD-39365",
      },
      {
        id: 2,
        isCheck: false,
        userName: "web前端",
        userNumber: "FD-39365",
      },
    ])

    // 创建用户功能
    const dialog = ref();
    const openCreateDialog = () => {
      dialog.value.showDialog();
    };

    // 搜索区域数据
    const queryValue = ref();
    const queryUser = () => {
      console.log(queryValue.value);
    }
    const clearValue = () => {
      console.log(queryValue.value);
    }
     
    // 全选功能
    const checkAll = ref(false)
    const selectedArray = ref<UserItem[]>([])
    const handleCheckAllChange = (value) => {
      value === true ? (userList.forEach(item => {item.isCheck = true}), selectedArray.value = userList) : (userList.forEach((item) => {item.isCheck = false}), selectedArray.value = [])
    }
    const handleCheckItemChange = () => {
      selectedArray.value = userList.filter(val => {return val.isCheck})
      checkAll.value = selectedArray.value.length === userList.length ? true : false
    }

    // 跳转详情
    const goToEdit = (id) => {
      router.push(`/user/see-user`);
    };
    
    // 删除
    const deleteUser = (type,id) => {
      if(type === 'select') {
        console.log(selectedArray.value);
      }
    }

    return {
      userList,
      dialog,
      queryValue,
      checkAll,
      selectedArray,

      // 方法
      openCreateDialog,
      queryUser,
      clearValue,
      handleCheckAllChange,
      handleCheckItemChange,
      goToEdit,
      deleteUser
    };
  },
});
</script>

<style lang="scss" scoped>
// head区域
.info {
  line-height: 40px;
  .icon {
    font-size: 24px;
    vertical-align: sub;
  }
  .title {
    font-size: 22px;
    margin-left: 20px;
  }
}

// 搜索区域
.query {
  margin: 30px 0;
}

.select {
  float: right;
}
.selectAll {
  font-size: 14px;
  color: rgb(161, 171, 200);
  margin: 0 10px;
}

// 列表区域
.user-list {
  .item {
    width: 100%;
    height: 90px;
    line-height: 24px;
    border: 1px solid #eee;
    border-radius: 10px;
    display: flex;
    padding: 20px 30px;
    margin-bottom: 15px;
    box-sizing: border-box;
    position: relative;
    .user-name {
      width: 25%;
      margin-left: 20px;
      .avatar {
        margin: 4px 10px 0 0;
        vertical-align: middle;
      }
    }
    .operation {
      line-height: 48px;
      position: absolute;
      right: 30px;
      .divide {
        margin: 0 10px;
        color: #999;
      }
    }
  }
}
.item-title {
  font-size: 12px;
  color: #666;
}
.delete {
  color: red;
}
</style>
