<template>
  <page-layout page-desc="笔记调整一下">

    <note-form :note="note" :book="book"/>

  </page-layout>
</template>

<script>
import PageLayout from '@/components/PageLayout'
import NoteForm from '@/components/NoteForm'
import { getNote } from '@/api/notes'

export default {
  name: 'Edit',
  components: { PageLayout, NoteForm },
  data: () => ({
    note: null,
    book: null,
  }),
  created() {
    this.getNote()
  },
  methods: {
    getNote() {
      getNote(this.$route.params.noteId)
        .then(res => {
          const data = res.data
          this.book = data.note.book
          this.note = data.note
        })
    },
  },
}
</script>

<style scoped>

</style>
