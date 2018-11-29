<template>
  <page-layout class="note-create" :loading="loading">
    <template v-if="book">
      <book-info-card
        :book="book"
        :new-note-btn="false"
        :expand="false"
        @force-deleted="$router.push({ name: 'bookIndex' })"
      />

      <div class="page-desc">~~ 添加笔记 ~~</div>

      <note-form :book="book"/>
    </template>
  </page-layout>
</template>

<script>

import { getBook } from '@/api/books'
import BookInfoCard from '@/components/BookInfoCard'
import NoteForm from '@/components/NoteForm'
import ignoreHashChange from '@/mixins/ignore_hash_change'

export default {
  name: 'Create',
  mixins: [
    ignoreHashChange,
  ],
  components: {
    NoteForm,
    BookInfoCard,
  },
  data: () => ({
    book: null,
    loading: false,
  }),
  methods: {
    getData() {
      this.loading = true

      getBook(this.$route.params.bookId)
        .then(res => {
          const data = res.data
          this.book = data.book
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
