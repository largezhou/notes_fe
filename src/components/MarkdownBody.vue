<template>
  <div class="markdown-body" v-html="content"/>
</template>

<script>
export default {
  name: 'MarkdownBody',
  props: {
    content: String,
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
  },
  mounted() {
    this.handleFootnoteAnchor()
  },
}
</script>

<style lang="scss">
@import '~mavon-editor/dist/highlightjs/styles/monokai-sublime.min.css';
@import '~mavon-editor/dist/katex/katex.min.css';
@import '~mavon-editor/dist/markdown/github-markdown.min.css';
</style>

<style lang="scss">
.markdown-body {
  code {
    box-shadow: none;
    color: inherit;
    font-weight: inherit;
    white-space: inherit;
  }

  /*有id的a标签应该是锚点，加一个padding，避免顶部固定状态栏遮拦*/
  a[id] {
    display: block;
    height: 60px;
    margin-top: -60px;
    visibility: hidden;
    float: left;
  }
}
</style>
