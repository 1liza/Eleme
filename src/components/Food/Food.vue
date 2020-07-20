<template>
  <transition name="move">
    <div class="good" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="title">
          <div class=title-pic>
            <img :src="food.image">
            <span class="iconfont goback" @click="returnpage">&#xe659;</span>
          </div>
          <div class="title-content bar">
            <div class="title-name">{{food.name}}</div>
            <div class="title-sell">
              <span class="sell-num">月售{{food.sellCount}}份</span>
              <span class="sell-ratting">好评率{{food.rating}}%</span>
            </div>
            <span class="buy-price">￥{{food.price}}</span>
            <span class="buy-add" @click.stop.prevent="firstAdd" v-show="!food.count || food.count==0">加入购物车</span>
            <div class="cartcontrol-wrapper" v-show="food.count">
              <cartcontrol @add="addFood" :food="food"></cartcontrol>
            </div>
          </div>
        </div>
        <split></split>
        <div class="introduce">
          <div class=intro-title>商品介绍</div>
          <div class="intro-content">{{food.info}}</div>
        </div>
        <split></split>
        <div class="comment">
          <div class="comment-head">商品评价</div>
          <rattingselect @select="selectRatting" @toggle="toggleContent" :onlyContent="onlyContent" :selectType="selectType" :ratings="food.ratings"></rattingselect>
          <div class="ratting-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType, rating.text)" v-for="(rating, index) in food.ratings" :key="index" class="rating-item">
                <div class="user">
                  <div class="name">{{rating.username}}</div>
                  <img class="avatar" :src="rating.avatar">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <div class="content">
                  <span class="iconfont thumb">{{rating.rateType===1?'&#xe658;':'&#xe76c;'}}</span>
                  <span class="text">{{rating.text}}</span>
                  </div>
              </li>
            </ul>
            <div class="no-ratting" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import cartcontrol from '../Cartcontrol/Cartcontrol'
import rattingselect from '../Rattingselect/Rattingselect'
import split from '../Split/split'
import { formatDate } from '../../common/js/date.js'
import BScroll from 'better-scroll'
import Vue from 'vue'
const ALL = 2

export default {
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true
    }
  },
  components: {
    cartcontrol,
    rattingselect,
    split
  },
  methods: {
    show () {
      this.showFlag = true
      this.onlyContent = true
      this.selectType = ALL
      this.$nextTick(() => {
        if (!this.scroll) {
          // console.log('初始化滑动')
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    returnpage () {
      this.showFlag = false
    },
    addFood (target) {
      this.$emit('add', target)
    },
    firstAdd (event) {
      if (event._constructed) {
        this.$emit('add', event.target)
        Vue.set(this.food, 'count', 1)
      }
    },
    selectRatting (type) {
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    toggleContent () {
      this.onlyContent = !this.onlyContent
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    needShow (type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    }
  },
  filters: {
    formatDate (time) {
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@imoprt '../../common/stylus/mixin.styl'
.good
  z-index: 30
  position: fixed
  top: 0
  left: 0
  bottom: 48px
  width: 100%
  background: #fff
  color: rgb(147,153,159)
  font-size: 0
  transform: translate3d(0,0,0)
  &.move-enter-active, &.move-leave-active
    transition: all 0.2s linear
  &.move-enter, &.move-leave-to
    transform: translate3d(100%,0,0)
  .title
    .title-pic
      position: relative
      // width: 100%
      // height: 0
      // padding-top: 100%
      img
        height: 375px
        width: 100%
        object-fit: cover
        // position: absolute
        // top:0
        // left: 0
        // width: 100%
        // height: 100%
      .goback
        position: fixed
        top: 10px
        left: 10px
        padding: 4px
        font-size: 24px
        background: rgba(255,255,255,0.2)
        border-radius : 50%
    .title-content
      padding: 18px
      position: relative
      // bar(#f3f5f7)
      .title-name
        font-size: 14px
        font-weight: 700
        line-height: 14px
        color: rgb(7,17,27)
      .title-sell
        margin: 8px 0 18px 0
        .sell-num, .sell-ratting
          padding-right: 12px
          font-size: 10px
          line-height: 10px
      .buy-price
        font-size: 14px
        font-weight: 700
        color:rgb(240, 20, 20)
        // float:left
      .buy-add
        position: absolute
        bottom: 18px
        right: 18px
        font-size: 10px
        padding: 6px 12px
        border-radius: 12px
        color: rgb(255,255,255)
        background: rgb(0, 160, 220)
      .cartcontrol-wrapper
        position: absolute
        bottom: 12px
        right: 18px
  .introduce
    padding: 18px
    .intro-title
      font-size: 14px
      line-height: 14px
      font-weight: 500
      color: rgb(7,17,27)
      padding-bottom: 6px
    .intro-content
      padding: 0 8px
      font-size: 12px
      font-weight: 200
      line-height: 20px
  .comment
    color: rgb(7,17,27)
    padding-top: 18px
    .comment-head
      padding-left: 18px
      font-size: 14px
      line-height: 14px
      font-weight: 500
      color: rgb(7,17,27)
    .ratting-wrapper
      padding: 0 18px
      .rating-item
        padding: 16px 0
        box-sizing: border-box
        position: relative
        height: 70px
        border-bottom: 1px solid rgba(7,17,27, 0.1)
        &:last-child
          border: none
        .user
          position: absolute
          top: 16px
          right: 0
          .name
            display: inline-block
            font-size: 10px
            line-height: 12px
            padding-right: 6px
          .avatar
            width: 12px
            height: 12px
            vertical-align: top
        .time
          // position: absolute
          // top:16px
          // left: 0
          font-size: 10px
          line-height: 12px
        .content
          margin-top:6px
          .thumb
            font-size: 12px
            line-height: 16px
            padding-right: 4px
          .text
            font-size: 12px
            line-height: 16px
    .no-ratting
      padding-left: 18px
      font-size: 14px
      line-height: 14px
      font-weight: 500
      color: rgb(7,17,27)
</style>
