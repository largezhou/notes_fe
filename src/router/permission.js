import router from './index'
import store from '@/store'
import { getToken } from '@/libs/token'
import { MessageBox } from 'element-ui'

const guestPage = 'needAuth'

router.beforeEach((to, from, next) => {
  const needAuth = to.matched.some(r => (r.meta && r.meta.auth))

  // 本地有token，表示已登录
  if (getToken()) {
    // 已登录的情况下，访问登录页，跳转到首页
    // 否则获取用户信息
    if (to.name == 'login') {
      next({ name: guestPage })
    } else {
      // 如果已有用户信息，则直接跳转
      // 否则从服务器获取用户信息
      if (store.state.user.name) {
        next()
      } else {
        store
          .dispatch('getInfo')
          .then(res => {
            // 获取用户信息成功，跳转
            log('Permission getInfo', res)
            next()
          })
          .catch(err => {
            log('permission getInfo catch', err.response)
            const res = err.response
            // 如果获取用户信息失败，且响应为未认证，则前端清除token，并：
            //   如果去的页面不需要登录，则直接跳转
            //   否则提示已登出，跳转到登录页
            if (res && res.status == 401) {
              store.dispatch('frontendLogout')

              if (needAuth) {
                MessageBox.alert('已登出，请重新登录', '已登出', {
                  confirmButtonText: '重新登录',
                  type: 'warning',
                }).finally(() => {
                  next({ name: 'login' })
                })
              } else {
                next()
              }
            }
          })
      }
    }
  } else {
    if (needAuth) {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath,
        },
      })
    } else {
      next()
    }
  }
})
