<template>
  <div>
    <el-card>
      <div class="org">
        <!-- 左侧区域 -->
        <div class="left-box">
          <el-input v-model="searchData" @change ="entClick" :suffix-icon="searchData ? '' : Search" clearable placeholder="输入部门搜索" />
          <div class="tree">
            <el-tree
              :data="treeData"
              :props="defaultProps"
              accordion
              node-key="id"
              :default-expanded-keys="expandNode.id ? [expandNode.id] : []"
              @node-click="handleNodeClick"
            />
          </div>
        </div>

        <!-- 右侧区域 -->
        <div class="right-box">
          <!-- 标题 -->
          <div class="treeNode">{{ treeNode.treeName }}({{ pageProps.total }}人)</div>
          <!-- 表格 -->
          <el-table ref="formRef" :data="tableData" height="68vh">
            <el-table-column type="selection" width="55" />
            <el-table-column property="username" label="姓名" />
            <el-table-column property="account" label="工号" />
          </el-table>
          <!-- 分页 -->
          <el-pagination
            v-model:page="pageProps.page"
            :page-size="pageProps.perPage"
            layout="total, prev, pager, next, sizes, jumper"
            :total="pageProps.total"
            @current-change="changePageSize('page', $event)"
            @size-change="changePageSize('perPage', $event)"
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
import { deptTreeData, deptUserList, deptSearch } from "@/api/user-manage-api";
import { Search } from '@element-plus/icons-vue'

interface ExpandNode {
  id: number;
  name: string;
}
interface TableData {
  username: string;
  account: string;
  [propname: string]: any;
}

interface TreeData {
  id: number;
  name: string;
  [propname: string]: any;
}

export default defineComponent({
  components:{ Search },
  setup() {
    // --------------------------------生命周期--------------------------------
    onMounted(() => {
      getTreeData()
    })

    // --------------------------------请求--------------------------------
    const getTreeData = async() => {
      try{
        const res = await deptTreeData().request()
        treeData.value = res
        setExpandNode();
      } catch(err) {}
    }

    const getTableData = async(treeId) => {
      try{
        let params = {
          id: treeId, 
          sort: 'sort', 
          pageIndex: pageProps.value.page,
          pageSize: pageProps.value.perPage
        }
        const res = await deptUserList(params).request()
        tableData.value = res.list
        pageProps.value.page = res.page
        pageProps.value.perPage = res.perPage
        pageProps.value.total = res.count  
      } catch(err) {}
    }

    const searchDept = async(value) => {
      try{
        const res = await deptSearch({name: value}).request()
        treeData.value = res
        setExpandNode()
      } catch(err) {}
    }

    // --------------------------------搜索区域--------------------------------
    const searchData = ref()
    const entClick = (value) => {
      value ? searchDept(value) : getTreeData()
    }

    // --------------------------------树形数据--------------------------------
    let treeData = ref<TreeData[]>([]);
    const defaultProps = reactive({
      children: "children",
      label: "name",
    });

    let expandNode = reactive({}) as ExpandNode; //获取tree默认展开节点
    let treeNode = ref({treeName: '', id: 0}); //获取选中的tree节点，主要渲染table上的title
    // 树节点改变
    const handleNodeClick = (data) => {
      treeNode.value.treeName = data.name;
      treeNode.value.id = data.id
      getTableData(data.id)
    };
    // 获取默认展开节点的数据
    const setExpandNode = () => {
      treeData.value.find((value, index) => {
        if (index === 0) {
          expandNode.id = value.id;
          expandNode.name = value.name;
          treeNode.value.treeName = value.name;
          treeNode.value.id = value.id
          getTableData(value.id)
        }
      });
    };

    // --------------------------------表格数据--------------------------------
    let tableData = ref<TableData[]>([]);
    const pageProps = ref({
      page: 1,
      perPage: 10,
      total: 0,
    });
    const changePageSize = (type, e) => {
      pageProps.value[type] = e;
      getTableData(treeNode.value.id)
    };

    return {
      searchData,
      treeData,
      treeNode,
      expandNode,
      defaultProps,
      tableData,
      pageProps,
      Search,

      // 方法
      handleNodeClick,
      entClick,
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