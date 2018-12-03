<template>
  <v-text-field
    class="navbar-search"
    flat
    solo-inverted
    hide-details
    label="搜索..."
    :style="{ marginRight: widescreen ? '10px' : '0' }"
    @focus="focused = true"
    @blur="focused = false"
    v-model="q"
    @keydown.enter="onSearch"
  >
    <mdi-icon
      slot="append"
      icon="magnify"
      :color="focused ? 'primary' : 'white'"
      @click="onSearch"
    />
  </v-text-field>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NavbarSearch',
  computed: {
    ...mapState({
      widescreen: state => state.app.widescreen,
    }),
  },
  data: () => ({
    focused: false,
    active: false,
    q: '',
  }),
  methods: {
    onSearch() {
      const q = this.q.trim()
      if (!q) {
        this.$dialog('搜啥呢搜...')
        return
      }

      this.$router.push({
        name: 'search',
        query: {
          q,
        },
      })
    },
  },
  watch: {
    $route: {
      handler(newValue) {
        this.q = ''

        if (newValue.name == 'search') {
          this.q = newValue.query.q
        }
      },
      immediate: true,
    },
  },
}
</script>

<style scoped lang="scss">
.navbar-search {
  flex-grow: 0;
}
</style>
