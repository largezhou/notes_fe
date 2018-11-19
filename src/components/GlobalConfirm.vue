<template>
  <v-dialog v-model="shown" max-width="290">
    <v-card>
      <v-card-title class="headline">{{ options.title }}</v-card-title>
      <v-card-text v-html="options.content"/>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :color="options.cancelColor" flat @click.native="onCancel">{{ options.cancelText }}</v-btn>
        <v-btn :color="options.okColor" flat @click.native="onOk">{{ options.okText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'GlobalConfirm',
  data: () => ({
    shown: false,

    options: {
      okText: '确认',
      okColor: 'primary',
      okCallback: null,
      cancelText: '取消',
      cancelColor: 'grey',
      cancelCallback: null,
      title: '提示',
      content: '确认？',
    },
  }),
  mounted() {
    this.$root.$on('globalConfirm', this.onOpen)
  },
  beforeDestroy() {
    this.$root.$off('globalConfirm', this.onOpen)
  },
  methods: {
    onOpen(options) {
      Object.keys(this.options).forEach(k => {
        options[k] && (this.options[k] = options[k])
      })

      this.shown = true
    },
    onCancel() {
      this.shown = false
    },
    onOk() {
      // 这里先把 Promise 标记为 resolved，之后在侦听(shown)中再执行 reject 已经没用了
      this.options.okCallback()
      this.shown = false
    },
  },
  watch: {
    shown(newValue) {
      if (!newValue) {
        this.options.cancelCallback()
      }
    },
  },
}
</script>

<style scoped lang="scss">

</style>
