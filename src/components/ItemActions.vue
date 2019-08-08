<template>
  <v-list
    dense
    class="item-actions"
    :class="{ inline }"
    rounded
  >
    <!-- 置顶与取消置顶 -->
    <v-list-item v-if="setTop" @click="">
      <v-list-item-action>
        <loading-action
          ref="toggleHidden"
          :action="toggleIsTop"
          icon
          small
        >
          <mdi-icon :icon="item.is_top ? 'arrow-collapse-down' : 'arrow-collapse-up'"/>
        </loading-action>
      </v-list-item-action>
    </v-list-item>

    <!-- 隐藏与显示 -->
    <v-list-item @click="">
      <v-list-item-action>
        <loading-action
          ref="toggleHidden"
          :action="toggleHidden"
          icon
          small
        >
          <mdi-icon :icon="item.hidden ? 'eye' : 'eye-off'"/>
        </loading-action>
      </v-list-item-action>
    </v-list-item>

    <!-- 编辑 -->
    <v-list-item @click="">
      <v-list-item-action>
        <v-btn
          icon
          small
          @click="onEdit"
          :to="editLink"
        >
          <mdi-icon icon="pencil"/>
        </v-btn>
      </v-list-item-action>
    </v-list-item>

    <!-- 删除与恢复 -->
    <v-list-item @click="">
      <v-list-item-action>
        <loading-action
          ref="deleteOrRestore"
          :action="item.deleted_at ? restore : deleteNote"
          small
          icon
        >
          <mdi-icon :icon="item.deleted_at ? 'delete-restore' : 'delete'"/>
        </loading-action>
      </v-list-item-action>
    </v-list-item>

    <!-- 彻底删除 -->
    <v-list-item @click="" v-if="item.deleted_at">
      <v-list-item-action>
        <loading-action
          ref="forceDelete"
          color="red"
          :action="forceDelete"
          icon
          small
        >
          <mdi-icon icon="delete-forever"/>
        </loading-action>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'ItemActions',
  data: () => ({
    updating: {},
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
    setTop: Boolean,
  },
  computed: {
    editLink() {
      if (typeof this.editHandler === 'function') {
        return ''
      } else {
        return this.editHandler
      }
    },
  },
  methods: {
    async toggleIsTop() {
      await this.updateField('is_top')
    },
    async toggleHidden() {
      await this.updateField('hidden')
    },

    async updateField(field) {
      this.$set(this.updating, field, true)
      const data = {}
      data[field] = !this.item[field]
      const res = await this.updateHandler(this.item.id, data)
      this.$set(this.item, field, res.data[field])
    },

    onEdit() {
      if (typeof this.editHandler === 'function') {
        this.editHandler()
      }
    },

    async restore() {
      await this.updateHandler(this.item.id, {
        deleted_at: null,
      })

      this.$set(this.item, 'deleted_at', null)
    },

    async deleteNote() {
      await this.$confirm({
        title: '删除确认',
        content: '删除后还可以恢复的，别慌',
        okText: '删除',
        okColor: 'red',
      })
      await this.deleteHandler(this.item.id)
      this.$set(this.item, 'deleted_at', true)
    },

    async forceDelete() {
      await this.$confirm({
        title: '删除确认',
        content: this.forceDeleteMsg ? this.forceDeleteMsg : '彻底删除后不可恢复！！！',
        okText: '彻底删除',
        okColor: 'red',
      })
      await this.forceDeleteHandler(this.item.id)
      this.$emit('force-deleted', this.item)
    },
  },
}
</script>

<style lang="scss" scoped>
.item-actions {
  display: flex;
  position: absolute;
  top: 5px;
  right: 5px;
  flex-direction: column;
  padding: 0;
  background: rgba(255, 255, 255, 0.5);

  &.inline {
    flex-direction: row;
  }

  .v-list-item__action {
    margin: 0;

    > * {
      padding: 8px;
    }
  }

  .v-list-item {
    padding: 0;
    margin-bottom: 0 !important;
  }
}
</style>
