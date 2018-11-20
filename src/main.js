import '@babel/polyfill'
import '@/libs/globals'

import '@/mocks'
import Vue from 'vue'
import '@/plugins/vuetify'
import '@/plugins/axios'
import '@/plugins/mavon_editor'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/styles/index.scss'
import '@/router/permission'
import utils from '@/libs/utils'
import '@/components'
import editMode from '@/mixins/edit_mode'
import '@/libs/global_shortcuts'

Vue.mixin(editMode)

Vue.config.productionTip = false

/**
 * @see utils.snackbar
 */
Vue.prototype.$snackbar = utils.snackbar
/**
 * @see utils.confirm
 */
Vue.prototype.$confirm = utils.confirm

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
