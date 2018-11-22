<template>
  <v-card>
    <v-card-text>
      <v-container grid-list-md>
        <v-form ref="form">
          <v-layout wrap justify-center>

            <v-flex xs12>
              <v-text-field
                label="标题"
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
              <tags-selector
                v-model="form.tags"
              />
            </v-flex>

            <v-flex xs12>
              <m-d-editor
                label="内容"
                :error-messages="validateErrors('form.content')"
                v-model="$v.form.content.$model"
                @change="onContentChange"
              />
            </v-flex>

          </v-layout>

        </v-form>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn depressed color="primary" @click="onSubmit" :loading="submitting" :disabled="$v.$anyError">{{ this.post ? '更新' : '添加博客' }}</v-btn>
      <v-btn depressed @click="onReset" v-if="this.post">重置</v-btn>
      <v-btn depressed @click="onClear" v-else>清空</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
import { validateErrorsMixins } from '@/validators'
import MDEditor from '@/components/MDEditor'
import TagsSelector from '@/components/TagsSelector'
import { postCreatePost, updatePost } from '@/api/posts'

export default {
  name: 'PostForm',
  components: { TagsSelector, MDEditor },
  mixins: [validationMixin, validateErrorsMixins],
  validations() {
    return {
      form: {
        title: {
          required,
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
  props: {
    post: Object,
  },
  data: () => ({
    form: {
      title: '',
      desc: '',
      content: '',
      tags: [],
      html_content: '',
    },

    attrs: {
      form: {
        title: {
          required: '标题要填的',
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
  }),
  methods: {
    onSubmit() {
      if (this.submitting) {
        this.$snackbar('不要急啊')
        return
      }

      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }

      this.submitting = true

      let res
      if (this.post) {
        // 更新
        res = updatePost(this.post.id, this.form)
      } else {
        // 创建
        res = postCreatePost(this.form)
      }

      res
        .then(res => {
          this.$router.push({
            name: 'postShow',
            params: {
              postId: res.data.id,
            },
          })
          this.$store.commit('changeEditMode', false)
        })
        .catch(() => {
          this.submitting = false
        })
    },
    onClear() {
      this.$refs.form.reset()
      this.$v.$reset()
    },

    onReset() {
      Object.keys(this.form).forEach(k => {
        this.form[k] = this.post[k]
      })
    },

    onContentChange(content, html) {
      this.form.html_content = html
    },
  },
  watch: {
    post(newValue) {
      if (newValue) {
        this.onReset()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
/deep/ {
  .v-note-wrapper {
    &.widescreen {
      height: 400px;
    }

    &.fullscreen {
      height: auto;
    }
  }
}
</style>
