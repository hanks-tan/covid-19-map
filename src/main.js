import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './https/api'
import ElementUI from 'element-ui'

Vue.config.productionTip = false
Vue.prototype.$mapEvtBus = Vue.prototype.$mapEvtBus || new Vue()
Vue.prototype.$api = api
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
