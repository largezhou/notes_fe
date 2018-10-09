<template>
  <div class="v-form-item v-input-upload" :class="{ 'has-error': hasError }">
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
import vFormItem from '@/mixins/vform_item'

export default {
  name: 'FilePicker',
  mixins: [vFormItem],
  data: () => ({
    src: '',
    filename: '',
  }),
  props: {
    accept: {
      type: String,
      default: '*/*',
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
  },
}
</script>

<style lang="scss">
$uploader-size: 100px;
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

  input {
    width: 0;
    height: 0;
    display: none;
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