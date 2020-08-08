import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router' // 引用router文件夹下index.js的路由配置
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
