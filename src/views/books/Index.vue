<template>
  <page-layout page-desc="看过的书啊" :loading="loading">
    <template v-if="books.length">
      <book-info-card
        v-for="(book, index) of books"
        :key="book.id"
        :book="book"
        :can-expand="false"
        :force-deleted-handler="onForceDelete(index)"
        animate
      />
    </template>
    <empty v-else/>
  </page-layout>
</template>

<script>
import { getBooks } from '@/api/books'
import BookInfoCard from '@/components/BookInfoCard'
import getData from '@/mixins/get_data'

export default {
  name: 'Index',
  mixins: [
    getData,
  ],
  components: {
    BookInfoCard,
  },
  data: () => ({
    books: [],
    loading: false,
  }),
  created() {
    this.getData()
  },
  methods: {
    _getData() {
      return getBooks()
        .then(res => {
          this.books = res.data
        })
    },

    onForceDelete(index) {
      return item => {
        this.books.splice(index, 1)
      }
    },
  },
  watch: {
    editMode() {
      this.getData()
    },
  },
}
</script>
