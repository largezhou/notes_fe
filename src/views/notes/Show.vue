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

export default {
  name: 'Show',
  components: { BookInfoCard, Tag },
  data: () => ({
    note: null,
  }),
  methods: {
    getData(id = this.$route.params.noteId) {
      getNote(id)
        .then(res => {
          const data = res.data
          this.note = data.note
        })
    },
  },
  watch: {
    $route: {
      handler(newValue) {
        this.getData()
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
  .markdown-body a[id] {
    display: block;
    height: 60px;
    margin-top: -60px;
    visibility: hidden;
  }
}
</style>
