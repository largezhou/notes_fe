import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

if (process.env.VUE_APP_USE_MOCK) {
  const mock = new MockAdapter(axios)

  mock.onPost('auth/login').reply(config => {
    return [
      200,
      { token: 'a token' },
    ]
  })

  mock.onGet('auth/info').reply(200, {
    name: '周霜霖',
  })

  mock.onPost('/auth/logout').reply(200)
}
