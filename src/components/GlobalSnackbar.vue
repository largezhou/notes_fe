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
      <mdi-icon icon="close"/>
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
      text: '',
      callback: null,
    }
  },
  mounted() {
    this.$root.$on('globalSnackbar', this.onOpen)
  },
  beforeDestroy() {
    this.$root.$off('globalSnackbar', this.onOpen)
  },
  computed: {
    ...mapState({
      widescreen: state => state.app.widescreen,
    }),
  },
  methods: {
    onOpen(msg, callback = null) {
      // 如果不这样操作的话，连续的 snackbar 不会重新计算打开时间
      this.shown = false
      this.$nextTick(() => {
        this.shown = true

        this.text = msg
        this.callback = callback
      })
    },
  },
  watch: {
    shown(newValue) {
      if (!newValue) {
        if (typeof this.callback == 'function') {
          this.callback()
        }
      }
    },
  },
}
</script>
