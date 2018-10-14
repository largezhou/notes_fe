export default {
  state: {
    widescreen: true,
    sliderBar: false,
  },

  mutations: {
    changeWidescreen(state, wide) {
      state.widescreen = wide
    },
    changeSliderBar(state, open = true) {
      state.sliderBar = open
    },
    toggleSliderBar(state) {
      state.sliderBar = !state.sliderBar
    },
  },
}
