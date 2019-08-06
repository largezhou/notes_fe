<template>
  <v-card>
    <v-card-text>
      <v-container grid-list-md>
        <v-form ref="form" v-if="book">
          <v-layout wrap justify-center>
            <v-flex xs12>
              <v-text-field
                label="标题"
                :error-messages="validateErrors('form.title')"
                v-model="$v.form.title.$model"
              />
            </v-flex>

            <v-flex xs12>
              <tags-selector v-model="form.tags"/>
            </v-flex>

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
              <v-checkbox
                label="已读到此处"
                v-model="form.mark_read"
                color="primary"
                checked
                @change="markReadDirty = true"
              />
            </v-flex>

            <v-flex xs12>
              <m-d-editor
                label="笔记"
                :error-messages="validateErrors('form.content')"
                v-model="$v.form.content.$model"
                @change="onContentChange"
                :default-height="350"
              />
            </v-flex>

          </v-layout>
        </v-form>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn depressed color="primary" @click="onSubmit" :loading="submitting">{{ this.note ? '更新' : '添加笔记' }}</v-btn>
      <v-btn depressed @click="onReset" v-if="this.note">重置</v-btn>
      <v-btn depressed @click="onClear" v-else>清空</v-btn>
      <v-checkbox v-model="stay" v-if="this.note" label="留在此页" hide-details class="mt-0 ml-4"/>
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
          required,
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
            required: '标题要填的',
            maxLength: '标题长度不能大于255个字',
          },
          content: {
            required: '必须填写内容',
            maxLength: '内容太多了',
          },
        },
      },

      submitting: false,
      markReadDirty: false,

      stay: false,
    }
  },
  props: {
    book: Object,
    note: Object,
  },
  created() {
    this.note && this.onReset()
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
          .then(res => {
            if (this.stay) {
              this.submitting = false
              this.$snackbar('更新成功')
            } else {
              this.$router.back()
            }
          })
      } else {
        // 创建
        res = postCreateNote(this.book.id, this.form)
          .then(res => {
            this.$router.push({
              name: 'noteShow',
              params: {
                noteId: res.data.id,
              },
            })
          })
      }

      res.catch(() => {
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
    'form.page': {
      handler(newValue) {
        // 只要手动点过 已读到此处 则不会自动标记了
        if (this.markReadDirty) {
          return
        }

        // 如果笔记所属页，大于书的已读页，则自动标记，否则取消
        this.form.mark_read = newValue > this.book.read
      },
      immediate: true,
    },
  },
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables';

/deep/ {
  .has-error {
    .v-tabs__item {
      color: $error-color;
      font-weight: 900;
    }
  }
}

.v-card__text {
  padding: 16px 6px;
}

.device-mobile {
  .v-card__text {
    padding: 16px 0;
  }
}
</style>
