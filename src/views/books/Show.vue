<template>
  <v-container grid-list-md class="content book-show" v-if="book">
    <v-layout row wrap justify-center>
      <v-flex md9 sm12 class="notes-container">

        <book-info-card :book="book"/>

        <v-card class="read-progress">
          <v-progress-linear color="info" height="18" :value="readPercent"/>
          <span class="progress-text">{{ readPercent }}%</span>
        </v-card>
        <div class="notes-sort-group">
          <v-btn flat small @click="onChangeSort('page')">页数<i class="material-icons">{{ sortIcon('page') }}</i></v-btn>
          <v-btn flat small @click="onChangeSort('created_at')">时间<i class="material-icons">{{ sortIcon('created_at') }}</i></v-btn>
        </div>
        <div v-if="book.notes.length > 0">
          <book-note-item
            v-for="item of book.notes"
            :key="item.id"
            :item="item"
            :book="book"
            disable-book
          />
        </div>
      </v-flex>
    </v-layout>
  </v-container>
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
  created() {
    this.getData()
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

      return (this.sortType == 'asc') ? 'arrow_drop_up' : 'arrow_drop_down'
    },

    getData() {
      const r = this.$route
      getBook(r.params.bookId, r.query)
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
  },
  watch: {
    $route: {
      handler() {
        if (!this._inactive) {
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
