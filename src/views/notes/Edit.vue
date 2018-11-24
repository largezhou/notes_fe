<template>
  <page-layout page-desc="笔记调整一下" :loading="loading">
    <note-form :note="note" :book="book"/>
  </page-layout>
</template>

<script>
import PageLayout from '@/components/PageLayout'
import NoteForm from '@/components/NoteForm'
import { getNote } from '@/api/notes'
import getData from '@/mixins/get_data'

export default {
  name: 'Edit',
  mixins: [
    getData,
  ],
  components: {
    PageLayout,
    NoteForm,
  },
  data: () => ({
    note: null,
    book: null,
  }),
  methods: {
    _getData() {
      return getNote(this.$route.params.noteId)
        .then(res => {
          const data = res.data
          this.book = data.book
          this.note = data.note
        })
    },
  },
  watch: {
    $route: {
      handler() {
        this.getData()
      },
      immediate: true,
    },
  },
}
</script>

<style scoped>

</style>
