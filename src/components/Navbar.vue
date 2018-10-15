<template>
  <div class="navbar-wrapper v-toolbar primary">
    <div class="container">
      <v-toolbar dark color="primary" ref="toolbar">
        <v-toolbar-side-icon v-if="!widescreen" @click="onToggleSliderBar"/>

        <v-toolbar-items class="brand-icon" v-if="widescreen">
          <v-btn to="/" flat>
            <img width="30" height="30" src="@/assets/logo.png">
          </v-btn>
        </v-toolbar-items>

        <v-toolbar-items v-if="widescreen">
          <v-btn to="/books" flat>看过</v-btn>
          <v-btn to="/tags" flat>标签</v-btn>
          <v-btn to="/posts" flat>博客</v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-toolbar-items v-if="widescreen && username">
          <v-menu left offset-y>
            <v-btn slot="activator" flat class="more-menu">
              <v-icon>more_horiz</v-icon>
            </v-btn>
            <v-list>

              <new-book>
                <v-list-tile @click="">
                  <span class="navbar-menu-icon"><v-icon>add</v-icon></span>
                  <v-list-tile-title>看 书</v-list-tile-title>
                </v-list-tile>
              </new-book>

              <v-list-tile to="/posts/create">
                <span class="navbar-menu-icon"><v-icon>create</v-icon></span>
                <v-list-tile-title>博 客</v-list-tile-title>
              </v-list-tile>

              <v-divider/>

              <v-list-tile @click="onToggleEditMode">
                <span class="navbar-menu-icon"><v-icon>{{ editMode ? 'done' : 'keyboard' }}</v-icon></span>
                <v-list-tile-title>{{ editMode ? '完 成' : '编 辑' }}</v-list-tile-title>
              </v-list-tile>

              <v-divider/>

              <v-list-tile @click="onLogout">
                <span class="navbar-menu-icon"><v-icon>exit_to_app</v-icon></span>
                <v-list-tile-title>退 出</v-list-tile-title>
              </v-list-tile>

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
      sliderBar: state => state.app.sliderBar,
      editMode: state => state.app.editMode,
    }),
  },
  methods: {
    onLogout() {
      this.$store
        .dispatch('logout')
        .then(() => {
          this.$snackbar('已退出')
          if (utils.needAuth(this.$route)) {
            location.href = '/'
          } else {
            location.reload()
          }
        })
    },

    onToggleSliderBar() {
      this.$store.commit('toggleSliderBar')
    },

    onToggleEditMode() {
      this.$store.commit('toggleEditMode')
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
