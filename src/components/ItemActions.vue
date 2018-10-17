<template>
  <v-list dense>
    <!-- 隐藏与显示 -->
    <v-list-tile @click="updateHidden">
      <v-list-tile-action>
        <mdi-icon :icon="item.hidden ? 'eye' : 'eye-off'"/>
      </v-list-tile-action>
    </v-list-tile>

    <!-- 编辑 -->
    <v-list-tile @click="onEdit">
      <v-list-tile-action>
        <mdi-icon icon="pencil"/>
      </v-list-tile-action>
    </v-list-tile>

    <!-- 删除与恢复 -->
    <v-list-tile @click="onDeleteOrRestore">
      <v-list-tile-action>
        <mdi-icon :icon="item.deleted_at ? 'delete-restore' : 'delete'"/>
      </v-list-tile-action>
    </v-list-tile>

    <!-- 彻底删除 -->
    <v-list-tile @click="onForceDelete" v-if="item.deleted_at">
      <v-list-tile-action>
        <mdi-icon color="red" icon="delete-forever"/>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  name: 'ItemActions',
  props: {
    item: Object,
    updateHandler: Function,
    deleteHandler: Function,
    editHandler: Function,
  },
  methods: {
    updateHidden() {
      this.updateHandler(this.item.id, {
        hidden: !this.item.hidden,
      })
        .then(res => {
          this.item.hidden = res.data.hidden
        })
    },
    onEdit() {
      this.editHandler()
    },

    onDeleteOrRestore() {
      if (this.item.deleted_at) {
        this.restore()
      } else {
        this.delete()
      }
    },

    restore() {
      this.updateHandler(this.item.id, {
        deleted_at: null,
      })
        .then(res => {
          this.item.deleted_at = res.data.deleted_at
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
      this.deleteHandler(this.item.id, { force_delete: force })
        .then(res => {
          if (force) {
            this.$emit('force-deleted', this.item)
          } else {
            this.item.deleted_at = res.data.deleted_at
          }
        })
    },
  },
}
</script>
