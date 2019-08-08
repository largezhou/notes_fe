<template>
  <page-layout>
    <v-form
      ref="form"
      class="login-form"
      @keydown.enter.native="$refs.loginBtn.onAction">
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
      <loading-action
        ref="loginBtn"
        color="primary"
        :action="onLogin"
      >
        登录
      </loading-action>
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
    }
  },
  methods: {
    async onLogin() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }

      await this.$store.dispatch('login', {
        data: this.form,
      })

      location.href = this.$route.query._redirect || '/'
    },
  },
}
</script>

<style lang="scss">
.login-form {
  text-align: center;
  width: 300px;
  margin: 100px auto 0 auto;
}
</style>
