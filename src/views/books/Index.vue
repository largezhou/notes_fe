<template>
  <page-layout>
    <div class="page-desc">~~ 看过的书啊 ~~</div>
    <book-info-card v-for="book of books" :key="book.id" :book="book" :can-expand="false"/>
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
          this.books = data.books
        })
    },
  },
}
</script>

<style lang="scss">
</style>
