<template>
  <v-slide-y-reverse-transition @afterLeave="$emit('deleted', tag)">
    <div class="tag-wrap" v-if="!tag.deleted">
      <v-btn
        :style="{ width: tagWidth }"
        ref="tags"
        class="tag"
        color="primary"
        outlined
        :to="`/tags/${tag.id}`"
      >
        {{ tag.name }}
        <span class="count">{{ tag.targets_count }}</span>
      </v-btn>

      <div class="actions" v-if="canEdit">
        <v-input
          hide-details
          class="name-input"
          :style="nameInputStyle"
          v-show="nameEditing"
        >
          <input
            type="text"
            v-model="name"
            ref="input"
            @keyup.enter="() => $refs.updateName.onAction()"
          >
          <loading-action
            ref="updateName"
            :action="onUpdateName"
            comp="mdi-icon"
            icon="check"
          />
          <mdi-icon @click="onCancelEditName" icon="close"/>
        </v-input>

        <div v-show="actionsOpened && !nameEditing">
          <v-btn
            text
            small
            icon
            @click="onNameEdit"
          >
            <mdi-icon color="grey darken-1" icon="pencil"/>
          </v-btn>
          <loading-action
            :action="onDelete"
            text
            small
            icon
          >
            <mdi-icon color="grey darken-1" icon="delete"/>
          </loading-action>
          <v-btn
            text
            small
            icon
            @click="actionsOpened = false"
          >
            <mdi-icon color="grey darken-1" icon="close"/>
          </v-btn>
        </div>

        <v-btn
          class="settings"
          v-show="!actionsOpened"
          text
          small
          icon
          @click="onOpen"
        >
          <mdi-icon color="grey darken-1" icon="settings"/>
        </v-btn>
      </div>
    </div>
  </v-slide-y-reverse-transition>
</template>

<script>
import { mapState } from 'vuex'
import { updateTag, delTag } from '@/api/tags'

export default {
  name: 'EditableTag',
  props: {
    tag: Object,
  },
  data: () => ({
    actionsOpened: false,
    nameEditing: false,
    name: '',
    // 标签是否太靠右
    veryRight: false,
  }),
  created() {
    this.name = this.tag.name

    this.$root.$on('tagActionsOpened', this.onOtherTagActionsOpened)
  },
  beforeDestroy() {
    this.$root.$off('tagActionsOpened', this.onOtherTagActionsOpened)
  },
  computed: {
    ...mapState({
      canEdit: state => state.user.name,
      widescreen: state => state.app.widescreen,
    }),
    tagWidth() {
      if (!this.actionsOpened) {
        return null
      }

      return this.widescreen ? '114px' : '96px'
    },

    nameInputStyle() {
      if (this.veryRight) {
        return {
          right: '0',
        }
      } else {
        return {
          left: this.widescreen ? '-112px' : '-94px',
        }
      }
    },
  },
  methods: {
    async onDelete() {
      await this.$confirm({
        title: '删除确认',
        okColor: 'red',
        okText: '删除',
        content: '删除后不可恢复！！！',
      })

      await delTag(this.tag.id)
      this.$set(this.tag, 'deleted', true)
    },

    onCancelEditName() {
      this.nameEditing = false
      this.name = this.tag.name
    },

    onNameEdit() {
      const left = this.$el.offsetLeft

      // 如果标签的左侧加上 输入框的宽度 再加上输入框的 left 大于 body 的宽度
      // 则表示标签太靠右，输入框要使用 right: 0 定位
      // 否则输入框使用 left
      this.veryRight = (left + 140 + 2) > document.body.offsetWidth
      this.nameEditing = true

      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    async onUpdateName() {
      const name = this.name.trim()

      const error = msg => {
        this.$snackbar(msg)
        this.$refs.input.focus()
      }

      if (name === '') {
        return error('标签名不能空空如也')
      }

      if (name.realLength() > 20) {
        return error('太长了')
      }

      if (name === this.tag.name) {
        this.$snackbar('啥也没改')
        this.onCancelEditName()
        this.actionsOpened = false

        return
      }

      await updateTag(this.tag.id, { name })
      this.tag.name = name
      this.onCancelEditName()
      this.actionsOpened = false
    },

    onOpen() {
      this.$root.$emit('tagActionsOpened', this.tag)
      this.actionsOpened = true
    },
    onOtherTagActionsOpened(tag) {
      if (this.tag.id !== tag.id) {
        this.actionsOpened = false
        this.nameEditing = false
      }
    },
  },
  watch: {
    editMode(newValue) {
      if (!newValue) {
        this.onCancelEditName()
        this.actionsOpened = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.tag-wrap {
  position: relative;
  display: inline-block;
  margin: 10px;
}

.edit-mode .tag-wrap:hover .settings {
  display: inline-block;
}

.tag {
  margin: 0;
  overflow: hidden;

  .count {
    margin-left: 10px;
    font-weight: 900;
  }
}

.actions {
  border-radius: 2px;
  background: rgba(208, 208, 208, 0.4);
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

.name-input {
  z-index: 1;
  border-radius: 2px;
  border: 2px solid #bbb;
  background: #eee;
  position: absolute;
  top: 0;
  box-sizing: border-box;
  height: 100%;

  width: 140px;

  ::v-deep {
    .v-input__control {
      height: 100%;
    }

    .v-input__slot {
      height: 100%;
      margin: 0;
    }

    input {
      padding-left: 10px;
      width: calc(135px - 50px);
    }

    .v-messages {
      display: none;
    }
  }
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
