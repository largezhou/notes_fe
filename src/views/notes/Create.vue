<template>
  <page-layout class="note-create" v-if="book">
    <book-info-card :book="book" :new-note-btn="false" :expand="false"/>

    <div class="page-desc">~~ 添加笔记 ~~</div>

    <note-form :book="book"/>

  </page-layout>
</template>

<script>

import { getBook } from '@/api/books'
import BookInfoCard from '@/components/BookInfoCard'
import NoteForm from '@/components/NoteForm'

export default {
  name: 'Create',
  components: { NoteForm, BookInfoCard },
  data: () => ({
    book: null,
  }),
  created() {
    this.getBook()
  },
  methods: {
    getBook() {
      getBook(this.$route.params.bookId)
        .then(res => {
          const data = res.data
          this.book = data.book
        })
    },
  },
}
</script>
