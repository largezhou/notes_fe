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
  deleted_at: null,
  hidden: false,
  cover: () => {
    return Random.image('245X344', Random.color(), Random.color(), Random.ctitle())
  },
  'read|1-900': 1,
  'total|100-900': 1,
  'notes_count|0-20': 1,
}

// 获取所有书籍
mock(/\/books(\?.*)?$/, 'get', {
  'books|10': [
    bookInfoTmpl,
  ],
}, (tmpl, options) => {
  const q = utils.queryFromUrl(options.url)
  if (q.edit_mode) {
    bookInfoTmpl.deleted_at = () => {
      return Math.random() > 0.5 ? Random.datetime() : null
    }
    bookInfoTmpl.hidden = () => {
      return Math.random() > 0.5
    }
  } else {
    bookInfoTmpl.deleted_at = null
    bookInfoTmpl.hidden = false
  }
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

// 更新
mock(/\/books\/\d+/, 'put', {}, (tmpl, options) => {
  const data = utils.safeJsonParse(options.body, {})

  if (data.hidden !== undefined) {
    tmpl.hidden = data.hidden
  }

  if (data.deleted_at === null) {
    tmpl.deleted_at = null
  }
})

mock(/\/books\/\d+/, 'delete', {
  deleted_at: '@datetime',
})
