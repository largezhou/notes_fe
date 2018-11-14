<template>
  <page-layout page-desc="调整一下博客">
    <post-form :post="post"/>
  </page-layout>
</template>

<script>
import PostForm from '@/components/PostForm'
import { getPost } from '@/api/posts'
import PageLayout from '@/components/PageLayout'

export default {
  name: 'Edit',
  components: { PageLayout, PostForm },
  data: () => ({
    post: null,
  }),
  methods: {
    getPost() {
      getPost(this.$route.params.postId)
        .then(res => {
          this.post = res.data
        })
    },
  },
  watch: {
    $route: {
      handler(newValue) {
        this.getPost()
      },
      immediate: true,
    },
  },
}
</script>
