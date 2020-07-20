d<template>
    <div class="ratings" ref="ratings">
      <div class="rating-wrapper">
        <div class="rating-score">
            <div class="score-left">
                <div class="score">3.9</div>
                <div class="title">综合评分</div>
                <div class="text">高于周边商家</div>
            </div>
            <div class="score-right">
              <div class="score-wrapper">
                <span class="text">服务态度</span>
                <star :size="36" :score="seller.serviceScore"></star>
                <span class="num">{{seller.serviceScore}}</span>
              </div>
              <div class="score-wrapper">
                <span class="text">商品评分</span>
                <star :size="36" :score="seller.foodScore"></star>
                <span class="num">{{seller.foodScore}}</span>
              </div>
              <div class="score-wrapper">
                <span class="text">送达时间</span>
                <span class="time num">{{seller.deliveryTime}}分钟</span>
              </div>
            </div>
        </div>
        <split></split>
        <rattingselect @select="selectRatting" @toggle="toggleContent" :onlyContent="onlyContent" :selectType="selectType" :ratings="ratings"></rattingselect>
        <div class="content-wrapper">
          <ul>
            <li class="content-item" v-for="(rating, index) in ratings" v-show="needShow(rating.rateType, rating.text)" :key="index">
              <div class="avatar">
                <img width="28" height="28" :src="rating.avatar" />
              </div>
              <div class="content">
                <div class="user-name">{{rating.username}}</div>
                <star :size="24" :score="rating.score"></star>
                <span class="delivery-time">{{rating.deliveryTime}}分钟送达</span>
                <div class="text">{{rating.text}}</div>
                <span class="iconfont thumb">{{rating.rateType===1?'&#xe658;':'&#xe76c;'}}</span>
                <span class="item" v-for="(item, index) in rating.recommend" :key="index">{{item}}</span>
                <div class="time">{{rating.rateTime | formatDate}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
import rattingselect from '../Rattingselect/Rattingselect'
import split from '../Split/split'
import star from '../Star/Star'
import { formatDate } from '../../common/js/date.js'
import BScroll from 'better-scroll'
const ALL = 2
const ERR_OK = 0
const debug = process.env.NODE_ENV !== 'production'

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      ratings: [],
      onlyContent: true,
      selectType: ALL
    }
  },
  created () {
    const url = debug ? '/api/ratings' : 'http://'
    this.$http.get(url).then((response) => {
      response = response.body
      // console.log(response)
      if (response.errno === ERR_OK) {
        this.ratings = response.data
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          })
        })
      }
    })
  },
  methods: {
    toggleContent () {
      this.onlyContent = !this.onlyContent
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    selectRatting (type) {
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    needShow (rateType, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return rateType === this.selectType
      }
    }
  },
  components: {
    rattingselect,
    split,
    star
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
.ratings
  font-size: 0
  color: rgb(7,17,27)
  z-index: 0
  position: fixed
  top:174px
  bottom: 48px
  width: 100%
  overflow: hidden
  .rating-score
    padding: 18px 24px 18px 0
    display: flex
    .score-left
      box-sizing: border-box
      flex: 0 0 137px
      text-align: center
      border-right: 1px solid rgba(7,17,27,0.1)
      .score
        font-size: 24px
        line-height: 28px
        color: rgb(255,153,0)
      .title
        padding: 6px 0 8px 0
        font-size: 12px
        line-height: 18px
      .text
        padding-bottom: 6px
        font-size: 10px
        line-height: 10px
        color: rgb(147,153,159)
    .score-right
      flex: 1
      padding-left: 24px
      .score-wrapper
        padding-bottom : 8px
        .text
          font-size: 12px
          line-height: 18px
        .star
          display: inline-block
          margin: 0 12px
          vertical-align : top
        .num
          font-size: 12px
          color: rgb(255,153,0)
        .time
          color: rgb(147,153,159)
  .content-wrapper
    padding: 18px
    .content-item
      display: flex
      padding: 18px 0
      border-bottom: 1px solid rgba(7,17,27,0.1)
      &:last-child
        border:none
      .avatar
        flex: 0 0 28px
        width: 28px
        padding-right: 12px
        .img
          border-radius : 50%
      .content
        color: rgb(147,153,159)
        font-size: 10px
        position: relative
        width: 100%
        .user-name
          color: rgb(7,17,27)
        .star
          display: inline-block
          padding: 4px 0 6px 0
        .delivery-time
          line-height : 12px
          font-weight: 200
        .text
          font-size: 12px
          color: rgb(7,17,27)
          line-height: 18px
          padding-bottom: 8px
        .thumb
          font-size: 12px
          color: rgb(0, 160, 220)
          line-height: 16px
        .item
          font-size: 9px
          line-height: 16px
          padding: 0 6px
          border: 1px solid rgba(7,17,27,0.1)
          margin-left: 8px
          white-space:nowrap
        .time
          position: absolute
          top: 0
          right: 0
          line-height: 12px
          font-weight: 200
</style>
