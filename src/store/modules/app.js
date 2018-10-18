export default {
  state: {
    widescreen: true,
    sliderBar: false,
    device: navigator.userAgent.indexOf('Mobile') === -1 ? 'desktop' : 'mobile',
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
