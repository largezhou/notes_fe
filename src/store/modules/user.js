import { getToken, removeToken, setToken } from '@/libs/token'
import { login, getInfo, logout } from '@/api/auth'
import utils from '@/libs/utils'
import router from '@/router'

export default {
  state: {
    token: getToken(),
    name: '',
  },

  mutations: {
    setToken(state, token) {
      state.token = token
    },

    setName(state, name) {
      state.name = name
    },
  },

  actions: {
    login({ commit }, payload) {
      return new Promise((resolve, reject) => {
        login(payload)
          .then(res => {
            const data = res.data
            setToken(data.token)
            commit('setToken', data.token)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    getInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then(res => {
            const data = res.data
            commit('setName', data.name)
            resolve(res)
          })
          .catch(err => {
            log('store getInfo catch')
            reject(err)
          })
      })
    },

    frontendLogout({ dispatch }) {
      dispatch('clearAuth')
      removeToken()
    },

    logout({ dispatch }) {
      return new Promise((resolve, reject) => {
        logout()
          .then(res => {
            dispatch('clearAuth')
            removeToken()
            sessionStorage.removeItem('editMode')
            resolve()
            if (utils.needAuth(router.currentRoute)) {
              location.href = '/'
            } else {
              location.reload()
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    clearAuth({ commit }) {
      commit('setName', '')
      commit('setToken', '')
    },
  },
}
