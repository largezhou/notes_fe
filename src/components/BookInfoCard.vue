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
        <v-icon>add</v-icon>
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
        <v-icon>{{ toggleIcon }}</v-icon>
      </v-btn>

      <!-- 编辑系列 -->
      <div v-if="canEdit" class="editable-warp" :style="{ top: canExpand ? '40px' : '3px' }">
        <v-list dense v-show="vExpand && editMode">
          <!-- 隐藏与显示 -->
          <v-list-tile @click="updateHidden">
            <v-list-tile-action>
              <v-icon>{{ book.hidden ? 'visibility' : 'visibility_off' }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <!-- 编辑 -->
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon>edit</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <!-- 删除与恢复 -->
          <v-list-tile @click="onDelete">
            <v-list-tile-action>
              <v-icon>{{ book.deleted_at ? 'restore' : 'delete' }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <!-- 彻底删除 -->
          <v-list-tile @click="onForceDelete" v-if="book.deleted_at">
            <v-list-tile-action>
              <v-icon color="red">delete_forever</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </div>
    </div>

    <v-dialog v-if="canEdit" v-model="deleteConfirmModal" max-width="290">
      <v-card>
        <v-card-title class="headline">删除确认</v-card-title>
        <v-card-text>{{ forceDelete ? '彻底删除后不可恢复！！！' : '删除之后还可以恢复' }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" flat @click.native="deleteConfirmModal = false">取消</v-btn>
          <v-btn color="red" flat @click.native="onDeleteConfirm">{{ forceDelete ? '彻底' : '' }}删除</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import HumanTime from '@/components/HumanTime'
import { mapState } from 'vuex'
import { updateBook, deleteBook } from '@/api/books'

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
    canExpand: {
      type: Boolean,
      default: true,
    },
    editable: Boolean,
  },
  data: () => ({
    vExpand: true,

    deleteConfirmModal: false,
    forceDelete: false,
  }),
  computed: {
    ...mapState({
      username: state => state.user.name,
      editMode: state => state.app.editMode,
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
      return this.vExpand ? 'expand_less' : 'expand_more'
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
  },
  methods: {
    onToggle() {
      this.vExpand = !this.vExpand
    },
    updateHidden() {
      updateBook(this.book.id, {
        hidden: !this.book.hidden,
      })
        .then(res => {
          this.book.hidden = res.data.hidden
        })
    },

    onDelete() {
      if (this.book.deleted_at) {
        this.restore()
      } else {
        this.delete()
      }
    },

    restore() {
      updateBook(this.book.id, {
        deleted_at: null,
      })
        .then(res => {
          this.book.deleted_at = res.data.deleted_at
        })
    },

    delete() {
      this.deleteConfirmModal = true
      this.forceDelete = false
    },

    onForceDelete() {
      this.deleteConfirmModal = true
      this.forceDelete = true
    },

    onDeleteConfirm() {
      this.deleteConfirmModal = false

      deleteBook(this.book.id, { force_delete: this.forceDelete })
        .then(res => {
          if (this.forceDelete) {
            this.$emit('force-deleted', this.book)
          } else {
            this.book.deleted_at = res.data.deleted_at
          }
        })
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
