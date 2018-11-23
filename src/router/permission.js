import router from './index'
import store from '@/store'
import { getToken } from '@/libs/token'
import utils from '@/libs/utils'

const guestPage = 'index'

router.beforeEach((to, from, next) => {
  const needAuth = utils.needAuth(to)

  // 本地有token，表示已登录
  if (getToken()) {
    // 已登录的情况下，访问登录页，跳转到首页
    // 否则获取用户信息
    if (to.name == 'login' || to.name == 'loginEverywhere') {
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
            // 如果获取用户信息失败，且响应为未认证，则前端清除token，弹出提示 并：
            //   则直接跳转
            //   否则跳转到登录页
            if (res && res.status == 401) {
              if (needAuth) {
                next({ name: 'login' })
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
          _redirect: to.fullPath,
        },
      })
    } else {
      next()
    }
  }
})
