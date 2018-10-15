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

    // 使用这种方式，只监听一次 editMode 的开启
    this.unWatchEditMode = this.$watch('editMode', newValue => {
      if (newValue) {
        this.getData({
          edit_mode: newValue,
        })

        this.unWatchEditMode()
      }
    })
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
}
</script>

<style lang="scss">
</style>
