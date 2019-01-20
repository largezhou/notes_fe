<template>
  <page-layout class="book-show" :loading="loading">
    <template v-if="book">
      <book-info-card
        :book="book"
        :expand.sync="expandBookCard"
      />

      <v-card class="read-progress">
        <v-progress-linear color="info" height="18" :value="readPercent"/>
        <span class="progress-text">{{ readPercent }}%</span>
      </v-card>
      <div class="notes-sort-group">
        <v-btn flat @click="onChangeSort('page')">页数
          <mdi-icon :icon="sortIcon('page')"/>
        </v-btn>
        <v-btn flat @click="onChangeSort('created_at')">时间
          <mdi-icon :icon="sortIcon('created_at')"/>
        </v-btn>
        <v-spacer style="height: 0;"/>
        <v-text-field
          class="search-page"
          flat
          solo
          append-icon="mdi-magnify"
          label="页数..."
          hide-details
          @click:append=""
        />
      </div>
      <div v-if="notesLoading" class="text-xs-center">
        <v-progress-circular
          :size="40"
          :width="2"
          color="primary"
          indeterminate
        />
      </div>
      <template v-else>
        <div v-if="notes.length">
          <book-note-item
            v-for="(item, index) of notes"
            :key="item.id"
            :item="item"
            :book="book"
            disable-book
            @force-deleted="onForceDelete(item, index)"
          />
          <paginator :page="page"/>
        </div>
        <empty v-else/>
      </template>
    </template>
  </page-layout>
</template>

<script>
import BookNoteItem from '@/components/BookNoteItem'
import { getBook } from '@/api/books'
import reloadData from '@/mixins/reload_data'
import BookInfoCard from '@/components/BookInfoCard'
import getData from '@/mixins/get_data'
import { getBooksNotes } from '@/api/books'
import Paginator from '@/components/Paginator'

export default {
  name: 'Show',
  mixins: [
    reloadData,
    getData,
  ],
  components: {
    BookNoteItem,
    BookInfoCard,
    Paginator,
  },
  data() {
    return {
      sortField: 'page',
      sortType: 'desc',

      book: null,
      notes: [],
      page: null,

      loading: false,

      oldBookId: null,
      notesLoading: false,

      expandBookCard: true,
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

    _getData() {
      const r = this.$route
      return getBook(r.params.bookId)
        .then(res => {
          const data = res.data
          this.book = data.book
          this.notes = data.notes
          this.page = data.meta

          this.oldBookId = this.book.id
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
      this.notes.splice(index, 1)
    },
    getNotes() {
      this.notesLoading = true
      getBooksNotes(this.book.id, this.$route.query)
        .then(res => {
          const data = res.data
          this.notes = data.data
          this.page = data.meta
        })
        .finally(() => {
          this.notesLoading = false
        })
    },
  },
  watch: {
    $route: {
      handler() {
        this.initSort()

        if (this.$active) {
          // 记录旧的 bookId，如果路由中 bookId 变了，则重新获取所有数据，否则只获取笔记的数据
          if (this.oldBookId !== this.$route.params.bookId) {
            this.getData()
          } else {
            this.expandBookCard = false
            this.getNotes()
          }
        }
      },
      immediate: true,
    },
    editMode() {
      this.$active && this.getData()
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
    display: flex;

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

  .search-page {
    max-width: 150px;
    @media (max-width: 599px) {
      max-width: 100px;
    }

    .v-input__control {
      min-height: 36px;
    }
  }
}
</style>
