import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 首页
const index = {
  path: '/',
  name: 'index',
  meta: {
    keepAlive: true,
  },
  component: () => import('@/views/Index'),
}

// 登录
const login = {
  path: '/login',
  name: 'login',
  component: () => import('@/views/Login'),
}

// 任何路径后面加一个/login，即可跳转到登录页
const loginEverywhere = {
  path: '*/login',
  name: 'loginEverywhere',
  component: () => import('@/views/Login'),
}

const otherRouters = [
  {
    path: '',
    component: () => import('@/views/Layout'),
    children: [
      // 书籍列表
      {
        path: '/books',
        name: 'bookIndex',
        component: () => import('@/views/books/Index'),
      },

      // 书籍详情
      {
        path: '/books/:bookId(\\d+)',
        name: 'bookShow',
        meta: {
          keepAlive: true,
        },
        component: () => import('@/views/books/Show'),
      },

      // 添加笔记表单页
      {
        path: 'books/:bookId(\\d+)/notes/create',
        name: 'noteCreate',
        meta: {
          auth: true,
        },
        component: () => import('@/views/notes/Create'),
      },

      // 笔记详情页
      {
        path: 'notes/:noteId(\\d+)',
        name: 'noteShow',
        component: () => import('@/views/notes/Show'),
      },

      // 笔记编辑
      {
        path: 'notes/:noteId(\\d+)/edit',
        name: 'noteEdit',
        component: () => import('@/views/notes/Edit'),
      },

      // 所有标签
      {
        path: 'tags',
        name: 'tagIndex',
        component: () => import('@/views/tags/Index'),
      },

      // 标签下的笔记博客页
      {
        path: 'tags/:tagId(\\d+)',
        name: 'tagShow',
        component: () => import('@/views/tags/Show'),
      },

      // 博客列表
      {
        path: 'posts',
        name: 'postIndex',
        meta: {
          keepAlive: true,
        },
        component: () => import('@/views/posts/Index'),
      },

      {
        path: 'posts/:postId(\\d+)',
        name: 'postShow',
        component: () => import('@/views/posts/Show'),
      },

      {
        path: 'posts/create',
        name: 'postCreate',
        meta: {
          auth: true,
        },
        component: () => import('@/views/posts/Create'),
      },

      {
        path: 'posts/:postId(\\d+)/edit',
        name: 'postEdit',
        component: () => import('@/views/posts/Edit'),
      },
    ],
  },
]

// 404
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
    loginEverywhere,
  ],
})

export default router
