<template>
  <v-card class="post">
    <v-card-title class="title">
      <router-link :to="`/posts/${post.id}`">{{ post.title }}</router-link>
    </v-card-title>

    <v-card-text class="desc">{{ post.desc }}</v-card-text>

    <tags :tags="post.tags"/>

    <div class="actions" v-if="username" v-show="editMode">
      <v-list dense>

        <!-- 彻底删除 -->
        <v-list-tile @click="onForceDelete" v-if="post.deleted_at">
          <v-list-tile-action>
            <mdi-icon color="red" icon="book-remove"/>
          </v-list-tile-action>
        </v-list-tile>

        <!-- 隐藏与显示 -->
        <v-list-tile @click="updateHidden">
          <v-list-tile-action>
            <mdi-icon :icon="post.hidden ? 'eye' : 'eye-off'"/>
          </v-list-tile-action>
        </v-list-tile>

        <!-- 编辑 -->
        <v-list-tile :to="`/posts/${post.id}/edit`">
          <v-list-tile-action>
            <mdi-icon icon="pencil"/>
          </v-list-tile-action>
        </v-list-tile>

        <!-- 删除与恢复 -->
        <v-list-tile @click="onDeleteOrRestore">
          <v-list-tile-action>
            <mdi-icon :icon="post.deleted_at ? 'delete-restore' : 'delete'"/>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </div>
  </v-card>
</template>

<script>
import Tags from '@/components/Tags'
import { mapState } from 'vuex'
import { deletePost, updatePost } from '@/api/posts'

export default {
  name: 'PostItem',
  components: { Tags },
  computed: {
    ...mapState({
      username: state => state.user.name,
      editMode: state => state.app.editMode,
    }),
  },
  props: {
    post: Object,
  },
  methods: {
    updateHidden() {
      updatePost(this.post.id, {
        hidden: !this.post.hidden,
      })
        .then(res => {
          this.post.hidden = res.data.hidden
        })
    },

    onDeleteOrRestore() {
      if (this.post.deleted_at) {
        this.restore()
      } else {
        this.delete()
      }
    },

    restore() {
      updatePost(this.post.id, {
        deleted_at: null,
      })
        .then(res => {
          this.post.deleted_at = res.data.deleted_at
        })
    },

    delete() {
      this.$confirm({
        title: '删除确认',
        content: '删除后还可以恢复的，别慌',
        okText: '删除',
        okColor: 'red',
      })
        .then(() => {
          this.onDeleteConfirm()
        })
    },

    onForceDelete() {
      this.$confirm({
        title: '删除确认',
        content: '彻底删除后不可恢复！！！',
        okText: '彻底删除',
        okColor: 'red',
      })
        .then(() => {
          this.onDeleteConfirm(true)
        })
    },

    onDeleteConfirm(force = false) {
      deletePost(this.post.id, { force_delete: force })
        .then(res => {
          if (force) {
            this.$emit('force-deleted', this.post)
          } else {
            this.post.deleted_at = res.data.deleted_at
          }
        })
    },
  },
}
</script>

<style scoped lang="scss">
.post {
  + .post {
    margin-top: 10px;
  }
}

.actions {
  position: absolute;
  right: 0;
  top: 0;
}

.v-list {
  > div {
    display: inline-block;
  }

  /deep/ .v-list__tile {
    padding: 0 10px;
  }

  .v-list__tile__action {
    min-width: initial;
  }
}
</style>
