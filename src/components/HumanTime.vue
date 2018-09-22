<template>
  <!--<el-tooltip class="item" effect="dark" :content="prefix + time" placement="top">-->
    <span>{{ human() }}</span>
  <!--</el-tooltip>-->
</template>

<script>
import moment from 'moment'

moment.locale('zh-cn')

export default {
  name: 'HumanTime',
  props: {
    time: {
      type: String,
      required: true,
    },
    prefix: {
      type: String,
      default: '',
    },
  },
  methods: {
    human() {
      return moment(this.time).fromNow()
    },
  },
}
</script>
