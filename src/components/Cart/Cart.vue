<template>
    <div class="cart">
        <div class="content">
            <div class="cart-left">
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
                <div class="total-price" :class="{'highlight':totalPrice>=minPrice}">{{payDesc}}</div>
            </div>
        </div>
        <div class="ball-container">
        </div>
        <transition name="fold">
            <div class="shopcart-list" v-show="listShow">
                <div class="list-header">
                    <span class="header-left">购物车</span>
                    <span class="header-right">清空</span>
                </div>
                <div class="list-content"></div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
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
  computed: {
    totalCount () {
    //   let totalPrice = 0
    //   if (this.selectFoods) {
    //     for (let i = 0; i < this.selectFoods.length; i++) {
    //       totalPrice += this.selectFoods[i].price
    //     }
    //   }
    //   console.log(this.totalPrice)
    //   return totalPrice
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
    background: #141d27
    display:flex
    .content
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
    .shopcart-list
        position: absolute
        z-index: -1
        top:0
        left: 0
        width: 100%
        background: rgb(240,20,20)
        .list-header
            height: 40px
            line-height: 40px
</style>
