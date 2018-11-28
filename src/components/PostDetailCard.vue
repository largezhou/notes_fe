<template>
  <v-card class="post-info-card" v-if="post">
    <v-card-text class="post-content-card">
      <h1 style="text-align: center">{{ post.title || '-- UNDEFINED TITLE --'}}</h1>
      <div class="time">
        <v-tooltip top>
          <span slot="activator">{{ post.created_at }}</span>
          <span>添加于</span>
        </v-tooltip>

        <v-tooltip top style="margin-left: 10px;">
          <span slot="activator">{{ post.updated_at }}</span>
          <span>修改于</span>
        </v-tooltip>
      </div>

      <tags :tags="post.tags"/>

      <markdown-body :content="post.html_content"/>

    </v-card-text>

    <hidden-mark v-show="post.hidden"/>

    <item-action
      class="actions"
      :item="post"
      v-if="username"
      v-show="editMode"
      :update-handler="updateHandler"
      :delete-handler="deleteHandler"
      :force-delete-handler="forceDeleteHandler"
      :edit-handler="editHandler"
      @force-deleted="item => { $emit('force-deleted', item) }"
    />
  </v-card>
</template>

<script>
import Tags from '@/components/Tags'
import MarkdownBody from '@/components/MarkdownBody'
import HiddenMark from '@/components/HiddenMark'
import ItemAction from '@/components/ItemActions'
import { mapState } from 'vuex'

export default {
  name: 'PostDetailCard',
  components: {
    Tags,
    MarkdownBody,
    HiddenMark,
    ItemAction,
  },
  props: {
    post: Object,
    updateHandler: Function,
    deleteHandler: Function,
    forceDeleteHandler: Function,
    editHandler: Function,
  },
  computed: {
    ...mapState({
      username: state => state.user.name,
    }),
  },
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables';

.post-info-card {
  margin-top: 10px;
  position: relative;
  overflow: hidden;
}

.time {
  color: $non-important-color;
  font-size: 13px;
  text-align: center;
}

.post-content-card {
  padding: 20px;
}

@media (max-width: 599px) {
  .post-content-card {
    padding: 10px;
  }
}

.actions {
  left: 0;
  top: 0;
  border-bottom-right-radius: 4px !important;
}
</style>
