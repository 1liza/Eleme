<template>
  <div id="app">
    <v-header></v-header>
    <food></food>
    <cart></cart>
  </div>
</template>

<script>
import header from './components/Header/Header'
import food from './components/Food/Food'
import cart from './components/Cart/Cart'

export default {
  components: {
    'v-header': header,
    food,
    cart
  }
}
</script>

<style>
  @import "./common/stylus/iconfont.css"
</style>
