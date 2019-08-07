import '@babel/polyfill'
import '@/libs/globals'

import '@/mocks'
import Vue from 'vue'
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
import vuetify from './plugins/vuetify'

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

/**
 * @see utils.dialog
 */
Vue.prototype.$dialog = utils.dialog

const $root = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')

export default $root

if (process.env.NODE_ENV === 'development') {
  window.$root = $root
  window.Vue = Vue
  window.utils = utils
}
