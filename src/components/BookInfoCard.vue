<template>
  <v-card class="book-info-card" :class="{ collapsed: !vExpand }" v-if="book">
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs4 class="cover" v-show="vExpand">
          <img :src="book.cover">
        </v-flex>
        <v-flex :xs6="vExpand" :sm8="vExpand" :xs10="!vExpand" class="book-info">
          <div class="title text-ellipsis" :class="{ collapsed: !vExpand }">{{ book.title }}</div>
          <div v-show="vExpand">
            <div class="item">
              <span class="label">开始阅读</span>
              <human-time :time="book.started_at" prefix="开始于："/>
            </div>
            <div class="item">
              <span class="label">更新</span>
              <human-time :time="book.updated_at" prefix="最近更新："/>
            </div>
            <div class="item">
              <span class="label">已读</span>
              <span>{{ book.read }}</span> 页
            </div>
            <div class="item">
              <span class="label">总页数</span>
              <span>{{ book.total }}</span> 页
            </div>
            <div class="item">
              <span class="label">笔记</span>
              <span>{{ book.notes.length }}</span> 条
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-card-text>

    <v-btn
      v-show="vExpand"
      v-if="newNoteBtn"
      class="add-note-btn"
      color="pink"
      fab
      dark
      small
      absolute
      :to="createNoteLink"
    >
      <v-icon>add</v-icon>
    </v-btn>

    <v-btn
      class="toggle-btn"
      flat
      icon
      small
      absolute
      @click="onToggle"
    >
      <v-icon>{{ toggleIcon }}</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
import HumanTime from '@/components/HumanTime'

export default {
  name: 'BookInfoCard',
  components: { HumanTime },
  props: {
    book: Object,
    newNoteBtn: {
      type: Boolean,
      default: true,
    },
    expand: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    vExpand: true,
  }),
  computed: {
    createNoteLink() {
      return {
        name: 'noteCreate',
        params: {
          bookId: this.book.id,
        },
      }
    },
    toggleIcon() {
      return this.vExpand ? 'expand_less' : 'expand_more'
    },
  },
  created() {
    this.vExpand = this.expand
  },
  methods: {
    onToggle() {
      this.vExpand = !this.vExpand
    },
  },
}
</script>

<style lang="scss">
@import "~@/styles/variables";

$add-note-btn-pos: 12px;

.book-info-card {
  .cover {
    max-width: 150px;
    img {
      width: 100%;
    }
  }

  .book-info {
    font-size: 15px;
    margin-left: 10px;

    .title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
      margin-top: 10px;

      &.collapsed {
        margin: 0;
      }
    }

    .item {
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .label {
    display: inline-block;
    width: 65px;
    margin-right: 10px;
    color: $non-important-color;
  }

  @media only screen and (max-width: 768px) {
    .book-info {
      font-size: 14px;

      .title {
        font-size: 16px;
        margin-bottom: 10px;
      }

      .item {
        margin-bottom: 5px;
      }
    }
  }

  .add-note-btn {
    right: $add-note-btn-pos;
    bottom: $add-note-btn-pos;

    .v-icon {
      text-align: center;
      line-height: 40px;
    }
  }

  .toggle-btn {
    right: $add-note-btn-pos;
    top: $add-note-btn-pos;
  }

  &.collapsed {
    background: initial;
    box-shadow: none;

    .v-card__text {
      padding-left: 0;
    }

    .book-info {
      margin-left: 0;
    }
  }
}
</style>