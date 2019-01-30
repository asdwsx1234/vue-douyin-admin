<template>
<div>
  <head-top></head-top>
  <div class="table_container">
    <el-table
      :data="tableData"
      highlight-current-row
      style="width: 100%">
      <el-table-column
        type="index"
        width="100">
      </el-table-column>
      <el-table-column
        property="createdAt"
        label="注册日期"
        width="220">
      </el-table-column>
      <el-table-column
        property="userNickname"
        label="用户姓名"
        width="220">
      </el-table-column>
      <el-table-column
        property="userAddress"
        label="注册地址">
      </el-table-column>
      <el-table-column
        align="right">
        <!-- eslint-disable-next-line -->
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="Pagination" style="text-align: left;margin-top: 10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="20"
        layout="total, prev, pager, next"
        :total="count">
      </el-pagination>
    </div>
  </div>
</div>
</template>

<script>
import HeadTop from 'components/HeadTop'
export default {
  created() {
    this.fetchUserList ()
  },
  data () {
    return {
      tableData: [{
        createdAt: '2016-05-02',
        userNickname: '王小虎',
        userAddress: '上海市普陀区金沙江路 1518 弄'
      }, {
        createdAt: '2016-05-04',
        userNickname: '王小虎',
        userAddress: '上海市普陀区金沙江路 1517 弄'
      }, {
        createdAt: '2016-05-01',
        userNickname: '王小虎',
        userAddress: '上海市普陀区金沙江路 1519 弄'
      }, {
        createdAt: '2016-05-03',
        userNickname: '王小虎',
        userAddress: '上海市普陀区金沙江路 1516 弄'
      }],
      search: '',
      currentRow: null,
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1
    }
  },
  methods: {
    fetchUserList () {
      this.$axios.get(`/api/admin/getAllUser/${this.currentPage}`).then(r => {
        this.tableData = r.data.data
      }).catch(() => {
        this.$message.error('网络错误！')
      })
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.offset = (val - 1) * this.limit
      this.fetchUserList()
    }
  },
  components: {
    HeadTop
  }
}
</script>

<style scoped lang='stylus'>
.table_container
  padding 20px
</style>
