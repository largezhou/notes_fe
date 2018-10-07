<template>
  <v-container grid-list-md class="content note-create">
    <v-layout row wrap justify-center>
      <v-flex md9 sm12>
        <v-card v-if="book">
          <v-card-text>
            <v-card-title primary-title>
              <div class="title">{{ book.title }}</div>
              <div style="margin-left: 10px;">添加笔记</div>
            </v-card-title>

            <v-container grid-list-md>
              <v-form ref="form">
                <v-layout wrap justify-center>

                  <v-flex xs12 sm8>
                    <v-text-field
                      label="标题（选填）"
                      :error-messages="validateErrors('form.title')"
                      v-model="$v.form.title.$model"
                    />
                  </v-flex>

                  <v-flex xs12 sm4>
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
                      rows="2"
                    />
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
                    <m-d-editor
                      label="笔记"
                      :error-messages="validateErrors('form.content')"
                      v-model="$v.form.content.$model"
                      @change="onContentChange"
                    />
                  </v-flex>

                  <v-btn color="primary" @click="onSubmit">添加笔记</v-btn>
                  <v-btn @click="onReset">重置</v-btn>

                </v-layout>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, integer, minValue, maxValue } from 'vuelidate/lib/validators'
import _ from 'lodash'
import { getTags } from '@/api/tags'
import MDEditor from '@/components/MDEditor'
import { getBook } from '@/api/books'

export default {
  name: 'Create',
  components: { MDEditor },
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
    book: null,

    tags: [],
    search: '',
    searching: false,

    form: {
      page: '',
      title: '',
      desc: '',
      content: '',
      tags: [],
      html_content: '',
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
  created() {
    this.debounceSearchTags = _.debounce(this.searchTags, 500)

    this.getTags()
    this.getBook()
  },
  methods: {
    onReset() {
      this.$refs.form.reset()
      this.$v.$reset()
    },

    onSubmit() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }

      log(this.form)
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
    onContentChange(content, html) {
      this.form.html_content = html
    },
    getTags() {
      getTags({
        scope: 'hot',
      })
        .then(res => {
          const data = res.data
          this.tags = data.tags
        })
    },
    getBook() {
      getBook(this.$route.params.id)
        .then(res => {
          const data = res.data
          this.book = data.book
        })
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

<style lang="scss">
.note-create {
  .v-note-wrapper {
    z-index: 1;
  }
}
</style>
