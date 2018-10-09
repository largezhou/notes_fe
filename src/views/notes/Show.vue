<template>
  <page-layout v-if="note" class="note-show">
    <book-info-card :book="note.book" :expand="false"/>
    <h1 style="text-align: center">{{ note.title || '-- UNDEFINED TITLE --'}}</h1>
    <div class="time">
      <span>{{ note.created_at }}</span>
      <span style="margin-left: 20px;">{{ note.updated_at }}</span>
    </div>
    <div class="tags">
      <tag
        v-for="tag of note.tags"
        :key="tag.id"
        :tag="tag"
      />
    </div>
    <div class="content markdown-body" v-html="note.html_content"/>
  </page-layout>
</template>

<script>
import { getNote } from '@/api/notes'
import BookInfoCard from '@/components/BookInfoCard'
import Tag from '@/components/Tag'
import _ from 'lodash'

export default {
  name: 'Show',
  components: { BookInfoCard, Tag },
  data: () => ({
    note: null,
    oldRoute: null,
  }),
  methods: {
    getData(id = this.$route.params.noteId) {
      getNote(id)
        .then(res => {
          const data = res.data
          this.note = data.note

          this.$nextTick(() => {
            this.handleFootnoteAnchor()
          })
        })
    },

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

    // 如果路径相同，query 也相同，则表示路由变化时，只有 hash 变了
    checkOnlyHashChange() {
      return this.oldRoute &&
        this.oldRoute.path === this.$route.path &&
        _.isEqual(this.oldRoute.query, this.$route.query)
    },
  },
  watch: {
    $route: {
      handler(newValue) {
        // 当不是只有 hash 变了时，更新数据，并记录旧的 path 和 query
        if (!this.checkOnlyHashChange()) {
          this.oldRoute = {
            path: this.$route.path,
            query: this.$route.query,
          }
          this.getData()
        }
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss">
@import '~mavon-editor/dist/highlightjs/styles/monokai-sublime.min.css';
@import '~mavon-editor/dist/katex/katex.min.css';
@import '~mavon-editor/dist/markdown/github-markdown.min.css';
@import '~@/styles/variables';

.note-show {
  .time {
    color: $non-important-color;
    font-size: 13px;
    text-align: center;
  }

  .content {
    img {
      max-width: 100%;
    }
  }

  .tags {
    margin-top: 10px;
  }

  code {
    box-shadow: none;
    color: inherit;
    font-weight: inherit;
    white-space: inherit;
  }

  /*有id的a标签应该是锚点，加一个padding，避免顶部固定状态栏遮拦*/
  .markdown-body {
    a[id] {
      display: block;
      height: 60px;
      margin-top: -60px;
      visibility: hidden;
      float: left;
    }
  }
}
</style>
