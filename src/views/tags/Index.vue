<template>
  <page-layout page-desc="所有的标签" class="tag-index">
    <v-btn
      ref="tags"
      class="tag"
      v-for="tag of tags"
      :key="tag.id"
      flat
      color="primary"
      outline
      :to="`/tags/${tag.id}`"
    >{{ tag.name }}
      <span class="count">{{ tag.notes_count }}</span>
    </v-btn>
  </page-layout>
</template>

<script>
import PageLayout from '@/components/PageLayout'
import { getTags } from '@/api/tags'
import Tags from '@/components/Tags'

export default {
  name: 'Index',
  components: { Tags, PageLayout },
  data: () => ({
    tags: [],
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
    },

  },
}
</script>

<style lang="scss">
.tag-index {
  .tag {
    margin: 10px;

    .count {
      margin-left: 10px;
      font-weight: 900;
    }
  }

  @media (max-width: 599px) {
    .tag {
      height: 30px;
      padding: 0 10px;
      min-width: 0;
      margin: 5px;

      .count {
        margin-left: 5px;
      }
    }
  }
}
</style>
