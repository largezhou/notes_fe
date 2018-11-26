<template>
  <page-layout :page-desc="tag ?`${tag.name} • ${tag.count}` : ''" :loading="loading">
    <template v-if="tag">
      <v-tabs
        fixed-tabs
        v-model="type"
        color="transparent"
      >
        <v-tab class="tag-type" href="#notes">笔记{{ this.notes.length ? ` • ${this.notes.length}` : '' }}</v-tab>
        <v-tab class="tag-type" href="#posts">博客{{ this.posts.length ? ` • ${this.posts.length}` : '' }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="type" class="elevation-1" style="margin-top: 10px;">
        <v-tab-item value="notes">
          <book-note-item
            v-for="(note, index) of notes"
            :key="note.id"
            :item="note"
            :book="note.book"
            @force-deleted="onForceDelete('notes', index)"
          />
        </v-tab-item>

        <v-tab-item value="posts">
          <post-item
            v-for="(post, index) of posts"
            :key="post.id"
            :post="post"
            @force-deleted="onForceDelete('posts', index)"
          />
        </v-tab-item>
      </v-tabs-items>
    </template>
  </page-layout>
</template>

<script>
import PageLayout from '@/components/PageLayout'
import { getTag } from '@/api/tags'
import BookNoteItem from '@/components/BookNoteItem'
import PostItem from '@/components/PostItem'
import getData from '@/mixins/get_data'

export default {
  name: 'Show',
  mixins: [
    getData,
  ],
  components: {
    PageLayout,
    BookNoteItem,
    PostItem,
  },
  data: () => ({
    tag: null,
    notes: [],
    posts: [],
    type: 'notes',
  }),
  created() {
    this.getData()
  },
  methods: {
    _getData() {
      return getTag(this.$route.params.tagId)
        .then(res => {
          const data = res.data
          this.tag = data
          this.notes = data.notes
          this.posts = data.posts
        })
    },
    onForceDelete(type, index) {
      this[type].splice(index, 1)
    },
  },
  watch: {
    $route: {
      handler() {
        let hash = this.$route.hash.substr(1)
        hash = hash == 'posts' ? 'posts' : 'notes'

        this.type = hash
      },
      immediate: true,
    },
    type(newValue) {
      this.$router.push({
        path: this.path,
        query: this.query,
        hash: newValue,
      })
    },
    editMode() {
      this.getData()
    },
  },
}
</script>

<style scoped lang="scss">
.tag-type {
  font-size: 16px;
  font-weight: 600;
}
</style>
