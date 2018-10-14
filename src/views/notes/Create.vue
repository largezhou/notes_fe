<template>
  <page-layout class="note-create" v-if="book">
    <book-info-card :book="book" :new-note-btn="false" :expand="false"/>

    <div class="page-desc">~~ 添加笔记 ~~</div>

    <v-card>
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form">
            <v-tabs slider-color="primary" grow>
              <v-tab :class="{ 'has-error': contentError }" ripple>内容</v-tab>
              <v-tab :class="{ 'has-error': otherError }" ripple>其他</v-tab>
              <v-tab-item>
                <v-layout wrap justify-center>
                  <v-flex xs7>
                    <v-text-field
                      label="第几页？"
                      type="number"
                      min="1"
                      :max="book.total"
                      :error-messages="validateErrors('form.page')"
                      v-model="$v.form.page.$model"
                    />
                  </v-flex>

                  <v-flex xs5>
                    <v-checkbox label="已读到此处" v-model="form.mark_read" color="primary" checked/>
                  </v-flex>

                  <v-flex xs12>
                    <m-d-editor
                      label="笔记"
                      :error-messages="validateErrors('form.content')"
                      v-model="$v.form.content.$model"
                      @change="onContentChange"
                    />
                  </v-flex>

                </v-layout>
              </v-tab-item>

              <v-tab-item>
                <v-layout wrap justify-center>
                  <v-flex xs12>
                    <v-text-field
                      label="标题（选填）"
                      :error-messages="validateErrors('form.title')"
                      v-model="$v.form.title.$model"
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
                    <tags-selector v-model="form.tags"/>
                  </v-flex>

                </v-layout>
              </v-tab-item>
            </v-tabs>

          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn depressed color="primary" @click="onSubmit">添加笔记</v-btn>
        <v-btn depressed @click="onClear">清空</v-btn>
      </v-card-actions>
    </v-card>
  </page-layout>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, integer, minValue, maxValue } from 'vuelidate/lib/validators'
import _ from 'lodash'
import MDEditor from '@/components/MDEditor'
import { getBook } from '@/api/books'
import BookInfoCard from '@/components/BookInfoCard'
import { postCreateNote } from '@/api/notes'
import TagsSelector from '@/components/TagsSelector'

export default {
  name: 'Create',
  components: { MDEditor, BookInfoCard, TagsSelector },
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
      },
    }
  },
  data: () => ({
    book: null,

    form: {
      page: '',
      title: '',
      desc: '',
      content: '',
      tags: [],
      html_content: '',
      mark_read: true,
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
  computed: {
    contentError() {
      return this.fieldsAnyError(['content', 'page'])
    },
    otherError() {
      return this.fieldsAnyError(['title', 'desc'])
    },
  },
  created() {
    this.getBook()
  },
  methods: {
    onClear() {
      this.$refs.form.reset()
      this.$v.$reset()
    },

    onSubmit() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }

      postCreateNote(this.book.id, this.form)
        .then(res => {
          this.$router.push({
            name: 'bookShow',
            bookId: this.book.id,
          })
        })
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
    onContentChange(content, html) {
      this.form.html_content = html
    },
    getBook() {
      getBook(this.$route.params.bookId)
        .then(res => {
          const data = res.data
          this.book = data.book
        })
    },
    fieldsAnyError(fields) {
      return fields.some(f => {
        return this.$v.form[f].$anyError
      })
    },
  },
}
</script>

<style lang="scss">
@import '~@/styles/variables';

.note-create {
  .has-error {
    .v-tabs__item {
      color: $error-color;
      font-weight: 900;
    }
  }
}
</style>
