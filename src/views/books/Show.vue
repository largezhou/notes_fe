<template>
  <div class="container content book-show" v-if="book">
    <el-row :gutter="10" type="flex" justify="center">
      <el-col :md="18" :sm="20">
        <el-card>
          <el-row :gutter="20" type="flex">
            <el-col :span="6" :xs="8" class="cover">
              <img :src="book.cover">
            </el-col>
            <el-col :span="16" class="info">
              <div class="title">{{ book.title }}</div>
              <div class="item">
                <span class="label">开始阅读</span>
                <human-time :time="book.started_at" prefix="开始于："/>
              </div>
              <div class="item">
                <span class="label">更新</span>
                <human-time :time="book.updated_at" prefix="最近更新："/>
              </div>
              <div class="item">
                <span class="label">已读</span>
                <span>{{ book.read }}</span> 页
              </div>
              <div class="item">
                <span class="label">总页数</span>
                <span>{{ book.total }}</span> 页
              </div>
              <div class="item">
                <span class="label">笔记</span>
                <span>{{ book.notes.length }}</span> 条
              </div>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="progress">
          <el-progress
            :percentage="readPercent"
            :stroke-width="20"
            :text-inside="true"
          ></el-progress>
        </el-card>
        <el-button-group class="notes-sort-group">
          <el-button size="mini" plain @click="onChangeSort('page')">页数 <span>{{ sortIcon('page') }}</span></el-button>
          <el-button size="mini" plain @click="onChangeSort('created_at')">时间 <span>{{ sortIcon('created_at') }}</span></el-button>
        </el-button-group>
        <div v-if="book.notes.length > 0">
          <book-note-item
            v-for="item of book.notes"
            :key="item.id"
            :item="item"
            :book="book"
            disable-book
          />
        </div>
        <el-card class="no-notes" v-else>没有任何笔记</el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HumanTime from '@/components/HumanTime'
import BookNoteItem from '@/components/BookNoteItem'
import { getBook } from '@/api/books'

export default {
  name: 'Show',
  components: { HumanTime, BookNoteItem },
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

      return (this.sortType == 'asc') ? '↑' : '↓'
    },

    getData() {
      const r = this.$route
      getBook(r.params.id, r.query)
        .then(res => {
          const data = res.data
          this.book = data.book
        })
    },
  },
  watch: {
    $route: {
      handler(newValue) {
        const sortField = ['page', 'created_at']
        const sortType = ['desc', 'asc']

        const query = newValue.query

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
      immediate: true,
    },
  },
}
</script>

<style lang="scss">
@import "~@/styles/variables";

.book-show {
  .cover {
    max-width: 150px;
    img {
      width: 100%;
    }
  }

  .info {
    padding: 10px 10px 0 10px;
    font-size: 15px;

    .title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .item {
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .label {
    display: inline-block;
    width: 65px;
    margin-right: 10px;
    color: $non-important-color;
  }

  @media only screen and (max-width: 768px) {
    .info {
      font-size: 14px;

      .title {
        font-size: 16px;
      }
    }
  }

  .progress {
    margin: 5px 0;

    .el-card__body {
      padding: 0;
    }

    .el-progress-bar__outer,
    .el-progress-bar__inner {
      border-radius: 0;
    }
  }

  .notes-sort-group {
    margin-bottom: 5px;
    button {
      padding: 3px 5px;
      background-color: #f6f6f6;
    }
  }

  .no-notes {
    font-size: 14px;
    text-align: center;
    color: $non-important-color;

    .el-card__body {
      padding: 80px 10px;
    }
  }
}
</style>
