<template>
  <v-snackbar
    v-model="shown"
    :top="widescreen"
  >
    {{ text }}
    <v-btn
      color="pink"
      text
      @click="shown = false"
    >
      <mdi-icon icon="close"/>
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex'
import Vue from 'vue'

export default Vue.extend({
  name: 'GlobalSnackbar',
  data() {
    return {
      shown: false,
    }
  },
  props: {
    text: {
      type: String,
      required: true,
    },
    callback: Function,
  },
  mounted() {
    this.shown = true
  },
  computed: {
    ...mapState({
      widescreen: state => state.app.widescreen,
    }),
  },
  watch: {
    shown(newValue) {
      if (!newValue) {
        if (typeof this.callback == 'function') {
          this.callback()
        }

        this.$nextTick(() => {
          this.$destroy()
        })
      }
    },
  },
})
</script>
