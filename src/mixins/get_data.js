export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    getData() {
      this.loading = true

      this._getData()
        .finally(() => {
          this.loading = false
        })
    },
  },
}
