<template>
  <page-layout page-desc="通往程序之路" :loading="loading">
    <template v-if="records.length">
      <v-expansion-panel
        expand
      >
        <v-expansion-panel-content
          v-for="day of days"
          :key="day"
        >
          <div
            slot="header"
            class="progress-wrapper"
          >
            <div>{{ day }}</div>
            <div class="progress">
              <v-progress-linear
                color="info"
                height="21"
                :value="groupedByDay[day].sum / maxSum * 100"
              />
              <span class="sum">{{ groupedByDay[day].sum }} 页</span>
            </div>
          </div>
          <div
            class="books"
            v-for="(r, index) of groupedByDay[day].books"
            :key="index"
          >
            <div>{{ r.book ? r.book.title : '神秘书籍' }} - {{ r.sum }}</div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </template>
    <empty v-else/>
    <v-btn @click="onLoadMore">更多</v-btn>
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

    maxSum: 0,
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

        this.initRecords()
      } finally {
        this.loading = false
      }
    },

    /**
     * 初始化一些数据
     */
    initRecords() {
      // 按 天 分组
      const grouped = {}
      // 所有 天
      const days = []
      // 按天统计的最大页数
      let maxSum = 0
      // 当前天的上一个天
      let preDay

      this.records.forEach(r => {
        if (!grouped[r.day]) {
          grouped[r.day] = {
            sum: 0,
            books: [],
          }
          days.push(r.day)

          // 如果 day，不在 grouped 中，说明是一个新的日期了，
          // 由于日期是排序过的，所以后面肯定不会出现再出现之前的日期了，
          // 可以把上一个日期的总页数与当前最大值比较了
          if (preDay && (grouped[preDay].sum > maxSum)) {
            maxSum = grouped[preDay].sum
          }

          preDay = r.day
        }

        grouped[r.day].sum += Number(r.sum)
        grouped[r.day].books.push(r)
      })

      this.maxSum = maxSum
      this.groupedByDay = grouped
      this.days = days
    },

    async onLoadMore() {
      alert('gogogo')
    },
  },
}
</script>

<style scoped lang="scss">
.v-expansion-panel {
  box-shadow: none;

  .v-expansion-panel__container {
    border-top: none;
    background: initial;
  }
}

/deep/ {
  .v-expansion-panel__header {
    padding: 12px 16px;
  }
}

.books {
  padding: 12px 16px;
}

.progress-wrapper {
  > div {
    display: inline-block;
    vertical-align: middle;
  }

  .v-progress-linear {
    margin: 0;
  }

  .progress {
    position: relative;
    width: calc(100% - 100px);
    margin-left: 15px;
  }
}

.sum {
  left: 5px;
  top: 1px;
  color: white;
  position: absolute;
  z-index: 1;
}
</style>
