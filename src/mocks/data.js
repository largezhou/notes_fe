const dataModules = require.context('./data/', false, /\.js$/)

const o = {}

dataModules.keys().forEach(path => {
  const data = require('./data' + path.substr(1))
  Object.assign(o, data)
})

export const fakeData = o
