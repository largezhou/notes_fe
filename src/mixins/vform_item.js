import utils from '@/libs/utils'

export default {
  props: {
    label: String,
    value: {},
    errorMessages: String,
    placeholder: String,
  },
  computed: {
    hasError() {
      return !!this.errorMessages
    },
  },
  created() {
    this.registerToVForm()
  },
  methods: {
    /**
     * 如果父组件中有v-form，则向他注册，
     * 这样v-form调用reset时，可以调用该组件的reset方法
     */
    registerToVForm() {
      const vForm = utils.findParentByTag(this, 'v-form')
      vForm && vForm.register(this)
    },
  },
}
