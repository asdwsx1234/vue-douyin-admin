<template>
<div>
  <head-top></head-top>
  <section class="data_section">
    <header class="section_title">数据统计</header>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>当日数据</span>
          </div>
          <div class="text item">新增用户：{{statistic.today.userSum}}</div>
          <div class="text item">新增评论：{{statistic.today.commentSum}}</div>
          <div class="text item">新增视频：{{statistic.today.videoSum}}</div>
          <div class="text item">新增播放：{{statistic.today.watchSum}}</div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>总数据</span>
          </div>
          <div class="text item">用户总数：{{statistic.sum.userSum}}</div>
          <div class="text item">评论总数：{{statistic.sum.commentSum}}</div>
          <div class="text item">视频总数：{{statistic.sum.videoSum}}</div>
          <div class="text item">播放总数：{{statistic.sum.watchSum}}</div>
        </el-card>
      </el-col>
    </el-row>
  </section>
</div>
</template>

<script>
import HeadTop from 'components/HeadTop'
import { mapGetters, mapActions } from 'vuex'
export default {
  activated () {
    this.getNums()
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'statistic'
    ])
  },
  methods: {
    ...mapActions([
      'getNums'
    ])
  },
  components: {
    HeadTop
  }
}
</script>

<style scoped lang='stylus'>
.data_section
  padding 20px
  margin-bottom 40px
  .section_title
    text-align center
    font-size 30px
    margin-bottom 10px
  .box-card
    .item
      margin-bottom 10px
</style>
