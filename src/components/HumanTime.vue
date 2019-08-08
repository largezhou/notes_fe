<template>
  <v-tooltip top>
    <template #activator="{ on }">
      <span v-on="on">{{ human() }}</span>
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
  },
  methods: {
    human() {
      return moment(this.time).fromNow()
    },
  },
}
</script>
