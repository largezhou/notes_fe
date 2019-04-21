<template>
  <div id="app" v-resize="onWindowResize" :class="[{ 'edit-mode': editMode }, deviceClass]">
    <v-app>
      <navbar ref="navbar"/>
      <v-content :style="{ marginTop }">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" :key="$route.name"/>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"/>
      </v-content>
      <v-footer color="grey lighten-2 text-xs-center">
        <div class="container footer-items">
          <span>Copyright <strong>largezhou</strong></span>
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
      if (widescreen != this.widescreen) {
        this.$store.commit('changeWidescreen', widescreen)
      }

      // 捉摸不透导航栏的高度是怎么变化的，就这样 hack 一下
      clearTimeout(this._st)
      this._st = setTimeout(() => {
        this.marginTop = this.$refs.navbar.$el.offsetHeight + 'px'
      }, 500)
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
}
</style>
