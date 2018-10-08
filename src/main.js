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
import utils from '@/libs/utils'
import '@/components'

Vue.config.productionTip = false

Vue.prototype.$snackbar = utils.snackbar

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
