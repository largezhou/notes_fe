export default {
  computed: {
    editMode() {
      return this.$route.query.edit_mode !== undefined
    },
  },
  methods: {
    toggleEditMode() {
      const q = { ...this.$route.query }

      if (q.edit_mode !== undefined) {
        delete q.edit_mode
      } else {
        q.edit_mode = 1
      }

      this.$router.push({
        path: this.$route.path,
        query: q,
      })
    },
  },
}
