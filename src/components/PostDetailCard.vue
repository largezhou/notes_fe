<template>
  <v-card class="post-info-card" v-if="post">
    <v-card-text class="post-content-card">
      <h2
        v-show="subTitle"
        class="text-center sub-title"
        style="font-weight: unset"
      >{{ subTitle }}</h2>
      <h1 class="detail-title text-center grey--text text--darken-3">{{ post.title }}</h1>
      <div class="time">
        <v-tooltip top>
          <template #activator="{ on }">
            <span v-on="on">{{ post.created_at }}</span>
          </template>
          <span>添加于</span>
        </v-tooltip>

        <v-tooltip top style="margin-left: 10px;">
          <template #activator="{ on }">
            <span v-on="on">{{ post.updated_at }}</span>
          </template>
          <span>修改于</span>
        </v-tooltip>
      </div>

      <tags :tags="post.tags" style="margin-bottom: 10px;"/>

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
    editHandler: [Function, String],
    subTitle: String,
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
  position: relative;
  overflow: hidden;
}

.time {
  color: $non-important-color;
  font-size: 14px;
  text-align: center;
  margin-bottom: 5px;
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
  left: 5px;
  right: initial;
  border-bottom-right-radius: 4px !important;
}

.detail-title {
  line-height: 35px;
}

.sub-title {
  line-height: 30px;
}
</style>
