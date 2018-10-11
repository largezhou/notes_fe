<template>
  <div class="tags" :class="{ 'one-line': oneLine }">
    <div>
      <v-btn
        v-for="tag of tags"
        :key="tag.id"
        class="tag"
        flat
        color="primary"
        :outline="outline"
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
        :outline="!outline"
      />
    </div>
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
    outline: {
      type: Boolean,
      default: true,
    },
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

<style lang="scss">
.tags {
  margin-top: 10px;

  &.one-line {
    height: 35px;
    position: relative;

    > div {
      margin-right: 60px;
      height: 100%;
      overflow: hidden;
    }

    .more {
      top: 0;
      right: 0;
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
