'use strict'

import axios from 'axios'
import { getToken } from '../libs/token'
import utils from '@/libs/utils'
import router from '@/router'
import store from '@/store'

const Qs = require('qs')

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: process.env.VUE_APP_BASE_URL || '/',
  timeout: 60 * 1000,
  // withCredentials: true, // Check cross-site Access-Control

  // 如果不重写该方法，query string中的类似`type of`会被转成`type+of`
  paramsSerializer: params => {
    return Qs.stringify(params, { arrayFormat: 'brackets' })
  },
}

const _axios = axios.create(config)

// 请求时，不要自动加上url中的 query string 的请求地址
const autoQueryBlackList = [
  'auth/login',
  'auth/logout',
]

const inBlackList = url => {
  return autoQueryBlackList.indexOf(url) !== -1
}

_axios.interceptors.request.use(
  config => {
    config.headers.Authorization = getToken()

    // 默认把 url 中的 query string 加到 params 中
    if (!inBlackList(config.url)) {
      const urlQS = router.currentRoute.query
      const configQS = config.params
      config.params = Object.assign({}, urlQS, configQS)

      if (store.state.app.editMode) {
        config.headers['Edit-Mode'] = 1
      }
    }
    // Do something before request is sent
    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  },
)

// Add a response interceptor
_axios.interceptors.response.use(
  res => {
    log(res.config.url, res)

    // Do something with response data
    return res
  },
  err => {
    log('err in axios response', { err })
    const res = err.response

    if (res) {
      switch (res.status) {
        case 404:
          utils.snackbar('请求的网址的不存在')
          break
        case 401:
          store.dispatch('frontendLogout')
          store.commit('changeEditMode', false)
          utils.snackbar('已登出')
          break
        case 422:
          const errorsBag = res.data.errors

          utils.dialog({
            title: '填错啦',
            content(h) {
              return h('errors-bag', {
                props: {
                  errorsBag,
                },
              })
            },
          })

          break
        default:
          utils.snackbar(`服务器错误(code: ${res.status})`)
      }
    } else {
      utils.snackbar('请求错误')
    }
    return Promise.reject(err)
  },
)

export default _axios
