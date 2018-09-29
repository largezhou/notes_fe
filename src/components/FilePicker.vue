<template>
  <div class="v-input-upload" :class="{ 'has-error': hasError }">
    <div class="label">{{ label }}</div>
    <div class="picker" @click="onClickPicker">
      <v-icon v-if="!this.filename">cloud_upload</v-icon>
      <v-tooltip top v-else>
        <img v-if="src" :src="src" slot="activator"/>
        <v-icon v-else slot="activator">insert_drive_file</v-icon>
        <span>{{ filename }}</span>
      </v-tooltip>

      <v-scale-transition>
        <v-btn
          v-if="filename"
          absolute
          dark
          fab
          color="pink"
          class="clear"
          @click.stop="onClear"
        >
          <v-icon>clear</v-icon>
        </v-btn>
      </v-scale-transition>
    </div>
    <div class="error-message">{{ errorMessages }}</div>

    <input type="file" :accept="accept" readonly ref="input" @change="onInputChange"/>
  </div>
</template>

<script>
import { vImage } from '@/validators'
import utils from '@/libs/utils'

export default {
  name: 'FilePicker',
  data: () => ({
    src: '',
    filename: '',
  }),
  props: {
    label: String,
    value: {},
    errorMessages: String,
    accept: {
      type: String,
      default: '*/*',
    },
  },
  created() {
    this.registerToVForm()
  },
  computed: {
    hasError() {
      return !!this.errorMessages
    },
  },
  methods: {
    onClickPicker() {
      this.$refs.input.click()
    },
    onInputChange(e) {
      const file = e.target.files[0] || null

      if (file) {
        this.$emit('input', file)
        this.handleFilePreview(file)
      }
    },
    handleFilePreview(file) {
      this.filename = file.name

      if (vImage(file)) {
        this.src = URL.createObjectURL(file)
      } else {
        this.src = ''
      }
    },
    onClear() {
      this.reset()
    },
    reset() {
      this.src = ''
      this.filename = ''
      this.$refs.input.value = null
      this.$emit('input', null)
    },
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
</script>

<style lang="scss">
$uploader-size: 100px;
$error-color: #ff5252 !important;
$clear-btn-size: 24px;
$clear-btn-pos: -6px;

.v-input-upload {
  display: inline-block;

  .picker {
    width: $uploader-size;
    height: $uploader-size;
    line-height: $uploader-size;
    text-align: center;
    border: 1px dashed #ccc;
    cursor: pointer;
    position: relative;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .label {
    color: rgba(0, 0, 0, .54);
    font-size: 16px;
    margin-bottom: 5px;
  }

  input {
    width: 0;
    height: 0;
    display: none;
  }

  &.has-error {
    .label {
      color: $error-color;
    }
  }

  .error-message {
    margin-top: 4px;
    font-size: 12px;
    color: $error-color;
    overflow-wrap: break-word;
    word-break: break-word;
    word-wrap: break-word;
    height: 18px;
  }

  .clear {
    position: absolute;
    top: $clear-btn-pos;
    right: $clear-btn-pos;
    z-index: 1;
    height: $clear-btn-size;
    width: $clear-btn-size;
  }
}
</style>
