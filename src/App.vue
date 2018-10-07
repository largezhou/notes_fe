<template>
  <div id="app" v-resize="onWindowResize">
    <v-app>
      <navbar ref="navbar"/>
      <v-content>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"/>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"/>
      </v-content>
    </v-app>

    <back-to-top/>
    <global-snackbar/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import GlobalSnackbar from '@/components/GlobalSnackbar'
import BackToTop from '@/components/BackToTop'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: { Navbar, GlobalSnackbar, BackToTop },
  computed: {
    ...mapState({
      widescreen: state => state.app.widescreen,
    }),
  },
  methods: {
    onWindowResize() {
      const widescreen = window.innerWidth >= 600

      if (widescreen != this.widescreen) {
        this.$store.commit('changeWidescreen', widescreen)
      }
    },
  },
}
</script>

<style lang="scss">
.v-content {
  margin-top: 60px;
}

#app .v-speed-dial {
  position: fixed;
}
</style>
