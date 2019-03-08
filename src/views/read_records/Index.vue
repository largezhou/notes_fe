<template>
  <page-layout page-desc="通往程序之路" :loading="loading">
    <template v-if="records.length">
      <div
        v-for="day of days"
        :key="day"
      >
        <p>{{ day }}</p>
        <div
          v-for="(r, index) of groupedByDay[day]"
          :key="index"
        >
          <p>页数 {{ r.sum }}</p>
        </div>
      </div>
    </template>
    <empty v-else/>
  </page-layout>
</template>

<script>
import { getReadRecords } from '@/api/read_records'

export default {
  name: 'Index',
  data: () => ({
    records: [],
    page: null,
    loading: false,
    groupedByDay: {},
    days: [],
  }),
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      this.loading = true
      try {
        const { data } = await getReadRecords()
        this.records = data.data
        this.page = data.meta

        this.initGroup()
      } finally {
        this.loading = false
      }
    },

    initGroup() {
      const grouped = {}
      const days = []

      this.records.forEach(r => {
        if (!grouped[r.day]) {
          grouped[r.day] = []
          days.push(r.day)
        }
        grouped[r.day].push(r)
      })

      this.groupedByDay = grouped
      this.days = days
    },
  },
}
</script>

<style scoped>

</style>
