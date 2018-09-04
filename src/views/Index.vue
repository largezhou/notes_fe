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
            <span class="note-title">{{ item.title }}</span>
          </div>
          <div>
            {{ item.desc }}
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
