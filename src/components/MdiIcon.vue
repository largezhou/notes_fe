<template>
  <v-progress-circular
    v-if="loading"
    :width="1.5"
    size="20"
    indeterminate
    color="rgba(0, 0, 0, .54)"
  />
  <v-icon
    v-else
    v-on="$listeners"
    ref="icon"
    :color="color"
  >mdi-{{ icon }}
  </v-icon>
</template>

<script>
export default {
  name: 'MdiIcon',
  props: {
    icon: String,
    color: String,
    loading: Boolean,
  },
}
</script>
