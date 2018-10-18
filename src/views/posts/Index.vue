<template>
  <div>
    <div v-if="tags.length > 0" class="tags-banner" :class="{ collapsed }">
      <v-btn
        v-for="tag of tags"
        :key="tag.id"
        class="tag"
        flat
        color="primary"
        outline
        :to="`/tags/${tag.id}`"
      >{{ tag.name }}
        <span class="count">{{ tag.posts_count }}</span>
      </v-btn>
      <v-btn
        :ripple="false"
        class="tag more"
        flat
        color="primary"
        @click="collapsed = !collapsed"
        v-text="collapsed ? '更多' : '收起'"
        :absolute="collapsed"
      />
    </div>
    <page-layout page-desc="这里是博客">
      <post-item
        v-for="(post, index) of posts"
        :key="post.id"
        :post="post"
        @force-deleted="onForceDeleted(post, index)"
      />
    </page-layout>
  </div>
</template>

<script>
import PageLayout from '@/components/PageLayout'
import reloadData from '@/mixins/reload_data'
import { getTags } from '@/api/tags'
import { getPosts } from '@/api/posts'
import PostItem from '@/components/PostItem'

export default {
  name: 'Index',
  mixins: [reloadData],
  components: { PageLayout, PostItem },
  data: () => ({
    tags: [],
    posts: [],

    collapsed: true,
  }),
  methods: {
    getData() {
      this.getPosts()
      this.getTags()
    },
    getTags() {
      getTags()
        .then(res => {
          const data = res.data
          this.tags = data.tags
        })
    },
    getPosts() {
      getPosts()
        .then(res => {
          const data = res.data
          this.posts = data.posts
        })
    },
    onForceDeleted(post, index) {
      this.posts.splice(index, 1)
    },
  },
  watch: {
    editMode(newValue) {
      !this._inactive && this.getPosts()
    },
  },
}
</script>

<style lang="scss" scoped>
.tags-banner {
  margin-top: 10px;

  .tag {
    min-width: 0;
    height: 30px;
    padding: 0 10px;
  }
}

.collapsed {
  position: relative;
  overflow: hidden;
  height: 42px;
  padding-right: 50px;

  .more {
    top: 6px;
    right: 0;
  }
}

.count {
  margin-left: 5px
}
</style>
