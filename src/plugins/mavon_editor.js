import { mavonEditor } from 'mavon-editor'
import { keydownListen } from 'mavon-editor/src/lib/core/keydown-listen'
import { fullscreenchange, ImagePreviewListener } from 'mavon-editor/src/lib/core/extra-function'

mavonEditor.mixins.push({
  props: {
    autofocus: {
      type: Boolean,
      default: false,
    },
  },
})

// 重写mounted方法，去掉自动获取焦点
// 添加一个props，用来判断是否自动获取焦点
mavonEditor.mounted = function () {
  const $vm = this
  this.$el.addEventListener('paste', function (e) {
    $vm.$paste(e)
  })
  this.$el.addEventListener('drop', function (e) {
    $vm.$drag(e)
  })
  // 浏览器siz大小
  /* windowResize(this); */
  keydownListen(this)
  // 图片预览事件监听
  ImagePreviewListener(this)
  // 设置默认焦点
  if (this.autofocus) {
    this.getTextareaDom().focus()
  }
  // fullscreen事件
  fullscreenchange(this)
  this.d_value = this.value
  // 将help添加到末尾
  document.body.appendChild(this.$refs.help)
  $vm.loadExternalLink('markdown_css', 'css')
  $vm.loadExternalLink('katex_css', 'css')
  $vm.loadExternalLink('katex_js', 'js', function () {
    $vm.initLanguage()
    $vm.iRender()
  })
  $vm.loadExternalLink('hljs_js', 'js', function () {
    $vm.initLanguage()
    $vm.iRender()
  })
  $vm.codeStyleChange($vm.codeStyle, true)
}
