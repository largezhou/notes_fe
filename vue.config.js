const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

// 需要复制的静态资源
const meStatics = [
  'highlightjs/languages',
  'highlightjs/styles/monokai-sublime.min.css',
  'highlightjs/highlight.min.js',
  'katex',
  'markdown',
]

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        ...meStatics.map(s => {
          return {
            from: path.resolve('node_modules/mavon-editor/dist', s),
            to: path.resolve(__dirname, `./dist/${s}`),
          }
        }),
      ]),
    ],
  },
}
