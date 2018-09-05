import axios from 'axios'

if (process.env.VUE_APP_USE_MOCK) {
  const MockAdapter = require('axios-mock-adapter')
  const { fakeData } = require('./data')

  const mock = new MockAdapter(axios)

  mock.onPost('auth/login').reply(config => {
    return [
      200,
      { token: 'a token' },
    ]
  })

  mock.onGet('auth/info').reply(config => {
    log('mock onGet auth/info ', config)
    const token = config.headers.Authorization

    // 模拟token失效的情况
    if (token != 'a token') {
      return [401]
    }

    return [200, { name: '周霜霖' }]
  })

  mock.onPost('/auth/logout').reply(200)

  mock.onGet('/notes').reply(config => {
    return [
      200,
      {
        notes: fakeData.notes.getIndex(),
      },
    ]
  })
}
