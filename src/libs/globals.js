if (process.env.VUE_APP_USE_LOG) {
  window.log = console.log.bind(console)
} else {
  window.log = () => {}
}

/**
 * 一个汉字算 2 个长度
 * @returns {number}
 */
String.prototype.realLength = function () {
  return this.replace(/[^\x00-\xff]/g, '**').length
}
