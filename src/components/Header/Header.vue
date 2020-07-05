<template>
    <div class="header">
        <div class="content">
            <div class="head-pic">
                <img width="64" height="64" src="http://p1.meituan.net/200.0/deal/53433d80f196f8f8703e274bffbf07f540172.jpg@138_0_426_426a%7C267h_267w_2e_90Q" />
            </div>
            <div class="head-content">
                <div class="cont-brand">
                    <span class="brand-img"></span>
                    <span class="brand-name">粥品香坊（大运村）</span>
                </div>
                <div class="cont-send">蜂鸟专送/38分钟送达</div>
                <div class="cont-sell">
                    <span class="sell-img"></span>
                    <span class="sell-sub">在线支付满28减5，满50减10</span>
                </div>
            </div>
            <div class="img-cont">
                <span class="img-num">5个</span>
            </div>
        </div>
        <div class="describe">
            粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商
        </div>
    </div>
</template>

<script>

</script>

<style lang="stylus" rel="stylesheet/stylus">
    .header
        // margin: 0
        .content
            background-color: rgba(7,17,27,0.5)
            padding: 24px 12px 18px 24px
            color: rgb(255,255,255)
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
                        background-image: url("./brand@2x.png")
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
                        background-image: url("./decrease_1@2x.png")
                        background-size: 12px 12px
                        background-repeat: no-repeat
                    .sell-sub
                        font-size: 10px
                        font-weight: 200
                        vertical-align: top
            .img-cont
                background-color: rgba(0,0,0,0.2)
                position: absolute
                right: 12px
                bottom: 18px
                border-radius: 8px
                padding: 7px 2px 7px 8px
                .img-num
                    font-size: 10px
                    line-height: 12px
                    font-weight: 200
</style>
