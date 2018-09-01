<template>
  <div style="text-align: center">
    <h1>登录</h1>
    <el-button @click="onClick">点击登录</el-button>
  </div>
</template>

<script>
import { Message } from 'element-ui'

export default {
  name: 'Login',
  methods: {
    onClick() {
      this.$store
        .dispatch('login', {
          data: {
            mobile: '18688472412',
            password: '000000',
          },
        })
        .then(res => {
          Message.success('登录成功')
          this.$router.push({ name: 'needAuth' })
        })
    },
  },
}
</script>

<style scoped>

</style>
