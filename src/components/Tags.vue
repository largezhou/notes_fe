<template>
  <div v-if="tags.length > 0" class="tags" :class="{ 'one-line': oneLine }">
    <v-btn
      v-for="tag of tags"
      :key="tag.id"
      class="tag"
      flat
      color="primary"
      :to="`/tags/${tag.id}`"
    >{{ tag.name }}
    </v-btn>
    <v-btn
      :ripple="false"
      class="tag more"
      v-if="!widescreen"
      flat
      color="primary"
      @click="onShowMore"
      v-text="oneLine ? '更多' : '收起'"
      :absolute="oneLine"
      outline
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
  margin-top: 10px;

  &.one-line {
    height: 50px;
    position: relative;
    padding: 8px;
    padding-right: 70px;
    overflow: hidden;

    .more {
      top: 8px;
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
