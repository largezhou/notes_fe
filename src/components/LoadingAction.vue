<template>
  <component
    :is="comp"
    v-bind="$attrs"
    v-on="$listeners"
    @click="onAction"
    :loading="realLoading"
    :disabled="realDisabled"
  >
    <slot/>
  </component>
</template>

<script>
import VBtn from 'vuetify/lib/components/VBtn/VBtn'

export default {
  name: 'LoadingAction',
  components: {
    VBtn,
  },
  data: () => ({
    actionLoading: false,
    actionDisabled: false,
  }),
  computed: {
    realLoading() {
      return this.actionLoading || this.loading
    },
    realDisabled() {
      return this.actionDisabled || this.disabled
    },
  },
  props: {
    /**
     * 要有效的使用 loading 效果，这里必须传入一个异步函数
     */
    action: {
      type: Function,
      required: true,
    },
    /**
     * 作为什么组件
     */
    comp: {
      type: String,
      default: 'v-btn',
    },
    loading: Boolean,
    disabled: Boolean,
    /**
     * action 执行成功后，继续禁用按钮按钮一小段时间，避免连续点击
     * 当执行成功后，需要跳转页面或者关闭弹窗之类的，可以设置为 true
     * 设为 <= 0，则不会禁用
     */
    disableOnSuccess: {
      type: [String, Number],
      default: 500,
    },
  },
  beforeDestroy() {
    this.clearRecoverDisabledTimeout()
  },
  methods: {
    async onAction() {
      if (this.realLoading || this.realDisabled) {
        return false
      }
      this.actionLoading = true
      try {
        await this.action()
        this.handleDisableOnSuccess()
      } catch (e) {
        Promise.reject(e)
      }
      this.actionLoading = false
    },
    handleDisableOnSuccess() {
      if (this.disableOnSuccess > 0) {
        this.actionDisabled = true
        this.clearRecoverDisabledTimeout()
        this.recoverDisabledTimeout = setTimeout(() => {
          this.actionDisabled = false
        }, this.disableOnSuccess)
      }
    },
    clearRecoverDisabledTimeout() {
      this.recoverDisabledTimeout && clearTimeout(this.recoverDisabledTimeout)
    },
  },
}
</script>
