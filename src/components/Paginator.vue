<template>
  <div
    class="text-center"
    v-if="page && page.total > 0 && page.last_page > 1"
  >
    <v-pagination
      :value="page.current_page"
      :length="page.last_page"
      :total-visible="widescreen ? 9 : 5"
      @input="onPageChange"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Paginator',
  props: {
    page: Object,
  },
  data: () => ({
    totalVisible: 9,
  }),
  computed: {
    ...mapState({
      widescreen: state => state.app.widescreen,
    }),
  },
  methods: {
    onPageChange(page) {
      this.$router.push({
        name: this.$route.name,
        query: Object.assign({}, this.$route.query, { page }),
      })
    },
  },
}
</script>
