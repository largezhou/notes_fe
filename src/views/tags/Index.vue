<template>
  <page-layout page-desc="所有的标签" class="tag-index" :loading="loading">
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
import getData from '@/mixins/get_data'

export default {
  name: 'Index',
  mixins: [
    getData,
  ],
  components: {
    Tags,
    PageLayout,
    EditableTag,
  },
  data: () => ({
    tags: [],
    loading: false,
  }),
  created() {
    this.getData()
  },
  methods: {
    _getData() {
      return getTags()
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
