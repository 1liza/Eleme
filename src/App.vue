<template>
  <div id="app">
    <v-header :seller=seller></v-header>
    <div class="navigator border-1px">
      <div class="nav goods">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="nav rattings">
        <router-link to="/rattings">评论</router-link>
      </div>
      <div class="nav sellers">
        <router-link to="/sellers">商家</router-link>
      </div>
    </div>
    <!-- <keep-alive>
      <router-view></router-view>
    </keep-alive> -->
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import header from './components/Header/Header'
import data from '../data.json'

export default {
  data () {
    return {
      seller: data.seller
    }
  },
  components: {
    'v-header': header
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/iconfont.css"
  @import "./common/stylus/mixin.styl"
  .navigator
    display: flex
    border-1px(rgba(7,17,27,0.1))
    z-index: 20
    width: 100%
    height: 40px
    background: #fff
    .nav
      line-height: 40px
      text-align: center
      flex: 1
      & > a
        display: block // 点击文字边缘也可以换页
        font-size: 14px
        color:rgb(77,85,93)
        &.router-link-active
          color: rgb(240,20,20)
</style>
