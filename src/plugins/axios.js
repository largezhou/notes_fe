'use strict'

import axios from 'axios'
import { getToken } from '../libs/token'
import utils from '@/libs/utils'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: process.env.VUE_APP_BASE_URL || '/',
  timeout: 60 * 1000,
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  config => {
    config.headers.Authorization = getToken()

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
