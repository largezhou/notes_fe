<template>
  <div class="container content">
    <el-row :gutter="10" type="flex" justify="center">
      <el-col :md="6" class="hidden-sm-and-down">
        <book-widget/>
      </el-col>
      <el-col :md="18" :sm="20" class="notes-container">
        <el-card
          v-for="item of notes"
          :key="item.id"
        >
          <div slot="header">
            <div class="time">
              <human-time :time="item.created_at" prefix="发布于："/>
            </div>
            <div>
              <div class="belong">
                <div v-if="item.book">
                  <router-link :to="`/books/${item.book.id}`">{{ item.book.title }}</router-link>
                  •
                  <router-link :to="`/books/${item.book.id}/pages/${item.page}`">第{{ item.page }}页</router-link>
                </div>
                <div v-else>书不见啦~</div>
              </div>
              <div v-if="item.title" class="title">
                <router-link :to="`/notes/${item.id}`">{{ item.title }}</router-link>
              </div>
            </div>
          </div>
          <div>
            <router-link :to="`/notes/${item.id}`">{{ item.desc }}</router-link>
          </div>
          <div class="card-footer">
            <el-tag
              v-for="tag of item.tags"
              :key="tag.id"
              size="small"
              disable-transitions
            >
              <router-link :to="`/tags/${tag.id}`">{{ tag.name }}</router-link>
            </el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getNotes } from '../api/notes'
import BookWidget from '@/components/BookWidget'
import HumanTime from '@/components/HumanTime'

export default {
  name: 'Index',
  components: { BookWidget, HumanTime },
  data() {
    return {
      notes: [],
    }
  },
  created() {
    getNotes()
      .then(res => {
        const data = res.data
        this.notes = data.notes
      })
  },
}
</script>
