<template>
<div>
  <head-top></head-top>
  <el-row style="margin-top: 20px;">
    <el-col :span="12" :offset="4">
      <el-form :model="formData" :rules="rules" ref="formData" label-width="110px">
        <el-form-item label="用户邮箱" prop="userEmail">
          <el-input
            v-model="formData.userEmail"
            clearable></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="userPassword">
          <el-input
            type="password"
            v-model="formData.userPassword"
            clearable></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="userNickname">
          <el-input
            v-model="formData.userNickname"
            clearable></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="userGender">
          <el-radio-group v-model="formData.userGender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" prop="userAge">
          <el-input
            type="age"
            v-model.number="formData.userAge"
            clearable></el-input>
        </el-form-item>
        <el-form-item label="用户地址" prop="userAddress">
          <el-input
            type="textarea"
            v-model="formData.userAddress"></el-input>
        </el-form-item>
        <el-form-item label="用户个性签名" prop="userDesc">
          <el-input
            type="textarea"
            v-model="formData.userDesc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" @click="submitForm('formData')">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</div>
</template>

<script>
import HeadTop from 'components/HeadTop'
import { regEmail } from 'common/js/util'
export default {
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
            callback(new Error('邮箱已注册'))
          }
        } catch (e) {
          callback()
        }
      }
    }
    return {
      loading: false,
      formData: {
        userEmail: 'xxxx@qq.com',
        userPassword: '123456',
        userNickname: '测试新增',
        userAddress: '未知',
        userGender: '男',
        userAge: 21,
        userDesc: '这家伙太懒了，还没设置个性签名。'
      },
      rules: {
        userEmail: [
          { required: true, validator: validateEmailIsExisted, trigger: 'blur' }
        ],
        userPassword: [
          { required: true, message: '请输入用户登录密码', trigger: 'blur' },
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
  methods: {
    submitForm (formData) {
      this.$refs[formData].validate(async (valid) => {
        if (valid) {
          this.loading = true
          let r = await this.$axios.post('/api/admin/addUser', this.formData)
          if (r.status === 200) {
            this.$message({
              type: 'success',
              message: `新增用户${r.data.data.newUser.userId}成功!`
            })
          } else {
            this.$message.error('网络错误！')
          }
          this.loading = false
        } else {
          return false
        }
      })
    }
  },
  components: {
    HeadTop
  }
}
</script>

<style lang="stylus" scoped>

</style>
