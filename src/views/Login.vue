<template>
  <el-container>
    <el-main class="main">
      <el-card class="card">
        <div class="header" slot="header">
          <span>低仿抖音后台管理系统</span>
        </div>
        <el-popover
          placement="right"
          width="100"
          trigger="manual"
          content="请输入正确的邮箱。"
          v-model="showUsernameTip">
          <el-input
            class="input"
            slot="reference"
            v-model="username"
            placeholder="请输入账号"
            prefix-icon="el-icon-star-off"
            clearable></el-input>
        </el-popover>
        <el-popover
          placement="right"
          width="100"
          trigger="manual"
          content="密码至少需要6位。"
          v-model="showPasswordTip">
        <el-input
          class="input"
          slot="reference"
          type="password"
          v-model="password"
          placeholder="请输入密码"
          prefix-icon="el-icon-star-on"
          clearable
          @keyup.enter.native="login"
          ></el-input>
        </el-popover>
        <el-button type="primary" class="btn" :disabled="Boolean(disabled)" :loading="loading" plain @click="login">{{btnText}}</el-button>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import { mapActions } from 'vuex'
import { regEmail } from 'common/js/util'
export default {
  data () {
    return {
      username: '814930498@qq.com',
      password: 'asdwsx1234',
      loading: false,
      disabled: false,
      btnText: '登录',
      showUsernameTip: false,
      showPasswordTip: false,
      timer: null
    }
  },
  methods: {
    login () {
      if (!regEmail.test(this.username)) {
        this.showUsernameTip = true
        if (this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.showUsernameTip = false
        }, 1500)
        return
      }
      if (this.password.length < 6) {
        this.showPasswordTip = true
        if (this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.showPasswordTip = false
        }, 1500)
        return
      }
      this.disabled = true
      this.loading = true
      this.btnText = '登录中'
      this.loginByPassword({
        username: this.username,
        password: this.password
      }).then((r) => {
        this.loading = false
        this.btnText = '登录'
        this.disabled = false
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.$router.push('/index')
      }).catch(() => {
        this.loading = false
        this.btnText = '登录'
        this.disabled = false
        this.$message.error('账号或者密码错误！')
      })
    },
    ...mapActions([
      'loginByPassword'
    ])
  }
}
</script>

<style scoped lang='stylus'>
.main
  display flex
  justify-content center
  align-items center
  background-image: linear-gradient(25deg, #5752b5, #60789b, #589c7f, #35c05e)
  .card
    background rgba(255, 255, 255, .4)
    .header
      text-align center
    .btn
      width 100%
    .input
      margin-bottom 10px
</style>
