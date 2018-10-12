export default {
  watch: {
    pageTitle: {
      handler(newValue) {
        document.title = (newValue || '') + ' 笔记'
      },
      immediate: true,
    },
    pageKeywords: {
      handler(newValue) {
        if (newValue) {
          document.querySelector('meta[name=keywords]').content = newValue
        }
      },
      immediate: true,
    },
    pageDesc: {
      handler(newValue) {
        if (newValue) {
          document.querySelector('meta[name=description]').content = newValue
        }
      },
      immediate: true,
    },
  },
}
