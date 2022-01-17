<template>
  <div class="user-pool">
    <div>
      <div class="user-pool-title">用户池管理</div>
      <div style="font-size: 20px;">用户池</div>
    </div>

    <el-row style="margin-top: 30px;">
      <el-col :span="6">
        <el-card class="user-pool-add" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          <div class="user-pool-add-content">点击添加用户池</div>
        </el-card>
      </el-col>

      <el-col :span="6" v-for="item in list" :key="item.id">
        <el-card class="user-pool-item" @click="toApplication(item.id)">
          <div class="user-pool-item-logo">
            <img src="@/assets/logo.png" alt="凡岛logo">
          </div>
          <div class="user-pool-item-info">
            <div class="info-title">{{ item.name }}</div>
            <div class="user-icon-box">
              <div class="user-icon-item" v-for="index of  3" :key="index">
                <el-icon class="user-icon"><UserFilled /></el-icon>
              </div>
            </div>
          </div>
          <el-icon class="menu-icon"><Menu /></el-icon>
        </el-card>
      </el-col>
    </el-row>

    <!-- 新增用户池 -->
    <add-modal ref="addModalRef" @getUserPoolList="getUserPoolList"></add-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { Plus, Menu, UserFilled } from '@element-plus/icons-vue'
import AddModal from './add-modal.vue';
import { getUserPoolListApi } from '@/api/user-pool';
interface List {
  id: number;
  name: string;
  totalUserCount: number;
}

export default defineComponent({
  components: {
    Plus,
    Menu,
    UserFilled,
    AddModal
  },
  setup() {
    const router = useRouter();
    // 跳转到应用
    const toApplication = (id: number) => {
      router.push({
        name: 'application',
        query: { id }
      })
    }

    // 新增用户池
    const addModalRef = ref();
    const handleAdd = () => {
      addModalRef.value.showModal()
    }

    // 获取用户池数据
    let list = ref<List[]>([]);
    const getUserPoolList = async () => {
      let res = {} as any
      try {
				res = await getUserPoolListApi().request();
        list.value = res
      } catch (error) {
				console.log(error);
			}
    }

    onMounted(async () => {
      await getUserPoolList();
    });

    return {
      addModalRef,
      list,
      toApplication,
      handleAdd,
      getUserPoolList,
    }
  },
})
</script>

<style lang="scss" scoped>
.user-pool {
  margin-top: 20px;

  :deep(.el-card) {
    border-radius: 8px;
    border: 0px;
  }

  &-title {
    font-size: 28px;
    height: 48px;
    line-height: 48px;
  }

  &-add {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    height: 150px;
    margin: 0 30px 30px 0;
    text-align: center;
    cursor: pointer;

    &-content {
      margin-top: 10px;
      color: #909399;
    }
  }

  &-item {
    height: 150px;
    padding: 10px;
    margin: 0 30px 30px 0;
    box-sizing: border-box;
    cursor: pointer;
    transition: all .3s ease-in-out;
    :deep(.el-card__body) {
      display: flex;
    }

    &-logo {
      img {
        width: 64px;
        height: 64px;
        border-radius: 5px;
      }
    }

    &-info {
      flex: 1;
      margin: 0 10px 0 15px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      .info-title {
        height: 25px;
        margin: 8px 0 12px;
        font-size: 20px;
        font-weight: bold;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .user-icon-box {
        display: flex;
        
        .user-icon-item {
          width: 30px;
          height: 30px;
          margin-right: -5px;
          text-align: center;
          background-color: #f3f3f3;
          border-radius: 50px;
          .user-icon {
            padding: 6px;
            box-sizing: content-box;
            color: #c2c2c2;
          }
        }
      }
    }

    .menu-icon{
      margin-top: 13px;
      box-sizing: content-box;
      font-size: 12px;
      color: #909399;
      border: 1px #909399 solid;
    }
  }

  &-item:hover {
    box-shadow: 0px 6px 16px 0px #e4e4e4;
    transform: translateY(-6px);
  }

  &-add:hover {
    box-shadow: 0px 6px 16px 0px #e4e4e4;
  }
}
</style>