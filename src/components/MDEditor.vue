<template>
  <div class="v-form-item v-md-editor" :class="{ 'has-error': hasError }">
    <div class="label">{{ label }}</div>
    <mavon-editor
      ishljs
      code-style="monokai-sublime"
      :externalLink="externalLink"
      :box-shadow="false"
      :placeholder="placeholder"
      :toolbars="toolbars"
      :subfield="false"
      defaultOpen="edit"
      :class="{ widescreen: widescreen }"
      :value="value"
      @change="onChange"
      ref="editor"
    />
    <div class="error-message">{{ errorMessages }}</div>
  </div>
</template>

<script>
import vFormItem from '@/mixins/vform_item'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { mapState } from 'vuex'

export default {
  name: 'MDEditor',
  components: { mavonEditor },
  mixins: [vFormItem],
  props: {
    placeholder: {
      type: String,
      default: ' ',
    },
  },
  data: () => ({
    dirty: false,
    externalLink: {
      markdown_css() {
        return '/markdown/github-markdown.min.css'
      },
      hljs_js() {
        return '/highlightjs/highlight.min.js'
      },
      hljs_css(css) {
        return '/highlightjs/styles/' + css + '.min.css'
      },
      hljs_lang(lang) {
        return '/highlightjs/languages/' + lang + '.min.js'
      },
      katex_css() {
        return '/katex/katex.min.css'
      },
      katex_js() {
        return '/katex/katex.min.js'
      },
    },
  }),
  computed: {
    ...mapState({
      widescreen: state => state.app.widescreen,
    }),
    toolbars() {
      const toolbarsInSmallScreen = {
        preview: true, // 预览
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        undo: true, // 上一步
        redo: true, // 下一步
        imagelink: true, // 图片链接
        table: true, // 表格
        fullscreen: true, // 全屏编辑
      }

      const toolbarsOthers = {
        readmodel: true, // 沉浸式阅读
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        navigation: true, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        subfield: true, // 单双栏模式
      }

      if (this.widescreen) {
        return Object.assign({}, toolbarsInSmallScreen, toolbarsOthers)
      } else {
        return toolbarsInSmallScreen
      }
    },
  },
  mounted() {
    this.textarea = this.$refs.editor.$refs.vNoteEdit.querySelector('textarea')
    this.cancelClearAllShortCut()

    // 取消编辑器自动获取焦点
    this.textarea.blur()
  },
  methods: {
    onChange(raw, html) {
      window.t = this.$refs.editor
      // 该编辑器渲染完就会触发几次 change 事件，此时如果直接 $emit input 事件，validate 会标记为 dirty，直接显示验证错误信息
      // 这里处理一下：默认 dirty = false，前几次change事件，内容肯定为空，所以不处理
      // 之后内容不为空时，把 dirty 标记为 true
      if (raw === '' && !this.dirty) {
        return
      } else if (raw !== '') {
        this.dirty = true
      }

      this.$emit('input', raw)
      this.$emit('change', raw, html)
    },

    reset() {
      const e = this.$refs.editor

      e.d_value = ''
      e.d_render = ''
    },

    /**
     * 取消编辑器 ctrl + backspace 清空编辑器的快捷键
     * 因为这个快捷键是用来删除前面一个词的
     */
    cancelClearAllShortCut() {
      this.textarea.addEventListener('keydown', e => {
        if (e.code == 'Backspace' && e.ctrlKey === true) {
          e.stopPropagation()
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '~@/styles/variables';

.v-md-editor {
  [type=button] {
    -webkit-appearance: none !important;
  }

  code {
    box-shadow: none;
    color: inherit;
    font-weight: inherit;
    white-space: inherit;
  }

  .v-note-wrapper {
    min-height: 200px;
    height: 200px;
  }

  .v-note-wrapper.widescreen {
    height: 400px;
  }

  .v-note-wrapper.fullscreen {
    height: auto;
  }
}

.has-error {
  .v-note-wrapper {
    border-bottom: 2px solid $error-color;
  }
}
</style>
