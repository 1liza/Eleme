<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
                <span class="iconfont iconsub" v-show="food">&#xe61f;</span>
            </div>
        </transition>
        <div class="cart-num" v-show="food.count>0">{{food.count}}</div>
        <div class="iconfont iconadd" @click.stop.prevent="addCart">&#xe607;</div>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart (event) {
      if (event._constructed) {
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        this.$emit('add', event.target)
        console.log(this.food)
        console.log(this.food.count)
      }
    },
    decreaseCart (event) {
      if (event._constructed) {
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.cartcontrol
    font-size: 0
    .cart-decrease
        display :inline-block
        padding: 6px
        opacity: 1
        transform: translate3d(0,0,0)
        .iconsub
            display: inline-block
            line-height: 20px
            font-size: 20px
            color: rgb(0, 160, 220)
            transition : all 0.4s linear
            transform : rotate(0)
        &.move-enter-active, &.move-leave-active
            transition: all 0.4s linear
        &.move-enter, &.move-leave-to
            opacity : 0
            transform : translate3d(24px, 0, 0)
            .iconsub
                transform: rotate(180deg)
    .cart-num
        display: inline-block
        vertical-align : top
        width: 12px
        padding-top: 10px
        line-height : 14px
        text-align: center
        font-size: 10px
        color: rgb(147,153,159)
    .iconadd
        display: inline-block
        padding: 6px
        line-height: 24px
        font-size: 22px
        color: rgb(0, 160, 220)
</style>
