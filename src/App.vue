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

    <global-snackbar/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import GlobalSnackbar from '@/components/GlobalSnackbar'

export default {
  name: 'App',
  components: { Navbar, GlobalSnackbar },
}
</script>

<style lang="scss">
.v-content {
  margin-top: 60px;
}
</style>
