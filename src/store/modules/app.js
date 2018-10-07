export default {
  state: {
    widescreen: true,
  },

  mutations: {
    changeWidescreen(state, wide) {
      state.widescreen = wide
    },
  },
}
