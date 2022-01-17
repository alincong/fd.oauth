<template>
  <div class="usesr">
    <!-- head区域 -->
    <page-title title="用户列表">
      <template #icon>
        <el-icon><avatar /></el-icon>
      </template>
      <template #extra>
        <el-button type="primary" @click="openCreateDialog">创建用户</el-button>
      </template>
    </page-title>

    <!-- 搜索区域 -->
    <div class="query">
      <el-row :gutter="20">
        <el-col :span="9">
          <el-input
            v-model="searchUser"
            clearable
            @clear="clearValue"
            :suffix-icon="searchUser ? '' : Search"
            placeholder="请输入用户名称 / 用户工号"
          />
        </el-col>
        <el-col :span="6">
          <el-button type="info" plain style="color: #000" @click="queryUser">查询</el-button>
        </el-col>
        <el-col :span="3" :offset="6">
          <el-button
            type="text"
            class="delete"
            v-show="selectedArray.length"
            @click="deleteUser('select')"
            style="fontSize: 14px"
            >删除</el-button
          >
          <span v-if="selectedArray.length" class="divide">|</span>
          <span class="selectAll">全选</span>
          <el-checkbox
            v-model="checkAll"
            @change="handleCheckAllChange"
            style="vertical-align: middle"
          ></el-checkbox>
        </el-col>
      </el-row>
    </div>

    <!-- 列表区域 -->
    <div class="user-list">
      <div v-for="item in userList" :key="item.id">
        <div class="item">
          <el-checkbox
            v-model="item.isCheck"
            @change="handleCheckItemChange"
            
          ></el-checkbox>
          <div class="user-name">
            <el-avatar
              class="avatar"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            ></el-avatar>
            <el-tooltip placement="top" :show-after="300">
              <template #content> {{ item.username }} </template>
              <span @click="goToEdit(item.id)">{{ item.username }}</span>
            </el-tooltip>
          </div>
          <div class="user-number">
            <div class="item-title">工号</div>
            <div>{{ item.account }}</div>
          </div>
          <div class="operation">
            <el-button type="text" @click="goToEdit(item.id)">查看</el-button>
            <span class="divide">|</span>
            <el-button
              type="text"
              class="delete"
              @click="deleteUser('list', item.id)"
              >删除</el-button
            >
          </div>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <el-pagination
      v-model:page="pageProps.pageIndex"
      :page-size="pageProps.pageSize"
      layout="total, prev, pager, next, sizes, jumper"
      :total="pageProps.total"
      @current-change="changePageSize('pageIndex', $event)"
      @size-change="changePageSize('pageSize', $event)"
      class="pagination"
    >
    </el-pagination>

    <!-- 创建用户弹窗 -->
    <create-user ref="dialog" />
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { Avatar } from "@element-plus/icons-vue";
import createUser from "./components/create-user.vue";
import { getUserList } from "@/api/user-manage-api";
import PageTitle from '@/components/page-title/Index.vue';
import { Search } from '@element-plus/icons-vue'


interface UserItem {
  id: number;
  isCheck?: boolean;
  username: string;
  account: string;
  [props: string]: any;
}

interface GetUers {
  list: [];
  page: number
  pageCount: number
  perPage: number
  [props: string]: any;
}

export default defineComponent({
  components: { Avatar, createUser, PageTitle, Search },
  setup() {
    const router = useRouter();
    let userList = ref<UserItem[]>([]);
    let pageProps = ref({
      pageIndex: 1,
      pageSize: 10,
      total: 0,
    });

    // --------------------------------生命周期--------------------------------
    onMounted(() => {
      getUserListData();
    });

    // --------------------------------交互--------------------------------
    const getUserListData = () => {
      let params = JSON.parse(JSON.stringify(pageProps.value));
      params.searchText = searchUser.value;
      getUserList(params).request().then(res => {
        let data = res as GetUers
        userList.value = data.list
        userList.value.forEach(item => {
          item.isCheck = false
        })
        pageProps.value.pageIndex = data.page
        pageProps.value.pageSize = data.perPage
        pageProps.value.total = data.count      
      }).catch(err => {})
    };

    // 切换页码、页数
    const changePageSize = (type, e) => {
      pageProps.value[type] = e;
      checkAll.value = false
      selectedArray.value.length = 0
      getUserListData();
    };

    // 搜索区域数据
    const searchUser = ref();
    const queryUser = () => {
      pageProps.value.pageIndex = 1
      pageProps.value.pageSize = 10
      getUserListData();
    };
    const clearValue = () => {
      getUserListData();
    };

    // 全选功能
    const checkAll = ref(false);
    const selectedArray = ref<UserItem[]>([]);
    const handleCheckAllChange = (value) => {
      value === true
        ? (userList.value.forEach((item) => {
            item.isCheck = true;
          }),
          (selectedArray.value = userList.value))
        : (userList.value.forEach((item) => {
            item.isCheck = false;
          }),
          (selectedArray.value = []));
    };
    const handleCheckItemChange = () => {
      selectedArray.value = userList.value.filter((val) => {
        return val.isCheck;
      });
      checkAll.value =
        selectedArray.value.length === userList.value.length ? true : false;
    };

    // 创建用户功能
    const dialog = ref();
    const openCreateDialog = () => {
      dialog.value.showDialog();
    };

    // 跳转详情
    const goToEdit = (userId) => {
      router.push({
        path: "/user/see-user",
        query: { id: userId },
      });
    };

    // 删除
    const deleteUser = (type, id) => {
      if (type === "select") {
        console.log(selectedArray.value);
      }
    };

    return {
      userList,
      pageProps,
      searchUser,
      checkAll,
      selectedArray,
      dialog,
      Search,

      // 方法
      changePageSize,
      queryUser,
      clearValue,
      handleCheckAllChange,
      handleCheckItemChange,
      openCreateDialog,
      goToEdit,
      deleteUser,
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
:deep(.el-col-3){
  text-align: right;
}
.selectAll {
  font-size: 14px;
  color: rgb(161, 171, 200);
  margin: 0 10px 0 0;
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
    :deep(.el-checkbox){
      margin-top: 8px;
    }
    .user-name {
      width: 25%;
      height: 45px;
      margin-left: 20px;
      line-height: 45px;
      .avatar {
        margin: 0 10px 0 0;
        vertical-align: middle;
      }
      span {
        &:hover {
          cursor: pointer;
          color: #409eff;
          display: inline-block;
        }
      }
    }
    .operation {
      line-height: 48px;
      position: absolute;
      right: 30px;
    }
  }
}
.divide {
  margin: 0 10px;
  color: #eee;
}
.pagination {
  margin-top: 10px;
  text-align: center;
}
.item-title {
  font-size: 12px;
  color: #666;
}
.delete {
  color: red;
}
</style>
