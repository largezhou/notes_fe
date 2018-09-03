<template>
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
</template>

<script>
export default {
  name: 'Index',
}
</script>
