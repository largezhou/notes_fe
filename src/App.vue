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
      <v-footer color="grey lighten-2" class="flex justify-center">
        <div class="footer-items">
          <span><strong><a href="https://beian.miit.gov.cn/#/Integrated/recordQuery">湘ICP备20011753号-1</a></strong></span>
        </div>
      </v-footer>

      <back-to-top/>

      <global-confirm/>

      <slider-bar v-if="!widescreen"/>

      <new-book/>

    </v-app>
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
