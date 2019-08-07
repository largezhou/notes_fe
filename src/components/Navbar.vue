<template>
  <v-app-bar
    app
    dark
    color="primary"
    ref="toolbar"
    scroll-off-screen
    fixed
    class="navbar"
    extension-height="60"
    hide-on-scroll
    :scroll-threshold="100"
  >
    <div class="v-toolbar__content wrapper container">
      <v-btn flat icon v-if="!widescreen" @click="onToggleSliderBar">
        <mdi-icon icon="menu"/>
      </v-btn>

      <v-toolbar-items v-if="widescreen">
        <v-btn to="/" text>
          <img width="30" height="30" src="@/assets/logo.png">
        </v-btn>
      </v-toolbar-items>

      <v-toolbar-items v-if="widescreen">
        <v-btn to="/books" text>看过</v-btn>
        <v-btn to="/tags" text>标签</v-btn>
        <v-btn to="/posts" text>博客</v-btn>
        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn v-on="on" to="/read-records" text>路</v-btn>
          </template>
          <span>Long Hard Road Out Of Hell</span>
        </v-tooltip>
      </v-toolbar-items>

      <v-spacer @click="onGoLogin" style="height: inherit;"/>

      <navbar-search/>

      <v-menu left bottom v-if="widescreen && username">
        <template #activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="$root.$emit('createBook')">
            <span class="navbar-menu-icon"><mdi-icon icon="book-plus"/></span>
            <v-list-item-title>看 书</v-list-item-title>
          </v-list-item>

          <v-list-item to="/posts/create">
            <span class="navbar-menu-icon"><mdi-icon icon="square-edit-outline"/></span>
            <v-list-item-title>博 客</v-list-item-title>
          </v-list-item>

          <v-divider/>

          <v-list-item @click="onToggleEditMode">
            <span class="navbar-menu-icon"><mdi-icon :icon="editMode ? 'check' : 'keyboard'"/></span>
            <v-list-item-title>{{ editMode ? '完 成' : '编 辑' }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="onBackup">
            <span class="navbar-menu-icon"><mdi-icon icon="cloud-upload-outline"/></span>
            <v-list-item-title>备 份</v-list-item-title>
          </v-list-item>

          <v-divider/>

          <v-list-item @click="onLogout">
            <span class="navbar-menu-icon"><mdi-icon icon="exit-to-app"/></span>
            <v-list-item-title>退 出</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'
import NewBook from '@/components/NewBook'
import NavbarSearch from '@/components/NavbarSearch'
import { postBackup } from '@/api/backups'

export default {
  name: 'Navbar',
  components: {
    NewBook,
    NavbarSearch,
  },
  computed: {
    ...mapState({
      username: state => state.user.name,
      widescreen: state => state.app.widescreen,
      sliderBar: state => state.app.sliderBar,
    }),
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout')
    },

    onToggleSliderBar() {
      this.$store.commit('toggleSliderBar')
    },

    onToggleEditMode() {
      this.toggleEditMode()
    },

    onGoLogin() {
      if (this.username || (this.$route.name === 'login')) {
        return
      }

      if (this.goLoginPressed === undefined) {
        this.goLoginPressed = 0
        this.goLoginLastTime = 0
      }

      if ((Date.now() - this.goLoginLastTime) < 500) {
        this.goLoginPressed++

        if (this.goLoginPressed >= 2) {
          this.goLoginPressed = 0
          this.$router.push({
            name: 'login',
            query: {
              _redirect: this.$route.fullPath,
            },
          })
        }
      } else {
        this.goLoginPressed = 0
      }

      this.goLoginLastTime = Date.now()
    },

    async onBackup() {
      await postBackup()
      this.$snackbar('备份完成')
    },
  },
}
</script>

<style lang="scss">
.navbar {
  & > .v-toolbar__content {
    display: block;
    padding: 0;
  }

  .wrapper {
    height: inherit;
    margin: auto;
  }

  .v-btn {
    font-size: 18px;
  }
}

.v-btn--active:before {
  background-color: initial;
}

.navbar-menu-icon {
  margin-right: 10px;
}
</style>
