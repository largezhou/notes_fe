import { getToken, removeToken, setToken } from '@/libs/token'
import { login, getInfo } from '@/api/auth'

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

    frontendLogout({ commit }) {
      commit('setName', '')
      removeToken()
    },
  },
}
