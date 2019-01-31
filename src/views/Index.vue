<template>
<div class="manage_page fillcontain">
  <el-row style="height: 100%;">
    <el-col :span="4"  style="min-height: 100%; background-color: #324057;">
      <el-menu
      :default-active="defaultActive"
      style="min-height: 100%;"
      text-color="#bfcbd9"
      background-color="#324057"
      router>
        <el-menu-item index="index"><i class="el-icon-menu"></i>首页</el-menu-item>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-document"></i>数据管理</template>
          <el-menu-item index="userList">用户列表</el-menu-item>
          <el-menu-item index="videoList">视频列表</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-plus"></i>添加数据</template>
          <el-menu-item index="addUser">添加用户</el-menu-item>
          <el-menu-item index="addVideo">添加视频</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
    <el-col :span="20" style="height: 100%;overflow: auto;">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  activated () {
  },
  data () {
    return {
    }
  },
  computed: {
    defaultActive () {
      return this.$route.path.replace('/', '')
    }
  }
}
</script>

<style scoped lang='stylus'>
.fillcontain
  width 100%
  height 100%
</style>
