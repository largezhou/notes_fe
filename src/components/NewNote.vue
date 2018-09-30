<template>
  <div>
    <v-btn
      class="add-note-btn"
      color="pink"
      fab
      dark
      small
      absolute
      @click="onClick"
    >
      <v-icon>add</v-icon>
    </v-btn>

    <v-dialog
      v-model="modal"
      class="new-note-modal"
      persistent
      fullscreen
    >
      <v-card>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click="onCancel">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>添加笔记</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="modal = true" @click="onSubmit">
              <v-icon>save</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-container grid-list-md>
            <v-form ref="form">
              <v-layout wrap>

                <v-flex xs12>
                  <div class="title">{{ book.title }}</div>
                </v-flex>

                <v-flex xs8>
                  <v-text-field
                    label="标题（选填）"
                    :error-messages="validateErrors('form.title')"
                    v-model="$v.form.title.$model"
                  />
                </v-flex>

                <v-flex xs4>
                  <v-text-field
                    :label="`第几页？（共 ${book.total} 页）`"
                    type="number"
                    min="1"
                    :max="book.total"
                    :error-messages="validateErrors('form.page')"
                    v-model="$v.form.page.$model"
                  />
                </v-flex>

                <v-flex xs12>
                  <v-textarea
                    label="描述（选填）"
                    hint="会自动截取笔记内容的前部"
                    :error-messages="validateErrors('form.desc')"
                    v-model="$v.form.desc.$model"
                  ></v-textarea>
                </v-flex>

                <v-flex xs12>
                  <v-combobox
                    id="heihei"
                    v-model="$v.form.tags.$model"
                    :items="tags"
                    label="标签"
                    multiple
                    small-chips
                    clearable
                    deletable-chips
                    :search-input.sync="search"
                    ref="tags"
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
                </v-flex>

                <v-flex xs12>
                  <v-textarea
                    label="笔记"
                    :error-messages="validateErrors('form.content')"
                    v-model="$v.form.content.$model"
                  />
                </v-flex>

              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, integer, minValue, maxValue } from 'vuelidate/lib/validators'
import _ from 'lodash'
import { getTags } from '@/api/tags'

export default {
  name: 'NewNote',
  mixins: [validationMixin],
  validations() {
    return {
      form: {
        page: {
          required,
          integer,
          minValue: minValue(1),
          maxValue: maxValue(this.book.total),
        },
        title: {
          maxLength: maxLength(255),
        },
        desc: {
          maxLength: maxLength(255),
        },
        content: {
          required,
          // 大概是mysql text类型的长度
          maxLength: maxLength(60000),
        },
        tags: {},
      },
    }
  },
  data: () => ({
    modal: false,

    tags: [],
    search: '',
    searching: false,

    form: {
      page: '',
      title: '',
      desc: '',
      content: '',
      tags: [],
    },

    attrs: {
      form: {
        page: {
          required: '必须填写页数',
          integer: '页数必须是整数',
          minValue: '页数不能小于1',
          maxValue: '页数不能超过书的总页数',
        },
        title: {
          maxLength: '标题长度不能大于255个字',
        },
        desc: {
          maxLength: '描述长度不能大于255个字',
        },
        content: {
          required: '必须填写内容',
          maxLength: '内容太多了',
        },
      },
    },
  }),
  props: {
    book: Object,
  },
  created() {
    this.debounceSearchTags = _.debounce(this.searchTags, 500)
  },
  methods: {
    onCancel() {
      this.modal = false
    },

    onSubmit() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }

      log(this.form)
    },

    onClick() {
      this.modal = true
    },

    validateErrors(key) {
      const data = _.get(this.$v, key)
      // 输入框没有输入过值时，不要显示错误消息
      if (!data.$dirty) {
        return
      }

      const validators = data.$params
      for (const vt of Object.keys(validators)) {
        if (!data[vt]) {
          return _.get(this.attrs, key)[vt]
        }
      }
    },
    searchTags() {
      getTags({
        q: this.search,
      })
        .then(res => {
          const data = res.data
          this.tags = _.unionBy(this.tags, data.tags, 'id')
        })
        .finally(() => {
          this.searching = false
        })
    },
  },
  watch: {
    modal(newValue) {
      if (newValue) {
        getTags({
          scope: 'hot',
        })
          .then(res => {
            const data = res.data
            this.tags = data.tags
          })
      }
    },
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

<style lang="scss">
.new-note-modal {
  .title {
    font-size: 25px;
  }
}
</style>
