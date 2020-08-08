<template>
    <div class="ratingselect">
      <div class="ratting-type">
          <span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">全部<span class="count">{{ratings.length}}</span></span>
          <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">满意<span class="count">{{positives.length}}</span></span>
          <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">不满意<span class="count">{{negatives.length}}</span></span>
      </div>
      <div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
          <span class="iconfont check">&#xe652;</span>
          <span class="text">只看有内容的评价</span>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    selectType: {
      type: Number,
      default: 2
    },
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    onlyContent: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    select (type, event) {
      if (event._constructed) {
        this.$emit('select', type)
      }
    },
    toggleContent () {
      if (event._constructed) {
        this.$emit('toggle')
      }
    }
  },
  computed: {
    positives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === 0
      })
    },
    negatives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === 1
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.ratingselect
    padding: 18px 18px 0 18px
    font-size: 0
    border-bottom: 1px solid rgba(7,17,27,0.1)
    .ratting-type
        padding-bottom: 18px
        border-bottom: 1px solid rgba(7,17,27,0.1)
        .block
            display: inline-block
            padding: 8px 12px
            margin-right: 8px
            color: rgb(77, 85, 93)
            font-size: 12px
            line-height: 18px
            &.active
                color: #fff
            .count
                margin-left:2px
                font-size: 8px
            &.positive
                background: rgba(0, 160, 220, 0.2)
                &.active
                    background: rgb(0, 160, 220)
            &.negative
                background: rgba(77, 85, 93, 0.2)
                &.active
                    background: rgb(77, 85, 93)
    .switch
        padding: 12px 18px
        line-height: 24px
        color: rgb(147,153,159)
        height: 24px
        &.on
            .check
                color: #00c850
        .check
            display: inline-block
            font-size: 24px
            padding-right: 4px
        .text
            font-size: 12px
            line-height: 24px
            vertical-align : top
</style>
