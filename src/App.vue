<template>
  <div id="app">
    <div class="navbar-wrapper">
      <div class="container">
        <el-row :gutter="10" type="flex" justify="center header">
          <el-col :md="24" :sm="20">
            <router-link class="navbar-brand" to="/">
              <img width="30" height="30" src="./assets/logo.png">
            </router-link>
            <router-link to="/books">书</router-link>
            <router-link to="/tags">标签</router-link>
            <el-dropdown
              v-if="username"
              class="more pull-right"
              trigger="click"
              @command="onMoreCommand"
            >
              <a href="javascript:void(0);" class="el-icon-more"></a>
              <el-dropdown-menu slot="dropdown">

                <el-dropdown-item command="edit">编辑</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>

              </el-dropdown-menu>

            </el-dropdown>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-scrollbar class="content-wrapper">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import utils from '@/libs/utils'

export default {
  name: 'App',
  computed: {
    ...mapState({
      username: state => state.user.name,
    }),
  },
  methods: {
    onMoreCommand(command) {
      switch (command) {
        case 'logout':
          this.$store
            .dispatch('logout')
            .then(() => {
              this.$message.success('已退出')
              if (utils.needAuth(this.$route)) {
                this.$router.push({ name: 'index' })
              }
            })
          break
      }
    },
  },
}
</script>
