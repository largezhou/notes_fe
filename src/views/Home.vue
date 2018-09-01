<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <el-button @click="onClick">ELButton</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { Message } from 'element-ui'

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
  methods: {
    onClick() {
      Message('呵呵')
    },
  },
}
</script>
