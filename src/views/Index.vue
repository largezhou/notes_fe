<template>
  <div>
    <div class="navbar-wrapper">
      <div class="container">
        <el-row :gutter="10" type="flex" justify="center">
          <el-col :md="24" :sm="20">
            <router-link class="navbar-brand" to="/">首页</router-link>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="container">
        <el-row :gutter="10" type="flex" justify="center">
          <el-col :md="6" class="hidden-sm-and-down">
            <el-card class="box-card">
              <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
              </div>
            </el-card>
          </el-col>
          <el-col :md="18" :sm="20">
            <el-card class="box-card">
              <div v-for="o in 100" :key="o" class="text item">
                {{'列表内容 ' + o }}
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
}
</script>

<style lang="scss">
$navbar-height: 60px;
.navbar-wrapper {
  height: $navbar-height;
  line-height: $navbar-height;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: #fff;

  a {
    font-size: 15px;
    padding: 20px 20px;
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
