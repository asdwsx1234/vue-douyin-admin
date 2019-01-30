<template>
<div class="header_container">
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
  </el-breadcrumb>
  <el-dropdown @command="handleCommand">
    <img class="avator">
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="home">首页</el-dropdown-item>
      <el-dropdown-item command="logout">退出</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
    ...mapGetters([
      'loginInfo'
    ])
  },
  methods: {
    handleCommand (c) {
      switch (c) {
        case 'home': this.$router.push('/index'); break
        case 'logout': {
          this.logout({
            userId: 'id'
          }).then(r => {
            this.$message({
              message: '注销成功！',
              type: 'success'
            })
            this.$router.push('/')
          }).catch(() => {
            this.$message.error('注销失败！')
          })
        }
      }
    },
    ...mapActions([
      'logout'
    ])
  }
}
</script>

<style lang="stylus" scoped>
.header_container
  background-color #EFF2F7
  height 60px
  display flex
  justify-content space-between
  align-items center
  padding-left 20px
  .avator
    width 36px
    height 36px
    border-radius 50%
    margin-right 37px
  .el-dropdown-menu__item
    text-align center
</style>
