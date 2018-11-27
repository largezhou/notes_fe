<template>
  <page-layout page-desc="这里是博客" :loading="loading">
    <template v-if="posts.length">
      <post-item
        v-for="(post, index) of posts"
        :key="post.id"
        :post="post"
        @force-deleted="onForceDeleted(post, index)"
      />
    </template>
    <empty v-else/>
    <paginator v-if="posts.length" :page="page"/>
  </page-layout>
</template>

<script>
import PageLayout from '@/components/PageLayout'
import reloadData from '@/mixins/reload_data'
import { getPosts } from '@/api/posts'
import PostItem from '@/components/PostItem'
import Paginator from '@/components/Paginator'
import getData from '@/mixins/get_data'

export default {
  name: 'Index',
  mixins: [
    reloadData,
    getData,
  ],
  components: {
    PageLayout,
    PostItem,
    Paginator,
  },
  data: () => ({
    posts: [],
    page: null,
  }),
  methods: {
    _getData() {
      return getPosts()
        .then(res => {
          const data = res.data
          this.posts = data.data
          this.page = data.meta
        })
    },
    onForceDeleted(post, index) {
      this.posts.splice(index, 1)
    },
  },
  watch: {
    editMode(newValue) {
      this.$active && this.getData()
    },
    $route() {
      this.$active && this.getData()
    },
  },
}
</script>
