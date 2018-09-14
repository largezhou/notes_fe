<template>
  <div class="container content">
    <el-row :gutter="10" type="flex" justify="center">
      <el-col :md="6" class="hidden-sm-and-down">
        <book-widget/>
      </el-col>
      <el-col :md="18" :sm="20" class="notes-container">
        <book-note-item
          v-for="item of notes"
          :key="item.id"
          :item="item"
        />
      </el-col>
    </el-row>
  </div>
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
