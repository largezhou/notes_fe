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

/**
 * 从url创建一个a标签并返回，用来获取url中的各种属性，比如host，path，hash等
 *
 * @param url
 * @returns {HTMLElement}
 */
utils.getUrlObj = url => {
  const a = document.createElement('a')
  a.href = url

  return a
}

utils.queryFromUrl = url => {
  url = utils.getUrlObj(url).search

  const query = {}
  let pairs = (url[0] === '?' ? url.substr(1) : url).split('&')
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=')
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '')
  }

  return query
}
