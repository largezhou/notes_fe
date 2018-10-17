<template>
  <div v-scroll="handleScrollTop">
    <v-scale-transition>
      <v-btn
        v-if="topBtnShown && !goTopScrolling"
        fab
        dark
        small
        bottom
        right
        fixed
        color="red"
        @click="onGoTop"
      >
        <mdi-icon icon="arrow-collapse-up"/>
      </v-btn>
    </v-scale-transition>
  </div>
</template>

<script>
export default {
  name: 'BackToTop',
  data: () => ({
    topBtnShown: false,
    hideOverY: 500,

    oldY: 0,
    goTopScrolling: false,
  }),
  mounted() {
    this.oldY = window.scrollY
  },
  methods: {
    handleScrollTop() {
      const scrollYNow = window.scrollY
      this.topBtnShown = (scrollYNow > this.hideOverY) && (scrollYNow < this.oldY)

      this.oldY = scrollYNow
    },
    onGoTop() {
      this.goTopScrolling = true
      this.$vuetify.goTo(0).finally(() => {
        this.goTopScrolling = false
      })
    },
  },
}
</script>

<style lang="scss">
.v-btn--floating.v-btn--absolute,
.v-btn--floating.v-btn--fixed {
  z-index: 1;
}
</style>
