<template>
  <page-layout page-desc="看过的书啊">
    <book-info-card v-for="book of books" :key="book.id" :book="book" :can-expand="false" editable/>
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
