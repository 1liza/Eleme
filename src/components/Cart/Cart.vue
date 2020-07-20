<template>
    <div>
        <div class="cart">
            <div class="content">
                <div class="cart-left" @click="toggle">
                    <div class="iconwrapper">
                        <div class="logo" :class="{'highlight':totalCount>0}">
                            <i class="iconfont shoppingcart" :class="{'highlight':totalCount>0}">&#xe63b;</i>
                        </div>
                        <span class="food-num" v-show="totalCount">{{totalCount}}</span>
                    </div>
                    <span class="price border-1px" :class="{'highlight':totalCount>0}"> ￥{{totalPrice}}</span>
                    <span class="sendprice">另需配送费￥{{deliveryPrice}}元</span>
                </div>
                <div class="cart-right" :class="{'highlight':totalPrice>=minPrice}">
                    <div class="total-price" :class="{'highlight':totalPrice>=minPrice}" @click.stop.prevent="pay">{{payDesc}}</div>
                </div>
            </div>
            <div class="ball-container">
                <div v-for="(ball, index) in balls" :key="index">
                    <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
                        <div class="ball" v-show="ball.show">
                            <div class="inner inner-hook"></div>
                        </div>
                    </transition>
                </div>
            </div>
            <transition name="fold">
                <div class="shopcart-list" v-show="listShow">
                    <div class="list-header">
                        <span class="title">购物车</span>
                        <span class="empty" @click="emptyFood">清空</span>
                    </div>
                    <div class="list-content" ref="listContent">
                        <ul>
                            <li class="food" v-for="(food, index) in selectFoods" :key="index">
                                <span class="name">{{food.name}}</span>
                                <span class="price">￥{{food.price * food.count}}</span>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol @add="addFood" :food="food"></cartcontrol>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="fade">
            <div class="list-mask" @click="hideList" v-show="listShow"></div>
        </transition>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import cartcontrol from '../../components/Cartcontrol/Cartcontrol'
// import BScroll from 'better-scroll'
export default {
  data () {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      collapsed: true
    }
  },
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    selectFoods: {
      type: Array,
      default () {
        return [{
          price: 10,
          count: 1
        }]
      }
    }
  },
  components: {
    cartcontrol
  },
  methods: {
    drop (el) {
      // console.log('掉落')
      for (let i = 0; i < this.balls.length; i++) {
        const ball = this.balls[i]
        if (!ball.show) {
          ball.show = true // 触发动画
          ball.el = el
          this.dropBalls.push(ball)
          console.log(this.balls)
          return
        }
      }
    },
    beforeDrop (el) {
      // console.log('beforeDrop')
      let count = this.balls.length
      while (count--) {
        const ball = this.balls[count]
        if (ball.show) {
          const rect = ball.el.getBoundingClientRect() // 返回元素的大小及其相对于视口的位置
          const x = rect.left - 32
          const y = -(window.innerHeight - rect.top - 22)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0,${y}px,0)`
          el.style.transform = `translate3d(0,${y}px,0)`
          const inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    dropping (el, done) {
      /* eslint-disable no-unused-vars */
      // 主动触发浏览器重绘
      console.log('dropping')
      const rf = el.offsetHeight
      this.$nextTick(() => {
        // 样式重置
        el.style.webkitTransform = 'translate3d(0,0,0)'
        el.style.transform = 'translate3d(0,0,0)'
        const inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0,0,0)'
        inner.style.transform = 'translate3d(0,0,0)'
        el.addEventListener('transitionend', done)
      })
    },
    afterDrop (el) {
      console.log('afterDrop')
      const ball = this.dropBalls.shift()
      console.log(`ball: ${ball}`)
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    addFood (target) {
      console.log('检测到点击')
      this.drop(target)
    },
    emptyFood () {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    },
    pay () {
      if (this.totalPrice >= this.minPrice) {
        window.alert(`支付${this.totalPrice}元`)
      }
    },
    toggle () {
      if (this.totalCount) {
        this.collapsed = !this.collapsed
      }
    },
    hideList () {
      this.collapsed = true
    }
  },
  computed: {
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    totalPrice () {
      let totalprice = 0
      this.selectFoods.forEach((food) => {
        totalprice += food.price * food.count
      })
      return totalprice
    },
    payDesc () {
      if (!this.totalPrice) {
        return `￥${this.minPrice}起送`
      } else if (this.totalPrice < this.minPrice) {
        return `还差￥${this.minPrice - this.totalPrice}起送`
      } else {
        return '去结算'
      }
    },
    listShow () {
      if (!this.totalCount) {
        return false
      }
      if (this.totalCount > 0 && !this.collapsed) {
        return true
      }
      return false
    }
  },
  // watch: {
  //   selectFoods (newFoods, oldFoods) {
  //     if (newFoods.length === 0) {
  //       this.collapsed = true
  //     }
  //   }
  // }
  watch: {
    collapsed: function () {
      if (!this.collapsed) {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.listContent, {
            click: true
          })
        }
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cart
      position: fixed
      left: 0
      bottom: 0
      width: 100%
      height: 48px
      z-index: 50
      .content
          background: #141d27
          display:flex
          font-size: 0
          .cart-left
              flex: 1
              color: rgba(255,255,255,0.4)
              .iconwrapper
                  display: inline-block
                  position: relative
                  top: -10px
                  height: 54px
                  width: 54px
                  border-radius: 50%
                  background:  #141d27
                  margin: 0 18px
                  box-sizing: border-box
                  padding: 6px
                  .logo
                      width: 100%
                      height: 100%
                      background: rgba(255,255,255,0.2)
                      border-radius: 50%
                      text-align: center
                      &.highlight
                          background: rgb(0, 160, 220)
                      .shoppingcart
                          display: inline-block
                          font-size: 30px
                          line-height: 42px
                          &.highlight
                              color: #fff
                  .food-num
                      display: inline-block
                      width: 24px
                      height: 16px
                      position: absolute
                      bottom: 40px
                      left: 33px
                      font-size: 9px
                      line-height: 16px
                      font-weight : 700
                      color: #ffffff
                      background: rgb(240, 20, 20)
                      text-align: center
                      border-radius : 8px
              .price
                  display: inline-block
                  font-size: 16px
                  vertical-align : top
                  margin-top: 12px
                  padding-right: 12px
                  line-height: 24px
                  font-weight: 700
                  border-right: 1px solid rgba(255,255,255,0.1)
                  &.highlight
                      color: #ffffff
              .sendprice
                  display: inline-block
                  font-size: 10px
                  vertical-align : top
                  margin: 12px 0 0 12px
                  line-height: 24px
          .cart-right
              flex: 0 0 105px
              background: rgba(255,255,255,0.4)
              text-align: center
              &.highlight
                  background: rgb(0, 160, 220)
              .total-price
                  font-size: 12px
                  font-weight: 700
                  line-height: 48px
                  height: 48px
                  display: inline-block
                  color: rgba(255,255,255,0.4)
                  &.highlight
                      color: #fff
      .ball-container
          .ball
              position: fixed
              left: 32px
              bottom: 22px
              z-index: 200
              transition : all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
              .inner
                  width: 16px
                  height: 16px
                  border-radius: 50%
                  background: rgb(0,160,220)
                  transition: all 0.4s linear
      .shopcart-list
          position: absolute
          z-index: -1
          top:0
          left: 0
          width: 100%
          transform: translate3d(0, -100%, 0)
          &.fold-enter-active, &.fold-leave-active
              transition : all 0.5
          &.fold-enter, &.&.fold-leave-active
              transform: translate3d(0, 0, 0)
          .list-header
              height: 40px
              line-height: 40px
              padding: 0 18px
              background: #f3f5f7
              border-bottom: 1px solid rgba(7,17,27,0.1)
              .title
                  float: left
                  font-size: 14px
                  color: rgb(7,17,27)
              .empty
                  float: right
                  font-size: 12px
                  color: rgb(0, 160, 220)
          .list-content
              padding: 0 18px
              max-height: 217px
              overflow: hidden
              background: #fff
              .food
                  padding: 12px 0
                  box-sizing: border-box
                  position: relative
                  background: #fff
                  height: 48px
                  border-bottom : 1px solid rgba(7, 17, 27, 0.1)
                  .name
                      display: inline-block
                      font-size: 14px
                      color: rgb(7, 17, 27)
                      line-height: 24px
                  .price
                      position: absolute
                      right: 90px
                      bottom: 12px
                      font-size: 14px
                      line-height: 24px
                      color: rgb(240, 20, 20)
                  .cartcontrol-wrapper
                      position: absolute
                      right: 0
                      bottom: 7px
  .list-mask
      position: fixed
      top:0
      left: 0
      width: 100%
      height: 100%
      z-index: 40
      backdrop-filter: blur(10px)
      opacity: 1
      background: rgba(7,17,27,0.6)
      &.fade-enter-active, &.fade-leave-active
        transition: all 0.5s
      &.fade-enter, &.fade-leave-to
        opacity:0
        // background: rgba(7,17,27,0)
</style>
