<template>
  <div>
    <p
      class="red--text text--darken-1"
      v-for="(error, index) of flatErrorsBag"
      :key="index"
      v-text="error"
    />
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'ErrorsBag',
  props: {
    errorsBag: Object,
  },
  computed: {
    flatErrorsBag() {
      const errors = []
      _.forIn(this.errorsBag, (fieldErrors, field) => {
        if (field == 'html_content') {
          return
        }

        fieldErrors.forEach(error => {
          errors.push(error)
        })
      })

      return errors
    },
  },
}
</script>

<style scoped lang="scss">
p {
  font-size: 16px;
}
</style>
