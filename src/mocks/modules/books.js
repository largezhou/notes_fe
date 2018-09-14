import mock from '../mock'

const Mock = require('mockjs')
const Random = Mock.Random

mock('/books', 'get', {
  'books|5': [
    {
      'id|+1': 1,
      title: '@ctitle',
      updated_at: '@datetime',
      cover: () => {
        return Random.image('245X344', Random.color(), Random.color(), Random.ctitle())
      },
      'read|1-900': 1,
      'total|100-900': 1,
    },
  ],
})

mock(/\/books\/\d+/, 'get', {
  book: {
    'id|+1': 1,
    title: '@ctitle',
    started_at: '@datetime',
    updated_at: '@datetime',
    cover: Random.image('245X344', Random.color(), Random.color(), Random.ctitle()),
    'read|1-900': 1,
    'total|100-900': 1,
    'notes|5': [
      {
        'id|+1': 1,
        title: '@ctitle',
        desc: '@cparagraph',
        page: {
          'id|+1': 1,
          'page|1-1000': 1,
        },
        created_at: '@datetime',
        'tags|5-10': [
          {
            'id|+1': 1,
            'name|3-5': '@cword',
          },
        ],
      },
    ],
  },
})
