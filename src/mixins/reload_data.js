/**
 * 当路由为点击链接跳转，而非浏览器前进后退时，标记路由需要重新加载数据
 */
export default {
  created() {
    // 保存组件的初始数据，用来更新数据前先清空当前数据
    this.oldData = JSON.stringify(this.$data)

    // 由于组件 Vue 自带的 _inactive 字段更新的时机，要比 editMode 变化的要早
    // 所以当用一个处于编辑模式的页面，点击链接跳转到一个被缓存的组件时
    // 在 editMode 的侦听中，_inactive 已经为 false 了，这就会执行 getData 方法，然而 activated 钩子中也会执行一次

    // 自己维护的话，激活和非激活钩子函数执行的时机，要比 editMode 侦听的要晚，所以当侦听到 editMode 改变时，$active 字段还是为 false
    // 就不会执行 getData 方法
    this.$active = true
  },

  deactivated() {
    this.$active = false
  },
  activated() {
    this.$active = true
    this.$nextTick(() => {
      const meta = this.$route.meta
      // 如果页面缓存了，且不是【不需要刷新】状态，则刷新
      // needReload === undefined 表示页面首次进入，比如在当前页面按了浏览器刷新，此时肯定要获取数据
      // needReload === true 表示页面是由其他页面点击链接跳转过来了的。该值是在路由的滚动行为函数中赋予的true，也需要重新获取数据
      // needReload === false 表示页面是通过浏览器前进或后退进入的。赋值时机同上，表示不需要重新获取数据
      if (meta.keepAlive && meta.needReload !== false) {
        log('in reload data mixin')
        // 清空旧数据
        Object.assign(this.$data, JSON.parse(this.oldData))
        // 重新获取数据
        this.getData()
      }
    })
  },
}
