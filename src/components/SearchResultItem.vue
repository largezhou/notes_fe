<template>
  <v-slide-x-reverse-transition>
    <v-card class="search-result">
      <v-card-title class="title" v-if="link || item.title">

        <router-link v-if="link" :to="link">
          <mdi-icon v-if="icon" :icon="icon"/>
          <span v-html="title"/>
        </router-link>
        <span v-else v-html="title"/>
      </v-card-title>

      <v-card-text v-if="item.content" v-html="item.content"/>
    </v-card>
  </v-slide-x-reverse-transition>
</template>

<script>
const TYPE_ICON = {
  post: 'blogger',
  book: 'book',
  note: 'note',
}

const TYPE_PATH = {
  post: 'posts',
  book: 'books',
  note: 'notes',
}

export default {
  name: 'SearchResultItem',
  props: {
    item: Object,
  },
  computed: {
    link() {
      const path = TYPE_PATH[this.item.type]

      return path
        ? `/${path}/${this.item.id}`
        : ''
    },
    title() {
      return this.item.title || '详情 >>>'
    },
    icon() {
      const icon = TYPE_ICON[this.item.type]
      return icon || null
    },
  },
}
</script>

<style scoped lang="scss">
.search-result {
  margin-bottom: 10px;

  /deep/ {
    em {
      font-style: normal;
      color: red;
    }
  }
}
</style>
