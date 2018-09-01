import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

if (process.env.VUE_APP_USE_MOCK) {
  const mock = new MockAdapter(axios)

  mock.onPost('auth/login').reply(200, { token: 'a token' })
}
