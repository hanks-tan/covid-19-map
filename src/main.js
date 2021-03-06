import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import '@/assets/theme/index.css'

Vue.config.productionTip = false
Vue.prototype.$mapEvtBus = Vue.prototype.$mapEvtBus || new Vue()
Vue.prototype.axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
