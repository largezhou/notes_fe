import Vue from 'vue'

export default {
  state: {
    shown: false,
    text: '',
  },

  mutations: {
    showSnackbar(state, text) {
      state.shown = false
      Vue.nextTick(() => {
        state.shown = true
        state.text = text
      })
    },

    closeSnackbar(state) {
      state.shown = false
      state.text = ''
    },
  },
}
