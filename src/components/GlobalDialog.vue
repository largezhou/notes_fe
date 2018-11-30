<template>
  <v-dialog v-model="shown" :max-width="maxWidth" :content-class="className">
    <v-card>
      <v-card-title class="headline" v-if="title" v-text="title"/>

      <v-card-text v-if="typeof content == 'function'">
        <dialog-content :h="content"/>
      </v-card-text>
      <v-card-text v-else-if="html" v-html="content"/>
      <v-card-text v-else v-text="content"/>

      <v-card-actions v-if="actions">
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="shown = false">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from 'vue'

const DialogContent = {
  name: 'DialogContent',
  props: {
    h: {
      type: Function,
      required: true,
    },
  },
  render(h) {
    return this.h(h)
  },
}

export default Vue.extend({
  name: 'GlobalDialog',
  components: { DialogContent },
  data: () => ({
    shown: false,
  }),
  props: {
    title: {
      default: '提醒',
    },
    content: {
      required: true,
    },
    maxWidth: {
      default: 290,
    },
    html: Boolean,
    className: String,
    actions: {
      type: Boolean,
      default: true,
    },
    escCLose: Boolean,
  },
  mounted() {
    this.shown = true
    document.addEventListener('keydown', this.onEscDown)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.onEscDown)
  },
  methods: {
    onEscDown(e) {
      if (this.escCLose && e.code == 'Escape') {
        this.shown = false
      }
    },
  },
  watch: {
    shown(newValue) {
      if (!newValue) {
        this.$nextTick(() => {
          setTimeout(() => {
            // 延迟移除组件，等待弹框的动画结束...
            document.body.removeChild(this.$el)
            this.$destroy()
          }, 500)
        })
      }
    },
  },
})
</script>

<style scoped lang="scss">

</style>
