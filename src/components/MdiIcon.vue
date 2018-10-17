<template>
  <v-icon v-on="$listeners" ref="icon" :color="color">mdi-{{ icon }}</v-icon>
</template>

<script>
export default {
  name: 'MdiIcon',
  props: {
    icon: String,
    color: String,
  },
}
</script>
