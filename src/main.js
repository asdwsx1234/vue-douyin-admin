import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'common/stylus/index.styl'
import App from './App.vue'
import router from './router'
import { baseURL } from 'common/js/config'
import store from './store/index'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true
})
Vue.prototype.$axios = axiosInstance
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
