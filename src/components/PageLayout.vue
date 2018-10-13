<!-- 一个通用的页面布局，存在不使用该布局的情况，所以当做一个组件 -->
<template>
  <v-container grid-list-md class="content">
    <v-layout row wrap justify-center>
      <v-flex md10 sm12>
        <div v-if="pageDesc" class="page-desc">~~ {{ pageDesc }} ~~</div>
        <slot/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'PageLayout',
  props: {
    pageDesc: String,
  },
}
</script>

<style lang="scss">

</style>
