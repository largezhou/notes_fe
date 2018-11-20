<template>
  <page-layout v-if="note">

    <book-info-card :book="book" :expand="false"/>

    <post-detail-card :post="note"/>

  </page-layout>
</template>

<script>
import { getNote } from '@/api/notes'
import BookInfoCard from '@/components/BookInfoCard'
import ignoreHashChange from '@/mixins/ignore_hash_change'
import PostDetailCard from '@/components/PostDetailCard'

export default {
  name: 'Show',
  components: { BookInfoCard, PostDetailCard },
  mixins: [ignoreHashChange],
  data: () => ({
    note: null,
    book: null,
  }),
  methods: {
    getData(id = this.$route.params.noteId) {
      getNote(id)
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
