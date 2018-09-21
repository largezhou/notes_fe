<template>
  <div id="app">
    <v-app>
      <navbar ref="navbar"/>
      <v-content>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"/>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"/>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: { Navbar },
  data() {
    return {
      navbarHeight: 64,
    }
  },
}
</script>

<style lang="scss">
.v-content {
  margin-top: 60px;
}
</style>
