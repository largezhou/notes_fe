<template>
  <div style="text-align: center">
    <h1>这个页面需要登录</h1>
    <p>当前登录用户：{{ username }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NeedAuth',
  computed: {
    ...mapState({
      username: state => state.user.name,
    }),
  },
}
</script>

<style scoped>

</style>
