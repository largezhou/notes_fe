<template>
  <v-list dense class="item-actions" :class="{ inline }" :style="{ backgroundColor }">
    <!-- 置顶与取消置顶 -->
    <v-list-tile
      v-if="setTop"
      @click="updateField('is_top')"
    >
      <v-list-tile-action>
        <mdi-icon :loading="updating.is_top" :icon="item.is_top ? 'arrow-collapse-down' : 'arrow-collapse-up'"/>
      </v-list-tile-action>
    </v-list-tile>

    <!-- 隐藏与显示 -->
    <v-list-tile @click="updateField('hidden')">
      <v-list-tile-action>
        <mdi-icon :loading="updating.hidden" :icon="item.hidden ? 'eye' : 'eye-off'"/>
      </v-list-tile-action>
    </v-list-tile>

    <!-- 编辑 -->
    <v-list-tile @click="onEdit" :to="editLink">
      <v-list-tile-action>
        <mdi-icon icon="pencil"/>
      </v-list-tile-action>
    </v-list-tile>

    <!-- 删除与恢复 -->
    <v-list-tile @click="onDeleteOrRestore">
      <v-list-tile-action>
        <mdi-icon
          :loading="item.deleted_at ? restoring : deleting"
          :icon="item.deleted_at ? 'delete-restore' : 'delete'"
        />
      </v-list-tile-action>
    </v-list-tile>

    <!-- 彻底删除 -->
    <v-list-tile @click="onForceDelete" v-if="item.deleted_at">
      <v-list-tile-action>
        <mdi-icon :loading="deleting" color="red" icon="delete-forever"/>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  name: 'ItemActions',
  data: () => ({
    updating: {},
    deleting: false,
    restoring: false,
  }),
  props: {
    item: Object,
    updateHandler: Function,
    deleteHandler: Function,
    forceDeleteHandler: Function,
    forceDeleteMsg: String,
    editHandler: [String, Function],
    inline: {
      type: Boolean,
      default: true,
    },
    backgroundColor: {
      type: String,
      default: 'rgba(234, 234, 234, 0.5)',
    },
    setTop: Boolean,
  },
  computed: {
    editLink() {
      if (typeof this.editHandler == 'function') {
        return ''
      } else {
        return this.editHandler
      }
    },
  },
  methods: {
    updateField(field) {
      this.$set(this.updating, field, true)
      const data = {}
      data[field] = !this.item[field]
      this.updateHandler(this.item.id, data)
        .then(res => {
          this.$set(this.item, field, res.data[field])
        })
        .finally(() => {
          this.updating[field] = false
        })
    },
    onEdit() {
      if (typeof this.editHandler == 'function') {
        this.editHandler()
      }
    },

    onDeleteOrRestore() {
      if (this.item.deleted_at) {
        this.restore()
      } else {
        this.delete()
      }
    },

    restore() {
      this.restoring = true

      this.updateHandler(this.item.id, {
        deleted_at: null,
      })
        .then(res => {
          this.$set(this.item, 'deleted_at', null)
        })
        .finally(() => {
          this.restoring = false
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
        content: this.forceDeleteMsg ? this.forceDeleteMsg : '彻底删除后不可恢复！！！',
        okText: '彻底删除',
        okColor: 'red',
      })
        .then(() => {
          this.onForceDeleteConfirm()
        })
    },

    onForceDeleteConfirm() {
      this.deleting = true

      this.forceDeleteHandler(this.item.id)
        .then(res => {
          this.$emit('force-deleted', this.item)
        })
        .finally(() => {
          this.deleting = false
        })
    },

    onDeleteConfirm() {
      this.deleting = true

      this.deleteHandler(this.item.id)
        .then(res => {
          this.$set(this.item, 'deleted_at', true)
        })
        .finally(() => {
          this.deleting = false
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.v-list__tile__action {
  min-width: initial;
}

.item-actions {
  position: absolute;

  &.inline {
    > div {
      display: inline-block;
      vertical-align: middle;
    }

    /deep/ .v-list__tile {
      padding: 0 10px;
    }
  }
}
</style>
