// router设置
// mode改为history可以取消自动加#的问题
import Vue from 'vue'
import VueRouter from 'vue-router'
import main from '../App.vue'
// import goods from '../components/Goods/Goods.vue'
// import rattings from '../components/Rattings/Rattings.vue'
// import sellers from '../components/Sellers/Sellers.vue'

Vue.use(VueRouter)
// 直接import语法错误，改为require
// https://blog.csdn.net/weixin_42406046/article/details/103718293
const sellers = resolve => require(['../components/Sellers/Sellers.vue'], resolve)
const goods = resolve => require(['../components/Goods/Goods.vue'], resolve)
const rattings = resolve => require(['../components/Rattings/Rattings.vue'], resolve)
// function loadView(view) {
//   // return () => import(/* webpackChunkName: "view-[request]" */ `../components/${view}/${view}.vue`)
//   return resolve => require([`@/src/components/${view}/${view}.vue`], resolve)
// }

const routes = [
  {
    path: '/',
    redirect: '/goods',
    name: 'main',
    component: main
  },
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
  routes
})

export default router
