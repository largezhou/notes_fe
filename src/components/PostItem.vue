<template>
  <v-slide-y-reverse-transition @afterLeave="$emit('force-deleted', post)">
    <v-card class="post" v-show="!post.force_deleted">
      <v-card-title class="title">
        <router-link :to="`/posts/${post.id}`">{{ post.title }}</router-link>
      </v-card-title>

      <v-card-text class="desc">{{ post.desc }}</v-card-text>

      <tags :tags="post.tags"/>

      <item-actions
        set-top
        class="actions"
        v-if="username"
        v-show="editMode"
        :item="post"
        :update-handler="updatePost"
        :delete-handler="deletePost"
        :force-delete-handler="forceDeletePost"
        :edit-handler="editPost"
        @force-deleted="item => $set(item, 'force_deleted', true)"
      />

      <hidden-mark v-show="post.hidden && !editMode"/>
    </v-card>
  </v-slide-y-reverse-transition>
</template>

<script>
import Tags from '@/components/Tags'
import { mapState } from 'vuex'
import { deletePost, forceDeletePost, updatePost } from '@/api/posts'
import ItemActions from '@/components/ItemActions'
import HiddenMark from '@/components/HiddenMark'

export default {
  name: 'PostItem',
  components: { Tags, ItemActions, HiddenMark },
  computed: {
    ...mapState({
      username: state => state.user.name,
    }),
  },
  props: {
    post: Object,
  },
  created() {
    this.deletePost = deletePost
    this.updatePost = updatePost
    this.forceDeletePost = forceDeletePost
    this.editPost = `/posts/${this.post.id}/edit`
  },
}
</script>

<style scoped lang="scss">
.post {
  overflow: hidden;
  margin-bottom: 10px;
}

.actions {
  border-bottom-left-radius: 4px;
}
</style>
