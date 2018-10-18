<template>
  <post-form :post="post"/>
</template>

<script>
import PostForm from '@/components/PostForm'
import { getPost } from '@/api/posts'

export default {
  name: 'Edit',
  components: { PostForm },
  data: () => ({
    post: null,
  }),
  methods: {
    getPost() {
      getPost(this.$route.params.postId)
        .then(res => {
          this.post = res.data.post
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
