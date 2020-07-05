import Vue from 'vue'
import VueRouter from 'vue-router'
import Header from '../components/Header/Header.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Header',
    component: Header
  }]

const router = new VueRouter({
  routes
})

export default router
