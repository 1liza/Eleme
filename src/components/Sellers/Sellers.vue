<template>
    <div class="seller" ref="seller">
      <div class="seller-wrapper">
        <div class="seller-title">
          <div class="title-name">
            <div class="title">{{seller.name}}</div>
            <star :size="36" :score="seller.score"></star>
            <span class="num">({{seller.ratingCount}})</span>
            <span class="sell">月售{{seller.sellCount}}单</span>
            <div class="favi" @click="toggleFavorite">
              <span class="iconfont heart" :class="{'active':favorite}">&#xe657;</span>
              <span class="text">{{favoriteText}}</span>
            </div>
          </div>
          <div class="title-price">
              <span class="left block">
                <div class="text">起送价</div>
                <div class="num">{{seller.minPrice}}元</div>
              </span>
              <span class="middle block">
                <div class="text">商家配送</div>
                <div class="num">{{seller.deliveryPrice}}元</div>
              </span>
              <span class="right block">
                <div class="text">平均配送时间</div>
                <div class="num">{{seller.deliveryTime}}分钟</div>
              </span>
          </div>
        </div>
        <split></split>
        <div class="seller-activity">
          <div class="title">公告与活动</div>
          <div class="text">{{seller.bulletin}}</div>
          <div class="acti-wrapper">
            <ul>
              <li class="acti-item" v-for="(support, index) in seller.supports" :key="index">
                <span class="icon" :class="classMap[support.type]"></span>
                <span class="text">{{support.description}}</span>
              </li>
            </ul>
          </div>
        </div>
        <split></split>
        <div class="seller-view">
          <div class="title">商家实景</div>
          <div class="pic-wrapper" ref="picWrapper">
            <ul class="pic-list" ref="picList">
              <li class="pic-item" v-for="(pic,index) in seller.pics" :key="index">
                  <img :src="pic" width="120" height="90">
              </li>
            </ul>
          </div>
        </div>
        <split></split>
        <div class="seller-info">
          <div class="title">商家信息</div>
          <div class="msg-wrapper">
            <ul class="msg">
              <li class="msg-item" v-for="(info, index) in seller.infos" :key="index">{{info}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import split from '../Split/split'
import star from '../../components/Star/Star'
import BScroll from 'better-scroll'
import { loadFromLocal, saveToLocal } from '../../common/js/store.js'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    split,
    star
  },
  data () {
    return {
      favorite: (() => {
        return loadFromLocal(this.seller.id, 'favorite', false)
      })()
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  mounted () {
    this.$nextTick(() => {
      this._initScroll()
      this._initPics()
    })
  },
  watch: {
    'seller' () {
      this.$nextTick(() => {
        this._initScroll()
        this._initPics()
      })
    }
  },
  computed: {
    favoriteText () {
      return this.favorite ? '已收藏' : '收藏'
    }
  },
  methods: {
    _initScroll () {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    },
    _initPics () {
      if (this.seller.pics) {
        const picWidth = 120
        const margin = 6
        const width = (picWidth + margin) * this.seller.pics.length - margin
        this.$refs.picList.style.width = width + 'px'
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            })
          } else {
            this.picScroll.refresh()
          }
        })
      }
    },
    toggleFavorite (event) {
      if (event._constructed) {
        this.favorite = !this.favorite
        saveToLocal(this.seller.id, 'favorite', this.favorite)
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'

.seller
  position: absolute
  top: 174px
  bottom:0
  left: 0
  width: 100%
  overflow :hidden
  .seller-wrapper
    .seller-title
      padding: 18px
      color: rgb(7,17,27)
      .title-name
        position: relative
        padding: 0 18px 18px 18px
        border-bottom: 1px solid rgba(7,17,27,0.1)
        .title
          font-size: 14px
          line-height : 14px
        .star
          display: inline-block
          padding: 8px 8px 0 0
        .num
          font-size: 10px
          line-height: 18px
          color: rgb(77,85,93)
          padding-right: 12px
        .sell
          font-size: 10px
          line-height: 18px
          color: rgb(77,85,93)
        .favi
          position: absolute
          width: 50px
          top: 0
          right:0
          text-align: center
          .heart
            display: block
            font-size: 24px
            line-height : 24px
            color:pink
            &.active
              color: rgb(240,20,20)
          .text
            font-size 10px
            padding-top: 4px
      .title-price
        display : flex
        padding-top: 18px
        .block
          flex: 1
          text-align : center
          border-right: 1px solid rgba(7,17,27,0.1)
          &:last-child
            border:none
          .text
            color: rgb(147,153,159)
            padding-bottom: 4px
            font-size: 10px
            line-height: 10px
          .num
            font-size: 10px
            font-weight: 200
            line-height : 24px
    .seller-activity
      padding: 18px
      .title
        font-size: 14px
        line-height : 14px
        padding-bottom: 8px
      .text
        padding: 0 12px
        font-size: 12px
        line-height: 24px
        font-weight : 200
        color: rgb(240,20,20)
      .acti-wrapper
        padding: 16px 18px
        .acti-item
          .icon
            display: inline-block
            width: 16px
            height: 16px
            margin-right: 6px
            background-size: 16px 16px
            background-repeat: no-repeat
            &.decrease
              bg-img('decrease_4')
            &.discount
              bg-img('discount_4')
            &.guarantee
              bg-img('guarantee_4')
            &.invoice
              bg-img('invoice_4')
            &.special
              bg-img('special_4')
          .text
            color: rgb(7,17,27)
    .seller-view
      padding: 18px
      .title
        font-size: 14px
        line-height : 14px
        padding-bottom: 12px
      .pic-wrapper
        width: 100%
        overflow: hidden
        white-space: nowrap
        .pic-item
          display: inline-block
          width: 120px
          height: 90px
          margin-right: 6px
    .seller-info
      padding: 18px
      .title
        font-size: 14px
        line-height : 14px
        padding-bottom: 12px
        border-bottom: 1px solid rgba(7,17,27,0.1)
      .msg-wrapper
        .msg
          &:last-child
            border: none
          .msg-item
            padding: 16px 12px
            border-bottom: 1px solid rgba(7,17,27,0.1)
            font-size: 12px
            font-weight : 200
            line-height : 16px
            &:last-child
              border:none
</style>
