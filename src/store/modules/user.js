import { getToken, removeToken, setToken } from '@/libs/token'
import { login } from '@/api/auth'

export default {
  state: {
    token: getToken(),
    name: '',
  },

  mutations: {
    setToken(state, token) {
      state.token = token
    },

    setNamn(state, name) {
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
          .catch(error => {
            reject(error)
          })
      })
    },
  },
}
