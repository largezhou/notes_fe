<template>
  <div class="error-wrapper">
    <v-slide-y-transition @afterLeave="afterLeave">
      <div v-show="errorMessages" class="error-message">{{ errorMessages || errorMessagesHolder }}</div>
    </v-slide-y-transition>
  </div>
</template>

<script>
export default {
  name: 'ErrorMessages',
  data: () => ({
    errorMessagesHolder: '',
  }),
  props: {
    errorMessages: String,
  },
  methods: {
    afterLeave() {
      this.errorMessagesHolder = ''
    },
  },
  watch: {
    errorMessages(newValue, oldValue) {
      if (!newValue) {
        this.errorMessagesHolder = oldValue
      }
    },
  },
}
</script>

<style scoped>

</style>
