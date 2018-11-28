import _trim from 'lodash/trim'

const Mock = require('mockjs')

let baseURL = process.env.VUE_APP_BASE_URL || '/'

const resolve = path => {
  const basePath = _trim(baseURL, '/')

  if (path instanceof RegExp) {
    // 拼接字符串和正则表达式
    let basePathReg = RegExp(basePath)

    return eval('/' + _trim(basePathReg.source, '/') + _trim(path.source, '/') + '/')
  } else {
    return basePath + '/' + _trim(path, '/')
  }
}

export default (path, method, template = {}, callback) => {
  Mock.mock(resolve(path), method, options => {
    if (typeof callback == 'function') {
      callback(template, options)
    }

    const res = Mock.mock(template)
    return res.data
  })
}
