import store from '@/store'

const utils = {}

export default utils

utils.needAuth = route => {
  return route.matched.some(r => (r.meta && r.meta.auth))
}

utils.snackbar = msg => {
  store.commit('showSnackbar', msg)
}

/**
 * 通过组件名，递归向上查找一个组件
 *
 * @param component 查找的起点组件
 * @param tag 组件名
 *
 * @returns {*}
 */
utils.findParentByTag = (component, tag) => {
  const parent = component.$parent

  if (!parent) {
    return null
  }

  if (parent.$options._componentTag == tag) {
    return parent
  }

  return utils.findParentByTag(parent, tag)
}
