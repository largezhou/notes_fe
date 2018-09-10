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
    if (to.meta.scrollTop) {
      const content = document.querySelector('.content-wrapper .el-scrollbar__wrap')
      content.scrollTop = to.meta.scrollTop
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
