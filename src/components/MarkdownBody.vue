<template>
  <div class="markdown-body" v-html="content" @click="onPreviewImg"/>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MarkdownBody',
  props: {
    content: String,
  },
  computed: {
    ...mapState({
      device: state => state.app.device,
    }),
  },
  mounted() {
    this.handleFootnoteAnchor()
  },
  methods: {
    // 处理脚注锚点偏移的问题，把脚注的锚点放到 sup 标签前面，脚注数字的 a 标签去掉 id 属性
    handleFootnoteAnchor() {
      const footnotes = document.querySelectorAll('sup.footnote-ref')
      for (const ft of footnotes) {
        // 如果sup元素前面有元素，说明已经添加锚点了
        if (ft.previousElementSibling) {
          continue
        }
        const ftNumNode = ft.children[0]
        const anchor = document.createElement('a')
        anchor.id = ftNumNode.id
        ftNumNode.removeAttribute('id')
        ft.parentElement.insertBefore(anchor, ft)
      }
    },

    onPreviewImg(e) {
      if (e.target.tagName != 'IMG') {
        return
      }

      const maxWidth = 1200
      const maxHeight = this.device == 'mobile' ? 600 : 800

      const img = e.target

      let height = img.naturalHeight
      let width = img.naturalWidth
      const ratio = width / height

      // 限制最大高度
      if (height > maxHeight) {
        height = maxHeight
        width = height * ratio
      }

      // 限制最大宽度
      if (width > maxWidth) {
        width = maxWidth
        height = width / ratio
      }

      this.$dialog({
        title: '',
        maxWidth: width + 'px',
        className: 'img-preview',
        actions: false,
        escCLose: true,
        content: h => {
          return h('v-img', {
            props: {
              src: e.target.src,
              contain: true,
              maxHeight: height,
              maxWidth: width,
            },
          })
        },
      })
    },
  },
}
</script>

<style lang="scss">
@import '~mavon-editor/dist/highlightjs/styles/monokai-sublime.min.css';
@import '~mavon-editor/dist/katex/katex.min.css';
@import '~mavon-editor/dist/markdown/github-markdown.min.css';
@import '~mavon-editor/dist/css/index.css';
</style>

<style scoped lang="scss">
.markdown-body {
  ::v-deep {
    .katex-display {
      overflow-x: auto;
      overflow-y: hidden;
    }

    img {
      cursor: pointer;
    }
  }

  line-height: 1.75;
}
</style>

<style lang="scss">
.device-mobile {
  .img-preview {
    margin: 4px;
  }
}

.img-preview {
  .v-card__text {
    padding: 0;
  }
}
</style>
