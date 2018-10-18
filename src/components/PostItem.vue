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
      :edit-handler="editPost"
      @force-deleted="item => { $emit('force-deleted', item) }"
    />
  </v-card>
</template>

<script>
import Tags from '@/components/Tags'
import { mapState } from 'vuex'
import { deletePost, updatePost } from '@/api/posts'
import ItemActions from '@/components/ItemActions'

export default {
  name: 'PostItem',
  components: { Tags, ItemActions },
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
    this.editPost = () => {
      this.$router.push(`/posts/${this.post.id}/edit`)
    }
  },
}
</script>

<style scoped lang="scss">
.post {
  + .post {
    margin-top: 10px;
  }
}

.actions {
  position: absolute;
  right: 0;
  top: 0;
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
