import '@/libs/globals'

import '@/mocks'
import Vue from 'vue'
import '@/plugins/axios'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/plugins/element.js'
import '@/styles/index.scss'
import '@/router/permission'
import reloadData from '@/mixins/reload_data'

Vue.mixin(reloadData)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
