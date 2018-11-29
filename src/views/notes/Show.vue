<template>
  <page-layout :loading="loading">
    <template v-if="note">
      <book-info-card
        :book="book"
        :expand="false"
        @force-deleted="$router.push({ name: 'bookIndex' })"
      />
      <post-detail-card
        :post="note"
        :update-handler="updateNote"
        :delete-handler="deleteNote"
        :force-delete-handler="forceDeleteNote"
        :edit-handler="editNote"
        @force-deleted="onForceDeleted"
      />
    </template>
  </page-layout>
</template>

<script>
import { getNote } from '@/api/notes'
import BookInfoCard from '@/components/BookInfoCard'
import ignoreHashChange from '@/mixins/ignore_hash_change'
import PostDetailCard from '@/components/PostDetailCard'
import getData from '@/mixins/get_data'
import { updateNote, deleteNote, forceDeleteNote } from '@/api/notes'

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
  created() {
    this.updateNote = updateNote
    this.deleteNote = deleteNote
    this.forceDeleteNote = forceDeleteNote
    this.editNote = () => {
      this.$router.push(`/notes/${this.note.id}/edit`)
    }
  },
  methods: {
    _getData(id = this.$route.params.noteId) {
      return getNote(id)
        .then(res => {
          const data = res.data
          this.note = data.note
          this.book = data.book
        })
    },
    onForceDeleted(item) {
      this.$router.push(`/books/${this.book.id}`)
    },
  },
}
</script>
