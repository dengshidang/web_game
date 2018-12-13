import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import 'normalize.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/assets/styles/border.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import wx from 'weixin-js-sdk'

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.use(MintUI)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

Vue.prototype.$wechat = wx

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
