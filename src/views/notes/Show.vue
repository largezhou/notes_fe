<template>
  <page-layout v-if="note" class="note-show">
    <h1>{{ note.title }}</h1>
    <p v-html="note.html_content"/>
  </page-layout>
</template>

<script>
import { getNote } from '@/api/notes'

export default {
  name: 'Show',
  data: () => ({
    note: null,
  }),
  methods: {
    getData(id = this.$route.params.noteId) {
      getNote(id)
        .then(res => {
          const data = res.data
          this.note = data.note
        })
    },
  },
  watch: {
    $route: {
      handler(newValue) {
        this.getData()
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss">

</style>
