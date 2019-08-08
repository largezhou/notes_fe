<template>
  <v-slide-y-reverse-transition @afterLeave="$emit('force-deleted', item)">
    <v-card class="note-item" v-show="!item.force_deleted">
      <v-card-title>
        <div class="belong">
          <loading-action
            :action="onToggleDetail"
            class="hide-detail"
            color="primary"
            text
            icon
            small
            disable-on-success="0"
          >
            <mdi-icon
              :icon="showDetail ? 'chevron-up' : 'chevron-down'"
            />
          </loading-action>
          <template v-if="!disableBook">
            <router-link :class="{ hidden: item.book.hidden, deleted: item.book.deleted_at }" :to="`/books/${item.book.id}`">{{ item.book.title }}</router-link>
          </template>
          <router-link class="page-link ml-3" :to="`/notes/${item.id}`">第{{ item.page }}页</router-link>
        </div>
      </v-card-title>

      <v-card-text
        v-show="!showDetail"
        class="note-title"
      >
        <span>{{ item.title }}</span>
      </v-card-text>
      <v-card-text
        v-show="showDetail"
        class="note-title"
      >
        <h2 class="detail-title">{{ item.title }}</h2>
        <markdown-body :content="item.html_content"/>
      </v-card-text>

      <tags :tags="item.tags"/>

      <item-actions
        class="actions"
        :item="item"
        v-if="username"
        v-show="editMode"
        :update-handler="updateNote"
        :delete-handler="deleteNote"
        :force-delete-handler="forceDeleteNote"
        :edit-handler="editNote"
        @force-deleted="item => $set(item, 'force_deleted', true)"
      />

      <hidden-mark v-show="item.hidden && !editMode"/>
    </v-card>
  </v-slide-y-reverse-transition>
</template>

<script>
import HumanTime from '@/components/HumanTime'
import Tags from '@/components/Tags'
import HiddenMark from '@/components/HiddenMark'
import ItemActions from '@/components/ItemActions'
import { mapState } from 'vuex'
import { updateNote, deleteNote, forceDeleteNote, getNote } from '@/api/notes'
import MarkdownBody from '@/components/MarkdownBody'

export default {
  name: 'BookNoteItem',
  components: {
    MarkdownBody,
    HumanTime,
    Tags,
    ItemActions,
    HiddenMark,
  },
  props: {
    item: Object,
    disableBook: Boolean,
    book: Object,
  },
  data: () => ({
    showDetail: false,
  }),
  created() {
    this.updateNote = updateNote
    this.deleteNote = deleteNote
    this.forceDeleteNote = forceDeleteNote
    this.editNote = `/notes/${this.item.id}/edit`
  },
  computed: {
    ...mapState({
      username: state => state.user.name,
    }),
  },
  methods: {
    async onToggleDetail() {
      if (this.showDetail) {
        this.showDetail = false
      } else {
        await this.onLoadDetail()
      }
    },
    async onLoadDetail() {
      if (this.item.html_content) {
        this.showDetail = true
        return
      }

      const { data } = await getNote(this.item.id, { only: 'html_content' })
      this.$set(this.item, 'html_content', data.html_content)
      this.showDetail = true
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';

.note-item {
  margin-bottom: 20px;
  overflow: hidden;

  .v-card__title {
    padding-bottom: 10px;
    display: block;
  }

  .belong {
    font-size: 18px;
  }

  .note-title {
    font-size: 14px;
    padding-top: 10px;
    padding-bottom: 10px;
    color: rgba(0, 0, 0, 0.87);
  }

  .page-link {
    border-bottom: 2px solid #1976d2;
  }

  .hidden {
    color: #aaa;
  }

  .deleted {
    text-decoration: line-through;
  }

  .note-hidden-mark {
    color: #ccc;
  }

  > > > {
    .v-progress-linear {
      margin: 3px 0;
    }
  }
}

.actions {
  border-bottom-left-radius: 4px;
}

.hide-detail {
  margin: 0 8px 0 0;
}

.detail-title {
  padding-bottom: .3em;
  font-size: 2em;
  border-bottom: 1px solid #eaecef;
  margin-bottom: 16px;
  color: rgba(0, 0, 0, 0.87);
}
</style>
