<template>
<div>
  <head-top></head-top>
  <div class="table_container">
    <message-box
      ref="msgBox"
      @confirm="confirm"
      @cancel="cancel">
      <video ref="video" @click="playHandler" :src="tempObj.videoPath" width="100%" height="100%" style="margin-bottom: 20px"></video>
      <el-form class="el-form" :model="tempObj" :rules="rules" ref="tempObj" label-width="110px">
        <el-form-item class="el-form-item1" label="用户邮箱" prop="userEmail">
          <el-input
            v-model="tempObj.userEmail"
            clearable></el-input>
        </el-form-item>
        <el-form-item class="el-form-item1" label="视频url" prop="videoPath">
          <el-input
            v-model.number="tempObj.videoPath"
            clearable></el-input>
        </el-form-item>
        <el-form-item class="el-form-item1" label="视频封面url" prop="videoCover">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            <el-input
            v-model="tempObj.videoCover"
            clearable></el-input>
            <img :src="tempObj.videoCover" alt="" height="100%" width="100%">
          </template>
        </el-form-item>
        <el-form-item class="el-form-item1" label="视频描述" prop="videoDesc">
          <el-input
            type="textarea"
            v-model="tempObj.videoDesc"></el-input>
        </el-form-item>
      </el-form>
    </message-box>
    <el-table
      :data="tableData.filter(data => !search || data.userEmail.toLowerCase().includes(search.toLowerCase()))"
      highlight-current-row
      style="width: 100%">
      <el-table-column
        property="videoId"
        label="视频Id"
        width="100">
      </el-table-column>
      <el-table-column
        property="createdAt"
        label="发布日期"
        width="220">
      </el-table-column>
      <el-table-column
        property="userEmail"
        label="用户邮箱"
        width="220">
      </el-table-column>
      <el-table-column
        property="videoDesc"
        label="视频描述">
      </el-table-column>
      <el-table-column
        label="视频封面">
        <template slot-scope="scope">
          <img :src="scope.row.videoCover" alt="" height="100%" width="100%">
        </template>
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
        :total="statistic.sum.videoSum">
      </el-pagination>
    </div>
  </div>
</div>
</template>

<script>
import HeadTop from 'components/HeadTop'
import MessageBox from 'components/MessageBox'
import { mapGetters } from 'vuex'
import { regEmail, regVideoUrl, regCoverUrl } from 'common/js/util'
export default {
  activated () {
    this.fetchVideoList()
  },
  data () {
    let validateEmailIsExisted = async (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户登录邮箱'))
      } else if (!regEmail.test(value)) {
        callback(new Error('邮箱格式错误'))
      } else {
        let r
        try {
          r = await this.$axios.get(`/api/common/user/detectEmail/${value}`)
          if (r.status === 200) {
            callback()
          }
        } catch (e) {
          callback(new Error('邮箱未注册'))
        }
      }
    }
    let validateVideoPathURL = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入视频URL'))
      } else if (!regVideoUrl.test(value)) {
        callback(new Error('请输入正确的视频URL'))
      } else {
        callback()
      }
    }
    let validateVideoCoverURL = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入视频封面URL'))
      } else if (!regCoverUrl.test(value)) {
        callback(new Error('请输入正确的视频封面URL'))
      } else {
        callback()
      }
    }
    return {
      tableData: [],
      search: '',
      currentRow: null,
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1,
      tempObj: {},
      rules: {
        userEmail: [
          { required: true, validator: validateEmailIsExisted, trigger: 'blur' }
        ],
        videoPath: [
          { required: true, validator: validateVideoPathURL, trigger: 'blur' }
        ],
        videoCover: [
          { required: true, validator: validateVideoCoverURL, trigger: 'blur' }
        ],
        videoDesc: [
          { required: true, message: '请输入视频描述', trigger: 'blur' }
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
    fetchVideoList () {
      this.$axios.get(`/api/admin/getAllVideo/${this.currentPage}`).then(r => {
        let data = r.data.data
        data.forEach((item, index, arr) => {
          arr[index].createdAt = new Date(arr[index].createdAt).toLocaleString()
        })
        this.tableData = data
      }).catch(() => {
        this.$message.error('网络错误！')
      })
    },
    async confirm () {
      this.$refs.msgBox.loading = true
      let r = await this.$axios.post('/api/admin/modifyVideo', this.tempObj)
      if (r.status === 200) {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.fetchVideoList()
      } else {
        this.$message.error('网络错误！')
      }
      this.$refs.msgBox.loading = false
      this.$refs.msgBox.hide()
    },
    cancel () {
      this.$refs.msgBox.loading = false
      this.$refs.msgBox.hide()
    },
    handleEdit (index, row) {
      this.tempObj = Object.assign({}, row)
      console.log(this.tempObj)
      this.$refs.msgBox.show()
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该视频及其相关数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          let r = await this.$axios.post('/api/admin/delVideo', {
            videoId: row.videoId
          })
          if (r.status === 200) {
            this.fetchUserList()
            this.$message({
              type: 'success',
              message: `删除视频${row.videoId}成功!`
            })
          }
        } catch (e) {
          this.$message.error('暂时不支持删除视频。')
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
    playHandler () {
      const v = this.$refs.video
      if (!v.src) return
      v.paused ? v.play() : v.pause()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.offset = (val - 1) * this.limit
      this.fetchVideoList()
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
