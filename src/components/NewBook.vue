<template>
  <div @click="onClick">
    <slot/>
    <v-dialog
      v-model="modal"
      max-width="500px"
      persistent
    >
      <v-card>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click="onCancel">
            <mdi-icon icon="close"/>
          </v-btn>
          <v-toolbar-title>{{ this.book ? `编辑 ${this.book.title}` : '添加一本书' }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="onSubmit" :disabled="submitting">
              <v-progress-circular
                v-if="submitting"
                :size="30"
                :width="3"
                color="white"
                indeterminate
              />
              <mdi-icon v-else icon="content-save"/>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-container grid-list-md>
            <v-form ref="form">
              <v-layout wrap>

                <v-flex xs12>
                  <v-text-field
                    label="书名"
                    :error-messages="validateErrors('form.title')"
                    v-model="$v.form.title.$model"
                  />
                </v-flex>

                <v-flex xs6>
                  <v-text-field
                    label="总页数"
                    type="number"
                    min="1"
                    :error-messages="validateErrors('form.total')"
                    v-model="$v.form.total.$model"
                  />
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    label="已读"
                    type="number"
                    min="0"
                    :error-messages="validateErrors('form.read')"
                    v-model="$v.form.read.$model"
                  />
                </v-flex>

                <v-flex xs12>
                  <v-dialog
                    ref="startDateModal"
                    v-model="startDateModal"
                    :return-value.sync="form.started_at"
                    lazy
                    full-width
                    width="290px"
                  >
                    <v-text-field
                      v-model="form.started_at"
                      slot="activator"
                      label="开始时间"
                      readonly
                      clearable
                    ></v-text-field>
                    <v-date-picker
                      v-model="form.started_at"
                      scrollable
                      locale="zh-cn"
                    >
                      <v-spacer/>
                      <v-btn flat color="primary" @click="startDateModal = false">取消</v-btn>
                      <v-btn flat color="primary" @click="$refs.startDateModal.save(form.started_at)">确定</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-flex>

                <v-flex xs12>
                  <file-picker
                    label="封面"
                    :error-messages="validateErrors('form.cover')"
                    v-model="$v.form.cover.$model"
                    accept="image/*"
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
import { postCreateBook, updateBook } from '@/api/books'
import { vImage, validateErrorsMixins } from '@/validators'
import FilePicker from '@/components/FilePicker'

export default {
  name: 'NewBook',
  components: { FilePicker },
  mixins: [validationMixin, validateErrorsMixins],
  // 这里面的结构，一定要跟data中的form对应！！！！
  validations() {
    const cover = {
      required,
    }

    if (this.form.cover instanceof File) {
      cover.vImage = vImage
    } else {
      delete cover.vImage
    }

    return {
      form: {
        title: {
          required,
          maxLength: maxLength(255),
        },
        read: {
          integer,
          minValue: minValue(0),
          maxValue: maxValue(this.form.total),
        },
        total: {
          required,
          integer,
          minValue: minValue(1),
        },
        cover,
      },
    }
  },
  data: () => ({
    modal: false,

    startDateModal: false,

    form: {
      title: '',
      read: '',
      total: '',
      started_at: '',
      cover: null,
    },

    attrs: {
      form: {
        title: {
          required: '必须填写书名',
          maxLength: '书名长度不能大于255个字',
        },
        read: {
          integer: '已读必须是整数',
          minValue: '已读不能小于0',
          maxValue: '已读不能大于总页数',
        },
        total: {
          required: '必须填写总页数',
          integer: '总页数必须为整数',
          minValue: '总页数不能小于1',
        },
        cover: {
          required: '必须选择封面',
          vImage: '封面必须是图片文件',
        },
      },
    },

    book: null,

    submitting: false,
  }),
  created() {
    this.$root.$on('editBook', this.onEdit)
  },
  beforeDestroy() {
    this.$root.$off('editBook', this.onEdit)
  },
  methods: {
    onClick() {
      this.modal = true
      this.book = null
    },
    onSubmit() {
      if (this.submitting) {
        this.$snackbar('别急')
        return
      }

      this.submitting = true

      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }

      const fd = new FormData()
      for (const k of Object.keys(this.form)) {
        let val = this.form[k]

        // FormData 会把数据转为字符串，，所以 null 和 undefined 要去掉
        if (val === null || val === undefined) {
          continue
        }
        fd.append(k, val)
      }

      let res
      if (this.book) {
        if (!(fd.get('cover') instanceof File)) {
          fd.delete('cover')
        }

        res = updateBook(this.book.id, fd)
          .then(res => {
            this.$root.$emit('bookUpdated', res.data)
            this.onCancel()
          })
      } else {
        res = postCreateBook(fd)
          .then(res => {
            const data = res.data
            this.onCancel()
            this.$snackbar('已添加')
            this.$router.push({
              name: 'bookShow',
              params: {
                bookId: data.id,
              },
            })
          })
      }

      res.finally(() => {
        this.submitting = false
      })
    },
    onCancel() {
      this.$refs.form.reset()
      this.$v.$reset()
      this.modal = false
      this.book = null
    },

    onEdit(book) {
      this.book = book

      Object.keys(this.form).forEach(field => {
        this.$set(this.form, field, this.book[field])
      })

      this.modal = true
    },
  },
}
</script>
