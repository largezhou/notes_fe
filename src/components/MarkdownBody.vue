<template>
  <div class="markdown-body" v-html="content"/>
</template>

<script>
export default {
  name: 'MarkdownBody',
  props: {
    content: String,
  },
  mounted() {
    this.handleFootnoteAnchor()
    this.handleImgPreview()
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

    handleImgPreview() {
      const imgs = document.querySelectorAll('.markdown-body img')
      imgs.forEach(img => {
        img.addEventListener('click', e => {
          this.$dialog({
            title: '',
            maxWidth: '100%',
            className: 'img-preview',
            actions: false,
            escCLose: true,
            content(h) {
              return h('v-img', {
                props: {
                  src: e.target.src,
                  contain: true,
                },
              })
            },
          })
        })
      })
    },
  },
}
</script>

<style lang="scss">
@import '~mavon-editor/dist/highlightjs/styles/monokai-sublime.min.css';
@import '~mavon-editor/dist/katex/katex.min.css';
@import '~mavon-editor/dist/markdown/github-markdown.min.css';
</style>

<style scoped lang="scss">
.markdown-body {
  /deep/ img {
    cursor: pointer;
  }
}
</style>

<style lang="scss">
.img-preview {
  .v-card__text {
    padding: 0;
  }
}
</style>
