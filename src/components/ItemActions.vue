<template>
  <div class="item-actions" :class="{ inline }">
    <!-- 置顶与取消置顶 -->
    <loading-action
      v-if="setTop"
      ref="toggleHidden"
      :action="toggleIsTop"
      icon
      small
    >
      <mdi-icon :icon="item.is_top ? 'arrow-collapse-down' : 'arrow-collapse-up'"/>
    </loading-action>

    <!-- 隐藏与显示 -->
    <loading-action
      ref="toggleHidden"
      :action="toggleHidden"
      icon
      small
    >
      <mdi-icon :icon="item.hidden ? 'eye' : 'eye-off'"/>
    </loading-action>

    <!-- 编辑 -->
    <v-btn
      icon
      small
      @click="onEdit"
      :to="editLink"
    >
      <mdi-icon icon="pencil"/>
    </v-btn>

    <!-- 删除与恢复 -->
    <loading-action
      ref="deleteOrRestore"
      :action="item.deleted_at ? restore : deleteNote"
      small
      icon
    >
      <mdi-icon :icon="item.deleted_at ? 'delete-restore' : 'delete'"/>
    </loading-action>

    <!-- 彻底删除 -->
    <loading-action
      v-if="item.deleted_at"
      ref="forceDelete"
      color="red"
      :action="forceDelete"
      icon
      small
    >
      <mdi-icon icon="delete-forever"/>
    </loading-action>
  </div>
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
}
</style>
