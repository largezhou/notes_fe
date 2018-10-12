<template>
  <div class="navbar-wrapper v-toolbar primary">
    <div class="container">
      <v-toolbar dark color="primary" ref="toolbar">
        <v-toolbar-items class="brand-icon">
          <v-btn to="/" flat>
            <img width="30" height="30" src="@/assets/logo.png">
          </v-btn>
        </v-toolbar-items>
        <v-toolbar-items v-if="widescreen">
          <v-btn to="/books" flat>看过</v-btn>
          <v-btn to="/tags" flat>标签</v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-toolbar-items v-if="username || !widescreen">
          <v-menu left offset-y>
            <v-btn slot="activator" flat class="more-menu">
              <v-icon>more_horiz</v-icon>
            </v-btn>
            <v-list>
              <div v-if="!widescreen">
                <v-list-tile to="/books">
                  <span class="navbar-menu-icon"><v-icon>library_books</v-icon></span>
                  <v-list-tile-title>看过</v-list-tile-title>
                </v-list-tile>
                <v-list-tile to="/tags">
                  <span class="navbar-menu-icon"><v-icon>text_fields</v-icon></span>
                  <v-list-tile-title>标签</v-list-tile-title>
                </v-list-tile>
              </div>

              <v-divider v-if="username && !widescreen"/>

              <div v-if="username">
                <new-book/>
                <v-list-tile @click="onLogout">
                  <span class="navbar-menu-icon"><v-icon>exit_to_app</v-icon></span>
                  <v-list-tile-title>退出登录</v-list-tile-title>
                </v-list-tile>
              </div>
            </v-list>
          </v-menu>
        </v-toolbar-items>
      </v-toolbar>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import utils from '@/libs/utils'
import NewBook from '@/components/NewBook'

export default {
  name: 'Navbar',
  components: { NewBook },
  computed: {
    ...mapState({
      username: state => state.user.name,
      widescreen: state => state.app.widescreen,
    }),
  },
  methods: {
    onLogout() {
      this.$store
        .dispatch('logout')
        .then(() => {
          this.$snackbar('已退出')
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
    padding: 0;
  }

  .brand-icon {
    .v-btn {
      padding: 0;
      min-width: 45px;
    }
  }

  .more-menu {
    &.v-btn {
      padding: 0;
      min-width: 45px;
    }
  }
}

.navbar-menu-icon {
  margin-right: 10px;
}
</style>
