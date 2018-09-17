<template>
  <div id="app">
    <navbar/>
    <div class="content-wrapper">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"/>
    </div>
    <back-top>
      <div class="ivu-back-top-inner"><i class="el-icon-arrow-up"/></div>
    </back-top>
  </div>
</template>

<script>
import { BackTop } from 'iview'
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: { BackTop, Navbar },
}
</script>
