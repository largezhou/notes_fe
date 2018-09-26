<template>
  <div style="text-align: center">
    <h1>登录</h1>

    <el-form
      label-width="80px"
      :model="loginForm"
      ref="loginForm"
      :rules="loginRules"
      style="margin: auto; width: 300px;"
    >
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model="loginForm.mobile"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password"/>
      </el-form-item>
      <el-form-item>
        <el-button @click="onClick">点击登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        mobile: '',
        password: '',
      },
      loginRules: {
        mobile: [
          { required: true, message: '必须填写手机号码', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '必须填写密码', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    onClick() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch('login', {
              data: this.loginForm,
            })
            .then(res => {
              this.$snackbar('登录成功')
              const r = this.$route.query._redirect
              const to = r || { name: 'index' }

              this.$router.push(to)
            })
        }
      })
    },
  },
}
</script>

<style scoped>

</style>
