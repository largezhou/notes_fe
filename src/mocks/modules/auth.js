import mock from '../mock'

mock('/auth/info', 'get', {
  name: '@cname',
})

mock('/auth/logout', 'post')

mock('/auth/login', 'post', {
  token: 'token',
})
