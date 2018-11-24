<template>
  <page-layout :loading="loading">
    <post-detail-card :post="post"/>
  </page-layout>
</template>

<script>
import PageLayout from '@/components/PageLayout'
import { getPost } from '@/api/posts'
import PostDetailCard from '@/components/PostDetailCard'
import getData from '@/mixins/get_data'
import ignoreHashChange from '@/mixins/ignore_hash_change'

export default {
  name: 'Show',
  components: {
    PageLayout,
    PostDetailCard,
  },
  mixins: [
    getData,
    ignoreHashChange,
  ],
  data: () => ({
    post: null,
  }),
  methods: {
    _getData(postId = this.$route.params.postId) {
      return getPost(postId)
        .then(res => {
          this.post = res.data
        })
    },
  },
  watch: {
    editMode() {
      if (this.editMode) {
        this.$router.push({
          name: 'postEdit',
          noteId: this.post.id,
        })
      }
    },
  },
}
</script>
