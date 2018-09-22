<template>
  <div class="navbar-wrapper v-toolbar primary">
    <div class="container">
      <v-toolbar dark color="primary" ref="toolbar">
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-items>
          <v-btn to="/" flat>
            <img width="30" height="30" src="@/assets/logo.png">
          </v-btn>
        </v-toolbar-items>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn to="/books" flat>书</v-btn>
          <v-btn to="/tags" flat>标签</v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-toolbar-items v-if="username" class="hidden-sm-and-down">
          <v-btn flat>
            <i class="material-icons">edit</i>
          </v-btn>
          <v-btn flat @click="onLogout">
            <i class="material-icons">exit_to_app</i>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import utils from '@/libs/utils'

export default {
  name: 'Navbar',
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
          alert('已退出')
          if (utils.needAuth(this.$route)) {
            this.$router.push({ name: 'index' })
          }
        })
    },
  },
}
</script>

<style lang="scss">
.v-btn--active:before {
  background-color: initial;
}

.navbar-wrapper {
  z-index: 2;
  position: fixed;
  left: 0;
  top: 0;

  .v-toolbar {
    box-shadow: none;
  }

  .v-btn {
    font-size: 18px;
  }

  .v-toolbar__content {
    height: 60px !important;
  }
}
</style>
