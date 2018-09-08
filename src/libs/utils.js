const utils = {}

export default utils

utils.needAuth = route => {
  return route.matched.some(r => (r.meta && r.meta.auth))
}
