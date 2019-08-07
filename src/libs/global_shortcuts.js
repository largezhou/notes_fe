import store from '@/store'
import router from '@/router'
import utils from '@/libs/utils'

const registeredShortcuts = []

/**
 * 注册一个全局快捷键
 *
 * @param code 触发的案件
 * @param callback 触发后的回调
 * @param times 连续按几次触发
 */
const register = (code, callback, times = 3) => {
  registeredShortcuts.push({
    code,
    callback,
    times,
    pressed: 0,
    lastTime: 0,
  })
}

// 全局快捷键
document.addEventListener('keydown', e => {
  // 如果有输入框聚焦，则忽略
  if (document.querySelector(':focus')) {
    return
  }

  registeredShortcuts.forEach(o => {
    if (o.code == e.code && (Date.now() - o.lastTime) < 500) {
      o.pressed++

      if (o.pressed >= o.times - 1) {
        o.callback(e)
        o.pressed = 0
      }
    } else {
      o.pressed = 0
    }

    o.lastTime = Date.now()
  })
})

// 切换编辑模式
register('KeyE', e => {
  if (store.state.user.name) {
    store.commit('changeEditMode', !store.state.app.editMode)
  }
})

// 进入登录页面
register('KeyA', e => {
  if (store.state.user.name || (router.currentRoute.name === 'login')) {
    return
  }

  router.push({
    name: 'login',
    query: {
      _redirect: router.currentRoute.fullPath,
    },
  })
})

// 退出登录
register('KeyQ', e => {
  if (!store.state.user.name) {
    return
  }

  store.dispatch('logout')
    .then(() => {
      utils.snackbar('已退出')
      if (utils.needAuth(router.currentRoute)) {
        location.href = '/'
      } else {
        location.reload()
      }
    })
})
