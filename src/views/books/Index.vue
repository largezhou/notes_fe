<template>
  <page-layout page-desc="看过的书啊">
    <book-info-card
      v-for="(book, index) of books"
      :key="book.id"
      :book="book"
      :can-expand="false"
      editable
      @force-deleted="onForceDelete(book, index)"
    />
  </page-layout>
</template>

<script>
import { getBooks } from '@/api/books'
import BookInfoCard from '@/components/BookInfoCard'
import { mapState } from 'vuex'

export default {
  name: 'Index',
  components: { BookInfoCard },
  data: () => ({
    books: [],
  }),
  computed: {
    ...mapState({
      editMode: state => state.app.editMode,
    }),
  },
  created() {
    this.getData()
  },
  methods: {
    getData(query) {
      getBooks(query)
        .then(res => {
          const data = res.data
          this.books = data.books
        })
    },

    onForceDelete(book, index) {
      this.books.splice(index, 1)
    },
  },
  watch: {
    editMode(newValue) {
      this.getData({
        edit_mode: newValue || null,
      })
    },
  },
}
</script>

<style lang="scss">
</style>
