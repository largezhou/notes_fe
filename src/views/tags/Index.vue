<template>
  <page-layout page-desc="所有的标签">
    <tags :tags="tags"/>
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

</style>
