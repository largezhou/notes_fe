<template>
  <page-layout page-desc="所有的标签" class="tag-index">
    <editable-tag
      v-for="(tag, index) of tags"
      :key="tag.id"
      :tag="tag"
      @deleted="onDeleted(tag, index)"
    />
  </page-layout>
</template>

<script>
import PageLayout from '@/components/PageLayout'
import EditableTag from '@/components/EditableTag'
import { getTags } from '@/api/tags'
import Tags from '@/components/Tags'

export default {
  name: 'Index',
  components: { Tags, PageLayout, EditableTag },
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
          this.tags = data
        })
    },
    onDeleted(tag, index) {
      this.tags.splice(index, 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.tag-index {
}
</style>
