<template>
  <v-slide-y-reverse-transition @afterLeave="$emit('force-deleted', item)">
    <v-card class="note-item" v-show="!item.force_deleted">
      <v-card-title>
        <div class="belong">
          <div v-if="disableBook">
            <router-link class="page-link" :to="`/notes/${item.id}`">第{{ item.page }}页</router-link>
          </div>
          <div v-else>
            <router-link :class="{ hidden: item.book.hidden, deleted: item.book.deleted_at }" :to="`/books/${item.book.id}`">{{ item.book.title }}</router-link>
            <span> • </span>
            <router-link class="page-link" :to="`/notes/${item.id}`">第{{ item.page }}页</router-link>
          </div>
        </div>
      </v-card-title>

      <v-card-text v-if="item.desc" class="desc">{{ item.desc }}</v-card-text>

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
import { updateNote, deleteNote, forceDeleteNote } from '@/api/notes'

export default {
  name: 'BookNoteItem',
  components: { HumanTime, Tags, ItemActions, HiddenMark },
  props: {
    item: Object,
    disableBook: Boolean,
    book: Object,
  },
  created() {
    this.updateNote = updateNote
    this.deleteNote = deleteNote
    this.forceDeleteNote = forceDeleteNote
    this.editNote = () => {
      this.$router.push(`/notes/${this.item.id}/edit`)
    }
  },
  computed: {
    ...mapState({
      username: state => state.user.name,
    }),
  },
  methods: {
    pageLink(book, page) {
      return `/books/${book}/pages/${page}`
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';

.note-item {
  margin-bottom: 10px;
  overflow: hidden;

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
    padding-top: 10px;
    padding-bottom: 10px;
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
}

.actions {
  right: 0;
  top: 0;
  border-bottom-left-radius: 4px;
}
</style>
