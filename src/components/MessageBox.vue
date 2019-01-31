<template>
  <div class="wrap" v-show="showFlag" @click.capture="clickHandler">
    <transition name="pop">
      <div class="messageBoxWrap" v-show="showFlag">
        <div class="box__header">编辑</div>
        <div class="box__content">
          <slot></slot>
        </div>
        <div class="box__btns">
          <el-button @click="cancel">取消</el-button>
          <el-button :loading="loading" @click="confirm" type="primary">保存</el-button>
        </div>
      </div>
    </transition>
    <div class="mask"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showFlag: false,
      loading: false
    }
  },
  methods: {
    show () {
      this.showFlag = true
    },
    hide () {
      this.showFlag = false
    },
    confirm () {
      this.$emit('confirm')
    },
    cancel () {
      this.$emit('cancel')
    },
    clickHandler (e) {
      if (e.target.className.includes('mask')) {
        this.hide()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.pop-enter-active, .pop-leave-active
  transition transform .5s
.pop-enter, .pop-leave-to
  transform scale(0)
.wrap
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  z-index 9997
  display flex
  justify-content center
  align-items center
  .messageBoxWrap
    padding 10px
    text-align center
    position fixed
    z-index 9999
    width 420px
    border 1px solid #ebeef5
    border-radius 4px
    background #fff
    .box__header
      text-align left
      font-size 20px
      padding-bottom 10px
    .box__content
      max-height 600px
      overflow auto
    .box__btns
      padding-top 10px
      text-align right
  .mask
    position fixed
    width 100%
    height 100%
    z-index 9998
    background rgba(0, 0, 0, .5)
</style>
