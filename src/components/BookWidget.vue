<template>
  <div class="book-widget">
    <el-card v-if="loading" v-loading="loading" style="height: 100px;"/>
    <div class="books" v-else-if="books.length > 0">
      <router-link
        v-for="item of books"
        :key="item.id"
        :to="`/books/${item.id}`"
      >
        <el-card>
          <img data-v-2d0d1aae="" :src="item.cover" class="cover">
          <div class="info">
            <div class="title">{{ item.title }}</div>
            <div class="footer">
              <span>{{ item.read }} / {{ item.total }} 页</span>
              <span class="pull-right">
                <human-time :time="item.updated_at" prefix="更新于："/>
              </span>
            </div>
          </div>
        </el-card>
      </router-link>
    </div>
    <el-card v-else>啥书也没看~~</el-card>
  </div>
</template>

<script>
import { getBooks } from '@/api/books'
import HumanTime from '@/components/HumanTime'

export default {
  name: 'BookWidget',
  components: { HumanTime },
  data() {
    return {
      books: [],
      loading: true,
    }
  },
  mounted() {
    this.getBooks()
  },
  methods: {
    getBooks() {
      getBooks()
        .then(res => {
          const data = res.data
          this.loading = false
          this.books = data.books
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
}
</script>
