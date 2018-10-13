export default {
  data: () => ({
    oldRoute: null,
  }),
  methods: {
    // 如果路径相同，query 也相同，则表示路由变化时，只有 hash 变了
    checkOnlyHashChange() {
      return this.oldRoute &&
        this.oldRoute.path === this.$route.path &&
        _.isEqual(this.oldRoute.query, this.$route.query)
    },
  },

  watch: {
    $route: {
      handler(newValue) {
        // 当不是只有 hash 变了时，更新数据，并记录旧的 path 和 query
        if (!this.checkOnlyHashChange()) {
          this.oldRoute = {
            path: this.$route.path,
            query: this.$route.query,
          }
          this.getData()
        }
      },
      immediate: true,
    },
  },
}
