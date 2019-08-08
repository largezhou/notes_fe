<template>
  <v-tooltip top>
    <template #activator="{ on }">
      <span :class="textClass" v-on="on">{{ human() }}</span>
    </template>
    <span>{{ prefix + time }}</span>
  </v-tooltip>
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
    textClass: String,
  },
  methods: {
    human() {
      return moment(this.time).fromNow()
    },
  },
}
</script>
