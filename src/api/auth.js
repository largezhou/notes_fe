import axios from '@/plugins/axios'

export function login({ data, config = {} }) {
  return axios({
    url: 'auth/login',
    method: 'post',
    data,
    ...config,
  })
}

export function getInfo() {
  return axios({
    url: 'auth/info',
    method: 'get',
  })
}

export function logout() {
  return axios({
    url: 'auth/logout',
    method: 'post',
  })
}
