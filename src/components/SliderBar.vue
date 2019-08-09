<template>
  <v-navigation-drawer
    :value="sliderBar"
    fixed
    temporary
    @input="onChange"
  >
    <v-list class="slider">

      <v-list-item
        @click="onClick"
        to="/"
        active-class="non-active"
      >
        <v-list-item-avatar>
          <img width="30" height="30" src="@/assets/logo.png">
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>笔记首页</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider/>

      <v-list-item @click="onClick" to="/books" active-class="non-active">
        <v-list-item-icon>
          <mdi-icon icon="book-multiple"/>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>看过</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click="onClick" to="/tags" active-class="non-active">
        <v-list-item-icon>
          <mdi-icon icon="tag-multiple"/>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>标签</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click="onClick" to="/posts" active-class="non-active">
        <v-list-item-icon>
          <mdi-icon icon="blogger"/>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>博客</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click="onClick" to="/read-records" active-class="non-active">
        <v-list-item-icon>
          <mdi-icon icon="road-variant"/>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>路</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <div v-if="username">
        <v-divider/>

        <v-list-item @click="onCreateBook" active-class="non-active">
          <v-list-item-icon>
            <mdi-icon icon="book-plus"/>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>看书</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="onClick" to="/posts/create" active-class="non-active">
          <v-list-item-icon>
            <mdi-icon icon="square-edit-outline"/>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>博客</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider/>

        <v-list-item @click="onToggleEditMode" active-class="non-active">
          <v-list-item-icon>
            <mdi-icon :icon="editMode ? 'check' : 'keyboard'"/>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ editMode ? '完成' : '编辑' }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="onBackup" active-class="non-active">
          <v-list-item-icon>
            <mdi-icon icon="cloud-upload-outline"/>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>备份</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider/>

        <v-list-item @click="onLogout" active-class="non-active">
          <v-list-item-icon>
            <mdi-icon icon="exit-to-app"/>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>退出</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'
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

<style lang="scss">
.slider {
  .v-list-item__icon {
    margin-right: 32px;
  }
}
</style>
