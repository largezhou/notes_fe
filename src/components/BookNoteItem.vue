<template>
  <v-card class="note-item">
    <v-card-title>
      <div class="belong">
        <div v-if="!item.book && !disableBook">书不见啦~</div>
        <div v-else-if="disableBook">
          <router-link :to="`/pages/${item.page.id}`">第{{ item.page.page }}页</router-link>
        </div>
        <div v-else>
          <router-link :to="`/books/${item.book.id}`">{{ item.book.title }}</router-link>
          <span> • </span>
          <router-link :to="`/pages/${item.page.id}`">第{{ item.page.page }}页</router-link>
        </div>
      </div>
    </v-card-title>

    <v-card-text class="note-title" v-if="item.title">
      <router-link :to="`/notes/${item.id}`">{{ item.title }}</router-link>
    </v-card-text>

    <v-card-text class="desc">
      <router-link :to="`/notes/${item.id}`">{{ item.desc }}</router-link>
    </v-card-text>

    <tags :tags="item.tags" :outline="false"/>

  </v-card>
</template>

<script>
import HumanTime from '@/components/HumanTime'
import Tags from '@/components/Tags'

export default {
  name: 'BookNoteItem',
  components: { HumanTime, Tags },
  props: {
    item: Object,
    disableBook: Boolean,
    book: Object,
  },
}
</script>

<style lang="scss">
@import '~@/styles/variables';

.note-item {
  margin-bottom: 10px;

  .tags {
    padding: 8px;

    &.one-line {
      height: 50px;

      .more {
        top: 6px;
        right: 8px;
      }
    }
  }

  .v-card__title {
    padding-bottom: 10px;
    display: block;
  }

  .belong {
    font-size: 18px;
    margin-bottom: 8px;
  }

  .desc {
    font-size: 14px;
  }

  .note-title {
    color: $non-important-color;
    font-size: 14px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
}
</style>
