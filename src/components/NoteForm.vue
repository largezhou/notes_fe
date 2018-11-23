<template>
  <v-card>
    <v-card-text>
      <v-container grid-list-md>
        <v-form ref="form" v-if="book">
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
      <v-btn depressed color="primary" @click="onSubmit" :loading="submitting">{{ this.note ? '更新' : '添加笔记' }}</v-btn>
      <v-btn depressed @click="onReset" v-if="this.note">重置</v-btn>
      <v-btn depressed @click="onClear" v-else>清空</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, integer, minValue, maxValue } from 'vuelidate/lib/validators'
import { validateErrorsMixins } from '@/validators'
import MDEditor from '@/components/MDEditor'
import { postCreateNote, updateNote } from '@/api/notes'
import TagsSelector from '@/components/TagsSelector'

export default {
  name: 'NoteForm',
  components: { MDEditor, TagsSelector },
  mixins: [validationMixin, validateErrorsMixins],

  validations() {
    return {
      form: {
        page: {
          required,
          integer,
          minValue: minValue(1),
          maxValue: maxValue(this.book ? this.book.total : 0),
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
  data() {
    return {
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
            integer: '必须是整数',
            minValue: '不能小于1',
            maxValue: '不能超过书的总页数',
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

      submitting: false,
    }
  },
  props: {
    book: Object,
    note: Object,
  },
  computed: {
    contentError() {
      return this.fieldsAnyError(['content', 'page'])
    },
    otherError() {
      return this.fieldsAnyError(['title', 'desc'])
    },
  },
  methods: {
    onClear() {
      this.$refs.form.reset()
      this.$v.$reset()
    },

    onSubmit() {
      if (this.submitting) {
        this.$snackbar('等一下啊')
        return
      }

      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }

      this.submitting = true

      let res
      if (this.note) {
        // 更新
        res = updateNote(this.note.id, this.form)
      } else {
        // 创建
        res = postCreateNote(this.book.id, this.form)
      }

      res
        .then(res => {
          this.$router.push({
            name: 'noteShow',
            params: {
              noteId: res.data.id,
            },
          })
          this.$store.commit('changeEditMode', false)
        })
        .catch(() => {
          this.submitting = false
        })
    },

    onReset() {
      Object.keys(this.form).forEach(k => {
        this.form[k] = this.note[k]
      })

      this.form.mark_read = true
    },

    onContentChange(content, html) {
      this.form.html_content = html
    },
    fieldsAnyError(fields) {
      return fields.some(f => {
        return this.$v.form[f].$anyError
      })
    },
  },
  watch: {
    note(newValue) {
      newValue && this.onReset()
    },
    book: {
      handler(newValue) {
        newValue && (this.attrs.form.page.maxValue = `不能超过${newValue.total}页`)
      },
      immediate: true,
    },
  },
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables';

/deep/ .has-error {
  .v-tabs__item {
    color: $error-color;
    font-weight: 900;
  }
}
</style>
