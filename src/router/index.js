// router设置
// mode改为history可以取消自动加#的问题
import Vue from 'vue'
import VueRouter from 'vue-router'
// import Header from '../components/Header/Header.vue'
import goods from '../components/Goods/Goods.vue'
import rattings from '../components/Rattings/Rattings.vue'
import sellers from '../components/Sellers/Sellers.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/', // 设置默认显示内容
  //   name: 'goods',
  //   component: goods
  // },
  {
    path: '/sellers',
    name: 'sellers',
    component: sellers
  },
  {
    path: '/goods',
    name: 'goods',
    component: goods
  },
  {
    path: '/rattings',
    name: 'rattings',
    component: rattings
  }]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.push('/goods')

export default router
