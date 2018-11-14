<template>
  <v-combobox
    :value="value"
    :items="tags"
    label="标签"
    multiple
    small-chips
    clearable
    deletable-chips
    :search-input.sync="search"
    ref="tags"
    item-text="name"
    @input="onInput"
  >
    <template slot="no-data">
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title v-if="searching">
            搜索中...
          </v-list-tile-title>
          <v-list-tile-title v-else>
            没有与 "<strong>{{ search }}</strong>" 匹配的标签，按 <kbd>enter</kbd> 添加
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-combobox>
</template>

<script>
import { getTags } from '@/api/tags'
import _ from 'lodash'
import vFormItem from '@/mixins/vform_item'

export default {
  name: 'TagsSelector',
  mixins: [vFormItem],
  props: {
    defaultTags: [Boolean, Array],
    value: Array,
  },
  data: () => ({
    searching: false,
    search: '',
    tags: [],
  }),
  created() {
    this.debounceSearchTags = _.debounce(this.searchTags, 500)

    this.initTags()
  },
  methods: {
    // 如果父组件传了一个数组过来，则使用该值作为选择框的默认选项，否则获取热门 tags
    initTags() {
      if (this.defaultTags && Array.isArray(this.defaultTags)) {
        this.tags = this.defaultTags
      } else {
        getTags({
          scope: 'hot',
        })
          .then(res => {
            this.tags = res.data
          })
      }
    },
    searchTags() {
      getTags({
        q: this.search,
      })
        .then(res => {
          const data = res.data
          this.tags = _.unionBy(this.tags, data, 'id')
        })
        .finally(() => {
          this.searching = false
        })
    },
    onInput(value) {
      this.$emit('input', value)
    },
    reset() {
      this.$refs.tags.reset()
    },
  },
  watch: {
    search(newValue) {
      // 如果有匹配项，则不搜索
      if (this.$refs.tags.filteredItems.length > 0) {
        return
      }
      // 首次的newValue值为null，避免出错，先判断下
      if (typeof newValue != 'string') {
        return
      }

      this.searching = true
      this.debounceSearchTags()
    },
  },
}
</script>
