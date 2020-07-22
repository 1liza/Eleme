<template>
    <div class="header">
        <div class="content">
            <div class="head-pic">
                <img width="64" height="64" :src=seller.avatar />
            </div>
            <div class="head-content">
                <div class="cont-brand">
                    <span class="brand-img"></span>
                    <span class="brand-name">{{seller.name}}</span>
                </div>
                <div class="cont-send">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
                <div class="cont-sell">
                    <span class="sell-img"></span>
                    <span class="sell-sub" :class=classMap[seller.supports[0].type]>{{seller.supports[0].description}}</span>
                </div>
                <div class="background">
                    <img  :src=seller.avatar width="100%" height="100%" />
                </div>
            </div>
            <div class="img-cont" @click="showDetail">
                <span class="img-num">{{seller.supports.length}}个</span>
                <span class="iconfont iconfanhui">&#xe65a;</span>
            </div>
        </div>
        <div class="describe" @click="showDetail">
            <span class="des-img"></span>
            <span class="des-cont">{{seller.bulletin}}</span>
            <span class="iconfont iconfanhui">&#xe65a;</span>
        </div>
        <transition name="fade">
            <div class="detail" v-show=detailShow>
                <div class="detail-wrapper clearfix">
                    <div class="detail-head">
                        <div class="detail-title">粥品香坊（大运村）</div>
                        <div class="detail-star">
                            <star :size="48" :score="seller.score"></star>
                        </div>
                    </div>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <ul class="sell-detail" v-if="seller.supports">
                        <li class="sell" v-for="(item, index) in seller.supports" :key="index">
                            <span class="icon" :class=classMap[seller.supports[index].type]></span>
                            <span class="item">{{seller.supports[index].description}}</span>
                        </li>
                    </ul>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <div class="anno-detail">
                        {{seller.bulletin}}
                    </div>
                    <div class="iconfont iconclose" @click=hideDetail>&#xe651;</div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
import star from '../../components/Star/Star'
// const debug = process.env.NODE_ENV !== 'produciton'
// const ERR_OK = 0

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetail () {
      this.detailShow = true
    },
    hideDetail () {
      this.detailShow = false
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']

    // const url = debug ? '/api/seller' : 'http://'
    // this.$http.get(url).then((response) => {
    //   response = response.body
    //   if (response.errno === ERR_OK) {
    //     this.seller = response.data
    //   }
    // })
  },
  components: {
    star
  }
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
    .header
        // margin: 0
        color: rgb(255,255,255)
        background-repeat: no-repeat
        .content
            background-color: rgba(7,17,27,0.5)
            padding: 24px 12px 18px 24px
            position: relative
            .head-pic
                position: relative
                font-size: 0// 清除元素之间的距离
                display: inline-block
                img
                    border-radius: 2px
                    height: 64px
                    width: 64px
            .head-content
                display: inline-block
                margin-left: 16px
                vertical-align: top
                .cont-brand
                    margin: 2px 0 8px 0
                    .brand-img
                        display: inline-block// 只有这样才能设置高度
                        width: 30px
                        height: 18px
                        bg-img('brand')
                        background-size: 30px 18px
                        background-repeat: no-repeat
                        padding-right: 8px
                    .brand-name
                        font-size: 16px
                        font-weight: bold
                        line-heigth: 18px
                        vertical-align: top
                .cont-send
                    font-size: 12px
                    line-height: 12px
                    margin-bottom: 10px
                    font-weight: 200
                .cont-sell
                    .sell-img
                        display: inline-block
                        height: 12px
                        width: 12px
                        padding: 0 4px 2px 0
                        bg-img('decrease_1')
                        background-size: 12px 12px
                        background-repeat: no-repeat
                    .sell-sub
                        font-size: 10px
                        font-weight: 200
                        vertical-align: top
                .background
                    z-index : -1
                    position: absolute
                    top:0
                    left: 0
                    width: 100%
                    height: 100%
                    filter: blur(10px)
            .img-cont
                background-color: rgba(0,0,0,0.2)
                position: absolute
                right: 12px
                bottom: 18px
                border-radius: 24px
                padding: 0 8px
                font-size: 0
                text-align: center
                .img-num
                    font-size: 10px
                    padding-right: 2px
                    // vertical-align : middle
                .iconfanhui
                    font-size: 10px
                    line-height: 24px
                    font-weight: 200
        .describe
            position: relative
            height: 28px
            line-height: 28px
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
            padding: 0 22px 0 12px
            background-color: rgba(7,17,27,0.6)
            .des-img
                display: inline-block
                height: 12px
                width: 25px
                bg-img('bulletin')
                background-size: 25px 12px
                vertical-align: middle
            .des-cont
                font-size: 10px
                font-weight: 200
                line-height: 28px
                margin: 0 4px
            .iconfanhui
                font-size: 10px
                position: absolute
                top: 3px
                right: 12px
        .detail
            z-index: 100
            position : fixed
            top: 0
            left: 0
            overflow: hidden
            background-color: rgba(7,17,27,0.8)
            width: 100%
            height: 100%
            padding: 64px 36px 64px 36px
            box-sizing: border-box
            backdrop-filter: blur(10px)
            &.fade-enter-active, &.fade-leave-active
                transition: all 0.5s
            &.fade-enter, &.fade-leave-active
                opacity: 0
                background: rgba(7, 17, 27, 0)
            .detail-wrapper
                width: 100%
                height: 100%
                min-height: 100%
                overflow: auto
                .detail-head
                    .detail-title
                        font-size: 16px
                        font-weight: 700
                        line-height: 16px
                        // width: 100px
                        // margin: 0 auto// 使用margin必须人为设置宽度
                        text-align: center
                    .detail-star
                        margin: 16px 0 28px 0
                        height: 24px
                        text-align: center
                .title
                    padding: 28px 0 24px 0
                    display: flex
                    .text
                        font-weight: 700
                        font-size: 14px
                        // text-align: center
                        padding: 0 12px
                    .line
                        flex: 1
                        border-bottom: 1px solid rgba(255,255,255,0.2)
                        position: relative
                        top: -6px
                .sell-detail
                    .sell
                        .icon
                            display: inline-block
                            height: 16px
                            width: 16px
                            background-size: 16px 16px
                            vertical-align: top
                            margin: 0 6px 12px 0
                            &.decrease
                                bg-img('decrease_1')
                            &.discount
                                bg-img('discount_1')
                            &.guarantee
                                bg-img('guarantee_1')
                            &.invoice
                                bg-img('invoice_1')
                            &.special
                                bg-img('special_1')
                        .item
                            font-size: 12px
                            font-weight: 200
                            line-height: 12px
                            margin-bottom: 12px
                .anno-detail
                    font-size: 12px
                    font-weight: 200
                    line-height: 24px
                .iconclose
                    position: fixed
                    width: 32px
                    height: 32px
                    font-size: 32px
                    bottom: 32px
                    right: 0
                    left: 0
                    margin: 0 auto
                    color: rgba(255,255,255,0.5)
</style>
