<template>
  <v-card class="post">
    <v-card-title class="title">
      <router-link :to="`/posts/${post.id}`">{{ post.title }}</router-link>
    </v-card-title>

    <v-card-text class="desc">{{ post.desc }}</v-card-text>

    <tags :tags="post.tags"/>

    <item-actions
      class="actions"
      v-if="username"
      v-show="editMode"
      :item="post"
      :update-handler="updatePost"
      :delete-handler="deletePost"
      :force-delete-handler="forceDeletePost"
      :edit-handler="editPost"
      @force-deleted="item => { $emit('force-deleted', item) }"
    />

    <hidden-mark v-show="post.hidden && !editMode"/>
  </v-card>
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
    this.editPost = () => {
      this.$router.push(`/posts/${this.post.id}/edit`)
    }
  },
}
</script>

<style scoped lang="scss">
.post {
  overflow: hidden;
  margin-bottom: 10px;
}

.actions {
  position: absolute;
  right: 0;
  top: 0;
  background-color: rgba(234, 234, 234, 0.5);
  border-bottom-left-radius: 4px;
}

/deep/ .v-list {
  > div {
    display: inline-block;
  }

  /deep/ .v-list__tile {
    padding: 0 10px;
  }
}
</style>
