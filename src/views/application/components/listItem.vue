
<template>
  <div class="listItem">
    <el-card>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="info">
            <el-icon style="width:36px;height:36px">
              <List style="width:100%;height:100%;color:#396aff" />
            </el-icon>
            <span class="title" @click="goToDetail">{{ item.name }}</span>
            <span class="tips">自建应用</span>
          </div>
        </el-col>
        <el-col :span="14" class="appid_wrap">
          <span class="appid">APP ID：</span>
          <span class="appidText">{{ item.appId }}</span>
          <el-icon style="margin:0 10px" @click="copyHandle(item.appId)">
            <document-copy />
          </el-icon>
        </el-col>
        <el-col :span="2">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">...</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="config">配置</el-dropdown-item>
                <el-dropdown-item command="delete">删除应用</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ElMessage } from "element-plus";
import useClipboard from 'vue-clipboard3'
import { DocumentCopy, List } from "@element-plus/icons-vue";
const router = useRouter()

interface Item {
  id: number,
  name: string,
  appId: string
}
// 采用ts专有声明，无默认值
const props = defineProps<{
  item: Item
}>()
/*ts专有*/
const emit = defineEmits<{
  (e: 'deleteClick', id:string|number): void
}>()

function handleCommand(type) {
  if (type == 'config') {
    goToDetail()
  } else {
    emit('deleteClick',props.item.id)
  }
}

async function copyHandle(Msg) {
  const { toClipboard } = useClipboard()
  try {
    //复制
    await toClipboard(Msg)
    ElMessage({
      message: '复制成功',
      type: 'success',
      duration: 1000
    })
  } catch (e) {
    //复制失败
    console.error(e)
  }
}

function goToDetail() {
  router.push({
    name: 'applicationItem',
    query: { ...props.item }
  })
}
</script>
<style lang='scss' scoped>
.listItem {
  margin: 10px 0;
  cursor: pointer;
  .info {
    display: flex;
    align-items: center;
    .title {
      font-size: 16px;
      font-weight: 500;
      color: #293350;
      margin: 0 16px 0 14px;
      max-width: 300px;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &:hover {
        color: #396aff;
      }
    }
    .tips {
      background-color: #ebf0ff;
      color: #396aff;
      font-size: 10px;
      padding: 1px 6px;
      border-radius: 4px;
    }
  }
  .appid_wrap {
    display: flex;
    align-items: center;
    .appid {
      font-size: 12px;
      color: #a1abc8;
    }
    .appidText {
      font-weight: 500;
      font-size: 14px;
    }
  }

  .el-dropdown-link {
    cursor: pointer;
  }
}
</style>