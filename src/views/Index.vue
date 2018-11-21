<template>
  <v-container grid-list-md class="content">
    <v-layout row wrap justify-center>
      <v-flex md3 class="hidden-sm-and-down">
        <book-widget/>
      </v-flex>
      <v-flex md9 sm12>
        <book-note-item
          v-for="(item, index) of notes"
          :key="item.id"
          :item="item"
          @force-deleted="onForceDelete(item, index)"
        />

        <paginator :page="page"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { getNotes } from '../api/notes'
import BookWidget from '@/components/BookWidget'
import BookNoteItem from '@/components/BookNoteItem'
import reloadData from '@/mixins/reload_data'
import Paginator from '@/components/Paginator'

export default {
  name: 'Index',
  mixins: [reloadData],
  components: { BookWidget, BookNoteItem, Paginator },
  data() {
    return {
      notes: [],
      page: null,
    }
  },
  methods: {
    getData() {
      getNotes()
        .then(res => {
          const data = res.data
          this.notes = data.data
          this.page = data.meta

          this.currentPage = this.page.current_page
          this.totalPage = this.page.last_page
        })
    },
    onForceDelete(item, index) {
      this.notes.splice(index, 1)
    },
  },
  watch: {
    editMode() {
      this.$active && this.getData()
    },
    $route() {
      this.$active && this.getData()
    },
  },
}
</script>
