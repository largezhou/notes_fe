<template>
  <div>
    <div class="tags" :class="{ collapsed }">
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
      <v-card class="post" v-for="post of posts" :key="post.id">
        <v-card-title class="title">
          <router-link :to="`/posts/${post.id}`">{{ post.title }}</router-link>
        </v-card-title>

        <v-card-text class="desc">{{ post.desc }}</v-card-text>

        <tags :tags="post.tags" :outline="false"/>

      </v-card>
    </page-layout>
  </div>
</template>

<script>
import PageLayout from '@/components/PageLayout'
import reloadData from '@/mixins/reload_data'
import { getTags } from '@/api/tags'
import { getPosts } from '@/api/posts'
import Tags from '@/components/Tags'

export default {
  name: 'Index',
  mixins: [reloadData],
  components: { PageLayout, Tags },
  data: () => ({
    tags: [],
    posts: [],

    collapsed: true,
  }),
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getTags()
        .then(res => {
          const data = res.data
          this.tags = data.tags
        })

      getPosts()
        .then(res => {
          const data = res.data
          this.posts = data.posts
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.tags {
  margin-top: 10px;
}

.tag {
  min-width: 0;
  height: 30px;
  padding: 0 10px;
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

.post {
  + .post {
    margin-top: 10px;
  }
}
</style>
