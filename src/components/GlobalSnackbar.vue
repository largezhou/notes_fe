<template>
  <v-snackbar
    v-model="shown"
    :top="widescreen"
  >
    {{ text }}
    <v-btn
      color="pink"
      flat
      @click="shown = false"
    >
      <i class="material-icons">close</i>
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'GlobalSnackbar',
  data() {
    return {
      shown: false,
    }
  },
  computed: {
    ...mapState({
      snackbarShown: state => state.snackbar.shown,
      text: state => state.snackbar.text,
      widescreen: state => state.app.widescreen,
    }),
  },
  watch: {
    snackbarShown(newValue) {
      this.shown = newValue
    },

    shown(newValue) {
      if (!newValue) {
        this.$store.commit('closeSnackbar')
      }
    },
  },
}
</script>
