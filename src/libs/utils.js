import router from '@/router'
import GlobalDialog from '@/components/GlobalDialog.vue'
import GlobalSnackbar from '@/components/GlobalSnackbar'
import store from '@/store'

const utils = {}

export default utils

utils.needAuth = route => {
  return route.matched.some(r => (r.meta && r.meta.auth))
}

utils.snackbar = msg => {
  return new Promise(resolve => {
    const callback = () => {
      resolve()
    }

    const ins = new GlobalSnackbar({
      propsData: {
        callback,
        text: msg,
      },
      store,
    })

    document.body.appendChild(ins.$mount().$el)
  })
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

/**
 * 安全的解析json，避免报错
 *
 * @param json
 * @param defaultValue
 * @returns {*}
 */
utils.safeJsonParse = (json, defaultValue = null) => {
  let data = defaultValue
  try {
    data = JSON.parse(json)
  } catch (e) {

  }

  return data
}

/**
 * 确认消息框，返回一个 Promise， resolve 为确认， reject 为取消
 *
 * @param options
 *
 * {
 *    okText: '确认',
 *    okColor: 'primary',
 *    cancelText: '取消',
 *    cancelColor: 'grey',
 *    title: '提示',
 *    content: '确认？',
 * }
 * @returns {Promise<any>}
 */
utils.confirm = options => {
  return new Promise((resolve, reject) => {
    options.okCallback = () => {
      resolve()
    }

    options.cancelCallback = () => {
      reject()
    }

    router.app.$emit('globalConfirm', options)
  })
}

/**
 * 全局弹框组件
 *
 * @param options
 *
 * {
 *    title: '提醒',
 *    msg: '确定？',
 *    h: h => { return h('span', 'hello') } // 优先级比 msg 高
 *    maxWidth: '290,
 * }
 */
utils.dialog = options => {
  let propsData

  if (typeof options == 'object') {
    propsData = options
  } else { // 如果不是对象，应该是字符串或者渲染函数
    propsData = {
      content: options,
    }
  }

  const ins = new GlobalDialog({
    propsData,
    store,
  })

  document.body.appendChild(ins.$mount().$el)

  return ins
}
