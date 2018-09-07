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
            <el-dropdown class="more pull-right" trigger="click">
              <a href="javascript:void(0);" class="el-icon-more"></a>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>编辑模式</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-scrollbar class="content-wrapper">
      <router-view/>
    </el-scrollbar>
  </div>
</template>
