<template>
  <page-layout v-if="note" class="note-show">
    <h1>NOTE SHOW</h1>
  </page-layout>
</template>

<script>
export default {
  name: 'Show',
  data: () => ({
    note: {},
  }),
}
</script>

<style lang="scss">

</style>
