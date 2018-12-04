<template>
  <v-navigation-drawer
    :value="sliderBar"
    fixed
    temporary
    @input="onChange"
  >
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar @click="onClick" to="/" active-class="non-active">
          <v-list-tile-avatar>
            <img width="30" height="30" src="@/assets/logo.png">
          </v-list-tile-avatar>
          笔记首页
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-list dense>

      <v-divider/>

      <v-list-tile @click="onClick" to="/books" active-class="non-active">
        <v-list-tile-action>
          <mdi-icon icon="book-multiple"/>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>看过</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile @click="onClick" to="/tags" active-class="non-active">
        <v-list-tile-action>
          <mdi-icon icon="tag-multiple"/>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>标签</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile @click="onClick" to="/posts" active-class="non-active">
        <v-list-tile-action>
          <mdi-icon icon="blogger"/>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>博客</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <div v-if="username">
        <v-divider/>

        <new-book>
          <v-list-tile @click="onClick" active-class="non-active">
            <v-list-tile-action>
              <mdi-icon icon="book-plus"/>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>看书</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </new-book>

        <v-list-tile @click="onClick" to="/posts/create" active-class="non-active">
          <v-list-tile-action>
            <mdi-icon icon="square-edit-outline"/>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>博客</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider/>

        <v-list-tile @click="onToggleEditMode" active-class="non-active">
          <v-list-tile-action>
            <mdi-icon :icon="editMode ? 'check' : 'keyboard'"/>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ editMode ? '完成' : '编辑' }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider/>

        <v-list-tile @click="onLogout" active-class="non-active">
          <v-list-tile-action>
            <mdi-icon icon="exit-to-app"/>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>退出</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'
import utils from '@/libs/utils'
import NewBook from '@/components/NewBook'

export default {
  name: 'SliderBar',
  components: { NewBook },
  computed: {
    ...mapState({
      sliderBar: state => state.app.sliderBar,
      username: state => state.user.name,
    }),
  },
  methods: {
    onChange(value) {
      this.$store.commit('changeSliderBar', value)
    },

    onClick() {
      this.$store.commit('changeSliderBar', false)
    },

    onLogout() {
      this.onClick()

      this.$store
        .dispatch('logout')
        .then(() => {
          this.$snackbar('已退出')
          if (utils.needAuth(this.$route)) {
            this.$router.push({ name: 'index' })
          }
        })
    },
    onToggleEditMode() {
      this.onClick()

      this.toggleEditMode()
    },
  },
}
</script>

<style scoped>

</style>
