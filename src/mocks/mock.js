import _ from 'lodash'

const Mock = require('mockjs')

let baseURL = process.env.VUE_APP_BASE_URL || '/'

const resolve = path => {
  return _.trim(baseURL, '/') + '/' + _.trim(path, '/')
}

export default (path, method, template = {}) => {
  Mock.mock(resolve(path), method, template)
}
