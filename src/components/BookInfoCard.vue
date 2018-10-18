<template>
  <v-card class="book-info-card" :class="{ collapsed: !vExpand }" v-if="book">
    <div v-show="canShow">
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs4 class="cover" v-show="vExpand">
            <img :src="book.cover">
          </v-flex>
          <v-flex :xs6="vExpand" :sm8="vExpand" :xs10="!vExpand" class="book-info">
            <div class="title text-ellipsis" :class="{ collapsed: !vExpand }">
              <router-link :to="`/books/${book.id}`">{{ book.title }}</router-link>
            </div>
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
                <span>{{ book.notes_count }}</span> 条
              </div>
            </div>
          </v-flex>
        </v-layout>
      </v-card-text>

      <!--添加笔记按钮-->
      <v-btn
        v-show="vExpand"
        v-if="newNoteBtn && username"
        class="add-note-btn"
        color="pink"
        fab
        dark
        small
        absolute
        :to="createNoteLink"
      >
        <mdi-icon icon="plus"/>
      </v-btn>

      <!-- 展开收起按钮 -->
      <v-btn
        v-if="canExpand"
        class="toggle-btn"
        flat
        icon
        small
        absolute
        @click="onToggle"
      >
        <mdi-icon :icon="toggleIcon"/>
      </v-btn>

      <!-- 编辑系列 -->
      <item-actions
        class="editable-warp"
        :style="{ top: canExpand ? '40px' : '3px' }"
        v-if="canEdit"
        v-show="vExpand && editMode"
        :item="book"
        :update-handler="updateBook"
        :delete-handler="deleteBook"
        :edit-handler="editBook"
        @force-deleted="item => { $emit('force-deleted', item) }"
      />
    </div>
  </v-card>
</template>

<script>
import HumanTime from '@/components/HumanTime'
import { mapState } from 'vuex'
import { updateBook, deleteBook } from '@/api/books'
import MdiIcon from '@/components/MdiIcon'
import ItemActions from '@/components/ItemActions'

export default {
  name: 'BookInfoCard',
  components: { MdiIcon, HumanTime, ItemActions },
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
    canExpand: {
      type: Boolean,
      default: true,
    },
    editable: Boolean,
  },
  data: () => ({
    vExpand: true,
    deleteConfirmModal: false,
  }),
  computed: {
    ...mapState({
      username: state => state.user.name,
    }),
    createNoteLink() {
      return {
        name: 'noteCreate',
        params: {
          bookId: this.book.id,
        },
      }
    },
    toggleIcon() {
      return this.vExpand ? 'chevron-up' : 'chevron-down'
    },
    canEdit() {
      return this.editable && this.username
    },
    canShow() {
      return (!this.book.hidden && !this.book.deleted_at) ||
        (this.canEdit && this.editMode)
    },
  },
  created() {
    this.vExpand = this.expand

    this.$root.$on('bookUpdated', this.onBookUpdated)

    this.deleteBook = deleteBook
    this.updateBook = updateBook
    this.editBook = () => {
      this.$root.$emit('editBook', this.book)
    }
  },
  beforeDestroy() {
    this.$root.$off('bookUpdated', this.onBookUpdated)
  },
  methods: {
    onToggle() {
      this.vExpand = !this.vExpand
    },

    onBookUpdated(book) {
      if (this.book.id == book.id) {
        Object.keys(this.book).forEach(field => {
          this.book[field] = book[field]
        })
      }
    },
  },
}
</script>

<style lang="scss">
@import "~@/styles/variables";

$add-note-btn-pos: 12px;

.book-info-card {
  position: relative;

  + .book-info-card {
    margin-top: 10px;
  }

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

  @media only screen and (max-width: 500px) {
    .book-info {
      font-size: 14px;

      .title {
        font-size: 16px;
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

<style lang="scss" scoped>
.editable-warp {
  position: absolute;
  right: 3px;

  width: 55px;
}
</style>
