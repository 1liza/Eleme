<template>
    <div class="foods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li class="menu-item" v-for="(item, index) in goods" :key="index" @click="setMenu(index, $event)" ref="menuList">
                    <span class="tag">{{item.name}}</span>
                    <span class="text border-1px"></span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li class="food-item" v-for="(item, index) in goods" :key="index" ref="foodList">
                    <div class="title">{{item.name}}</div>
                    <div class="detail" v-for="(foodItem, foodIndex) in item.foods" :key="foodIndex">
                        <div class="food-item">
                            <img class="food-img" :src="foodItem.image" />
                            <div class="food-text">
                                <div class="food-title">{{foodItem.name}}</div>
                                <div class="food-detail">
                                    <span class="food-sell">月售{{foodItem.sellCount}}</span>
                                    <span clss="food-ratting">好评率{{foodItem.rating}}%</span>
                                </div>
                                <div class="food-price">￥{{foodItem.price}}</div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <cart></cart>
    </div>
</template>

<script>
import cart from '../Cart/Cart'
import BScroll from 'better-scroll'
const debug = process.env.NODE_ENV !== 'production'
const ERR_OK = 0

export default {
  props: {
    goods: {
      type: Array
    }
  },
  components: {
    cart
  },
  created () {
    const url = debug ? '/api/goods' : 'http://'
    // console.log(url)
    // $http.get(this.url)
    this.$http.get(url).then((response) => {
      // console.log('get成功')
      response = response.body
      if (response.errno === ERR_OK) {
        this.goods = response.data
        // console.log(this.goods)
        this.$nextTick(() => {
          this._initScroll()
        })
      }
    })
  },
  methods: {
    setMenu (index, event) {
      const foodList = this.$refs.foodList
      const el = foodList[index]
      this.foodsScroll.scrollToElement(el, 300)
    },
    _initScroll () {
      // console.log('启动scroll')
      console.log(this.$refs.menuWrapper)
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true
      })
      this.foodsScroll.on('scroll', (pos) => {
        if (pos.y <= 0) {
          this.ScrollY = Math.abs(Math.round(pos.y))
        }
      })
      console.log('初始化成功')
    }
  },
  data () {
    return {
      scrollY: 0
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.foods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    color:rgb(147,153,159)
    .menu-wrapper
        flex: 0 0 80px
        width: 80px
        background-color: #f3f5f7
        .menu-item
            diaplay: table
            .tag
                padding: 0 12px
                display:table-cell
                height: 54px
                width: 56px
                font-size: 12px
                line-height: 14px
                font-weight: 200
                vertical-align: middle
                &.currnet
                    background: #ffffff
                    font-weight: 700
    .foods-wrapper
        flex: 1
        .title
            font-size: 12px
            line-height: 26px
            padding-left: 14px
            vertical-align: middle
            background: #f3f5f7
        .detail
            .food-item
                padding: 18px
                display: flex
                .food-img
                    width: 57px
                    height: 57px
                    flex: 0 0 57px
                    margin-right: 10px
                .food-text
                    flex:1
                    .food-title
                        font-size: 14px
                        line-height: 14px
                        color: rgb(7,17,27)
                        margin: 2px 0 8px 0
                    .food-detail
                        font-size: 10px
                        line-height: 10px
                        margin: 8px 0
                        .food-sell
                            margin-right: 12px
                    .food-price
                        font-size: 14px
                        font-weight: 700
                        color: red
</style>
