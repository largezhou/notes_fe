import _ from 'lodash'

const Mock = require('mockjs')

let baseURL = process.env.VUE_APP_BASE_URL || '/'

const resolve = path => {
  const basePath = _.trim(baseURL, '/')

  if (path instanceof RegExp) {
    // 拼接字符串和正则表达式
    let basePathReg = RegExp(basePath)

    return eval('/' + _.trim(basePathReg.source, '/') + _.trim(path.source, '/') + '/')
  } else {
    return basePath + '/' + _.trim(path, '/')
  }
}

export default (path, method, template = {}, callback) => {
  Mock.mock(resolve(path), method, options => {
    if (typeof callback == 'function') {
      callback(template, options)
    }
    return Mock.mock(template)
  })
}
