if (process.env.VUE_APP_USE_MOCK) {
  const mockModules = require.context('./modules', false, /\.js$/)

  // 批量导入modules文件夹下的模块
  mockModules.keys().forEach(path => {
    require('./modules' + path.substr(1))
  })
}
