import _get from 'lodash/get'

export const vFile = value => {
  return value instanceof File
}

export const vImage = value => {
  return (value instanceof File) && (value.type.indexOf('image/') === 0)
}

export const validateErrorsMixins = {
  methods: {
    validateErrors(key) {
      const data = _get(this.$v, key)
      // 输入框没有输入过值时，不要显示错误消息
      if (!data.$dirty) {
        return
      }

      const validators = data.$params
      for (const vt of Object.keys(validators)) {
        if (!data[vt]) {
          return _get(this.attrs, key)[vt]
        }
      }
    },
  },
}
