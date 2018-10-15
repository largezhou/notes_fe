export default {
  state: {
    widescreen: true,
    sliderBar: false,
    device: navigator.userAgent.indexOf('Mobile') === -1 ? 'desktop' : 'mobile',
    editMode: false,
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
    changeEditMode(state, editable) {
      state.editMode = editable
    },
    toggleEditMode(state) {
      state.editMode = !state.editMode
    },
  },
}
