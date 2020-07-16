<template>
    <div class="cart">
        <div class="cart-left">
            <div class="iconwrapper">
                <div class="logo" :class="{'highlight':totalCount>0}">
                    <i class="iconfont shoppingcart" :class="{'highlight':totalCount>0}">&#xe63b;</i>
                </div>
            </div>
            <span class="price">￥0</span>
            <span class="sendprice">另需配送费￥{{seller.deliveryPrice}}元</span>
        </div>
        <div class="cart-right">
            <div class="total-price">￥{{seller.minPrice}}起送</div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object
    }
  },
  methods: {
    totalCount () {
      return 2
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
                    background: green
                .shoppingcart
                    display: inline-block
                    font-size: 30px
                    line-height: 42px
                    &.highlight
                        color:rgb(0,160,220)
        .price
            display: inline-block
            font-size: 16px
            vertical-align : top
            margin-top: 12px
            padding-right: 12px
            line-height: 24px
            font-weight: 700
            &.highlight
                color: #ffffff
        .sendprice
            display: inline-block
            font-size: 16px
            vertical-align : top
            margin: 12px 0 0 12px
            line-height: 24px
    .cart-right
        flex: 0 0 105px
        background: rgba(255,255,255,0.4)
        text-align: center
        .total-price
            font-size: 12px
            font-weight: 700
            line-height: 48px
            height: 48px
            display: inline-block
            color: rgba(255,255,255,0.4)
</style>
