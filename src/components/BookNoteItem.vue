<template>
  <v-card class="note-item">
    <v-card-title>
      <div class="belong">
        <div v-if="!item.book && !disableBook">书不见啦~</div>
        <div v-else-if="disableBook">
          <router-link class="page-link" :to="`/notes/${item.id}`">第{{ item.page }}页<small v-if="item.hidden" class="note-hidden-mark"> HIDDEN</small></router-link>
        </div>
        <div v-else>
          <router-link :class="{ hidden: item.book.hidden, deleted: item.book.deleted_at }" :to="`/books/${item.book.id}`">{{ item.book.title }}</router-link>
          <span> • </span>
          <router-link class="page-link" :to="`/notes/${item.id}`">第{{ item.page }}页<small v-if="item.hidden" class="note-hidden-mark"> HIDDEN</small></router-link>
        </div>
      </div>
    </v-card-title>

    <v-card-text v-if="item.title" class="note-title">{{ item.title }}</v-card-text>

    <v-card-text v-if="item.desc" class="desc">{{ item.desc }}</v-card-text>

    <tags :tags="item.tags"/>

    <item-action
      class="actions"
      :item="item"
      v-if="username && item.book && !item.book.deleted_at"
      v-show="editMode"
      :update-handler="updateNote"
      :delete-handler="deleteNote"
      :force-delete-handler="forceDeleteNote"
      :edit-handler="editNote"
      @force-deleted="item => { $emit('force-deleted', item) }"
    />

  </v-card>
</template>

<script>
import HumanTime from '@/components/HumanTime'
import Tags from '@/components/Tags'
import ItemAction from '@/components/ItemActions'
import { mapState } from 'vuex'
import { updateNote, deleteNote, forceDeleteNote } from '@/api/notes'

export default {
  name: 'BookNoteItem',
  components: { HumanTime, Tags, ItemAction },
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
  position: absolute;
  right: 0;
  top: 0;
}

/deep/ .v-list {
  > div {
    display: inline-block;
  }

  .v-list__tile {
    padding: 0 10px;
  }
}
</style>
