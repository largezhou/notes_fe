<template>
  <page-layout>
    <post-detail-card :post="post"/>
  </page-layout>
</template>

<script>
import PageLayout from '@/components/PageLayout'
import { getPost } from '@/api/posts'
import ignoreHashChange from '@/mixins/ignore_hash_change'
import PostDetailCard from '@/components/PostDetailCard'

export default {
  name: 'Show',
  components: { PageLayout, PostDetailCard },
  mixins: [ignoreHashChange],
  data: () => ({
    post: null,
  }),
  methods: {
    getData(postId = this.$route.params.postId) {
      getPost(postId)
        .then(res => {
          this.post = res.data.post
        })
    },
  },
}
</script>
