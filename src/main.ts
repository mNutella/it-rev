// Dependencies
import Vue from 'vue'
import App from './App.vue'
import router from './plugins/router'
import { store } from './plugins/store'

Vue.config.productionTip = true

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
