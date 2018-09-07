<template>
  <div class="container content">
    <el-row :gutter="10" type="flex" justify="center">
      <el-col :md="6" class="hidden-sm-and-down">
        <el-card class="box-card">
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :md="18" :sm="20" class="notes-container">
        <el-card
          v-for="item of notes"
          :key="item.id"
          class="box-card"
        >
          <div slot="header">
            <div class="time">{{ item.created_at }}</div>
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
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getNotes } from '../api/notes'

export default {
  name: 'Index',
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
