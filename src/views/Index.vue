<template>
  <v-container grid-list-md class="content">
    <v-layout row wrap justify-center>
      <v-flex md3 class="hidden-sm-and-down">
        <book-widget/>
      </v-flex>
      <v-flex md9 sm12 class="notes-container">
        <book-note-item
          v-for="item of notes"
          :key="item.id"
          :item="item"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { getNotes } from '../api/notes'
import BookWidget from '@/components/BookWidget'
import BookNoteItem from '@/components/BookNoteItem'
import reloadData from '@/mixins/reload_data'

export default {
  name: 'Index',
  mixins: [reloadData],
  components: { BookWidget, BookNoteItem },
  data() {
    return {
      notes: [],
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getNotes()
        .then(res => {
          const data = res.data
          this.notes = data.notes
        })
    },
  },
}
</script>
