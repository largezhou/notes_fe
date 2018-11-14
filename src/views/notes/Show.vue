<template>
  <page-layout v-if="note">

    <book-info-card :book="book" :expand="false"/>

    <post-detail-card :post="note"/>

  </page-layout>
</template>

<script>
import { getNote } from '@/api/notes'
import BookInfoCard from '@/components/BookInfoCard'
import _ from 'lodash'
import seo from '@/mixins/seo'
import ignoreHashChange from '@/mixins/ignore_hash_change'
import PostDetailCard from '@/components/PostDetailCard'

export default {
  name: 'Show',
  components: { BookInfoCard, PostDetailCard },
  mixins: [seo, ignoreHashChange],
  data: () => ({
    note: null,
    book: null,
  }),
  computed: {
    pageTitle() {
      if (this.note == null) {
        return ''
      }

      return `${_.get(this.note, 'book.title')} 第${this.note.page}页 ${_.get(this.note, 'title') || ''}`
    },
    pageDesc() {
      return this.note ? this.note.desc : ''
    },
    pageKeywords() {
      const tags = this.note ? this.note.tags : []

      return tags.map(t => t.name).join(',')
    },
  },
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
}
</script>
