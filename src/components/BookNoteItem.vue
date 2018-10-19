<template>
  <v-card class="note-item">
    <v-card-title>
      <div class="belong">
        <div v-if="!item.book && !disableBook">书不见啦~</div>
        <div v-else-if="disableBook">
          <span>第{{ item.page }}页</span>
        </div>
        <div v-else>
          <router-link :to="`/books/${item.book.id}`">{{ item.book.title }}</router-link>
          <span> • </span>
          <span>第{{ item.page }}页</span>
        </div>
      </div>
    </v-card-title>

    <v-card-text class="note-title" v-if="item.title">
      <router-link :to="`/notes/${item.id}`">{{ item.title }}</router-link>
    </v-card-text>

    <v-card-text class="desc">
      <router-link :to="`/notes/${item.id}`">{{ item.desc }}</router-link>
    </v-card-text>

    <tags :tags="item.tags"/>

    <item-action
      class="actions"
      :item="item"
      v-if="username"
      v-show="editMode"
      :update-handler="updateNote"
      :delete-handler="deleteNote"
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
import { updateNote, deleteNote } from '@/api/notes'

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
