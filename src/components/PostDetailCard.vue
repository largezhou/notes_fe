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
  </v-card>
</template>

<script>
import Tags from '@/components/Tags'
import MarkdownBody from '@/components/MarkdownBody'
import HiddenMark from '@/components/HiddenMark'

export default {
  name: 'PostDetailCard',
  components: { Tags, MarkdownBody, HiddenMark },
  props: {
    post: Object,
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
</style>
