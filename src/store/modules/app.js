export default {
  state: {
    widescreen: true,
    sliderBar: false,
    device: navigator.userAgent.indexOf('Mobile') === -1 ? 'desktop' : 'mobile',
    editMode: !!sessionStorage.getItem('editMode'),
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
    changeEditMode(state, editMode) {
      state.editMode = editMode
      sessionStorage.setItem('editMode', editMode ? 1 : '')
    },
  },
}
