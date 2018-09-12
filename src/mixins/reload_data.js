/**
 * 当路由为点击链接跳转，而非浏览器前进后退时，标记路由需要重新加载数据
 */
export default {
  created() {
    // 保存组件的初始数据，用来更新数据前先清空当前数据
    this.oldData = JSON.stringify(this.$data)
  },

  activated() {
    this.$nextTick(() => {
      if (this.$route.meta.needReload) {
        // 清空旧数据
        Object.assign(this.$data, JSON.parse(this.oldData))
        // 重新获取数据
        this.getData && this.getData()
      }
    })
  },
}
