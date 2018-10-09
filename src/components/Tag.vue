<template>
  <v-btn
    class="tag"
    flat
    color="primary"
    :outline="outline"
    :to="`/tags/${tag.id}`"
  >{{ tag.name }}
  </v-btn>
</template>

<script>
export default {
  name: 'Tag',
  props: {
    tag: Object,
    outline: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="scss">
.tag {
  height: 25px;
  min-width: initial;
  padding: 0 10px;
  margin: 5px;
}
</style>
