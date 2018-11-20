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
  'data|10': [
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
  data: {
    book: {
      title: '@ctitle',
      started_at: '@datetime',
      updated_at: '@datetime',
      cover: Random.image('245X344', Random.color(), Random.color(), Random.ctitle()),
      'read|1-900': 1,
      'total|100-900': 1,
      'notes_count|0-20': 1,
    },
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
  tmpl.data.book.id = router.currentRoute.params.bookId
})

// 添加书籍
mock('/books', 'post', {
  data: bookInfoTmpl,
})

// 更新
mock(/\/books\/\d+/, 'post', { data: {} }, (tmpl, options) => {
  const data = typeof options.body == 'string'
    ? utils.safeJsonParse(options.body, {})
    : options.body

  bookInfoTmpl.id = Number(options.url.match(/\/books\/(\d+)/)[1])
  tmpl.data = bookInfoTmpl

  if (data.hidden !== undefined) {
    tmpl.data.hidden = data.hidden
  } else if (data.deleted_at === null) {
    tmpl.data.deleted_at = null
  }
})

// 软删除
mock(/\/books\/\d+/, 'delete')

// 彻底删除
mock(/\/deleted-books\/\d+/, 'delete')
