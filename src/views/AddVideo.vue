<template>
<div>
  <head-top></head-top>
  <el-row style="margin-top: 20px" type="flex" justify="center">
    <el-col :span="10">
      <video ref="video" @click="playHandler" preload="none" style="width: 100%; height: 100%"></video>
    </el-col>
  </el-row>
  <el-row style="margin-top: 20px;">
    <el-col :span="12" :offset="4">
      <el-form :model="formData" :rules="rules" ref="formData" label-width="110px">
        <el-form-item label="所属用户邮箱" prop="userEmail">
          <el-input
            v-model="formData.userEmail"
            clearable></el-input>
        </el-form-item>
        <el-form-item label="视频url" prop="videoPath">
          <el-input
            v-model="formData.videoPath"
            clearable></el-input>
        </el-form-item>
        <el-form-item label="视频封面url" prop="videoCover">
          <el-input
            v-model="formData.videoCover"
            clearable></el-input>
        </el-form-item>
        <el-form-item label="视频描述" prop="videoDesc">
          <el-input
            type="textarea"
            v-model="formData.videoDesc"></el-input>
        </el-form-item>
        <el-row style="margin-top: 20px" type="flex" justify="space-around">
          <el-button type="primary" @click="previewVideo">预览视频</el-button>
          <el-popover
            placement="top"
            width="400"
            trigger="hover">
            <img :src="formData.videoCover" alt="" width="100%" height="100%">
            <el-button type="primary" slot="reference">预览封面</el-button>
          </el-popover>
          <el-button :loading="loading" type="primary" @click="submitForm('formData')">立即创建</el-button>
        </el-row>
      </el-form>
    </el-col>
  </el-row>
</div>
</template>

<script>
import HeadTop from 'components/HeadTop'
import { regEmail, regVideoUrl, regCoverUrl } from 'common/js/util'
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
      loading: false,
      formData: {
        userEmail: '814930498@qq.com',
        videoPath: 'https://video.pearvideo.com/mp4/adshort/20190130/cont-1512669-13539748_adpkg-ad_hd.mp4',
        videoCover: 'https://image.pearvideo.com/cont/20190130/cont-1512669-11820462.png',
        videoDesc: '视频描述。'
      },
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
  methods: {
    submitForm (formData) {
      this.$refs[formData].validate(async (valid) => {
        if (valid) {
          this.loading = true
          let r = await this.$axios.post('/api/admin/addVideo', this.formData)
          if (r.status === 200) {
            this.$message({
              type: 'success',
              message: `新增视频${r.data.data.videoId}成功!`
            })
          } else {
            this.$message.error('网络错误！')
          }
          this.loading = false
        } else {
          return false
        }
      })
    },
    previewVideo () {
      const v = this.$refs.video
      v.src = this.formData.videoPath
      v.play()
    },
    playHandler () {
      const v = this.$refs.video
      if (!v.src) return
      v.paused ? v.play() : v.pause()
    }
  },
  components: {
    HeadTop
  }
}
</script>

<style lang="stylus" scoped>

</style>
