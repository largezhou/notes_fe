<template>
  <div v-if="tags.length > 0" class="tags" :class="{ 'one-line': oneLine }">
    <v-btn
      v-for="tag of tags"
      :key="tag.id"
      class="tag"
      text
      color="primary"
      :to="`/tags/${tag.id}`"
      v-text="tag.name"
    />
    <v-btn
      :ripple="false"
      class="tag more"
      v-if="!widescreen"
      text
      color="primary"
      @click="onShowMore"
      v-text="oneLine ? '更多' : '收起'"
      :absolute="oneLine"
      outlined
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Tags',
  data: () => ({
    showMore: false,
  }),
  props: {
    tags: Array,
  },
  computed: {
    ...mapState({
      widescreen: state => state.app.widescreen,
    }),
    oneLine() {
      return !this.widescreen && !this.showMore
    },
  },
  methods: {
    onShowMore() {
      this.showMore = !this.showMore
    },
  },
}
</script>

<style lang="scss" scoped>
.tags {
  &.one-line {
    height: 35px;
    position: relative;
    padding-right: 70px;
    overflow: hidden;

    .more {
      top: -1px;
      right: 8px;
    }
  }

  .tag {
    height: 25px;
    min-width: initial;
    padding: 0 10px;
    margin: 5px;
  }
}
</style>
