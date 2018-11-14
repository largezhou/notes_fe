<template>
  <page-layout v-if="tag" :page-desc="`${this.tag.name} • ${this.tag.count}`">

  </page-layout>
</template>

<script>
import PageLayout from '@/components/PageLayout'
import { getTag } from '@/api/tags'

export default {
  name: 'Show',
  components: { PageLayout },
  data: () => ({
    tag: null,
  }),
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getTag(this.$route.params.tagId)
        .then(res => {
          this.tag = res.data
        })
    },
  },
}
</script>
