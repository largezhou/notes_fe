import mock from '../mock'

mock('/auth/info', 'get', {
  data: {
    name: '@cname',
  },
})

mock('/auth/logout', 'post')

mock('/auth/login', 'post', {
  data: {
    token: 'token',
  },
})
