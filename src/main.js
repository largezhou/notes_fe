import '@babel/polyfill'
import '@/libs/globals'

import '@/mocks'
import Vue from 'vue'
import '@/plugins/vuetify'
import '@/plugins/axios'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/styles/index.scss'
import '@/router/permission'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
