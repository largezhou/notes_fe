<template>
  <div class="container content book-show">
    <el-row :gutter="10" type="flex" justify="center">
      <el-col :md="18" :sm="20">
        <el-card>
          <el-row :gutter="20" type="flex">
            <el-col :span="6" :xs="8" class="cover">
              <img src="http://dummyimage.com/245X344/7987f2/aaf279&text=呵呵">
            </el-col>
            <el-col :span="16" class="info">
              <div class="title">深入理解计算机系统（第3版）</div>
              <div class="item">
                <span class="label">开始阅读</span>
                <human-time time="2017-12-23 12:12:12" prefix="开始于："/>
              </div>
              <div class="item">
                <span class="label">更新</span>
                <human-time time="2018-08-23 12:12:12" prefix="最近更新："/>
              </div>
              <div class="item">
                <span class="label">已读</span>
                <span>111</span> 页
              </div>
              <div class="item">
                <span class="label">总页数</span>
                <span>230</span> 页
              </div>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="progress">
          <el-progress
            :percentage="25"
            :stroke-width="20"
            :text-inside="true"
          ></el-progress>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HumanTime from '@/components/HumanTime'

export default {
  name: 'Show',
  components: { HumanTime },
}
</script>

<style lang="scss">
@import "~@/styles/variables";

.book-show {
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .cover {
    max-width: 150px;
    img {
      width: 100%;
    }
  }

  .info {
    padding: 10px 10px 0 10px;
    font-size: 15px;

    .item {
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .label {
    display: inline-block;
    width: 65px;
    margin-right: 10px;
    color: $non-important-color;
  }

  @media only screen and (max-width: 768px) {
    .title {
      font-size: 16px;
    }

    .info {
      font-size: 14px;
    }
  }

  .progress {
    margin: 5px 0;

    .el-card__body {
      padding: 0;
    }

    .el-progress-bar__outer,
    .el-progress-bar__inner {
      border-radius: 0;
    }
  }
}
</style>
