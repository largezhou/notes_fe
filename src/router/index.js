import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const index = {
  path: '/',
  name: 'index',
  component: () => import('@/views/Index'),
}

const login = {
  path: '/login',
  name: 'login',
  component: () => import('@/views/Login'),
}

const otherRouters = [
  {
    path: '',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: '/need-auth',
        name: 'needAuth',
        meta: {
          auth: true,
        },
        component: () => import('@/views/NeedAuth'),
      },

      {
        path: '/books',
        name: 'bookIndex',
        component: () => import('@/views/books/Index'),
      },

      {
        path: '/books/:id(\\d+)',
        name: 'bookShow',
        component: () => import('@/views/books/Show'),
      },

      {
        path: '/books/:id(\\d+)/edit',
        name: 'bookEdit',
        component: () => import('@/views/books/Edit'),
      },
    ],
  },
]

const page404 = {
  path: '*',
  name: 'page404',
  component: () => import('@/views/errors/Page404'),
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    // savedPosition为null表示页面是跳转的，而不是历史记录中`前进`或`后退`

    // 如果页面是跳转的，则标记前往的路由需要重新加载数据
    // 否则不需要
    if (savedPosition) {
      to.meta.needReload = false
    } else {
      to.meta.needReload = true
    }

    // 如果去的页面是前进或者后退的，且存了滚动条位置，则滚到相应位置
    // 否则滚到顶部
    if (to.meta.scrollTop && savedPosition) {
      const content = document.querySelector('.content-wrapper .el-scrollbar__wrap')
      content.scrollTop = to.meta.scrollTop
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    index,
    login,
    ...otherRouters,
    page404,
  ],
})

router.beforeEach((to, from, next) => {
  const content = document.querySelector('.content-wrapper .el-scrollbar__wrap')
  if (content) {
    from.meta.scrollTop = content.scrollTop
  }
  next()
})

export default router
