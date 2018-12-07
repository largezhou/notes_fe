<template>
  <page-layout :loading="loading">
    <post-detail-card
      :post="post"
      :item="post"
      :update-handler="updatePost"
      :delete-handler="deletePost"
      :force-delete-handler="forceDeletePost"
      :edit-handler="editPost"
      @force-deleted="$router.push('/posts')"
    />
  </page-layout>
</template>

<script>
import PageLayout from '@/components/PageLayout'
import { getPost } from '@/api/posts'
import PostDetailCard from '@/components/PostDetailCard'
import getData from '@/mixins/get_data'
import ignoreHashChange from '@/mixins/ignore_hash_change'
import { deletePost, forceDeletePost, updatePost } from '@/api/posts'

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
  created() {
    this.deletePost = deletePost
    this.updatePost = updatePost
    this.forceDeletePost = forceDeletePost
    this.editPost = ''
  },
  methods: {
    _getData(postId = this.$route.params.postId) {
      return getPost(postId)
        .then(res => {
          this.post = res.data
          this.editPost = `/posts/${this.post.id}/edit`
        })
    },
  },
}
</script>
