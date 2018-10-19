<template>
  <page-layout class="book-show" v-if="book">
    <book-info-card :book="book"/>

    <v-card class="read-progress">
      <v-progress-linear color="info" height="18" :value="readPercent"/>
      <span class="progress-text">{{ readPercent }}%</span>
    </v-card>
    <div class="notes-sort-group">
      <v-btn flat small @click="onChangeSort('page')">页数
        <mdi-icon :icon="sortIcon('page')"/>
      </v-btn>
      <v-btn flat small @click="onChangeSort('created_at')">时间
        <mdi-icon :icon="sortIcon('created_at')"/>
      </v-btn>
    </div>
    <div v-if="book.notes.length > 0">
      <book-note-item
        v-for="(item, index) of book.notes"
        :key="item.id"
        :item="item"
        :book="book"
        disable-book
        @force-deleted="onForceDelete(item, index)"
      />
    </div>
  </page-layout>
</template>

<script>
import BookNoteItem from '@/components/BookNoteItem'
import { getBook } from '@/api/books'
import reloadData from '@/mixins/reload_data'
import BookInfoCard from '@/components/BookInfoCard'

export default {
  name: 'Show',
  mixins: [reloadData],
  components: { BookNoteItem, BookInfoCard },
  data() {
    return {
      sortField: 'page',
      sortType: 'desc',

      book: null,
    }
  },
  computed: {
    readPercent() {
      if (this.book.read > this.book.total) {
        return 100
      } else {
        return Math.ceil(this.book.read / this.book.total * 100)
      }
    },
    createNoteLink() {
      return {
        name: 'noteCreate',
        params: {
          id: this.book.id,
        },
      }
    },
  },
  methods: {
    onChangeSort(field) {
      if (this.sortField == field) {
        this.sortType = this.sortType == 'desc' ? 'asc' : 'desc'
      } else {
        this.sortField = field
        this.sortType = 'desc'
      }

      this.$router.push({
        path: this.$route.path,
        query: Object.assign({}, this.$route.query, { _sort_field: this.sortField, _sort_type: this.sortType }),
      })
    },

    sortIcon(field) {
      if (this.sortField != field) {
        return ''
      }

      return (this.sortType == 'asc') ? 'menu-up' : 'menu-down'
    },

    getData() {
      const r = this.$route
      getBook(r.params.bookId)
        .then(res => {
          const data = res.data
          this.book = data.book
        })
    },

    initSort() {
      const sortField = ['page', 'created_at']
      const sortType = ['desc', 'asc']

      const query = this.$route.query

      if (sortField.indexOf(query._sort_field) === -1) {
        this.sortField = 'page'
      } else {
        this.sortField = query._sort_field
      }

      if (sortType.indexOf(query._sort_type) === -1) {
        this.sortType = 'desc'
      } else {
        this.sortType = query._sort_type
      }
    },
    onForceDelete(item, index) {
      this.book.notes.splice(index, 1)
    },
  },
  watch: {
    $route: {
      handler() {
        if (this.$active) {
          this.initSort()
          this.getData()
        }
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss">
@import "~@/styles/variables";

.book-show {
  .read-progress {
    position: relative;

    .progress-text {
      position: absolute;
      right: 10px;
      top: 0;
      z-index: 1;
      font-weight: 500;
    }

    .v-progress-linear {
      margin: 10px 0;
    }
  }

  .notes-sort-group {
    margin-bottom: 10px;
    .v-btn {
      margin: 0;
      padding: 3px 5px;
      background-color: #f6f6f6;
    }
  }

  .no-notes {
    font-size: 14px;
    text-align: center;
    color: $non-important-color;
  }
}
</style>
