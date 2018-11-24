<template>
  <page-layout :loading="loading">
    <template v-if="note">
      <book-info-card :book="book" :expand="false"/>
      <post-detail-card :post="note"/>
    </template>
  </page-layout>
</template>

<script>
import { getNote } from '@/api/notes'
import BookInfoCard from '@/components/BookInfoCard'
import ignoreHashChange from '@/mixins/ignore_hash_change'
import PostDetailCard from '@/components/PostDetailCard'
import getData from '@/mixins/get_data'

export default {
  name: 'Show',
  components: {
    BookInfoCard,
    PostDetailCard,
  },
  mixins: [
    getData,
    ignoreHashChange,
  ],
  data: () => ({
    note: null,
    book: null,
  }),
  methods: {
    _getData(id = this.$route.params.noteId) {
      return getNote(id)
        .then(res => {
          const data = res.data
          this.note = data.note
          this.book = data.book
        })
    },
  },
  watch: {
    editMode() {
      if (this.editMode) {
        this.$router.push({
          name: 'noteEdit',
          noteId: this.note.id,
        })
      }
    },
  },
}
</script>
