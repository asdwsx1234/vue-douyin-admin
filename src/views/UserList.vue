<template>
<div>
  <head-top></head-top>
  <message-box
    ref="msgBox"
    @confirm="confirm"
    @cancel="cancel">
    <el-form class="el-form" :model="tempObj" :rules="rules" ref="tempObj" label-width="110px">
      <el-form-item class="el-form-item1" label="用户邮箱" prop="userEmail">
        <el-input
          readonly
          v-model="tempObj.userEmail"
          clearable></el-input>
      </el-form-item>
      <el-form-item class="el-form-item1" label="用户密码" prop="userPassword">
        <el-input
          placeholder="数据库的密码经过加密。不填则不修改"
          v-model="tempObj.userPassword"
          clearable></el-input>
      </el-form-item>
      <el-form-item class="el-form-item1" label="用户昵称" prop="userNickname">
        <el-input
          v-model="tempObj.userNickname"
          clearable></el-input>
      </el-form-item>
      <el-form-item class="el-form-item1" label="性别" prop="userGender">
        <el-radio-group v-model="tempObj.userGender">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="el-form-item1" label="年龄" prop="userAge">
        <el-input
          type="age"
          v-model.number="tempObj.userAge"
          clearable></el-input>
      </el-form-item>
      <el-form-item class="el-form-item1" label="用户地址" prop="userAddress">
        <el-input
          type="textarea"
          v-model="tempObj.userAddress"></el-input>
      </el-form-item>
      <el-form-item class="el-form-item1" label="用户个性签名" prop="userDesc">
        <el-input
          type="textarea"
          v-model="tempObj.userDesc"></el-input>
      </el-form-item>
    </el-form>
  </message-box>
  <div class="table_container">
    <el-table
      :data="tableData.filter(data => !search || data.userNickname.toLowerCase().includes(search.toLowerCase()) || data.userEmail.toLowerCase().includes(search.toLowerCase()))"
      highlight-current-row
      style="width: 100%">
      <el-table-column
        property="userId"
        label="用户Id"
        width="100">
      </el-table-column>
      <el-table-column
        property="createdAt"
        label="注册日期"
        width="220">
      </el-table-column>
      <el-table-column
        property="userEmail"
        label="用户邮箱"
        width="220">
      </el-table-column>
      <el-table-column
        property="userNickname"
        label="用户昵称"
        width="220">
      </el-table-column>
      <el-table-column
        property="userAddress"
        label="用户地址">
      </el-table-column>
      <el-table-column
        align="right">
        <!-- eslint-disable-next-line -->
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索(邮箱或昵称)"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">详情</el-button>
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
        :total="statistic.sum.userSum">
      </el-pagination>
    </div>
  </div>
</div>
</template>

<script>
import HeadTop from 'components/HeadTop'
import MessageBox from 'components/MessageBox'
import { mapGetters } from 'vuex'
export default {
  activated () {
    this.fetchUserList()
  },
  data () {
    return {
      tableData: [],
      search: '',
      currentRow: null,
      offset: 0,
      limit: 20,
      currentPage: 1,
      tempObj: {},
      rules: {
        userEmail: [
          { required: true, message: '请输入用户登录邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
        ],
        userPassword: [
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        userNickname: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' }
        ],
        userGender: [
          { required: true }
        ],
        userAge: [
          { required: true, message: '请输入用户年龄', trigger: 'blur' }
        ],
        userAddress: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        userDesc: [
          { required: true, message: '请输入用户个性签名', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'statistic'
    ])
  },
  methods: {
    fetchUserList () {
      this.$axios.get(`/api/admin/getAllUser/${this.currentPage}`).then(r => {
        let data = r.data.data
        data.forEach((item, index, arr) => {
          arr[index].createdAt = new Date(arr[index].createdAt).toLocaleString()
        })
        this.tableData = data
      }).catch(() => {
        this.$message.error('网络错误！')
      })
    },
    handleEdit (index, row) {
      this.tempObj = Object.assign({}, row, { userPassword: '' })
      console.log(this.tempObj)
      this.$refs.msgBox.show()
    },
    async confirm () {
      this.$refs.msgBox.loading = true
      let r = await this.$axios.post('/api/admin/modifyUserInfo', this.tempObj)
      if (r.status === 200) {
        this.$refs.msgBox.loading = false
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.fetchUserList()
      } else {
        this.$refs.msgBox.loading = false
        this.$message.error('网络错误！')
      }
      this.$refs.msgBox.hide()
    },
    cancel () {
      this.$refs.msgBox.loading = false
      this.$refs.msgBox.hide()
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该用户及其相关数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          let r = await this.$axios.post('/api/admin/delUser', {
            userId: row.userId
          })
          if (r.status === 200) {
            this.fetchUserList()
            this.$message({
              type: 'success',
              message: `删除用户${row.userId}成功!`
            })
          }
        } catch (e) {
          this.$message.error('暂时不支持删除用户。')
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
    HeadTop,
    MessageBox
  }
}
</script>

<style scoped lang='stylus'>
.table_container
  padding 20px
</style>
