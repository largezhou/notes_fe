<template>
  <div style="overflow: hidden">
    <div class="book-widget">
      <div v-if="books.length == 0 && !loading" class="empty title">啥书也没看~</div>
      <template v-else>
        <v-card
          v-for="item of books"
          :key="item.id"
        >
          <v-img
            :src="item.cover"
            aspect-ratio="0.75"
          />

          <v-card-title>
            <h3 class="title">{{ item.title }}</h3>
          </v-card-title>

          <v-card-text class="footer">
            <span>{{ item.read }} / {{ item.total }} 页</span>
            <span class="pull-right">
              <human-time :time="item.updated_at" prefix="更新于："/>
            </span>
          </v-card-text>

          <v-card-actions>
            <v-spacer/>
            <v-btn :to="`/books/${item.id}`" text color="primary">详情</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </div>
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
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getBooks({ recent: 1 })
        .then(res => {
          this.books = res.data
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style lang="scss">
.book-widget {
  overflow-y: auto;
  max-height: 1500px;
  margin-right: -17px;

  .v-card {
    margin-bottom: 10px;
  }

  .title {
    margin-bottom: 10px;
  }

  .footer {
    width: 100%;
    color: #8590a6;
    font-size: 14px;
  }

  .empty {
    padding: 15px;
  }
}
</style>
