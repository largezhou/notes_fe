<template>
  <div class="tag-wrap">
    <v-btn
      :style="{ width: tagWidth }"
      ref="tags"
      class="tag"
      flat
      color="primary"
      outline
      :to="`/tags/${tag.id}`"
    >{{ tag.name }}
      <span class="count">{{ tag.notes_count }}</span>
    </v-btn>

    <div class="actions" v-if="canEdit">
      <div v-show="actionsOpened">
        <v-btn flat small icon @click="nameEditing = true">
          <v-icon color="grey darken-1">edit</v-icon>
        </v-btn>
        <v-btn flat small icon @click="test">
          <v-icon color="grey darken-1">delete</v-icon>
        </v-btn>
        <v-btn flat small icon @click="actionsOpened = false">
          <v-icon color="grey darken-1">close</v-icon>
        </v-btn>
      </div>

      <v-btn class="settings" v-show="!actionsOpened" flat small icon @click="actionsOpened = true">
        <v-icon color="grey darken-1">settings</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'EditableTag',
  props: {
    tag: Object,
  },
  data: () => ({
    actionsOpened: false,
    nameEditing: false,
  }),
  computed: {
    ...mapState({
      canEdit: state => state.user.name,
      editMode: state => state.app.editMode,
      widescreen: state => state.app.widescreen,
    }),
    tagWidth() {
      if (!this.actionsOpened) {
        return null
      }

      return this.widescreen ? '114px' : '96px'
    },
  },
  methods: {
    test(e) {
      e.stopPropagation()
      log(111)
      return false
    },
  },
}
</script>

<style lang="scss" scoped>
.tag-wrap {
  position: relative;
  display: inline-block;
  margin: 10px;

  &:hover {
    .settings {
      display: inline-block;
    }
  }
}

.tag {
  margin: 0;

  .count {
    margin-left: 10px;
    font-weight: 900;
  }
}

.actions {
  border-radius: 2px;
  background: rgba(208, 208, 208, 0.8);
  position: absolute;
  right: 1px;
  top: 1px;
  height: 34px;

  .v-btn {
    height: 34px;
    width: 34px;
    margin: 0;
    & + .v-btn {
      margin-left: 5px;
    }
  }
}

.settings {
  display: none;
}

@media (max-width: 599px) {
  .tag-wrap {
    margin: 5px;
  }

  .tag {
    height: 30px;
    padding: 0 10px;
    min-width: 0;

    .count {
      margin-left: 5px;
    }
  }

  .actions {
    height: 28px;
    .v-btn {
      height: 28px;
      width: 28px;
    }
  }
}
</style>
