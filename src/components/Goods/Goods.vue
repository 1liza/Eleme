<template>
    <div>
      <div class="foods">
          <div class="menu-wrapper" ref="menuWrapper">
              <ul>
                  <li class="menu-item border-1px" v-for="(item, index) in goods" :key="index" :class="{'current':currentIndex===index}" @click="setMenu(index, $event)" ref="menuList">
                      <span class="tag"><span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>{{item.name}}</span>
                      <span class="text border-1px"></span>
                  </li>
              </ul>
          </div>
          <div class="foods-wrapper" ref="foodsWrapper">
              <ul>
                  <li class="food-list" v-for="(item, index) in goods" :key="index" ref="foodList">
                      <div class="title">{{item.name}}</div>
                      <ul>
                        <li class="detail border-1px" @click="selectFood(foodItem,$event)" v-for="(foodItem, foodIndex) in item.foods" :key="foodIndex">
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
                            <!-- 添加商品组件和添加动画 -->
                            <div class="cartcontrol-wrapper">
                                <cartcontrol @add="addFood" :food="foodItem"></cartcontrol>
                            </div>
                        </li>
                      </ul>
                  </li>
              </ul>
          </div>
          <cart ref="shopcart" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></cart>
      </div>
      <food ref="food" @add="addFood" :food="selectedFood"></food>
    </div>
</template>

<script>
import cart from '../Cart/Cart'
import food from '../Food/Food'
import cartcontrol from '../Cartcontrol/Cartcontrol'
import BScroll from 'better-scroll'
const debug = process.env.NODE_ENV !== 'production'
const ERR_OK = 0

export default {
  props: {
    goods: {
      type: Array,
      default: function () {
        return []
      }
    },
    seller: {
      type: Object
    }
  },
  components: {
    cart,
    food,
    cartcontrol
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']

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
          this._calculateHeight()
        })
      }
    })
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        // console.log(this.listHeight[i + 1])
        const height1 = this.listHeight[i]
        const height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          this._followScroll(i)
          return i
        }
      }
      return 0
    },
    // 存储挑选的物品
    selectFoods () {
      const foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      // console.log(foods)
      return foods
    }
  },
  methods: {
    setMenu (index, event) {
      const foodList = this.$refs.foodList
      const el = foodList[index]
      this.foodsScroll.scrollToElement(el, 300)
    },
    selectFood (food, event) {
      if (!event._constructed) {
        return
      }
      this.selectedFood = food
      // console.log(food)
      // 点击食物详情
      this.$refs.food.show()
    },
    addFood (target) {
    // Cartcontrol把添加食物的元素暴露出来
      this._drop(target)
    },
    _initScroll () {
      // console.log('启动scroll')
      // console.log(this.$refs.menuWrapper)
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      })
      this.foodsScroll.on('scroll', (pos) => {
        if (pos.y <= 0) {
          this.scrollY = Math.abs(Math.round(pos.y))
        }
      })
      console.log('初始化成功')
    },
    _calculateHeight () {
      const foodList = this.$refs.foodList
      let height = 0
      // console.log(foodList)
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        const item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
      // console.log(this.listHeight)
    },
    _followScroll (index) {
      // console.log('follow')
      const menuList = this.$refs.menuList
      const el = menuList[index]
      this.menuScroll.scrollToElement(el, 300, 0, -100)
    },
    _drop (target) {
      // 从父组件中调用cart组件中的drop方法
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target)
      })
    }
  },
  data () {
    return {
      scrollY: 0,
      listHeight: [],
      selectedFood: {}
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.foods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    color: rgb(147,153,159)
    .menu-wrapper
        flex: 0 0 80px
        width: 80px
        background-color: #f3f5f7
        .menu-item
            display: table
            border-1px(rgba(7,17,27,0.1))
            height: 54px
            &.current
                background: #fff
                font-weight: 700
            .icon
                display: inline-block
                vertical-align : top
                width: 12px
                height: 12px
                margin-right: 2px
                background-size: 12px 12px
                background-repeat : no-repeat
                &.decrease
                    bg-img('decrease_3')
                &.discount
                    bg-img('discount_3')
                &.guarantee
                    bg-img('guarantee_3')
                &.invoice
                    bg-img('invoice_3')
                &.special
                    bg-img('special_3')
            .tag
                padding: 0 12px
                display:table-cell
                height: 54px
                width: 56px
                font-size: 12px
                line-height: 14px
                font-weight: 200
                vertical-align: middle
    .foods-wrapper
        flex: 1
        .title
            font-size: 12px
            line-height: 26px
            height: 26px
            padding-left: 14px
            vertical-align: middle
            background: #f3f5f7
            border-left: 2px solid #d9dde1
        .detail
            position :relative
            border-1px(rgba(7,17,27,0.1))
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
            .cartcontrol-wrapper
                position: absolute
                right: 0
                bottom: 12px
</style>
