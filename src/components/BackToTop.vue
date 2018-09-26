<template>
  <v-scale-transition>
    <v-btn
      v-if="topBtnShown"
      fab
      dark
      small
      bottom
      right
      fixed
      color="red"
      @click="$vuetify.goTo(0)"
    >
      <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>
  </v-scale-transition>
</template>

<script>
export default {
  name: 'BackToTop',
  data: () => ({
    topBtnShown: false,
    hideOverY: 500,

    oldY: 0,
  }),
  mounted() {
    this.oldY = window.scrollY

    this.handleScrollTop()

    window.addEventListener('scroll', this.handleScrollTop)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScrollTop)
  },
  methods: {
    handleScrollTop() {
      const scrollYNow = window.scrollY
      this.topBtnShown = (scrollYNow > this.hideOverY) && (scrollYNow < this.oldY)

      this.oldY = scrollYNow
    },
  },
}
</script>
