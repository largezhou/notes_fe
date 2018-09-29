<template>
  <v-list-tile @click="onClick">
    <span class="navbar-menu-icon"><v-icon>add</v-icon></span>
    <v-list-tile-title>开始看书</v-list-tile-title>

    <v-dialog
      v-model="modal"
      max-width="500px"
      persistent
    >
      <v-card>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click="onCancel">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>添加一本书</v-toolbar-title>
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
                  <v-text-field
                    label="书名"
                    :error-messages="validateErrors('form.title')"
                    v-model="$v.form.title.$model"
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
                <v-flex xs6>
                  <v-text-field
                    label="总页数"
                    type="number"
                    min="1"
                    :error-messages="validateErrors('form.total')"
                    v-model="$v.form.total.$model"
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
                  <v-text-field
                    clearable
                    label="封面"
                    type="file"
                    :error-messages="validateErrors('form.cover')"
                    accept="image/*"
                    @change.native="onCoverChange($event)"
                    @click:clear="onCoverClear"
                  />
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-list-tile>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, integer, minValue, maxValue } from 'vuelidate/lib/validators'
import _ from 'lodash'
import axios from '@/plugins/axios'
import { vImage } from '@/validators'

export default {
  name: 'NewBook',
  mixins: [validationMixin],
  // 这里面的结构，一定要跟data中的form对应！！！！
  validations() {
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
        cover: {
          required,
          vImage,
        },
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
  }),
  methods: {
    onClick() {
      this.modal = true
    },
    onSubmit() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        alert('数据不对啊')
        return
      }

      const fd = new FormData()
      for (const k of Object.keys(this.form)) {
        fd.append(k, this.form[k])
      }

      window.t = fd
      log(fd)

      axios.post('https://email-sender.cditd.com/api/senders/rs-pw/emails', fd)
        .finally(res => {
          log(res)
        })
    },
    onCancel() {
      this.$refs.form.reset()
      this.$v.$reset()
      this.modal = false
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
    onCoverClear() {
      this.$v.form.cover.$model = null
    },
    onCoverChange(e) {
      this.$v.form.cover.$model = e.target.files[0] || null
    },
  },
}
</script>
