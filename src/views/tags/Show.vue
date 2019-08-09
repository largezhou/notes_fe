<template>
  <page-layout :page-desc="tag ?`${tag.name} • ${tag.targets_count}` : ''" :loading="loading">
    <template v-if="tag">
      <v-tabs
        fixed-tabs
        v-model="type"
        background-color="transparent"
      >
        <v-tab class="tag-type" href="#notes">笔记{{ this.notes.length ? ` • ${this.notes.length}` : '' }}</v-tab>
        <v-tab class="tag-type" href="#posts">博客{{ this.posts.length ? ` • ${this.posts.length}` : '' }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="type" style="margin-top: 10px; background: transparent">
        <v-tab-item value="notes">
          <template v-if="notes.length">
            <book-note-item
              v-for="(note, index) of notes"
              :key="note.id"
              :item="note"
              :book="note.book"
              @force-deleted="onForceDelete('notes', index)"
            />
          </template>
          <empty v-else/>
        </v-tab-item>

        <v-tab-item value="posts">
          <template v-if="posts.length">
            <post-item
              v-for="(post, index) of posts"
              :key="post.id"
              :post="post"
              @force-deleted="onForceDelete('posts', index)"
            />
          </template>
          <empty v-else/>
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
import MdiIcon from '@/components/MdiIcon'

export default {
  name: 'Show',
  mixins: [
    getData,
  ],
  components: {
    MdiIcon,
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
