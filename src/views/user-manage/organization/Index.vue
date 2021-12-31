<template>
  <div>
    <el-card>
      <div class="org">
        <!-- 左侧区域 -->
        <div class="left-box">
          <el-input placeholder="输入部门搜索" />
          <div class="tree">
            <el-tree
              :data="treeData"
              :props="defaultProps"
              accordion
              node-key="id"
              :default-expanded-keys="[expandNode.id]"
              @node-click="handleNodeClick"
            />
          </div>
        </div>

        <!-- 右侧区域 -->
        <div class="right-box">
          <!-- 标题 -->
          <div class="treeNode">{{ treeNode }}({{ total }}人)</div>
          <!-- 表格 -->
          <el-table ref="formRef" :data="tableData" height="68vh">
            <el-table-column type="selection" width="55" />
            <el-table-column property="username" label="姓名" />
            <el-table-column property="account" label="工号" />
          </el-table>
          <!-- 分页 -->
          <el-pagination
            v-model:currentPage="currentPage"
            :page-size="page"
            layout="total, prev, pager, next, sizes, jumper"
            :total="total"
            @current-change="changePageSize('currentPage', $event)"
            @size-change="changePageSize('page', $event)"
            class="pagination"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";

interface ExpandNode {
  id: number;
  label: string;
}
interface TableData {
  username: string;
  account: string;
  [propname: string]: any;
}

interface TreeData {
  id: number;
  label: string;
  [propname: string]: any;
}

export default defineComponent({
  setup() {
    // -------------------树形数据-------------------
    let treeData = reactive<TreeData[]>([
      {
        id: 1,
        label: "Level one 1",
        children: [
          {
            label: "Level two 1-1",
            children: [
              {
                label: "Level three 1-1-1-1-1-1-1-1-1-1-1-1-1",
              },
              {
                label: "Level three 1-1-1",
              },
              {
                label: "Level three 1-1-1",
              },
              {
                label: "Level three 1-1-1",
              },
              {
                label: "Level three 1-1-1",
              },
              {
                label: "Level three 1-1-1",
              },
              {
                label: "Level three 1-1-1",
              },
              {
                label: "Level three 1-1-1",
              },
              {
                label: "Level three 1-1-1",
              },
              {
                label: "Level three 1-1-1",
              },
              {
                label: "Level three 1-1-1",
              },
              {
                label: "Level three 1-1-1",
              },
              {
                label: "Level three 1-1-1",
              },
              {
                label: "Level three 1-1-1",
              },
              {
                label: "Level three 1-1-1",
              },
              {
                label: "Level three 1-1-1",
              },
              {
                label: "Level three 1-1-1",
              },
              {
                label: "Level three 1-1-1",
              },
              {
                label: "Level three 1-1-1",
              },
              {
                label: "Level three 1-1-1",
              },
              {
                label: "Level three 1-1-1",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        label: "Level one 2",
        children: [
          {
            label: "Level two 2-1",
            children: [
              {
                label: "Level three 2-1-1",
              },
            ],
          },
          {
            label: "Level two 2-2",
            children: [
              {
                label: "Level three 2-2-1",
              },
            ],
          },
        ],
      },
      {
        id: 3,
        label: "Level one 3",
        children: [
          {
            label: "Level two 3-1",
            children: [
              {
                label: "Level three 3-1-1",
              },
            ],
          },
          {
            label: "Level two 3-2",
            children: [
              {
                label: "Level three 3-2-1",
              },
            ],
          },
        ],
      },
    ]);
    const defaultProps = reactive({
      children: "children",
      label: "label",
    });
    let expandNode = reactive({}) as ExpandNode; //获取tree默认展开节点
    const treeNode = ref(""); //获取选中的tree节点，主要渲染table上的title
    const handleNodeClick = (data) => {
      treeNode.value = data.label;
    };
    // 获取默认展开节点的数据
    const setExpandNode = () => {
      treeData.find((value, index) => {
        if (index === 0) {
          expandNode.id = value.id;
          expandNode.label = value.label;
          treeNode.value = value.label;
        }
      });
    };
    setExpandNode();

    // 表格数据
    let tableData = reactive<TableData[]>([
      {
        username: "林聪",
        account: "FD-39365",
      },
      {
        username: "林聪",
        account: "FD-39365",
      },
      {
        username: "林聪",
        account: "FD-39365",
      },
      {
        username: "林聪",
        account: "FD-39365",
      },
      {
        username: "林聪",
        account: "FD-39365",
      },
      {
        username: "林聪",
        account: "FD-39365",
      },
      {
        username: "林聪",
        account: "FD-39365",
      },
      {
        username: "林聪",
        account: "FD-39365",
      },
      {
        username: "林聪",
        account: "FD-39365",
      },
    ]);
    const pageProps = reactive({
      currentPage: 1,
      page: 10,
      total: 100,
    });
    const changePageSize = (type, e) => {
      // console.log(type, e);
      pageProps[type] = e;
    };

    return {
      treeData,
      treeNode,
      expandNode,
      defaultProps,
      tableData,
      ...toRefs(pageProps),

      // 方法
      handleNodeClick,
      changePageSize,
    };
  },
});
</script>

<style lang="scss" scoped>
.org {
  display: flex;
  .left-box {
    width: 260px;
    height: 80vh;
    padding-right: 10px;
    border-right: 1px solid #eee;
    box-sizing: border-box;
    .tree {
      width: 240px;
      height: 70vh;
      overflow: auto;
      margin-top: 10px;
      // 解决tree水平滚动
      :deep(.el-tree-node.is-expanded > .el-tree-node__children) {
        display: inline;
      }
    }
  }
  .right-box {
    width: 790px;
    height: 80vh;
    margin-left: 10px;
    box-sizing: border-box;
    .treeNode {
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 20px;
      color: #00a1e9;
      font-weight: bold;
    }
    .pagination {
      margin-top: 10px;
      text-align: center;
    }
  }
}
</style>