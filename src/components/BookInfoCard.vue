<template>
  <component :is="wrapperComponent" @afterLeave="forceDeletedHandler(book)">
    <v-card
      class="book-info-card"
      :class="{ collapsed: !vExpand }"
      v-if="book"
      v-show="!book.force_deleted"
    >
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs4 class="cover" v-show="vExpand">
            <img :src="book.cover">
          </v-flex>
          <v-flex
            :xs6="vExpand"
            :sm8="vExpand"
            :xs10="!vExpand"
            class="book-info"
          >
            <div class="title text-ellipsis" :class="{ collapsed: !vExpand }">
              <router-link :to="`/books/${book.id}`">{{ book.title }}</router-link>
            </div>
            <div v-show="vExpand">
              <div class="item">
                <span class="label">开始阅读</span>
                <human-time
                  text-class="grey--text text--darken-3"
                  v-if="book.started_at"
                  :time="book.started_at"
                  prefix="开始于："
                />
                <span class="grey--text text--darken-3" v-else>未读</span>
              </div>
              <div class="item">
                <span class="label">更新</span>
                <human-time
                  text-class="grey--text text--darken-3"
                  :time="book.updated_at"
                  prefix="最近更新："
                />
              </div>
              <div class="item">
                <span class="label">已读</span>
                <span class="grey--text text--darken-3">{{ book.read }} 页</span>
              </div>
              <div class="item">
                <span class="label">总页数</span>
                <span class="grey--text text--darken-3">{{ book.total }} 页</span>
              </div>
              <div class="item">
                <span class="label">笔记</span>
                <span class="grey--text text--darken-3">{{ book.notes_count }} 条</span>
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
        text
        icon
        small
        absolute
        @click="onToggle"
      >
        <mdi-icon :icon="toggleIcon"/>
      </v-btn>

      <!-- 编辑系列 -->
      <item-actions
        class="actions"
        :inline="false"
        v-if="canEdit"
        v-show="vExpand && editMode"
        :item="book"
        :update-handler="updateBook"
        :delete-handler="deleteBook"
        :force-delete-handler="forceDeleteBook"
        force-delete-msg="彻底删除后不可恢复！<br>彻底删除后书中的笔记也会彻底删除！"
        :edit-handler="editBook"
        @force-deleted="onForceDeleted"
      />

      <hidden-mark v-show="vExpand && book.hidden && !editMode"/>
    </v-card>
  </component>
</template>

<script>
import HumanTime from '@/components/HumanTime'
import { mapState } from 'vuex'
import { updateBook, deleteBook, forceDeleteBook } from '@/api/books'
import ItemActions from '@/components/ItemActions'
import HiddenMark from '@/components/HiddenMark'
import { VSlideYReverseTransition } from 'vuetify/lib/components/transitions'

export default {
  name: 'BookInfoCard',
  components: {
    HumanTime,
    ItemActions,
    HiddenMark,
    VSlideYReverseTransition,
  },
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
    animate: {
      type: Boolean,
      default: false,
    },
    forceDeletedHandler: {
      type: Function,
      default() {
        this.$router.push({ name: 'bookIndex' })
      },
    },
  },
  data() {
    return {
      vExpand: this.expand,
      deleteConfirmModal: false,
    }
  },
  computed: {
    ...mapState({
      username: state => state.user.name,
      widescreen: state => state.app.widescreen,
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
      return !!this.username
    },
    wrapperComponent() {
      return this.animate
        ? 'v-slide-y-reverse-transition'
        : 'div'
    },
  },
  created() {
    this.$root.$on('bookUpdated', this.onBookUpdated)

    this.deleteBook = deleteBook
    this.updateBook = updateBook
    this.editBook = () => {
      this.$root.$emit('editBook', this.book)
    }
    this.forceDeleteBook = forceDeleteBook
  },
  beforeDestroy() {
    this.$root.$off('bookUpdated', this.onBookUpdated)
  },
  methods: {
    onToggle() {
      this.vExpand = !this.vExpand
      this.$emit('update:expand', this.vExpand)
    },

    onBookUpdated(book) {
      if (this.book.id == book.id) {
        Object.keys(this.book).forEach(field => {
          this.book[field] = book[field]
        })
      }
    },

    onForceDeleted(item) {
      if (this.animate) {
        this.$set(item, 'force_deleted', true)
      } else {
        this.forceDeletedHandler(item)
        // this.$emit('force-deleted', item)
      }
    },
  },
  watch: {
    expand(newValue) {
      this.vExpand = newValue
    },
  },
}
</script>

<style lang="scss">
@import "~@/styles/variables";

$add-note-btn-pos: 12px;

.book-info-card {
  position: relative;
  overflow: hidden;

  + .book-info-card {
    margin-top: 20px;
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
.actions {
  left: 5px;
  right: initial;
  border-bottom-right-radius: 4px;
}
</style>
