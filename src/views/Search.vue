<template>
  <page-layout
    :page-desc="pageDesc"
    :loading="loading"
  >
    <template v-if="items.length">
      <search-result-item
        v-for="item of items"
        :key="`${item.type}-${item.id}`"
        :item="item"
      />
    </template>
    <empty v-else/>
  </page-layout>
</template>

<script>
import getData from '@/mixins/get_data'
import { search } from '@/api/search'
import SearchResultItem from '@/components/SearchResultItem'
import reloadData from '@/mixins/reload_data'

export default {
  name: 'Search',
  mixins: [
    getData,
    reloadData,
  ],
  components: {
    SearchResultItem,
  },
  computed: {
    q() {
      return this.$route.query.q || ''
    },
    pageDesc() {
      return this.q
        ? `搜索 “${this.q}” 的结果`
        : '搜啥搜呢'
    },
  },
  data: () => ({
    items: [],
  }),
  methods: {
    _getData() {
      return search(this.q)
        .then(res => {
          this.items = res.data
        })
    },
  },
  watch: {
    $route() {
      this.$active && this.getData()
    },
  },
}
</script>

<style scoped lang="scss">
</style>
