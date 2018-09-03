<template>
  <div id="app">
    <div class="navbar-wrapper">
      <div class="container">
        <el-row :gutter="10" type="flex" justify="center header">
          <el-col :md="24" :sm="20">
            <router-link class="navbar-brand" to="/">
              <img width="30" height="30" src="./assets/logo.png">
            </router-link>
            <router-link to="/login">登录</router-link>
            <router-link to="/need-auth">需要登录</router-link>
            <router-link to="/404">404</router-link>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="content-wrapper">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
$navbar-height: 60px;

.navbar-wrapper {
  height: $navbar-height;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: #fff;

  .header {
    padding: 6px 0;
  }

  .navbar-brand {
    display: inline-block;
    padding: 8px 16px;
    line-height: 1;
  }

  a {
    font-size: 18px;
    padding: 8px 20px;
    vertical-align: middle;
    border-radius: 4px;
  }

  a:hover {
    background-color: #f6f6f6;
    transition: background-color .3s;
  }
}

.container {
  box-sizing: border-box;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 10px;
}

.content-wrapper {
  margin-top: $navbar-height;
  padding: 10px 0;
}
</style>
