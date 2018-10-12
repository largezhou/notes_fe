import mock from '../mock'
import router from '@/router'
import utils from '@/libs/utils'

const Mock = require('mockjs')
const Random = Mock.Random

const bookInfoTmpl = {
  'id|+1': 1,
  title: '@ctitle',
  started_at: '@datetime',
  updated_at: '@datetime',
  cover: () => {
    return Random.image('245X344', Random.color(), Random.color(), Random.ctitle())
  },
  'read|1-900': 1,
  'total|100-900': 1,
  'notes_count|0-20': 1,
}

// 获取所有书籍
mock(/\/books(\?.*)?$/, 'get', {
  'books|5': [
    bookInfoTmpl,
  ],
}, (tmpl, options) => {
  const q = utils.queryFromUrl(options.url)
})

// 获取书籍详情
mock(/\/books\/\d+(\?.*)?$/, 'get', {
  book: {
    title: '@ctitle',
    started_at: '@datetime',
    updated_at: '@datetime',
    cover: Random.image('245X344', Random.color(), Random.color(), Random.ctitle()),
    'read|1-900': 1,
    'total|100-900': 1,
    'notes_count|0-20': 1,
    'notes|5': [
      {
        'id|+1': 1,
        title: '@ctitle',
        desc: '@cparagraph',
        'page|1-1000': 1,
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
}, (tmpl, options) => {
  tmpl.book.id = router.currentRoute.params.bookId
})

// 添加书籍
mock('/books', 'post', {
  book: bookInfoTmpl,
})
