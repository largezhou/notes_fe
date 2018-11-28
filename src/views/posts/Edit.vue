<template>
  <page-layout page-desc="调整一下博客" :loading="loading">
    <post-form :post="post"/>
  </page-layout>
</template>

<script>
import PostForm from '@/components/PostForm'
import { getPost } from '@/api/posts'
import PageLayout from '@/components/PageLayout'
import getData from '@/mixins/get_data'
import ignoreHashChange from '@/mixins/ignore_hash_change'

export default {
  name: 'Edit',
  mixins: [
    getData,
    ignoreHashChange,
  ],
  components: {
    PageLayout,
    PostForm,
  },
  data: () => ({
    post: null,
  }),
  methods: {
    _getData() {
      return getPost(this.$route.params.postId)
        .then(res => {
          this.post = res.data
        })
    },
  },
}
</script>
