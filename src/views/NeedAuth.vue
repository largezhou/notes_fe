<template>
  <div style="text-align: center">
    <h1>这个页面需要登录</h1>
    <p>当前登录用户：{{ username }}</p>
    <el-button @click="onLogout">退出</el-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Message } from 'element-ui'

export default {
  name: 'NeedAuth',
  computed: {
    ...mapState({
      username: state => state.user.name,
    }),
  },
  methods: {
    onLogout() {
      this.$store
        .dispatch('logout')
        .then(() => {
          Message.success('已退出')
          this.$router.push({ name: 'login' })
        })
    },
  },
}
</script>

<style scoped>

</style>
