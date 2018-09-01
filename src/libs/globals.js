if (process.env.VUE_APP_USE_LOG) {
  window.log = console.log.bind(console)
} else {
  window.log = () => {}
}
