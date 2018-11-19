import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      editMode: state => state.app.editMode,
    }),
  },
  methods: {
    toggleEditMode() {
      this.$store.commit('changeEditMode', !this.editMode)
    },
  },
}
