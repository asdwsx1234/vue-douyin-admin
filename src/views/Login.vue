<template>
  <el-container>
    <el-main class="">
      <el-card>
        <div slot="header">
          <span>登录</span>
        </div>
        <el-input v-model="username" placeholder="请输入内容"></el-input>
        <el-input v-model="password" placeholder="请输入内容"></el-input>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  }
}
</script>

<style scoped lang='stylus'>

</style>
