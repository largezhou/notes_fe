import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const index = {
  path: '/',
  name: 'index',
  meta: {
    keepAlive: true,
  },
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
        path: '/books/:bookId(\\d+)',
        name: 'bookShow',
        meta: {
          keepAlive: true,
        },
        component: () => import('@/views/books/Show'),
      },

      {
        path: '/books/:bookId(\\d+)/edit',
        name: 'bookEdit',
        component: () => import('@/views/books/Edit'),
      },

      {
        path: 'books/:bookId(\\d+)/notes/create',
        name: 'noteCreate',
        component: () => import('@/views/notes/Create'),
      },

      {
        path: 'notes/:noteId(\\d+)',
        name: 'noteShow',
        component: () => import('@/views/notes/Show'),
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
    to.meta.needReload = !savedPosition

    return savedPosition || { x: 0, y: 0 }
  },
  routes: [
    index,
    login,
    ...otherRouters,
    page404,
  ],
})

export default router
