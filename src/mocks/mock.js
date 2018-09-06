import _ from 'lodash'

const Mock = require('mockjs')

let baseURL = process.env.VUE_APP_BASE_URL || '/'

if (baseURL == '/') {
  baseURL = location.origin
}

const resolve = path => {
  return _.trim(baseURL, '/') + '/' + _.trim(path, '/')
}

export default (path, method, template) => {
  Mock.mock(resolve(path), method, options => {
    const key = options.type + options.url

    let data = localStorage.getItem(key)
    try {
      data = JSON.parse(data)
    } catch (e) {
    }

    if (data) {
      return data
    }

    data = Mock.mock(template)

    localStorage.setItem(key, JSON.stringify(data))

    return data
  })
}
