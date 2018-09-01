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

const routersNeedAuth = [
  {
    path: '',
    meta: {
      auth: true,
    },
    component: () => import('@/views/Layout'),
    children: [
      {
        path: '/need-auth',
        name: 'needAuth',
        component: () => import('@/views/NeedAuth'),
      },
    ],
  },
]

const page404 = {
  path: '*',
  name: 'page404',
  component: () => import('@/views/errors/Page404'),
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    index,
    login,
    ...routersNeedAuth,
    page404,
  ],
})
