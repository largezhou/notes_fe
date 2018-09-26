import store from '@/store'

const utils = {}

export default utils

utils.needAuth = route => {
  return route.matched.some(r => (r.meta && r.meta.auth))
}

utils.snackbar = msg => {
  store.commit('showSnackbar', msg)
}

window.utils = utils
