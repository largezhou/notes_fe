<template>
  <page-layout v-if="tag" :page-desc="`${this.tag.name} • ${this.tag.count}`">

    <v-tabs
      fixed-tabs
      v-model="type"
      color="transparent"
    >
      <v-tab class="tag-type" href="#notes">笔记{{ this.notes.length ? ` • ${this.notes.length}` : '' }}</v-tab>
      <v-tab class="tag-type" href="#posts">博客{{ this.posts.length ? ` • ${this.posts.length}` : '' }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="type" class="white elevation-1">
      <v-tab-item
        value="notes"
      >
        <v-card>
          <v-card-text>
            <h1>NOTES</h1>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item
        value="posts"
      >
        <v-card>
          <v-card-text>
            <h1>POSTS</h1>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

  </page-layout>
</template>

<script>
import PageLayout from '@/components/PageLayout'
import { getTag } from '@/api/tags'

export default {
  name: 'Show',
  components: { PageLayout },
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
    getData() {
      getTag(this.$route.params.tagId)
        .then(res => {
          const data = res.data
          this.tag = data
          this.notes = data.notes
          this.posts = data.posts
        })
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
  },
}
</script>

<style scoped lang="scss">
.tag-type {
  font-size: 16px;
  font-weight: 600;
}
</style>
