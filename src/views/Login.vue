<template>
  <page-layout>
    <v-form ref="form" class="login-form" @keydown.enter.native="onLogin">
      <p class="title">登录吧</p>
      <v-text-field
        autofocus
        label="用户名"
        :error-messages="validateErrors('form.username')"
        v-model="$v.form.username.$model"
      />
      <v-text-field
        label="密码"
        type="password"
        :error-messages="validateErrors('form.password')"
        v-model="$v.form.password.$model"
      />
      <v-btn color="primary" @click="onLogin" :loading="submitting">登录</v-btn>
    </v-form>
  </page-layout>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import { validateErrorsMixins } from '@/validators'

export default {
  name: 'Login',
  mixins: [validationMixin, validateErrorsMixins],
  validations: {
    form: {
      username: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20),
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20),
      },
    },
  },
  data() {
    return {
      form: {
        username: '',
        password: '',
      },

      attrs: {
        form: {
          username: {
            required: '用户名要填的',
            minLength: '用户名只能这么长：6 - 20',
            maxLength: '用户名只能这么长：6 - 20',
          },
          password: {
            required: '密码也是要填的',
            minLength: '用户名只能这么长：6 - 20',
            maxLength: '用户名只能这么长：6 - 20',
          },
        },
      },

      submitting: false,
    }
  },
  methods: {
    onLogin() {
      if (this.submitting) {
        this.$dialog('别急')
        return
      }

      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }

      this.submitting = true

      this.$store
        .dispatch('login', {
          data: this.form,
        })
        .then(res => {
          const r = this.$route.query._redirect
          const to = r || '/'

          location.href = to
        })
        .catch(() => {
          this.submitting = false
        })
    },
  },
}
</script>

<style lang="scss">
.login-form {
  text-align: center;
  width: 300px;
  margin: auto;
  margin-top: 100px;
}
</style>
