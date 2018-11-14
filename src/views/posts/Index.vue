<template>
  <page-layout page-desc="这里是博客">
    <post-item
      v-for="(post, index) of posts"
      :key="post.id"
      :post="post"
      @force-deleted="onForceDeleted(post, index)"
    />
  </page-layout>
</template>

<script>
import PageLayout from '@/components/PageLayout'
import reloadData from '@/mixins/reload_data'
import { getPosts } from '@/api/posts'
import PostItem from '@/components/PostItem'

export default {
  name: 'Index',
  mixins: [reloadData],
  components: { PageLayout, PostItem },
  data: () => ({
    posts: [],
  }),
  methods: {
    getData() {
      this.getPosts()
    },
    getPosts() {
      getPosts()
        .then(res => {
          const data = res.data
          this.posts = data
        })
    },
    onForceDeleted(post, index) {
      this.posts.splice(index, 1)
    },
  },
  watch: {
    editMode(newValue) {
      this.$active && this.getPosts()
    },
  },
}
</script>
