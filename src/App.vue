<template>
  <div id="app">
    <v-app>
      <navbar/>
    </v-app>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: { Navbar },
}
</script>
