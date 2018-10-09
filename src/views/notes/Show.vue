<template>
  <page-layout v-if="note" class="note-show">
    <book-info-card :book="note.book" :expand="false"/>
    <h1 style="text-align: center">{{ note.title || '-- UNDEFINED TITLE --'}}</h1>
    <div class="time">
      <span>{{ note.created_at }}</span>
      <span style="margin-left: 20px;">{{ note.updated_at }}</span>
    </div>
    <div class="content" v-html="note.html_content"/>
  </page-layout>
</template>

<script>
import { getNote } from '@/api/notes'
import BookInfoCard from '@/components/BookInfoCard'

export default {
  name: 'Show',
  components: { BookInfoCard },
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
}
</style>
