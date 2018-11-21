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

        <div class="text-xs-center" v-if="page">
          <v-pagination
            v-model="currentPage"
            :length="totalPage"
            :total-visible="totalVisible"
            @input="onPageChange"
          />
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { getNotes } from '../api/notes'
import BookWidget from '@/components/BookWidget'
import BookNoteItem from '@/components/BookNoteItem'
import reloadData from '@/mixins/reload_data'
import { mapState } from 'vuex'

export default {
  name: 'Index',
  mixins: [reloadData],
  components: { BookWidget, BookNoteItem },
  data() {
    return {
      notes: [],
      page: null,
      totalVisible: 9,
      currentPage: 1,
      totalPage: 1,
    }
  },
  computed: {
    ...mapState({
      widescreen: state => state.app.widescreen,
    }),
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

    // 如果侦听 currentPage 属性，则又会有页面缓存了，导致多次获取数据的问题
    onPageChange(page) {
      this.$router.push({
        name: this.$route.name,
        query: Object.assign({}, this.$route.query, { page }),
      })
    },
  },
  watch: {
    editMode() {
      this.$active && this.getData()
    },
    widescreen: {
      handler(newValue) {
        this.totalVisible = newValue ? 9 : 5
      },
      immediate: true,
    },
    $route() {
      this.$active && this.getData()
    },
  },
}
</script>
