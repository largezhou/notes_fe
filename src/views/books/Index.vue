<template>
  <page-layout page-desc="看过的书啊">
    <book-info-card
      v-for="(book, index) of books"
      :key="book.id"
      :book="book"
      :can-expand="false"
      @force-deleted="onForceDelete(book, index)"
    />
  </page-layout>
</template>

<script>
import { getBooks } from '@/api/books'
import BookInfoCard from '@/components/BookInfoCard'

export default {
  name: 'Index',
  components: { BookInfoCard },
  data: () => ({
    books: [],
  }),
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getBooks()
        .then(res => {
          const data = res.data
          this.books = data
        })
    },

    onForceDelete(book, index) {
      this.books.splice(index, 1)
    },
  },
  watch: {
    editMode(newValue) {
      this.getData()
    },
  },
}
</script>

<style lang="scss">
</style>
