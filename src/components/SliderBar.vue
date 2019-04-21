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

      <v-list-tile @click="onClick" to="/read-records" active-class="non-active">
        <v-list-tile-action>
          <mdi-icon icon="road-variant"/>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>路</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <div v-if="username">
        <v-divider/>

        <v-list-tile @click="onCreateBook" active-class="non-active">
          <v-list-tile-action>
            <mdi-icon icon="book-plus"/>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>看书</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

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

        <v-list-tile @click="onBackup" active-class="non-active">
          <v-list-tile-action>
            <mdi-icon icon="cloud-upload-outline"/>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>备份</v-list-tile-title>
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
import { postBackup } from '@/api/backups'

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

      this.$store.dispatch('logout')
    },
    onToggleEditMode() {
      this.onClick()

      this.toggleEditMode()
    },
    async onBackup() {
      this.onClick()

      await postBackup()
      this.$snackbar('备份完成')
    },
    onCreateBook() {
      this.$root.$emit('createBook')
      this.onClick()
    },
  },
}
</script>

<style scoped>

</style>
