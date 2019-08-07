<template>
  <div id="app" v-resize="onWindowResize" :class="[{ 'edit-mode': editMode }, deviceClass]">
    <v-app>
      <navbar ref="navbar"/>
      <v-content>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" :key="$route.name"/>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"/>
      </v-content>
      <v-footer app color="grey lighten-2" class="flex justify-center">
        <div class="footer-items">
          <span class="copyright">Copyright <strong>largezhou</strong></span>
          <span><strong><a href="mailto:largezhou@hotmail.com">largezhou@hotmail.com</a></strong></span>
        </div>
      </v-footer>
    </v-app>

    <back-to-top/>
    <global-confirm/>
    <slider-bar v-if="!widescreen"/>
    <new-book/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import GlobalConfirm from '@/components/GlobalConfirm'
import BackToTop from '@/components/BackToTop'
import { mapState } from 'vuex'
import SliderBar from '@/components/SliderBar'
import NewBook from './components/NewBook'

export default {
  name: 'App',
  components: {
    NewBook,
    SliderBar,
    Navbar,
    BackToTop,
    GlobalConfirm,
  },
  data: () => ({
    marginTop: '64px',
  }),
  computed: {
    ...mapState({
      widescreen: state => state.app.widescreen,
      device: state => state.app.device,
    }),
    deviceClass() {
      return `device-${this.device}`
    },
  },
  methods: {
    onWindowResize() {
      const width = window.innerWidth

      // 更新是不是宽屏的状态
      const widescreen = width >= 600
      if (widescreen !== this.widescreen) {
        this.$store.commit('changeWidescreen', widescreen)
      }
    },
  },
}
</script>

<style lang="scss">
#app .v-speed-dial {
  position: fixed;
}

.footer-items {
  span {
    + span {
      margin-left: 20px;
    }
  }

  .copyright {
    white-space: nowrap;
  }
}
</style>
