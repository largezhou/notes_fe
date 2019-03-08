import mock from '../mock'

const Mock = require('mockjs')

const recordTmpl = {
  'book_id|+1': 1,
  'sum|2-10': 1,
  day: '@date',
  book: () => {
    return Math.random() > 0.8
      ? null
      : Mock.mock({
        'book_id|1-20': 1,
        title: '@ctitle',
      })
  },
}

// 获取书籍的笔记
mock(/\/read-records(\?.*)?$/, 'get', {
  data: {
    'data|15': [
      recordTmpl,
    ],
    meta: {
      'current_page': 1,
      'from': 1,
      'last_page': 7,
      'per_page': 15,
      'to': 15,
      'total': 100,
    },
  },
})
